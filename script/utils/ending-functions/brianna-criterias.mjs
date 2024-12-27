/*
const BRIANNA_DATA = {
    REQ_ENDING_VALUE: 7,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 37,
};
*/
export const briannaCriterias = (brianna_data, slotNumber, briannaCorrectChoices, reinaCorrectChoices, haileyCorrectChoices, daenaCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices < 7 &&
    haileyCorrectChoices < 7 &&
    daenaCorrectChoices < 7 &&
    briannaCorrectChoices === brianna_data.REQ_ENDING_VALUE