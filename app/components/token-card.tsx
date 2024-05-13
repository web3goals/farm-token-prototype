"use client";

import { SiteConfigContracts } from "@/config/site";
import { TokenCardHeader } from "./token-card-header";
import { TokenCardRecords } from "./token-card-records";
import { Separator } from "./ui/separator";
import useMetadataLoader from "@/hooks/useMetadataLoader";
import { zeroAddress, erc20Abi } from "viem";
import { useReadContract } from "wagmi";
import { Skeleton } from "./ui/skeleton";
import { farmTokenAbi } from "@/contracts/abi/farmToken";
import { FarmTokenMetadata } from "@/types/farm-token-metadata";

export function TokenCard(props: {
  token: string;
  contracts: SiteConfigContracts;
}) {
  /**
   * Define token data
   */
  const { data: tokenOwner, isFetched: isTokenOwnerFetched } = useReadContract({
    address: props.contracts.farmToken,
    abi: farmTokenAbi,
    functionName: "ownerOf",
    args: [BigInt(props.token)],
    chainId: props.contracts.chain.id,
  });
  const {
    data: tokenParams,
    isFetched: isTokenParamsFetched,
    refetch: refetchTokenParams,
  } = useReadContract({
    address: props.contracts.farmToken,
    abi: farmTokenAbi,
    functionName: "getParams",
    args: [BigInt(props.token)],
    chainId: props.contracts.chain.id,
  });
  const {
    data: tokenMetadataUri,
    isFetched: isTokenMetadataUriFetched,
    refetch: refetchTokenMetadataUri,
  } = useReadContract({
    address: props.contracts.farmToken,
    abi: farmTokenAbi,
    functionName: "tokenURI",
    args: [BigInt(props.token)],
    chainId: props.contracts.chain.id,
  });
  const { data: tokenMetadata, isLoaded: isTokenMetadataLoaded } =
    useMetadataLoader<FarmTokenMetadata>(tokenMetadataUri);

  /**
   * Define token investment token symbol
   */
  const {
    data: tokenInvestmentTokenSymbol,
    isFetched: isTokenInvestmentTokenSymbolFetched,
  } = useReadContract({
    address: tokenParams?.investmentToken || zeroAddress,
    abi: erc20Abi,
    functionName: "symbol",
    chainId: props.contracts.chain.id,
  });

  if (
    !isTokenOwnerFetched ||
    !tokenOwner ||
    !isTokenParamsFetched ||
    !tokenParams ||
    !isTokenMetadataUriFetched ||
    !isTokenMetadataLoaded ||
    !tokenMetadata ||
    !tokenInvestmentTokenSymbol ||
    !isTokenInvestmentTokenSymbolFetched
  ) {
    return <Skeleton className="w-full h-8" />;
  }

  return (
    <div className="w-full flex flex-col items-center border rounded px-6 py-8">
      <TokenCardHeader
        token={props.token}
        tokenMetadata={tokenMetadata}
        tokenOwner={tokenOwner}
        tokenInvestmentAmount={tokenParams.investmentAmount.toString()}
        tokenInvestmentToken={tokenParams.investmentToken}
        tokenInvestmentTokenSymbol={tokenInvestmentTokenSymbol}
        tokenInvestor={tokenParams.investor}
        tokenReturnAmount={tokenParams.returnAmount.toString()}
        tokenReturnDate={tokenParams.returnDate.toString()}
        contracts={props.contracts}
        onUpdate={() => {
          refetchTokenParams();
          refetchTokenMetadataUri();
        }}
      />
      <Separator className="my-6" />
      <TokenCardRecords
        token={props.token}
        tokenMetadata={tokenMetadata}
        tokenOwner={tokenOwner}
        tokenInvestmentTokenSymbol={tokenInvestmentTokenSymbol}
        tokenReturnDate={tokenParams.returnDate.toString()}
        contracts={props.contracts}
        onUpdate={() => {
          refetchTokenParams();
          refetchTokenMetadataUri();
        }}
      />
    </div>
  );
}
