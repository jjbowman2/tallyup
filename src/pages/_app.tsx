import { Jost } from "@next/font/google";
import { type AppType } from "next/dist/shared/lib/utils";

import Header from "../components/header";
import "../styles/globals.css";

const jost = Jost({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<main
			className={
				jost.className +
				" min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-slate-700 dark:to-gray-600"
			}
		>
			<Header />
			<Component {...pageProps} />
		</main>
	);
};

export default MyApp;
