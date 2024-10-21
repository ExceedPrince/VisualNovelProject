import { solutionKey } from '../constants/solution-key.mjs';

export const incrementPaginationNumberByExtraScene = (extraSceneObject, gameSettings) => {
	const slotNumber = +localStorage.getItem('slotNumber') || 0;
	const solutions = JSON.parse(atob(solutionKey));
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