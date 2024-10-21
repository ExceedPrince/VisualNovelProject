export const stepBackward = (stepObject, gameSettings) => {
	if (stepObject.backStepSkip) {
		const slotNumber = +localStorage.getItem('slotNumber') || 0;
		const [character, location, choiceId] = stepObject.choicePath.split('~');
		const choiceOrderNumber = +gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId].replace('option_', '');
		
		return 1 + stepObject.backStepSkip[choiceOrderNumber];
	} else {
		return 1;
	}
};