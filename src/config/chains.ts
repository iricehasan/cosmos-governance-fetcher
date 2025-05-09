export interface ChainConfig {
  name: string;
  grpcEndpoint: string;
}

export const chains: ChainConfig[] = [
  {
    name: "cosmoshub",
    grpcEndpoint: "cosmos-grpc.publicnode.com:443",
  },
  {
    name: "injective",
    grpcEndpoint: "sentry.chain.grpc.injective.network:443",
  },
  {
    name: "dydx",
    grpcEndpoint: "dydx-grpc.publicnode.com:443",
  },
  {
    name: "celestia",
    grpcEndpoint: "celestia-grpc.publicnode.com:443",
  },
];
