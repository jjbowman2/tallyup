import { type NextPage } from "next";
import Head from "next/head";
import NewGameForm from "../../components/new-game-form";

const NewGamePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Tally Up</title>
				<meta name="description" content="Round-based scoring app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<section className="container mx-auto px-2 py-4">
					<NewGameForm />
				</section>
			</div>
		</>
	);
};

export default NewGamePage;
