/* const HAREM_DATA = {
    REQ_ENDING_VALUE: {
        reina: 11,
        hailey: 5,
        daena: 5,
        brianna: 5,
    },
    CRITICAL_CHOICES: {
        hailey: {
            critical_1: ['0014-38', true],
            critical_2: ['0024-36', true],
        },
        daena: {
            critical_1: ['0018-36', true],
            critical_2: ['0024-36', true],
        },
        brianna: {
            critical_1: ['0014-38', true],
            critical_2: ['0018-36', true],
        },
    },
    PERSONAL_SCENE_NUM: 37,
}; */

export const haremCriterias = (harem_data, slotNumber, daenaCorrectChoices, haileyCorrectChoices, briannaCorrectChoices, reinaCorrectChoices, solutionKey, gameSettings) => 
    reinaCorrectChoices === harem_data.REQ_ENDING_VALUE.reina &&
    (haileyCorrectChoices === harem_data.REQ_ENDING_VALUE.hailey && (
        gameSettings.savingSlots[slotNumber].decisions.hailey.importants[harem_data.CRITICAL_CHOICES.hailey.critical_1[0]] !== solutionKey.hailey.importants[harem_data.CRITICAL_CHOICES.hailey.critical_1[0]] ||
        gameSettings.savingSlots[slotNumber].decisions.hailey.importants[harem_data.CRITICAL_CHOICES.hailey.critical_2[0]] !== solutionKey.hailey.importants[harem_data.CRITICAL_CHOICES.hailey.critical_2[0]]
    )) &&
    (daenaCorrectChoices === harem_data.REQ_ENDING_VALUE.daena && (
        gameSettings.savingSlots[slotNumber].decisions.daena.importants[harem_data.CRITICAL_CHOICES.daena.critical_1[0]] !== solutionKey.daena.importants[harem_data.CRITICAL_CHOICES.daena.critical_1[0]] ||
        gameSettings.savingSlots[slotNumber].decisions.daena.importants[harem_data.CRITICAL_CHOICES.daena.critical_2[0]] !== solutionKey.daena.importants[harem_data.CRITICAL_CHOICES.daena.critical_2[0]]
    )) &&
    (briannaCorrectChoices === harem_data.REQ_ENDING_VALUE.brianna && (
        gameSettings.savingSlots[slotNumber].decisions.brianna.importants[harem_data.CRITICAL_CHOICES.brianna.critical_1[0]] !== solutionKey.brianna.importants[harem_data.CRITICAL_CHOICES.brianna.critical_1[0]] ||
        gameSettings.savingSlots[slotNumber].decisions.brianna.importants[harem_data.CRITICAL_CHOICES.brianna.critical_2[0]] !== solutionKey.brianna.importants[harem_data.CRITICAL_CHOICES.brianna.critical_2[0]]
    ))