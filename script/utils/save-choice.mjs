export const saveChoice = (gameSettings, choice, answer, sceneId, stepId) => {
	const slotNumber = +localStorage.getItem('slotNumber') || 0;

	if (choice.character.indexOf('%') > 0) {
		gameSettings.savingSlots[slotNumber].decisions[choice.character.split('%')[0]][choice.location][`${sceneId}-${stepId}`] = answer;
		gameSettings.savingSlots[slotNumber].decisions[choice.character.split('%')[1]][choice.location][`${sceneId}-${stepId}`] = answer;
	} else {
		gameSettings.savingSlots[slotNumber].decisions[choice.character][choice.location][`${sceneId}-${stepId}`] = answer;
	}
}