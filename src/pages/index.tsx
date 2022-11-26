import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const Welcome = dynamic(() => import("../components/welcome"), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tally Up</title>
        <meta name="description" content="Round-based scoring app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="container mx-auto flex dark:text-white">
          <Welcome />
        </main>
      </div>
    </>
  );
};

export default Home;
