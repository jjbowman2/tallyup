import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import SuperJSON from "superjson";
import type { GameType } from "../current-game";
import { gameAtom } from "../current-game";

export default function NewGameForm() {
	const router = useRouter();
	const [, setGame] = useAtom(gameAtom);
	const [players, setPlayers] = useState<string[]>([]);
	const [pointsToWin, setPointsToWin] = useState(50);
	const [currentPlayerInput, setCurrentPlayerInput] = useState("");
	const addNewPlayer = () => {
		// handle empty input error message, or duplicates
		if (
			currentPlayerInput &&
			!players.find((p) => p == currentPlayerInput)
		) {
			setPlayers((players) => [...players, currentPlayerInput]);
			setCurrentPlayerInput("");
		}
	};
	const handleCreateNewGame = () => {
		const allPlayers = [...players, currentPlayerInput].filter(Boolean);
		if (!pointsToWin || allPlayers.length == 0) {
			// handle errors
			return;
		}
		const scores = new Map<string, number>();
		allPlayers.forEach((player) => scores.set(player, 0));
		const game: GameType = {
			pointsToWin,
			scores,
		};
		setGame(SuperJSON.stringify(game));
		router.push("/");
	};
	return (
		<div className="mx-auto max-w-lg">
			<h2 className="text-3xl tracking-wider text-indigo-900 dark:text-indigo-300">
				Setup a new game
			</h2>
			<span className="mt-4 flex flex-col">
				<label
					htmlFor="numberOfPointsToWinInput"
					className="dark:text-white"
				>
					How many points do you need to win?
				</label>
				<input
					id="numberOfPointsToWinInput"
					type="number"
					className="rounded"
					value={pointsToWin}
					onChange={(e) => setPointsToWin(e.target.valueAsNumber)}
				/>
			</span>

			<span className="my-4 flex flex-col">
				<label htmlFor="currentPlayerInput" className="dark:text-white">
					Add a player
				</label>
				<span className="relative">
					<input
						id="currentPlayerInput"
						type="text"
						className="w-full rounded"
						value={currentPlayerInput}
						onChange={(e) => setCurrentPlayerInput(e.target.value)}
						onKeyUp={(e) => {
							if (e.key == "Enter") {
								addNewPlayer();
							}
						}}
					/>
					<button
						type="button"
						onClick={addNewPlayer}
						className="absolute bottom-0 right-4 top-0"
					>
						<PlusIcon className="h-8 w-8 text-indigo-800 hover:text-indigo-900 active:scale-95 dark:text-indigo-400 hover:dark:text-indigo-300" />
					</button>
				</span>
			</span>
			{players.length ? <h3 className="dark:text-white">Players</h3> : ""}
			{players.map((player, index) => (
				<span key={index} className="relative mb-4 flex">
					<input
						type="text"
						className="w-full rounded"
						value={player}
						onChange={(e) =>
							setPlayers((p) =>
								p.map((v, i) =>
									index == i ? e.target.value : v
								)
							)
						}
					/>
					<button
						type="button"
						onClick={() =>
							setPlayers(players.filter((_v, i) => index != i))
						}
						className="absolute bottom-0 right-4 top-0"
					>
						<XMarkIcon className="h-8 w-8 text-indigo-800 hover:text-indigo-900 active:scale-95 dark:text-indigo-400 hover:dark:text-indigo-300" />
					</button>
				</span>
			))}
			<button
				className="ml-auto block rounded bg-indigo-800 px-6 py-1 text-lg text-white hover:bg-indigo-900 dark:bg-indigo-400 dark:hover:bg-indigo-300"
				onClick={handleCreateNewGame}
			>
				Start Game
			</button>
		</div>
	);
}
