import * as Dialog from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import { useState } from "react";
import SuperJSON from "superjson";
import type { GameType, Player } from "../current-game";
import { gameAtom, tryParseGame } from "../current-game";

type EditPlayerModalProps = {
	player: Player;
};

export default function EditPlayerModal({ player }: EditPlayerModalProps) {
	const [gameJson, setGameJson] = useAtom(gameAtom);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(player.name);
	const [score, setScore] = useState(player.score);

	const game = tryParseGame(gameJson);
	if (!game) return null;

	const handleUpdatePlayer = () => {
		const updatedScore = new Map(game.scores);
		updatedScore.delete(player.name);
		updatedScore.set(name, score);
		const updatedGame: GameType = { ...game, scores: updatedScore };
		setGameJson(SuperJSON.stringify(updatedGame));
		setOpen(false);
	};
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button className="mb-2 flex w-full justify-between text-xl hover:text-gray-700 dark:hover:text-gray-300">
					<p>{player.name}</p>
					<p
						className={
							player?.score >= game.pointsToWin
								? "text-green-500 dark:text-green-600"
								: ""
						}
					>
						{player.score}
					</p>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/20 dark:bg-black/40" />
				<Dialog.Content className="fixed top-[25%] left-[50%] max-h-[85vh] w-[90vw] max-w-md -translate-x-[50%] -translate-y-[50%] transform rounded bg-white p-6 shadow focus:outline-none dark:bg-slate-600">
					<Dialog.Title className="tracking-wide text-indigo-800 dark:text-indigo-200">
						Edit Player
					</Dialog.Title>
					<span className="mt-4 flex flex-col">
						<label
							htmlFor="playerNameInput"
							className="dark:text-white"
						>
							Name
						</label>
						<input
							id="playerNameInput"
							type="text"
							className="rounded"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</span>
					<span className="mt-4 flex flex-col">
						<label
							htmlFor="playerScoreInput"
							className="dark:text-white"
						>
							Score
						</label>
						<input
							id="playerScoreInput"
							type="number"
							className="rounded"
							value={score}
							onChange={(e) => setScore(e.target.valueAsNumber)}
						/>
					</span>
					<div className="flex justify-end gap-4">
						<Dialog.Close asChild>
							<button className="my-3 w-fit rounded py-2 px-3 text-indigo-800 hover:text-indigo-900 dark:text-indigo-200 hover:dark:text-indigo-100">
								Cancel
							</button>
						</Dialog.Close>
						<button
							className="my-3 w-fit rounded bg-indigo-800 py-2 px-3 text-white hover:bg-indigo-900 dark:bg-indigo-400 hover:dark:bg-indigo-300"
							onClick={handleUpdatePlayer}
						>
							Update Player
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
