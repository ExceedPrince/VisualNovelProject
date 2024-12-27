/*
const HAILEY_DATA = {
    REQ_ENDING_VALUE: 7,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 37,
};
*/
export const haileyCriterias = (hailey_data, slotNumber, haileyCorrectChoices, reinaCorrectChoices, briannaCorrectChoices, daenaCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices < 7 &&
    daenaCorrectChoices < 7 &&
    briannaCorrectChoices < 7 &&
    haileyCorrectChoices === hailey_data.REQ_ENDING_VALUE