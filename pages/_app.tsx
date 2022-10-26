import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultWallets,
	RainbowKitProvider,
	midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/public";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource/inter/800.css";
import "@fontsource/inter/400.css";
import Script from "next/script";

export const theme = extendTheme({
	initialColorMode: "dark",
	useSystemColorMode: false,
	fonts: {
		heading: `'Inter', sans-serif`,
		body: `'Inter', sans-serif`,
	},
});

const { chains, provider } = configureChains(
	[chain.mainnet],
	[alchemyProvider({
		apiKey: process.env.NEXT_PUBLIC_ALCHEMY
	})]
);

const { connectors } = getDefaultWallets({
	appName: "ENS-tar",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<Script
				async
				defer
				data-website-id={process.env.NEXT_PUBLIC_TRACKING_ID}
				src="https://analytics.metapasshq.xyz/umami.js"
			></Script>
			<RainbowKitProvider
				chains={chains}
				theme={midnightTheme({
					accentColor: "#7b3fe4",
					accentColorForeground: "white",
					borderRadius: "medium",
					fontStack: "system",
					overlayBlur: "small",
				})}
				coolMode
			>
				<ChakraProvider theme={theme}>
					<Navbar />
					<Component {...pageProps} />
				</ChakraProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
