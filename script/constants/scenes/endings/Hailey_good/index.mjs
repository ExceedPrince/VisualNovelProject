import { final_normal } from "../Final/final_normal.mjs";
import { hailey_good_1 } from "./hailey_good_1.mjs";
import { hailey_good_2 } from "./hailey_good_2.mjs";
import { hailey_good_3 } from "./hailey_good_3.mjs";

export const hailey_good = 
    hailey_good_1
        .concat(hailey_good_2)
        .concat(hailey_good_3)
        .concat(final_normal);