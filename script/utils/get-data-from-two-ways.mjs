export const getDataFromTwoWays = (dataArray) => {
	let str = "";

	dataArray.map((item) => {
		const binaryString = atob(item);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}

		str += msgpack.decode(bytes);
	});

	return str;
};