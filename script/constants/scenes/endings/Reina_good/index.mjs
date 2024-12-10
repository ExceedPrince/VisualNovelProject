import { final_normal } from "../Final/final_normal.mjs";
import { reina_good_1 } from "./reina_good_1.mjs";
import { reina_good_2 } from "./reina_good_2.mjs";
import { reina_good_3 } from "./reina_good_3.mjs";

export const reina_good = 
reina_good_1
        .concat(reina_good_2)
        .concat(reina_good_3)
        .concat(final_normal);