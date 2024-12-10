/*
const HAILEY_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 12,
};
*/
export const haileyCriterias = (hailey_data, slotNumber, haileyCorrectChoices, reinaCorrectChoices, daenaCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices < 2 &&
    daenaCorrectChoices < 1 &&
    haileyCorrectChoices === hailey_data.REQ_ENDING_VALUE