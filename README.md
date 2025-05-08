# Cosmos Governance Fetcher

A small TypeScript service to pull governance proposals (and related data) from any Cosmos‐SDK chain over gRPC.

```text
.
├── proto/ # .proto files from `buf export`
├── generated/ # TS‐proto output
├── src/
│ ├── index.ts # entrypoint
│ ├── controllers/
│ ├── services/ # gRPC fetcher
│ ├── config/ # gRPC endpoints for chains
│ ├── views/ # csv export
│ └── models/ # local TS models (Proposal, etc.)
├── package.json
├── tsconfig.json
├── buf.yaml # buf build config
└── README.md
```

---

## Features

- Fetch **all** proposals via Cosmos-SDK gov gRPC API
- Auto-handles pagination
- Maps proto messages into a simple `Proposal` model
- Easy to extend for deposits, votes, tally results, etc.

---

## Prerequisites

- **Node.js** ≥ 16
- **npm** or **yarn**
- **protoc** (Protocol Buffers compiler) on your `PATH`
- A gRPC‐enabled Cosmos SDK node endpoint

---

## Getting Started

### Clone & Install

```bash
git clone https://github.com/iricehasan/cosmos-governance-fetcher.git
cd cosmos-governance-fetcher
npm install
# or
# yarn install
```

---

### Generate Protobufs

1. Export the Cosmos SDK & Google API protos into proto/:

```bash
npm run export:proto
```

2. Generate TypeScript + gRPC client code under generated/:

```bash
npm run gen:proto
```

---

### Run

```bash
# Start the fetcher
npm start
```
