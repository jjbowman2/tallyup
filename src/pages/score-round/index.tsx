import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const ScoreRound = dynamic(() => import("../../components/score-round"), {
	ssr: false,
});
const ScoreRoundPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Tally Up</title>
				<meta name="description" content="Round-based scoring app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<section className="container mx-auto w-full dark:text-white">
					<ScoreRound />
				</section>
			</div>
		</>
	);
};

export default ScoreRoundPage;
