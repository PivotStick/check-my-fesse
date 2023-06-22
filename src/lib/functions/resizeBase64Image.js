/**
 * @param {string} base64
 */
export const resizeBase64Image = (base64, MAX_WIDTH = 125, MAX_HEIGHT = 125) =>
	new Promise((resolve, reject) => {
		const image = new Image();

		image.src = base64;
		image.onload = () => {
			const canvas = document.createElement("canvas");

			let width = image.width;
			let height = image.height;

			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}

			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext("2d");

			ctx?.drawImage(image, 0, 0, width, height);

			resolve(canvas.toDataURL());
		};

		image.onerror = reject;
	});
