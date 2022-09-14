import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
	Skeleton,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useAccount, useEnsAddress, useEnsName, useSigner } from "wagmi";
import resolverConfig from "../config.json";

function NFT({ nft }: any) {
	let img =
		nft.metadata.image && nft.metadata.image.startsWith("ipfs://")
			? `https://ipfs.io/ipfs/${nft.metadata.image.split("://")[1]}`
			: nft.metadata.image;

	const { address } = useAccount();
	const { data: signer } = useSigner();
	const { data, isSuccess } = useEnsName({
		address,
	});
	const { data: resolverAddress, isSuccess: isSuccess2 } = useEnsAddress({
		name: "resolver.eth",
	});

	const setAvatar = async () => {
		if (isSuccess) {
			const contract = new ethers.Contract(
				resolverAddress as string,
				resolverConfig.abi,
				signer as any
			);

			const nameHash = ethers.utils.namehash(data as string);

			let txn;
			try {
				txn = await contract.setText(
					nameHash,
					"avatar",
					`eip155:1/${nft.id.tokenMetadata.tokenType.toLowerCase()}/${
						nft.contract.address
					}/${nft.id.tokenId.toString()}`
				);
			} catch (e) {
				console.error(e);
			}
		}
	};
	return (
		<Center py={12}>
			<Box
				role={"group"}
				p={6}
				maxW={"330px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"xl"}
				rounded={"lg"}
				pos={"relative"}
				zIndex={1}
			>
				<Box
					rounded={"lg"}
					mt={-12}
					pos={"relative"}
					height={"230px"}
					_hover={{
						cursor: "pointer",
					}}
					onClick={setAvatar}
					_after={{
						transition: "all .3s ease",
						content: '""',
						w: "full",
						h: "full",
						pos: "absolute",
						top: 5,
						left: 0,
						backgroundImage: `url(${img})`,
						filter: "blur(10px)",
						zIndex: -1,
					}}
					_groupHover={{
						_after: {
							filter: "blur(5px)",
						},
					}}
				>
					<Image
						rounded={"lg"}
						height={230}
						width={282}
						objectFit={"cover"}
						src={img}
					/>
				</Box>
				<Stack pt={10} align={"center"}>
					<Text
						color={"gray.500"}
						fontSize={"sm"}
						textTransform={"uppercase"}
					>
						{nft.contract.address.substring(0, 4) +
							"..." +
							nft.contract.address.substring(
								nft.contract.address.length - 4,
								nft.contract.address.length
							)}
					</Text>
					<Heading
						fontSize={"2xl"}
						fontFamily={"body"}
						fontWeight={500}
					>
						{nft?.title}
					</Heading>
				</Stack>
			</Box>
		</Center>
	);
}

export default NFT;
