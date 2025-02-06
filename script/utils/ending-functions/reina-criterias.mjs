/* const REINA_DATA = {
    REQ_ENDING_VALUE: 11,
    CRITICAL_CHOICES: {
        critical_1: ['0011-40', true],
        critical_2: ['0017-46', true],
        critical_3: ['0023-44', true],
    },
    PERSONAL_SCENE_NUM: 37,
}; */

export const reinaCriterias = (reina_data, slotNumber, reinaCorrectChoices, daenaCorrectChoices, briannaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) => 
    (reinaCorrectChoices === reina_data.REQ_ENDING_VALUE &&
        (daenaCorrectChoices === 5 && briannaCorrectChoices === 5 && haileyCorrectChoices === 5) === false) ||
    (reinaCorrectChoices === reina_data.REQ_ENDING_VALUE - 1 &&
        (gameSettings.savingSlots[slotNumber].decisions.reina.importants[reina_data.CRITICAL_CHOICES.critical_1[0]] === solutionKey.reina.importants[reina_data.CRITICAL_CHOICES.critical_1[0]] &&
        gameSettings.savingSlots[slotNumber].decisions.reina.importants[reina_data.CRITICAL_CHOICES.critical_2[0]] === solutionKey.reina.importants[reina_data.CRITICAL_CHOICES.critical_2[0]] &&
        gameSettings.savingSlots[slotNumber].decisions.reina.importants[reina_data.CRITICAL_CHOICES.critical_3[0]] === solutionKey.reina.importants[reina_data.CRITICAL_CHOICES.critical_3[0]])) ||
    (reinaCorrectChoices >= reina_data.REQ_ENDING_VALUE - 3 &&
        (gameSettings.savingSlots[slotNumber].decisions.reina.importants[reina_data.CRITICAL_CHOICES.critical_1[0]] === solutionKey.reina.importants[reina_data.CRITICAL_CHOICES.critical_1[0]] &&
        gameSettings.savingSlots[slotNumber].decisions.reina.importants[reina_data.CRITICAL_CHOICES.critical_2[0]] === solutionKey.reina.importants[reina_data.CRITICAL_CHOICES.critical_2[0]] &&
        gameSettings.savingSlots[slotNumber].decisions.reina.importants[reina_data.CRITICAL_CHOICES.critical_3[0]] === solutionKey.reina.importants[reina_data.CRITICAL_CHOICES.critical_3[0]] &&
        daenaCorrectChoices + briannaCorrectChoices + haileyCorrectChoices <= 12));
