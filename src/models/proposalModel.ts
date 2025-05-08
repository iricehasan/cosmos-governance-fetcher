export interface ProposalModel {
  chain: string;
  proposal_id: string;
  title: string;
  status: string;
  submit_time: string;
  voting_start_time: string;
  voting_end_time: string;
  deposit_amount: string;
  deposit_denom: string;
  yes: string;
  no: string;
  abstain: string;
  no_with_veto: string;
}
