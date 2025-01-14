import { GAME_DATA_1, GAME_DATA_2 } from "../../constants/statics.mjs";
import { mainMenuPage } from "../../pages/main-menu-page.mjs";
import { convertDataTwoWays } from "../convert-data-two-ways.mjs";

const OUTRO_NUM = 5;

export const navigateToThankYouPage = (root, name, gameSettings) => {
    root.insertAdjacentHTML('beforeend', `
        <div id='thankYou_container'>
            <p>Thank you for playing the prototype version of</p>
            <p class="gameTitle">Constrained Love</p>
            <p>Your feedback means a lot to me, please feel free to share it. </br>You can find my contact details under the About page in the main menu.</p>
        </div>
    `);

    root.classList.remove('fadeOut');
	root.classList.add('fadeIn');

    const modifiedGameSettings = gameSettings;
    modifiedGameSettings.endings[name.toLowerCase()] = true;

    for (let index = 1; index <= OUTRO_NUM; index++) {
        const galleryIndexNumber = modifiedGameSettings.gallery.findIndex((item) => item.id === `${name.toLowerCase()}_outro_${index}`);
        if (galleryIndexNumber && modifiedGameSettings.gallery[galleryIndexNumber]) {
            modifiedGameSettings.gallery[galleryIndexNumber].isActivated = true;
        }
    }
    
    const splittedData = convertDataTwoWays(modifiedGameSettings);
    localStorage.setItem(GAME_DATA_1, splittedData[0]); 
    localStorage.setItem(GAME_DATA_2, splittedData[1]); 

    setTimeout(() => {
        root.classList.remove('fadeIn')
        root.classList.add('fadeOut');

        setTimeout(() => {
            root.innerHTML = '';
            mainMenuPage(modifiedGameSettings);
        }, 2000);
    }, 10_000);
};