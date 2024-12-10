/* const HAREM_DATA = {
    REQ_ENDING_VALUE: {
        reina: 2,
        hailey: 1,
        daena: 1
    },
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 12,
}; */

export const haremCriterias = (harem_data, slotNumber, daenaCorrectChoices, haileyCorrectChoices, reinaCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices === harem_data.REQ_ENDING_VALUE.reina &&
    haileyCorrectChoices === harem_data.REQ_ENDING_VALUE.hailey &&
    daenaCorrectChoices === harem_data.REQ_ENDING_VALUE.daena