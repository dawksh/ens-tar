import React, { useEffect, useState } from "react";
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs as TabContainer,
} from "@chakra-ui/react";
import NFTs from "./NFTs";
import CustomAvatar from "./CustomAvatar";

function Tabs({ nfts }: any) {
	return (
		<TabContainer variant="enclosed" colorScheme="green" w={"60%"}>
			<TabList>
				<Tab>Your NFTs</Tab>
				<Tab>Custom Avatar</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<NFTs nfts={nfts} />
				</TabPanel>
				<TabPanel>
					<CustomAvatar />
				</TabPanel>
			</TabPanels>
		</TabContainer>
	);
}

export default Tabs;
