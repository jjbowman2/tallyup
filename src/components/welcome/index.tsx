import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
const showWelcomeAtom = atomWithStorage("show-welcome", true);

export default function Welcome() {
  const [showWelcome, setShowWelcome] = useAtom(showWelcomeAtom);
  if (!showWelcome) return null;
  return (
    <div className="flex justify-between rounded bg-black/10 p-4">
      <p>
        Welcome to <i>Tally Up</i> the round based scoring app: the easiest way
        to track whose kicking whose butt!
      </p>
      <button onClick={() => setShowWelcome(false)}>Dismiss</button>
    </div>
  );
}
