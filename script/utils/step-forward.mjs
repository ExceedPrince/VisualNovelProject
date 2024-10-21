export const stepForward = (stepObject, gameSettings) => {
	if (stepObject.stepSkip) {
		const slotNumber = +localStorage.getItem('slotNumber') || 0;
		const [character, location, choiceId] = stepObject.choicePath.split('~');
		const choiceOrderNumber = +gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId].replace('option_', '');
		
		return 1 + stepObject.stepSkip[choiceOrderNumber];
	} else {
		return 1;
	}
};