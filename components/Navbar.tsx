import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex } from "@chakra-ui/react";

function Navbar() {
	return (
		<Flex p={6} justify="center" alignItems="center">
			<ConnectButton />
		</Flex>
	);
}

export default Navbar;
