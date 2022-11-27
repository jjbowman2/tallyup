import { PencilIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SuperJSON from "superjson";
import { z } from "zod";

export const GameTypeSchema = z.object({
	pointsToWin: z.number(),
	scores: z.map(z.string(), z.number()),
});

export type GameType = z.infer<typeof GameTypeSchema>;

export type Player = {
	name: string;
	score: number;
};

export const gameAtom = atomWithStorage<string | null>("current-game", null);

export const tryParseGame = (gameJson: string | null): GameType | null => {
	if (!gameJson) return null;

	let superjsonParse;
	try {
		superjsonParse = SuperJSON.parse(gameJson);
	} catch (e) {
		console.error(e);
		return null;
	}

	const gameResult = GameTypeSchema.safeParse(superjsonParse);
	if (!gameResult.success) {
		console.error(gameResult.error);
		return null;
	}
	return gameResult.data;
};

export default function CurrentGame() {
	const [gameJson] = useAtom(gameAtom);
	const router = useRouter();
	const [selectedPlayer, setSelectedPlayer] = useState<Player>();

	const game = tryParseGame(gameJson);
	if (!game) {
		router.push("/welcome");
		return null;
	}
	const winningPlayer = [...game.scores.keys()].find(
		(player) => game.scores.get(player)! >= game.pointsToWin
	);

	return (
		<>
			<div className="mx-auto max-w-xl px-4">
				<div className="mb-8 flex w-full items-start justify-between">
					<h2 className="text-3xl tracking-wider text-indigo-900 dark:text-indigo-300">
						Current Score
					</h2>
					<div>
						<span className="text-lg font-semibold">
							Playing to:
						</span>
						<button className="ml-auto flex items-center gap-2 text-indigo-800 hover:text-indigo-900 active:scale-95 dark:text-indigo-400 dark:hover:text-indigo-300">
							<span className="text-lg">{game.pointsToWin}</span>
							<PencilIcon className="h-4 w-4" />
						</button>
					</div>
				</div>
				{[...game.scores.keys()]
					.sort(
						(p1, p2) =>
							(game.scores.get(p2) ?? 0) -
							(game.scores.get(p1) ?? 0)
					)
					.map((player) => (
						<button
							key={player}
							className="mb-2 flex w-full justify-between text-xl hover:text-gray-700"
							onClick={() =>
								setSelectedPlayer({
									name: player,
									score: game.scores.get(player) ?? 0,
								})
							}
						>
							<p>{player}</p>
							<p
								className={
									(game.scores.get(player) ?? 0) >=
									game.pointsToWin
										? "text-green-500 dark:text-green-600"
										: ""
								}
							>
								{game.scores.get(player)}
							</p>
						</button>
					))}
				{winningPlayer ? (
					<div className="text-center text-2xl text-indigo-800 dark:text-indigo-300">
						{winningPlayer} has won!
					</div>
				) : (
					""
				)}
				<div className="mt-8 flex flex-col-reverse lg:flex-row lg:justify-end lg:gap-8">
					<Link
						className={
							"my-3 block w-full rounded py-2 text-center text-xl lg:w-fit lg:px-3" +
							(winningPlayer
								? " pointer-events-none cursor-not-allowed text-gray-500"
								: " text-indigo-800 hover:text-indigo-900 dark:text-indigo-400 hover:dark:text-indigo-300")
						}
						href="/edit-players"
					>
						Add/Remove Players
					</Link>
					<Link
						className="my-3 block w-full rounded py-2 text-center text-xl text-indigo-800 hover:text-indigo-900 dark:text-indigo-400 hover:dark:text-indigo-300 lg:w-fit lg:px-3"
						href="/new-game"
					>
						Start New Game
					</Link>
					<Link
						className={
							"my-3 block w-full rounded py-2 text-center text-xl  lg:w-fit lg:px-3" +
							(winningPlayer
								? " pointer-events-none cursor-not-allowed bg-gray-500 text-gray-400"
								: " bg-indigo-800 text-white hover:bg-indigo-900 dark:bg-indigo-400 hover:dark:bg-indigo-300")
						}
						href="/score-round"
					>
						Score New Round
					</Link>
				</div>
			</div>
			{/* <EditPlayerModal
				player={selectedPlayer}
				isOpen={!!selectedPlayer}
				onClose={() => setSelectedPlayer(undefined)}
				onSubmit={() => {}}
			/> */}
		</>
	);
}
