import React from "react";
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs as TabContainer,
} from "@chakra-ui/react";

function Tabs() {
	return (
		<TabContainer variant="enclosed" colorScheme="green">
			<TabList>
				<Tab>Your NFTs</Tab>
				<Tab>Custom Avatar</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<p>one!</p>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
			</TabPanels>
		</TabContainer>
	);
}

export default Tabs;
