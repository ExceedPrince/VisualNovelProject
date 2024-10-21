import {choiceDataBase} from '../../constants/choice-database.mjs';

export const fillInMissedChoices = (gameSettings, mobilePartindex) => {
    const slotNumber = +localStorage.getItem('slotNumber') || 0;
    const mobileScene = mobilePartindex.toString().padStart(4, '0');

    const allSceneRelatedChoice = [];
    const arrayChoices = Object.entries(choiceDataBase);

    arrayChoices.forEach(([id, obj]) => {
        if (id.indexOf(mobileScene) > -1) {
            allSceneRelatedChoice.push([id, obj]);
        }
    });

    allSceneRelatedChoice.forEach(([id, obj]) => {
        const choiceStepsArr = Object.entries(obj);

        choiceStepsArr.forEach(([stepId, stepObj]) => {
            const choiceId = `${id}-${stepId}`;
            const thisChoice = gameSettings.savingSlots[slotNumber].decisions[stepObj.character][stepObj.location][choiceId];

            if (thisChoice === null) {
                gameSettings.savingSlots[slotNumber].decisions[stepObj.character][stepObj.location][choiceId] = 
                    stepObj.options[stepObj.options.length - 1].option;
            }
        });
    });

    return gameSettings;
};