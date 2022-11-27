import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SuperJSON from "superjson";
import type { GameType } from "../current-game";
import { gameAtom, tryParseGame } from "../current-game";

export default function EditPlayers() {
	const router = useRouter();
	const [gameJson, setGameJson] = useAtom(gameAtom);
	const [currentPlayerInput, setCurrentPlayerInput] = useState("");
	const game = tryParseGame(gameJson);
	const [players, setPlayers] = useState<string[]>([
		...(game?.scores?.keys() ?? []),
	]);

	if (!game) {
		router.push("/welcome");
		return null;
	}

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
	const handleUpdatePlayers = () => {
		if (players.length == 0) {
			// handle errors
			return;
		}
		const scores = new Map();
		players.forEach((player) =>
			scores.set(player, game.scores.get(player) ?? 0)
		);
		const updatedGame: GameType = {
			...game,
			scores,
		};
		setGameJson(SuperJSON.stringify(updatedGame));
		router.push("/");
	};

	return (
		<div className="mx-auto max-w-lg">
			<h2 className="text-3xl tracking-wider text-indigo-900 dark:text-indigo-300">
				Add/Remove Players
			</h2>

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
						className="absolute right-4 top-0 bottom-0"
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
						className="absolute right-4 top-0 bottom-0"
					>
						<XMarkIcon className="h-8 w-8 text-indigo-800 hover:text-indigo-900 active:scale-95 dark:text-indigo-400 hover:dark:text-indigo-300" />
					</button>
				</span>
			))}
			<div className="mt-8 flex w-full flex-col-reverse lg:flex-row lg:justify-end lg:gap-8">
				<Link
					className="my-3 block w-full rounded py-2 text-center text-xl text-indigo-800 hover:text-indigo-900 dark:text-indigo-400 hover:dark:text-indigo-300 lg:w-fit lg:px-3"
					href="/"
				>
					Cancel
				</Link>
				<button
					className="my-3 w-full rounded bg-indigo-800 py-2 text-xl text-white hover:bg-indigo-900 dark:bg-indigo-400 hover:dark:bg-indigo-300 lg:w-fit lg:px-3"
					onClick={handleUpdatePlayers}
				>
					Update Players
				</button>
			</div>
		</div>
	);
}
