import { Flex } from "@chakra-ui/react";
import React from "react";
import NFT from "./NFT";

function NFTs({ nfts }: any) {
	console.log(nfts);
	return (
		<Flex wrap="wrap" gap={2} justify="center" alignItems="center">
			{nfts?.map((el: any, index: any) => {
				if (
					el.contract.address !=
					"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
				) {
					return (
						<Flex justify="center" alignItems="center" key={index}>
							<NFT nft={el} />
						</Flex>
					);
				}
			})}
		</Flex>
	);
}

export default NFTs;
