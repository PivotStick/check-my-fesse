/**
 * @param {File} file
 */
export const fileToBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onerror = reject;
		reader.onload = () => {
			if (typeof reader.result === "string") {
				resolve(reader.result);
			} else {
				resolve("");
			}
		};
	});
