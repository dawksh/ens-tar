import { create, urlSource } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_SECRET;
const auth =
	"Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const ipfs = create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

export const uploadFromFile = async (fileURL: string): Promise<string> => {
	let { cid } = await ipfs.add(urlSource(fileURL));
	await ipfs.pin.add(cid);
	return `https://ipfs.io/ipfs/${cid.toString()}`;
};
