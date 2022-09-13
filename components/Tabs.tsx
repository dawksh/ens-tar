import React, { useEffect, useState } from "react";
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs as TabContainer,
} from "@chakra-ui/react";
import NFTs from "./NFTs";
import { useAccount, useEnsName } from "wagmi";
import axios from "axios";

function Tabs({ nfts }: any) {
	return (
		<TabContainer variant="enclosed" colorScheme="green">
			<TabList>
				<Tab>Your NFTs</Tab>
				<Tab>Custom Avatar</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<NFTs nfts={nfts} />
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
			</TabPanels>
		</TabContainer>
	);
}

export default Tabs;
