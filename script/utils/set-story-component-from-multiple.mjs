export const setStoryComponentFromMultiple = (component, stepObject, gameSettings) => {
	if (typeof component === 'object' && component !== null) {
		const slotNumber = +localStorage.getItem('slotNumber') || 0; //ez majd játékindítás/kiválsztáskor mentődjön el localStorage-be
		let character, location, choiceId;

		if (stepObject && stepObject.choicePath) {
  			[character, location, choiceId] = stepObject.choicePath.split('~');
			
			const choiceOrderNumber = +gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId].replace('option_', '');
			return component[choiceOrderNumber];
		}
	} else {
		return component;
	}
};