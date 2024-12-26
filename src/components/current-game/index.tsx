import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import SuperJSON from "superjson";
import { z } from "zod";
import EditPlayerModal from "../edit-player-modal";
import EditPointsToWinModal from "../edit-points-to-win-modal";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

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
	const [gameJson, setGameJson] = useAtom(gameAtom);
	const [resetDialogOpen, setResetDialogOpen] = useState(false);
	const router = useRouter();

	const game = tryParseGame(gameJson);
	if (!game) {
		router.push("/welcome");
		return null;
	}
	const winningPlayer = [...game.scores.keys()].find(
		(player) => (game.scores.get(player) ?? 0) >= game.pointsToWin
	);

	const handleResetGame = () => {
		const updatedGame: GameType = {
			pointsToWin: game.pointsToWin,
			scores: new Map(
				[...game.scores.keys()].map((player) => [player, 0])
			),
		};
		setGameJson(SuperJSON.stringify(updatedGame));
		setResetDialogOpen(false);
	};

	return (
		<>
			<div className="mx-auto max-w-xl px-4">
				<div className="mb-8 flex w-full items-start justify-between">
					<h2 className="text-3xl tracking-wider text-indigo-900 dark:text-indigo-300">
						Current Score
					</h2>
					<EditPointsToWinModal />
				</div>
				{[...game.scores.keys()]
					.sort(
						(p1, p2) =>
							(game.scores.get(p2) ?? 0) -
							(game.scores.get(p1) ?? 0)
					)
					.map((player) => (
						<EditPlayerModal
							key={player}
							player={{
								name: player,
								score: game.scores.get(player) ?? 0,
							}}
						/>
					))}
				{winningPlayer ? (
					<div className="text-center text-2xl text-indigo-800 dark:text-indigo-300">
						{winningPlayer} has won!
					</div>
				) : (
					""
				)}
				<div className="mt-8 flex flex-col-reverse lg:flex-row lg:justify-end lg:gap-8">
					<Dialog.Root
						open={resetDialogOpen}
						onOpenChange={setResetDialogOpen}
					>
						<Dialog.Trigger asChild>
							<button className="my-3 block w-full rounded py-2 text-center text-xl text-red-600 hover:text-red-700 lg:w-fit lg:px-3 dark:text-red-400 hover:dark:text-red-300">
								Reset Game
							</button>
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Overlay className="fixed inset-0 bg-black/20 dark:bg-black/40" />
							<Dialog.Content className="fixed left-[50%] top-[25%] max-h-[85vh] w-[90vw] max-w-md -translate-x-[50%] -translate-y-[50%] transform rounded bg-white p-6 shadow focus:outline-none dark:bg-slate-600">
								<Dialog.Title className="tracking-wide text-indigo-800 dark:text-indigo-200">
									Reset Game
								</Dialog.Title>
								<p className="mt-4 text-gray-600 dark:text-gray-200">
									This will reset all players&apos; scores to
									0. This action cannot be undone.
								</p>
								<div className="flex justify-end gap-4">
									<Dialog.Close asChild>
										<button className="my-3 w-fit rounded px-3 py-2 text-indigo-800 hover:text-indigo-900 dark:text-indigo-200 hover:dark:text-indigo-100">
											Cancel
										</button>
									</Dialog.Close>
									<button
										className="my-3 w-fit rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
										onClick={handleResetGame}
									>
										Reset Scores
									</button>
								</div>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
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
						className="my-3 block w-full rounded py-2 text-center text-xl text-indigo-800 hover:text-indigo-900 lg:w-fit lg:px-3 dark:text-indigo-400 hover:dark:text-indigo-300"
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
		</>
	);
}
