
/* const LINDSAY_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: {
        critical_1: ['0003-3', true]
    },
    PERSONAL_SCENE_NUM: 11,
    DECLINED_SCENE_NUM: 11,
}; */

export const lindsayCriterias = (lindsay_data, slotNumber, correctChoices, solutionKey, gameSettings) => 
    correctChoices === lindsay_data.REQ_ENDING_VALUE &&
    gameSettings.savingSlots[slotNumber].decisions.lindsay.importants[lindsay_data.CRITICAL_CHOICES.critical_1[0]] === solutionKey.lindsay.importants[lindsay_data.CRITICAL_CHOICES.critical_1[0]];
