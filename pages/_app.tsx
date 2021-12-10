import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import ReactGA from "react-ga";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>The Best Top</title>
				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
				/>
				<meta property="og:locale" content={"ru_RU"} />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
