export interface ChainConfig {
  name: string;
  grpcEndpoint: string;
}

export const chains: ChainConfig[] = [
  {
    name: "cosmoshub",
    grpcEndpoint: "cosmos-grpc.publicnode.com:443",
  },
];
