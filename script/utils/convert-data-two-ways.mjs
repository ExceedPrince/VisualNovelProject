export const convertDataTwoWays = (data) => {
	const stringedData = JSON.stringify(data);
	const cutPoint = Math.floor(stringedData.length / 2);
	const firstHalf = stringedData.substring(0, cutPoint);
	const secondHalf = stringedData.substring(cutPoint, stringedData.length);

	const encodedFirstData = msgpack.encode(firstHalf);
	const encodedSecondData = msgpack.encode(secondHalf);

	const finalEncoded1 = btoa(String.fromCharCode.apply(null, encodedFirstData));
	const finalEncoded2 = btoa(String.fromCharCode.apply(null, encodedSecondData));

	return [finalEncoded1, finalEncoded2];
};