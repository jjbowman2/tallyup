import { Dialog } from "@headlessui/react";
import type { Player } from "../current-game";

type EditPlayerModalProps = {
	player?: Player;
	isOpen: boolean;
	onSubmit: () => void;
	onClose: () => void;
};

export default function EditPlayerModal({
	player,
	isOpen,
	onSubmit,
	onClose,
}: EditPlayerModalProps) {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<Dialog.Panel>
				<Dialog.Title>Edit Player</Dialog.Title>
				{/* <Dialog.Description>
				This will permanently deactivate your account
			</Dialog.Description> */}

				<p>
					Are you sure you want to deactivate your account? All of
					your data will be permanently removed. This action cannot be
					undone.
				</p>

				<button onClick={onSubmit}>Update player</button>
				<button onClick={onClose}>Cancel</button>
			</Dialog.Panel>
		</Dialog>
	);
}
