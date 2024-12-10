import { brianna_bad } from "../../constants/scenes/endings/Brianna_bad/brianna_bad.mjs";
import { daena_bad } from "../../constants/scenes/endings/Daena_bad/daena_bad.mjs";
import { hailey_bad } from "../../constants/scenes/endings/Hailey_bad/hailey_bad.mjs";
import { reina_bad } from "../../constants/scenes/endings/Reina_bad/reina_bad.mjs";
import { lindsay_bad_1 } from "../../constants/scenes/endings/Lindsay_bad_1/index.mjs";
//lindsay_bad_2
import { brianna_good } from "../../constants/scenes/endings/Brianna_good/index.mjs";
import { daena_good } from "../../constants/scenes/endings/Daena_good/index.mjs";
import { hailey_good } from "../../constants/scenes/endings/Hailey_good/index.mjs";
import { reina_good } from "../../constants/scenes/endings/Reina_good/index.mjs";
import { harem_ending } from "../../constants/scenes/endings/Harem/index.mjs";
import { final_normal } from "../../constants/scenes/endings/Final/final_normal.mjs";
import { storyPage } from "../../pages/story-page.mjs";
import { answerCounter } from "./answer-counter.mjs";
import { mergeBadEndings } from "./merge-bad-endings.mjs";
import { mergeGoodEndings } from "./merge-good-endings.mjs";
import { lindsayCriterias } from "./lindsay-criterias.mjs";
import { daenaCriterias } from "./daena-criterias.mjs";
import { haileyCriterias } from "./hailey-criterias.mjs";
import { briannaCriterias } from "./brianna-criterias.mjs";
import { reinaCriterias } from "./reina-criterias.mjs";
import { haremCriterias } from "./harem-criterias.mjs";

import {
    LINDSAY_LOWER,
    REINA_LOWER,
    DAENA_LOWER,
    HAILEY_LOWER,
    BRIANNA_LOWER,
    END_OF_GAME,
    NEUTRAL_LOWER,
    SCENES_UNTIL_ENDINGS
} from "../../constants/statics.mjs";

//true solutions - start
const solutionKey2 = {
    reina: {
        importants: {
            '0003-30': 'option_2',
            '0011-40': 'option_0',
            '0017-46': 'option_1',
            '0020-54': 'option_1',
            '0023-44': 'option_0',
            '0023-62': 'option_1',
            '0027-40': 'option_1',
        },
        mobileImportants: {
            '0009-r-23': 'option_0',
            '0022-r-9': 'option_0',
            '0028-r-15': 'option_2',
            '0033-r-26': 'option_3',
        },
    },
    brianna: {
        importants: {
            '0014-38': 'option_1',
            '0018-36': 'option_1',
            '0023-44': 'option_1',
            '0025-32': 'option_2',
            '0032-40': 'option_0',
        },
        mobileImportants: {
            '0016-b-23': 'option_2',
            '0019-b-28': 'option_1',
        },
    },
    daena: {
        importants: {
            '0005-19': 'option_1',
            '0011-40': 'option_2',
            '0018-36': 'option_0',
            '0024-36': 'option_2',
            '0031-48': 'option_1',
        },
        mobileImportants: {
            '0016-d-31': 'option_2',
            '0033-d-13': 'option_2',
        },
    },
    hailey: {
        importants: {
            '0008-41': 'option_1',
            '0014-38': 'option_0',
            '0017-46': 'option_0',
            '0021-27': 'option_0',
            '0024-36': 'option_0',
        },
        mobileImportants: {
            '0013-h-25': 'option_1',
            '0022-h-20': 'option_2',
        },
    },
    lindsay: {
        importants: {
            '0012-41': 'option_1',
            '0029-43': 'option_0',
        },
        mobileImportants: {

        },
    },
}
//true solutions - end

// SZERKESZTENI! - átállítani az adatokat a valós sztoriéra
const LINDSAY_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: {
        critical_1: ['0003-3', true] //true means should be equal or equal-bigger; false means should not be equal
    },
    PERSONAL_SCENE_NUM: 11,
    DECLINED_SCENE_NUM: 11,
};
const DAENA_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 12,
};
const HAILEY_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 12,
};
const BRIANNA_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 12,
};
const REINA_DATA = {
    REQ_ENDING_VALUE: 2,
    CRITICAL_CHOICES: {
        critical_1: ['0003-3', true]
    },
    PERSONAL_SCENE_NUM: 12,
};
const NEUTRAL_DATA = {
    PERSONAL_SCENE_NUM: 12,
};
const HAREM_DATA = {
    REQ_ENDING_VALUE: {
        reina: 2,
        hailey: 1,
        daena: 1
    },
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 12,
};

