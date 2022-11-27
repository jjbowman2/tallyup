import { PencilIcon } from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import { useState } from "react";
import SuperJSON from "superjson";
import type { GameType } from "../current-game";
import { gameAtom, tryParseGame } from "../current-game";

export default function EditPointsToWinModal() {
	const [gameJson, setGameJson] = useAtom(gameAtom);
	const [open, setOpen] = useState(false);
	const game = tryParseGame(gameJson);
	const [pointsToWin, setPointsToWin] = useState(game?.pointsToWin ?? 0);
	if (!game) return null;

	const handleUpdatePointsToWin = () => {
		const updatedGame: GameType = { ...game, pointsToWin };
		setGameJson(SuperJSON.stringify(updatedGame));
		setOpen(false);
	};
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<div>
				<span className="text-lg font-semibold">Playing to:</span>
				<Dialog.Trigger asChild>
					<button className="ml-auto flex items-center gap-2 text-indigo-800 hover:text-indigo-900 active:scale-95 dark:text-indigo-400 dark:hover:text-indigo-300">
						<span className="text-lg">{game.pointsToWin}</span>
						<PencilIcon className="h-4 w-4" />
					</button>
				</Dialog.Trigger>
			</div>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/20 dark:bg-black/40" />
				<Dialog.Content className="fixed top-[25%] left-[50%] max-h-[85vh] w-[90vw] max-w-md -translate-x-[50%] -translate-y-[50%] transform rounded bg-white p-6 shadow focus:outline-none dark:bg-slate-600">
					<Dialog.Title className="tracking-wide text-indigo-800 dark:text-indigo-200">
						Edit Point to Win
					</Dialog.Title>
					<span className="mt-4 flex flex-col">
						<label
							htmlFor="pointsToWinInput"
							className="dark:text-white"
						>
							Points to Win
						</label>
						<input
							id="playerScoreInput"
							type="number"
							className="rounded"
							value={pointsToWin}
							onChange={(e) =>
								setPointsToWin(e.target.valueAsNumber)
							}
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
							onClick={handleUpdatePointsToWin}
						>
							Update Game
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
