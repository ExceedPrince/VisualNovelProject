import { brianna_bad } from "../../constants/scenes/endings/Brianna_bad/brianna_bad.mjs";
import { daena_bad } from "../../constants/scenes/endings/Daena_bad/daena_bad.mjs";
import { hailey_bad } from "../../constants/scenes/endings/Hailey_bad/hailey_bad.mjs";
import { reina_bad } from "../../constants/scenes/endings/Reina_bad/reina_bad.mjs";
import { lindsay_bad_1_ending } from "../../constants/scenes/endings/Lindsay_bad_1/index.mjs";
import { lindsay_bad_2_ending } from "../../constants/scenes/endings/Lindsay_bad_2/index.mjs";
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
    SCENES_UNTIL_ENDINGS,
    HAREM_LOWER
} from "../../constants/statics.mjs";
import { solutionKey as rawSolutions } from "../../constants/solution-key.mjs";

const LINDSAY_DATA = {
    REQ_ENDING_VALUE: 1,
    CRITICAL_CHOICES: {
        critical_1: ['0012-41', true], //true means should be equal or equal-bigger; false means should not be equal
        critical_2: ['0029-43', true]
    },
    PERSONAL_SCENE_NUM: 31,
    DECLINED_SCENE_NUM: 31,
};
const DAENA_DATA = {
    REQ_ENDING_VALUE: 7,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 37,
};
const HAILEY_DATA = {
    REQ_ENDING_VALUE: 7,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 37,
};
const BRIANNA_DATA = {
    REQ_ENDING_VALUE: 7,
    CRITICAL_CHOICES: null,
    PERSONAL_SCENE_NUM: 37,
};
const REINA_DATA = {
    REQ_ENDING_VALUE: 11,
    CRITICAL_CHOICES: {
        critical_1: ['0011-40', true],
        critical_2: ['0017-46', true],
        critical_3: ['0023-44', true],
    },
    PERSONAL_SCENE_NUM: 37,
};
const NEUTRAL_DATA = {
    PERSONAL_SCENE_NUM: 37,
};
const HAREM_DATA = {
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
};

export const selectEnding = (endingType, mainStoryData, gameSettings) => {
    const slotNumber = +localStorage.getItem('slotNumber') || 0;

    const binaryString = atob(rawSolutions);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedData = msgpack.decode(bytes);
	const solutionKey = decodedData;
    
    if (endingType === LINDSAY_LOWER) {
        const correctChoices = answerCounter(LINDSAY_LOWER, solutionKey, slotNumber, gameSettings);
        
        // Lindsay bad ending
        if (lindsayCriterias(LINDSAY_DATA, slotNumber, correctChoices, solutionKey, gameSettings) === 1) {
            storyPage(lindsay_bad_1_ending, LINDSAY_DATA.PERSONAL_SCENE_NUM, gameSettings);
        } else if (lindsayCriterias(LINDSAY_DATA, slotNumber, correctChoices, solutionKey, gameSettings) === 0) {
            storyPage(lindsay_bad_2_ending, LINDSAY_DATA.PERSONAL_SCENE_NUM, gameSettings);
        } else {
            storyPage(mainStoryData, LINDSAY_DATA.DECLINED_SCENE_NUM, gameSettings);
        }
    }

    if (endingType === END_OF_GAME) {
        const daenaCorrectChoices = answerCounter(DAENA_LOWER, solutionKey, slotNumber, gameSettings);
        const haileyCorrectChoices = answerCounter(HAILEY_LOWER, solutionKey, slotNumber, gameSettings);
        const briannaCorrectChoices = answerCounter(BRIANNA_LOWER, solutionKey, slotNumber, gameSettings);
        const reinaCorrectChoices = answerCounter(REINA_LOWER, solutionKey, slotNumber, gameSettings);

        console.log(daenaCorrectChoices, haileyCorrectChoices, briannaCorrectChoices, reinaCorrectChoices)
        // Daena good ending
        if (daenaCriterias(DAENA_DATA, slotNumber, daenaCorrectChoices, reinaCorrectChoices, briannaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) === true) {
            const daenaFinal = mergeGoodEndings('Daena', daena_good, reina_bad, hailey_bad, brianna_bad);
            storyPage(daenaFinal, DAENA_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // Hailey good ending
        if (haileyCriterias(HAILEY_DATA, slotNumber, haileyCorrectChoices, reinaCorrectChoices, briannaCorrectChoices, daenaCorrectChoices, solutionKey, gameSettings) === true) {
            const haileyFinal = mergeGoodEndings('Hailey', hailey_good, reina_bad, daena_bad, brianna_bad);
            storyPage(haileyFinal, HAILEY_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // Brianna good ending
        if (briannaCriterias(BRIANNA_DATA, slotNumber, briannaCorrectChoices, reinaCorrectChoices, haileyCorrectChoices, daenaCorrectChoices, solutionKey, gameSettings) === true) {
            const briannaFinal = mergeGoodEndings('Brianna', brianna_good, reina_bad, daena_bad, hailey_bad);
            storyPage(briannaFinal, BRIANNA_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // Harem ending
        if (haremCriterias(HAREM_DATA, slotNumber, daenaCorrectChoices, haileyCorrectChoices, briannaCorrectChoices, reinaCorrectChoices, solutionKey, gameSettings) === true) {
            const fillerArray = Array.from({ length: SCENES_UNTIL_ENDINGS }, (_, i) => ({
                sceneId: i.toString().padStart(4, '0')
            }));

            const modifiedHaremArray = harem_ending.map((obj, index) => {
                obj.sceneId = String(+fillerArray.length + index).padStart(4, '0');

                obj.endingSceneType = HAREM_LOWER;

                if (obj.story[Object.keys(obj.story).length].timeSkipNext) {
                    obj.story[Object.keys(obj.story).length].timeSkipNext.nextSceneNumber = String(+fillerArray.length + index + 1).padStart(4, '0');
                }

                if(index === harem_ending.length -1) {
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

        // Reina good ending
        if (reinaCriterias(REINA_DATA, slotNumber, reinaCorrectChoices, daenaCorrectChoices, briannaCorrectChoices, haileyCorrectChoices, solutionKey, gameSettings) === true) {
            const reinaFinal = mergeGoodEndings('Reina', reina_good, daena_bad, hailey_bad, brianna_bad, true);
            storyPage(reinaFinal, REINA_DATA.PERSONAL_SCENE_NUM, gameSettings);

            return;
        }

        // Neutral ending
        const unitedGirlsEndings = mergeBadEndings(daena_bad, hailey_bad, brianna_bad, reina_bad);

        final_normal[0].sceneId = String(+unitedGirlsEndings.length).padStart(4, '0');

        const final_keys = Object.keys(final_normal[0].story);
        const last_final_key = final_keys[final_keys.length - 1];
        final_normal[0].endingSceneType = NEUTRAL_LOWER;
        final_normal[0].story[last_final_key].outroNext = 'Neutral';

        const neutralFinal = unitedGirlsEndings.concat(final_normal);
        storyPage(neutralFinal, NEUTRAL_DATA.PERSONAL_SCENE_NUM, gameSettings);
    }
};