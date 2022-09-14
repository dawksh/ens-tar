// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address } = req.query;
	let { data } = await axios.get(
		`https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY}/getNFTs/?owner=${address}`
	);
	res.status(200).send({ data });
}
