export const decideComponentFromMultipleInMobile = (messageObject, component, gameSettings) => {
    if (typeof component === 'object' && component !== null) {
        const slotNumber = +localStorage.getItem('slotNumber') || 0;
        let character, location, choiceId;
    
        if (messageObject && messageObject.choicePath) {
            [character, location, choiceId] = messageObject.choicePath.split('~');
            
            const choiceOrderNumber = +gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId].replace('option_', '');
            return component[choiceOrderNumber];
        }
    } else {
        return component;
    }
};