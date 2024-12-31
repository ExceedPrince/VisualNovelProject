import { brianna_bad } from "../../constants/scenes/endings/Brianna_bad/brianna_bad.mjs";
import { brianna_good } from "../../constants/scenes/endings/Brianna_good/index.mjs";
import { daena_bad } from "../../constants/scenes/endings/Daena_bad/daena_bad.mjs";
import { daena_good } from "../../constants/scenes/endings/Daena_good/index.mjs";
import { final_normal } from "../../constants/scenes/endings/Final/final_normal.mjs";
import { hailey_bad } from "../../constants/scenes/endings/Hailey_bad/hailey_bad.mjs";
import { hailey_good } from "../../constants/scenes/endings/Hailey_good/index.mjs";
import { harem_ending } from "../../constants/scenes/endings/Harem/index.mjs";
import { lindsay_bad_1_ending } from "../../constants/scenes/endings/Lindsay_bad_1/index.mjs";
import { lindsay_bad_2_ending } from "../../constants/scenes/endings/Lindsay_bad_2/index.mjs";
import { reina_bad } from "../../constants/scenes/endings/Reina_bad/reina_bad.mjs";
import { reina_good } from "../../constants/scenes/endings/Reina_good/index.mjs";
import { 
    LINDSAY_LOWER_1,
    LINDSAY_LOWER_2,
    REINA_LOWER,
    DAENA_LOWER,
    HAILEY_LOWER,
    BRIANNA_LOWER,
    NEUTRAL_LOWER,
    HAREM_LOWER,
    SCENES_UNTIL_ENDINGS,
 } from "../../constants/statics.mjs";
import { mergeBadEndings } from "./merge-bad-endings.mjs";
import { mergeGoodEndings } from "./merge-good-endings.mjs";


export const loadEnding = (endingSceneType) => {
    if (endingSceneType === LINDSAY_LOWER_1) {
        return lindsay_bad_1_ending;
    }
    
    if (endingSceneType === LINDSAY_LOWER_2) {
        return lindsay_bad_2_ending;
    }

    if (endingSceneType === REINA_LOWER) {
        return mergeGoodEndings('Reina', reina_good, daena_bad, hailey_bad, brianna_bad, true);
    }

    if (endingSceneType === DAENA_LOWER) {
        return mergeGoodEndings('Daena', daena_good, reina_bad, hailey_bad, brianna_bad);
    }

    if (endingSceneType === HAILEY_LOWER) {
        return mergeGoodEndings('Hailey', hailey_good, reina_bad, daena_bad, brianna_bad);
    }

    if (endingSceneType === BRIANNA_LOWER) {
        return mergeGoodEndings('Brianna', brianna_good, reina_bad, daena_bad, hailey_bad);
    }

    if (endingSceneType === NEUTRAL_LOWER) {
        const unitedGirlsEndings = mergeBadEndings(daena_bad, hailey_bad, brianna_bad, reina_bad);

        final_normal[0].sceneId = String(+unitedGirlsEndings.length).padStart(4, '0');

        const final_keys = Object.keys(final_normal[0].story);
        const last_final_key = final_keys[final_keys.length - 1];
        final_normal[0].endingSceneType = NEUTRAL_LOWER;
        final_normal[0].story[last_final_key].outroNext = 'Neutral';

        return unitedGirlsEndings.concat(final_normal);
    }

    if (endingSceneType === HAREM_LOWER) {
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

        return fillerArray.concat(modifiedHaremArray);
    }
};