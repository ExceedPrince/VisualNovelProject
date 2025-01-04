import { qs } from "../utils/commons.mjs";
import { mainMenuPage } from '../pages/main-menu-page.mjs';
import { getGameData } from '../utils/get-game-data.mjs';

export const showBackToMainWindow = (backToMain_window, innerMenu_window, state, timeState) => {
    if (backToMain_window.children.length === 0) {
        backToMain_window.insertAdjacentHTML("beforeend", `
            <div id="backToMain_window_inner">
                <h2>Are you sure you want to go back to the main menu? Any unsaved progress will be lost.</h2>
                <div class="innerMenu_window_buttonContainer">
                    <button id="backToMain_yesBtn">Yes, go back</button>
                    <button id="backToMain_noBtn">Cancel</button>
                </div>
            </div>
        `);
    }

    const backToMain_yesBtn = qs('#backToMain_yesBtn');
    backToMain_yesBtn.addEventListener('click', () => {
        const root = qs('#root');
        root.classList.add("fadeOut");

        if (timeState) timeState.shouldStopTimeInterval = true;

        setTimeout(() => {
            root.innerHTML = "";
            const savedGameSettings = getGameData();

            mainMenuPage(savedGameSettings);
        }, 2000);
    });

    const backToMain_noBtn = qs('#backToMain_noBtn');
    backToMain_noBtn.addEventListener('click', () => {
        innerMenu_window.classList.remove('fadeIn');
        innerMenu_window.classList.add('fadeOut');

        setTimeout(() => {
            state.openedMenuPoint = null;
            innerMenu_window.innerHTML = '';
        }, 2000);
    });
};