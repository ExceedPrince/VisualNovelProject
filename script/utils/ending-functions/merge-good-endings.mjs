import { SCENES_UNTIL_ENDINGS } from "../../constants/statics.mjs";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const mergeGoodEndings = (personName, winnerArray, highlightedArray, loserArray1, loserArray2, shouldShuffleThree = false) => {
    let shuffledArray = null;
    let orderedArray = null;

    const final_keys = Object.keys(winnerArray[winnerArray.length - 1].story);
    const last_final_key = final_keys[final_keys.length - 1];
    winnerArray[winnerArray.length - 1].story[last_final_key].outroNext = personName;

    if (shouldShuffleThree) {
        shuffledArray= shuffleArray([loserArray1, loserArray2, highlightedArray]).flat();
        orderedArray = shuffledArray.concat(winnerArray);
    } else {
        shuffledArray= shuffleArray([loserArray1, loserArray2]).flat();
        orderedArray = shuffledArray.concat(highlightedArray).concat(winnerArray);
    }

    const fillerArray = Array.from({ length: SCENES_UNTIL_ENDINGS }, (_, i) => ({
        sceneId: i.toString().padStart(4, '0')
    }));

    const modifiedOrderedArray = orderedArray.map((obj, index) => {
        obj.sceneId = String(+fillerArray.length + index).padStart(4, '0');

        obj.endingSceneType = personName.toLowerCase();

        if (obj.story[Object.keys(obj.story).length].timeSkipNext) {
            obj.story[Object.keys(obj.story).length].timeSkipNext.nextSceneNumber = String(+fillerArray.length + index + 1).padStart(4, '0');
        }
        
        return obj;
    });

    return fillerArray.concat(modifiedOrderedArray);
};