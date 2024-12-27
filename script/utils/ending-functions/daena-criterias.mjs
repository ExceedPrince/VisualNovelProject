/*
const DAENA_DATA = {
    REQ_ENDING_VALUE: 7,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 37
};
*/
export const daenaCriterias = (daena_data, slotNumber, daenaCorrectChoices, reinaCorrectChoices, briannaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices < 11 &&
    briannaCorrectChoices < 7 &&
    haileyCorrectChoices < 7 &&
    daenaCorrectChoices === daena_data.REQ_ENDING_VALUE