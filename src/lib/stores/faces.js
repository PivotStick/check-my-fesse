import { writable } from "svelte/store";
import { v4 } from "uuid";

const KEY = `_RATE_MY_FESSE_DATA_01`;

let i = 0;
while (true) {
	const key = localStorage.key(i++);

	if (key === null) break;

	if (key !== KEY) {
		localStorage.removeItem(key);
	}
}

const makeFaces = () => {
	const { subscribe, set, update } = writable(
		/** @type {FaceItem[]} */ (JSON.parse(localStorage.getItem(KEY) || "[]"))
	);

	subscribe((v) => {
		localStorage.setItem(KEY, JSON.stringify(v));
	});

	const add = () => {
		update((faces) => {
			faces.unshift({
				id: v4(),
				image: "",
				name: "",
				rating: 0,
				tags: [""]
			});

			return faces;
		});
	};

	const sort = (dir = 1) => {
		update((faces) => faces.sort((a, b) => (a.rating - b.rating) * dir));
	};

	return { subscribe, set, add, sort };
};

export const faces = makeFaces();
