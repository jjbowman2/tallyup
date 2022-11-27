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
				<section className="container mx-auto flex dark:text-white">
					<div className="mx-auto max-w-lg rounded p-4">
						<p className="text-2xl">
							Welcome to{" "}
							<span className="bg-gradient-to-r from-indigo-800 to-fuchsia-500 bg-clip-text font-bold text-transparent dark:from-indigo-500 dark:to-fuchsia-500">
								Tally Up
							</span>
							, the round based scoring app: the easiest way to
							track who&apos;s kicking whose butt!
						</p>
						<Link
							href="/new-game"
							className="ml-auto mt-4 block w-fit rounded bg-indigo-800 px-6 py-1 text-lg text-white hover:bg-indigo-900 dark:bg-indigo-400 dark:hover:bg-indigo-300"
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
