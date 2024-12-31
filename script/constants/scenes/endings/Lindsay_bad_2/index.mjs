import { lindsay_bad_2 } from "./lindsay_bad_2.mjs";
import { final_bad } from "../Final/final_bad.mjs";
import { LINDSAY_LOWER_2 } from "../../../statics.mjs";

const lindsay_bad_2_connected = lindsay_bad_2.concat(final_bad);

export const lindsay_bad_2_ending = lindsay_bad_2_connected.map((obj) => {
    return {...obj, endingSceneType: LINDSAY_LOWER_2}
});