export const selectEnding = (endingType, mainStoryData, gameSettings) => {
    const slotNumber = +localStorage.getItem('slotNumber') || 0;
    
    if (endingType === LINDSAY_LOWER) {
        const correctChoices = answerCounter(LINDSAY_LOWER, solutionKey, slotNumber, gameSettings);
        
        // Lindsay bad ending
        // SZERKESZTENI! - Eldönteni, hogy lindsay 1. vagy 2. bad endingje lesz
        if (lindsayCriterias(LINDSAY_DATA, slotNumber, correctChoices, solutionKey, gameSettings) === true) {
            storyPage(lindsay_bad_1, LINDSAY_DATA.PERSONAL_SCENE_NUM, gameSettings);
        } else {
            storyPage(mainStoryData, LINDSAY_DATA.DECLINED_SCENE_NUM, gameSettings);
        }
    }

    if (endingType === END_OF_GAME) {
        const daenaCorrectChoices = answerCounter(DAENA_LOWER, solutionKey, slotNumber, gameSettings);
        const haileyCorrectChoices = answerCounter(HAILEY_LOWER, solutionKey, slotNumber, gameSettings);
        const briannaCorrectChoices = answerCounter(BRIANNA_LOWER, solutionKey, slotNumber, gameSettings);
        const reinaCorrectChoices = answerCounter(REINA_LOWER, solutionKey, slotNumber, gameSettings);

        // Daena good ending
        if (daenaCriterias(DAENA_DATA, slotNumber, daenaCorrectChoices, reinaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) === true) {
            const daenaFinal = mergeGoodEndings('Daena', daena_good, reina_bad, hailey_bad, brianna_bad);
            storyPage(daenaFinal, DAENA_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // Hailey good ending
        if (haileyCriterias(HAILEY_DATA, slotNumber, haileyCorrectChoices, reinaCorrectChoices, daenaCorrectChoices, solutionKey, gameSettings) === true) {
            const haileyFinal = mergeGoodEndings('Hailey', hailey_good, reina_bad, daena_bad, brianna_bad);
            storyPage(haileyFinal, HAILEY_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // Brianna good ending
        /*if (briannaCriterias(BRIANNA_DATA, slotNumber, briannaCorrectChoices, solutionKey, gameSettings) === true) {
            const briannaFinal = mergeGoodEndings('Brianna', brianna_good, reina_bad, daena_bad, hailey_bad);
            storyPage(briannaFinal, BRIANNA_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }*/

        // SZERKESZTENI! - lesznek majd critical choice-ok mindegyik lánynál
        // Harem ending
        if (haremCriterias(HAREM_DATA, slotNumber, daenaCorrectChoices, haileyCorrectChoices, /* briannaCorrectChoices, */ reinaCorrectChoices, solutionKey, gameSettings) === true) {
            const fillerArray = Array.from({ length: SCENES_UNTIL_ENDINGS }, (_, i) => ({
                sceneId: i.toString().padStart(4, '0')
            }));

            const modifiedHaremArray = harem_ending.map((obj, index) => {
                obj.sceneId = String(+fillerArray.length + index).padStart(4, '0');

                if(index === harem_ending[harem_ending.length -1]) {
                    const final_keys = Object.keys(obj.story);
                    const last_final_key = final_keys[final_keys.length - 1];
                    obj.story[last_final_key].outroNext = 'Harem';
                }

                return obj;
            });

            const haremFinal = fillerArray.concat(modifiedHaremArray);
            storyPage(haremFinal, HAREM_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // SZERKESZTENI! - Eldönteni, hogy Reina max, de nem harem; vagy reina max-1 és reina ending; vagy reina max-1 és van vereség riválistól => neutral ending
        // Reina good ending
        if (reinaCriterias(REINA_DATA, slotNumber, reinaCorrectChoices, daenaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) === true) {
            const reinaFinal = mergeGoodEndings('Reina', reina_good, daena_bad, hailey_bad, brianna_bad, true)
            storyPage(reinaFinal, REINA_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // Neutral ending
        const unitedGirlsEndings = mergeBadEndings(daena_bad, hailey_bad, brianna_bad, reina_bad);

        final_normal[0].sceneId = String(+unitedGirlsEndings.length).padStart(4, '0');

        const final_keys = Object.keys(final_normal[0].story);
        const last_final_key = final_keys[final_keys.length - 1];
        final_normal[0].story[last_final_key].outroNext = 'Neutral';

        const neutralFinal = unitedGirlsEndings.concat(final_normal);

        storyPage(neutralFinal, NEUTRAL_DATA.PERSONAL_SCENE_NUM, gameSettings);
    }
};