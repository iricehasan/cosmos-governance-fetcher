import { chains } from "../config/chains";
import { fetchProposalsGRPC } from "../services/grpcProposalService";
import { saveProposalsToCSV } from "../views/csvView";
import { ProposalModel } from "../models/proposalModel";

export async function runProposalExport() {
  let allProposals: ProposalModel[] = [];

  for (const chain of chains) {
    try {
      const proposals = await fetchProposalsGRPC(
        chain.name,
        chain.grpcEndpoint
      );
      allProposals.push(...proposals);
    } catch (err) {
      console.error(`❌ Failed to fetch from ${chain.name}:`, err);
    }
  }

  saveProposalsToCSV(allProposals);
}
