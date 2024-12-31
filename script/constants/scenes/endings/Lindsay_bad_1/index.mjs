import { lindsay_bad_1 } from "./lindsay_bad_1.mjs";
import { final_bad } from "../Final/final_bad.mjs";
import { LINDSAY_LOWER_1 } from "../../../statics.mjs";

const lindsay_bad_1_connected = lindsay_bad_1.concat(final_bad);

export const lindsay_bad_1_ending = lindsay_bad_1_connected.map((obj) => {
    return {...obj, endingSceneType: LINDSAY_LOWER_1}
});