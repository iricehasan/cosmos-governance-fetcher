// src/services/grpcProposalService.ts
import Long from "long";
import {
  QueryClient,
  QueryProposalsRequest,
  QueryProposalsResponse,
} from "../../generated/cosmos/gov/v1/query";
import { ProposalStatus } from "../../generated/cosmos/gov/v1/gov";
import { credentials } from "@grpc/grpc-js";
import { ProposalModel } from "../models/proposalModel";
import { Buffer } from "buffer";

/**
 * Fetch all governance proposals via the Cosmos SDK v1 gov gRPC API.
 */
export async function fetchProposalsGRPC(
  chainName: string,
  grpcUrl: string
): Promise<ProposalModel[]> {
  // Instantiate the v1 gRPC client
  const client = new QueryClient(grpcUrl, credentials.createSsl());

  const allProposals: ProposalModel[] = [];
  // Always keep pagination.key as a Buffer (not Uint8Array)
  let nextKey: Buffer = Buffer.alloc(0);
  let page = 1;

  do {
    const req: QueryProposalsRequest = {
      proposalStatus: ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
      voter: "",
      depositor: "",
      pagination: {
        key: nextKey,
        offset: Long.UZERO,
        limit: Long.fromNumber(100),
        countTotal: false,
        reverse: false,
      },
    };

    // Perform the RPC
    const res: QueryProposalsResponse = await new Promise((resolve, reject) => {
      client.proposals(req, (err, response) => {
        if (err) return reject(err);
        resolve(response);
      });
    });

    // Transform each on‐chain Proposal into our local model
    for (const p of res.proposals) {
      const deposit = p.totalDeposit?.[0] ?? { amount: "0", denom: "N/A" };
      const tally = p.finalTallyResult ?? {
        yesCount: "0",
        noCount: "0",
        abstainCount: "0",
        noWithVetoCount: "0",
        optionOneCount: "0",
        optionTwoCount: "0",
        optionThreeCount: "0",
        optionFourCount: "0",
        spamCount: "0",
      };

      allProposals.push({
        chain: chainName,
        proposal_id: p.id.toString(),
        title: p.title || "Untitled",
        // Convert enum to its name
        status: ProposalStatus[p.status],
        submit_time: p.submitTime?.toISOString() ?? "",
        voting_start_time: p.votingStartTime?.toISOString() ?? "",
        voting_end_time: p.votingEndTime?.toISOString() ?? "",
        deposit_amount: deposit.amount,
        deposit_denom: deposit.denom,
        yes: tally.yesCount,
        no: tally.noCount,
        abstain: tally.abstainCount,
        no_with_veto: tally.noWithVetoCount,
      });
    }

    console.log(
      `✅ [gRPC v1] Page ${page++}: ${res.proposals.length} proposals`
    );

    // Convert the nextKey (Uint8Array) into a Buffer for the next iteration
    nextKey = res.pagination?.nextKey
      ? Buffer.from(res.pagination.nextKey)
      : Buffer.alloc(0);
  } while (nextKey.length > 0);

  console.log(`🎉 Total proposals from ${chainName}: ${allProposals.length}`);
  return allProposals;
}
