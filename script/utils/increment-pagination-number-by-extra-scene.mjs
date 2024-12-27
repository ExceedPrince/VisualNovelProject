import { solutionKey } from "../constants/solution-key.mjs";

export const incrementPaginationNumberByExtraScene = (extraSceneObject, gameSettings) => {
	if (!extraSceneObject) {
		return null;
	}
	const slotNumber = +localStorage.getItem('slotNumber') || 0;

    const binaryString = atob(solutionKey);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedData = msgpack.decode(bytes);

	const solutions = decodedData;
	let numberOfGoodChoies = 0;

	extraSceneObject.choiceConditions.map((choice) => {
		const [character, location, choiceId] = choice.split('~');
		const correctChoice = solutions[character][location][choiceId];
		const selectedChoice = gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId];

		if (correctChoice === selectedChoice) {
			numberOfGoodChoies++;
		}
	});

	if (numberOfGoodChoies < extraSceneObject.minGoodAnswer) {
		return extraSceneObject.sceneSkipNumber;
	} else {
		return 0;
	}
};