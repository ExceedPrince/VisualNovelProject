/*
const DAENA_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 12,
};
*/
export const daenaCriterias = (daena_data, slotNumber, daenaCorrectChoices, reinaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices < 2 &&
    haileyCorrectChoices < 1 &&
    daenaCorrectChoices === daena_data.REQ_ENDING_VALUE