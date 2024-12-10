import { final_normal } from "../Final/final_normal.mjs";
import { daena_good_1 } from "./daena_good_1.mjs";
import { daena_good_2 } from "./daena_good_2.mjs";
import { daena_good_3 } from "./daena_good_3.mjs";

export const daena_good = 
    daena_good_1
        .concat(daena_good_2)
        .concat(daena_good_3)
        .concat(final_normal);