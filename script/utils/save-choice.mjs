export const saveChoice = (gameSettings, choice, answer, sceneId, stepId) => {
	const slotNumber = +localStorage.getItem('slotNumber') || 0;
	gameSettings.savingSlots[slotNumber].decisions[choice.character][choice.location][`${sceneId}-${stepId}`] = answer;
}