import type { NextPage } from "next";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import Tabs from "../components/Tabs";

const Home: NextPage = () => {
	const { isConnected } = useAccount();
	return (
		<Flex justify="center" alignItems="center" direction="column" gap={6}>
			<Heading
				bgGradient={[
					"linear(to-t, blue.200, teal.500)",
					"linear(to-b, orange.100, purple.300)",
				]}
				bgClip="text"
			>
				ENS-tar
			</Heading>
			<Tabs></Tabs>
		</Flex>
	);
};

export default Home;
