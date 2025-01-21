import { qs } from "../utils/commons.mjs";
import { isInElectron } from '../utils/is-in-electron.mjs';

export const showQuitWindow = (innerMenu_window, quit_window, state, gameSettings) => {
    quit_window.innerHTML = `
        <h2>Are you sure you want to quit from the game? </br>Any unsaved progress will be lost.</h2>
        <div>
            <button type="button" id="quitYesBtn">Yes</button>
            <button type="button" id="quitNoBtn">No</button>
        </div>
    `;

    const quitYesBtn = qs('#quitYesBtn');
    const quitNoBtn = qs('#quitNoBtn');
    const otherSoundsAudio = qs('#other_sound_effects_audio');

    [quitYesBtn, quitNoBtn].forEach((button) => {
        button.addEventListener('mouseover', () => {
            otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
            otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/menu-hover.mp3`;
            otherSoundsAudio.play();
        })
    })

    quitNoBtn.addEventListener('click', () => {
        innerMenu_window.firstChild.classList.remove('fadeIn');
        innerMenu_window.firstChild.classList.add('fadeOut');
        innerMenu_window.classList.remove('fadeIn');
        innerMenu_window.classList.add('fadeOut');

        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/cancel.mp3`;
        otherSoundsAudio.play();

        setTimeout(() => {
            innerMenu_window.innerHTML = '';
            state.openedMenuPoint = null;
        }, 2000);
    });

    quitYesBtn.addEventListener('click', () => {
        if (isInElectron()) {
            window.electron.closeApp();
        } else {
            console.log('force quit from the game')
        }
    });
};