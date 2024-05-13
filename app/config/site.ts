import { Chain, liskSepolia } from "viem/chains";

export type SiteConfig = typeof siteConfig;

export type SiteConfigContracts = {
  chain: Chain;
  farmToken: `0x${string}`;
  usdToken: `0x${string}`;
  entryPoint: `0x${string}`;
  paymaster: `0x${string}`;
  accountFactory: `0x${string}`;
  accountAbstractionSuported: boolean;
};

export const siteConfig = {
  emoji: "🚜",
  name: "FarmToken",
  description:
    "A platform for tokenization of crops and livestock to attract investments",
  links: {
    github: "https://github.com/web3goals/farm-token-prototype",
  },
  contracts: {
    liskTestnet: {
      chain: liskSepolia,
      farmToken: "0x96E6AF6E9e400d0Cd6a4045F122df22BCaAAca59" as `0x${string}`,
      usdToken: "0x02008a8DBc938bd7930bf370617065B6B0c1221a" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory:
        "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
  },
};
