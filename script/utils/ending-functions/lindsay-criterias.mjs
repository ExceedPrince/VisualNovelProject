
/* const LINDSAY_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: {
        critical_1: ['0012-41', true],
        critical_2: ['0029-43', true]
    },
    PERSONAL_SCENE_NUM: 31,
    DECLINED_SCENE_NUM: 31,
}; */

export const lindsayCriterias = (lindsay_data, slotNumber, correctChoices, solutionKey, gameSettings) => {
    if (correctChoices > lindsay_data.REQ_ENDING_VALUE) {
        return 1;
    }

    if (correctChoices === lindsay_data.REQ_ENDING_VALUE && 
        gameSettings.savingSlots[slotNumber].decisions.lindsay.importants[lindsay_data.CRITICAL_CHOICES.critical_2[0]] === solutionKey.lindsay.importants[lindsay_data.CRITICAL_CHOICES.critical_2[0]]
    ) {
        return 1;
    }

    if (correctChoices === lindsay_data.REQ_ENDING_VALUE && 
        gameSettings.savingSlots[slotNumber].decisions.lindsay.importants[lindsay_data.CRITICAL_CHOICES.critical_1[0]] === solutionKey.lindsay.importants[lindsay_data.CRITICAL_CHOICES.critical_1[0]]
    ) {
        return 0;
    }
};