import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useRouter } from "next/router";
import SuperJSON from "superjson";
import { z } from "zod";

export const GameTypeSchema = z.object({
	pointsToWin: z.number(),
	scores: z.map(z.string(), z.number()),
});

export type GameType = z.infer<typeof GameTypeSchema>;

export const gameAtom = atomWithStorage<string | null>("current-game", null);

const tryParseGame = (gameJson: string): GameType | null => {
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
	const router = useRouter();
	if (gameJson === null) {
		router.push("/welcome");
		return null;
	}

	const game = tryParseGame(gameJson);
	if (!game) {
		setGameJson(null);
		return null;
	}

	return (
		<>
			<div>
				<main className="container mx-auto dark:text-white">
					<p>{game.pointsToWin}</p>
					{[...game.scores.keys()].map((player) => (
						<div key={player}>
							{player}: {game.scores.get(player)}
						</div>
					))}
				</main>
			</div>
		</>
	);
}
