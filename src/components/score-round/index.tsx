import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SuperJSON from "superjson";
import type { GameType } from "../current-game";
import { gameAtom, tryParseGame } from "../current-game";

export default function ScoreRound() {
	const [gameJson, setGameJson] = useAtom(gameAtom);
	const router = useRouter();
	const [scores, setScores] = useState<Map<string, number>>(new Map());
	const game = tryParseGame(gameJson);
	if (!game) {
		router.push("/welcome");
		return null;
	}

	const updateScore = (player: string, newScore: number) => {
		setScores((prevScores) => {
			const updatedScores = new Map(prevScores);
			updatedScores.set(player, newScore);
			return updatedScores;
		});
	};

	const handleSaveScores = () => {
		const updatedGame: GameType = { ...game };
		[...updatedGame.scores.keys()].forEach((player) => {
			const currentScore = updatedGame.scores.get(player) ?? 0;
			const newRoundScore = scores.get(player) ?? 0;
			updatedGame.scores.set(player, currentScore + newRoundScore);
		});
		const updatedGameJson = SuperJSON.stringify(updatedGame);
		setGameJson(updatedGameJson);
		router.push("/");
	};

	return (
		<div className="mx-auto max-w-xl px-4">
			<div className="mb-8 flex w-full flex-col items-start justify-between">
				<h2 className="w-full text-center text-3xl tracking-wider text-indigo-900 dark:text-indigo-300">
					Enter the scores for this round
				</h2>
				{[...game.scores.keys()].map((player) => {
					const currentScore = scores.get(player) ?? 0;
					return (
						<span key={player} className="mx-auto mt-4">
							<label htmlFor={`${player}ScoreInputField`}>
								{player}
							</label>
							<span className="flex gap-4">
								<button
									className="px-1 text-xl text-indigo-800 dark:text-indigo-400"
									tabIndex={1}
									onClick={() =>
										updateScore(player, currentScore - 10)
									}
								>
									-10
								</button>
								<button
									className="px-1 text-xl text-indigo-800 dark:text-indigo-400"
									tabIndex={1}
									onClick={() =>
										updateScore(player, currentScore - 5)
									}
								>
									-5
								</button>
								<button
									className="px-1 text-xl text-indigo-800 dark:text-indigo-400"
									tabIndex={1}
									onClick={() =>
										updateScore(player, currentScore - 1)
									}
								>
									-1
								</button>
								<input
									id={`${player}ScoreInputField`}
									className="w-16 rounded text-center dark:text-gray-800"
									type="number"
									value={currentScore}
									onChange={(e) =>
										updateScore(
											player,
											e.target.valueAsNumber
										)
									}
								/>
								<button
									className="px-1 text-xl text-indigo-800 dark:text-indigo-400"
									tabIndex={1}
									onClick={() =>
										updateScore(player, currentScore + 1)
									}
								>
									+1
								</button>
								<button
									className="px-1 text-xl text-indigo-800 dark:text-indigo-400"
									tabIndex={1}
									onClick={() =>
										updateScore(player, currentScore + 5)
									}
								>
									+5
								</button>
								<button
									className="px-1 text-xl text-indigo-800 dark:text-indigo-400"
									tabIndex={1}
									onClick={() =>
										updateScore(player, currentScore + 10)
									}
								>
									+10
								</button>
							</span>
						</span>
					);
				})}
				<div className="mt-8 flex w-full flex-col-reverse lg:flex-row lg:justify-end lg:gap-8">
					<Link
						className="my-3 block w-full rounded py-2 text-center text-xl text-indigo-800 hover:text-indigo-900 dark:text-indigo-400 hover:dark:text-indigo-300 lg:w-fit lg:px-3"
						href="/"
					>
						Cancel
					</Link>
					<button
						className="my-3 w-full rounded bg-indigo-800 py-2 text-xl text-white hover:bg-indigo-900 dark:bg-indigo-400 hover:dark:bg-indigo-300 lg:w-fit lg:px-3"
						onClick={handleSaveScores}
					>
						Save Scores
					</button>
				</div>
			</div>
		</div>
	);
}
