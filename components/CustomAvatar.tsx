import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import {
	useAccount,
	useEnsAddress,
	useEnsAvatar,
	useEnsName,
	useSigner,
} from "wagmi";
import ImagePlaceholder from "./ImagePlaceholder";
import resolverConfig from "../config.json";
import { uploadFromFile } from "../utils/ipfs";

function CustomAvatar() {
	const [image, setImage] = useState<string>();
	const { address } = useAccount();
	const { data } = useEnsName({ address });
	const { data: avatar } = useEnsAvatar({ addressOrName: address });
	const { data: resolverAddress } = useEnsAddress({ name: "resolver.eth" });
	const { data: signer } = useSigner();

	const updateAvatar = async () => {
		const contract = new ethers.Contract(
			resolverAddress as string,
			resolverConfig.abi,
			signer as any
		);
		const ipfsURL = await uploadFromFile(image as string);
		const nameHash = ethers.utils.namehash(data as string);
		let txn;
		try {
			txn = await contract.setText(nameHash, "avatar", ipfsURL);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Flex direction={"column"} justify="center" alignItems="center" gap={5}>
			<ImagePlaceholder
				image={image as string}
				avatar={avatar as string}
				ensName={data as string}
			/>
			<Input
				placeholder="Image Link"
				type="url"
				onChange={(e) => setImage(e.target.value)}
				w={"60%"}
			/>
			<Button onClick={updateAvatar}>Update Avatar</Button>
		</Flex>
	);
}

export default CustomAvatar;
