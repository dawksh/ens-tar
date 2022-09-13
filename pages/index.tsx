import type { NextPage } from "next";
import { Alert, AlertIcon, Box, Flex, Heading } from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";
import Tabs from "../components/Tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

const Home: NextPage = () => {
	const { isConnected, address } = useAccount();
	const { data, isError, isSuccess } = useEnsName({
		address,
	});

	const [nft, setNft] = useState<any>();

	useEffect(() => {
		(async function () {
			if (isConnected && isSuccess) {
				if (data) {
					let { data: nftData } = await axios.get(
						`https://eth-mainnet.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${address}`
					);
					setNft(nftData.ownedNfts);
				}
			}
		})();
	}, [isSuccess]);

	return (
		<Flex justify="center" alignItems="center" direction="column" gap={6}>
			<Head>
				<title>ENS-tar</title>
			</Head>
			<Heading
				bgGradient={[
					"linear(to-t, blue.200, teal.500)",
					"linear(to-b, orange.100, purple.300)",
				]}
				bgClip="text"
			>
				ENS-tar
			</Heading>
			{isSuccess && data && <Tabs nfts={nft} />}
			{isError && "There was some error fetching your ENS Name"}
			{!isSuccess && (
				<Box border={"2px"} p={2} borderRadius="md">
					<Alert status="info">
						<AlertIcon />
						No Wallet Connected :(
					</Alert>
				</Box>
			)}
			{isSuccess && !data && (
				<Box border={"2px"} p={2} borderRadius="md">
					<Alert status="info">
						<AlertIcon />
						No ENS Found :(
					</Alert>
				</Box>
			)}
		</Flex>
	);
};

export default Home;
