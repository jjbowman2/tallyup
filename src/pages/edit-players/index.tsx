import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const EditPlayers = dynamic(() => import("../../components/edit-players"), {
	ssr: false,
});

const EditPlayersPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Tally Up</title>
				<meta name="description" content="Round-based scoring app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<section className="container mx-auto px-2 py-4">
					<EditPlayers />
				</section>
			</div>
		</>
	);
};

export default EditPlayersPage;
