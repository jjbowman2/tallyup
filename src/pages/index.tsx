import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const CurrentGame = dynamic(() => import("../components/current-game"), {
	ssr: false,
});
const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Tally Up</title>
				<meta name="description" content="Round-based scoring app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<section className="container mx-auto w-full dark:text-white">
					<CurrentGame />
				</section>
			</div>
		</>
	);
};

export default Home;
