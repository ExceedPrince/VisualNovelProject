import { qs } from "../utils/commons.mjs";
import { mainMenuPage } from '../pages/main-menu-page.mjs';
import { getGameData } from '../utils/get-game-data.mjs';
import { isInElectron } from "../utils/is-in-electron.mjs";

export const showBackToMainWindow = (backToMain_window, innerMenu_window, state, timeState, gameSettings) => {
    if (backToMain_window.children.length === 0) {
        backToMain_window.insertAdjacentHTML("beforeend", `
            <div id="backToMain_window_inner">
                <h2>Are you sure you want to go back to the main menu? Any unsaved progress will be lost.</h2>
                <div class="innerMenu_window_buttonContainer">
                    <button id="backToMain_yesBtn">Yes, go back</button>
                    <button id="backToMain_noBtn">No, Cancel</button>
                </div>
            </div>
        `);
    }

    const otherSoundsAudio = qs('#other_sound_effects_audio');

    const backToMain_yesBtn = qs('#backToMain_yesBtn');
    const backToMain_noBtn = qs('#backToMain_noBtn');

    [backToMain_yesBtn, backToMain_noBtn].forEach((button) => {
        button.addEventListener('mouseover', () => {
            otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
            otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/menu-hover.mp3`;
            otherSoundsAudio.play();
        });
    });

    backToMain_yesBtn.addEventListener('click', () => {
        const root = qs('#root');
        root.classList.add("fadeOut");

        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/proceed.mp3`;
        otherSoundsAudio.play();

        if (timeState) timeState.shouldStopTimeInterval = true;

        setTimeout(() => {
            root.innerHTML = "";
            const savedGameSettings = getGameData();

            mainMenuPage(savedGameSettings);
        }, 2000);
    });

    backToMain_noBtn.addEventListener('click', () => {
        innerMenu_window.classList.remove('fadeIn');
        innerMenu_window.classList.add('fadeOut');

        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/cancel.mp3`;
        otherSoundsAudio.play();

        setTimeout(() => {
            state.openedMenuPoint = null;
            innerMenu_window.innerHTML = '';
        }, 2000);
    });
};