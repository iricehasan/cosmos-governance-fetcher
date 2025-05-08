import { ProposalModel } from "../models/proposalModel";
import { createObjectCsvWriter } from "csv-writer";

export function saveProposalsToCSV(
  proposals: ProposalModel[],
  filename = "proposals.csv"
) {
  if (!proposals.length) {
    console.warn("⚠️ No proposals to save.");
    return;
  }

  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: Object.keys(proposals[0]).map((key) => ({ id: key, title: key })),
  });

  csvWriter
    .writeRecords(proposals)
    .then(() =>
      console.log(`✅ Saved ${proposals.length} proposals to ${filename}`)
    );
}
