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

	const [_isConnected, setIsConnected] = useState<boolean>(false)

	const [nft, setNft] = useState<any>();

	useEffect(() => {
		(async function () {
			if (_isConnected && isSuccess) {
				if (data) {
					let { data: nftData } = await axios.get(`/api/getNfts`, {
						params: { address },
					});
					setNft(nftData.data.ownedNfts);
				}
			}
		})();
	}, [isSuccess]);

	useEffect(() => {
		setIsConnected(isConnected);
	}, [isConnected])

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
			<Tabs nfts={nft} />
			{isError && "There was some error fetching your ENS Name"}
			{!_isConnected && (
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
