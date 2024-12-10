import { SCENES_UNTIL_ENDINGS } from "../../constants/statics.mjs";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const mergeBadEndings = (daenaArray, haileyArray, briannaArray, reinaArray) => {
    const othersArr= shuffleArray([daenaArray, haileyArray, briannaArray]);
    const reinaIndex = Math.random() < 0.5 ? 2 : 3;

    const resultArray = [];
    resultArray[reinaIndex] = reinaArray;

    let currentIndex = 0;
    for (const array of othersArr) {
        while (currentIndex === reinaIndex) {
            currentIndex++;
        }
        resultArray[currentIndex++] = array;
    }

    const fillerArray = Array.from({ length: SCENES_UNTIL_ENDINGS }, (_, i) => ({
        sceneId: i.toString().padStart(4, '0')
    }));

    const flattenedEndings = resultArray.flat().map((obj, index) => {
        obj.sceneId = String(+fillerArray.length + index).padStart(4, '0');
        return obj;
    });

    return fillerArray.concat(flattenedEndings);
};