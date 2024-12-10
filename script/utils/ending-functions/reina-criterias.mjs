/* const REINA_DATA = {
    REQ_ENDING_VALUE: 2,
    CRITICAL_CHOICES: {
        critical_1: ['0003-3', true]
    },
    PERSONAL_SCENE_NUM: 12,
}; */

export const reinaCriterias = (reina_data, slotNumber, reinaCorrectChoices, daenaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices === reina_data.REQ_ENDING_VALUE &&
    (daenaCorrectChoices < 1 || haileyCorrectChoices < 1) &&
    gameSettings.savingSlots[slotNumber].decisions.reina.importants[reina_data.CRITICAL_CHOICES.critical_1[0]] === solutionKey.reina.importants[reina_data.CRITICAL_CHOICES.critical_1[0]];
