import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const WelcomePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Welcome to Tally Up</title>
				<meta name="description" content="Round-based scoring app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<section className="container mx-auto flex h-[calc(100vh-60.5px)] items-center dark:text-white">
					<div className="mx-auto flex max-w-lg flex-col rounded p-4">
						<p className="text-2xl">
							Welcome to <i>Tally Up</i>, the round based scoring
							app: the easiest way to track who&apos;s kicking
							whose butt!
						</p>
						<Link
							href="/new-game"
							className="self-center rounded bg-indigo-800 px-6 py-1 text-lg text-white hover:bg-indigo-900 dark:bg-indigo-400 dark:hover:bg-indigo-300"
						>
							Get Started
						</Link>
					</div>
				</section>
			</div>
		</>
	);
};

export default WelcomePage;
