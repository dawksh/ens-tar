import { Flex, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import NFT from "./NFT";

function NFTs({ nfts }: any) {
	return (
		<Flex wrap="wrap" gap={2} justify="center" alignItems="center">
			{typeof nfts !== "undefined" ? (
				nfts.map((el: any, index: any) => {
					if (
						el.contract.address !=
						"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
					) {
						return (
							<Flex
								justify="center"
								alignItems="center"
								key={index}
							>
								<NFT nft={el} />
							</Flex>
						);
					}
				})
			) : (
				<Skeleton
					isLoaded={false}
					role={"group"}
					p={6}
					maxW={"330px"}
					w={"full"}
					boxShadow={"xl"}
					rounded={"lg"}
					pos={"relative"}
					zIndex={1}
				>
					<Text minH={20}> Still Loading</Text>
				</Skeleton>
			)}
		</Flex>
	);
}

export default NFTs;
