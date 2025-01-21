import { qs } from '../../utils/commons.mjs';
import { isInElectron } from '../../utils/is-in-electron.mjs';
import { QUIT_OPEN } from '../../constants/statics.mjs';

export const openQuit = (mainColumn_1, state, gameSettings) => {
    if (state.openedMenuPoint === QUIT_OPEN) {
        qs('#quit_inner').classList.remove('fadeIn');
        qs('#quit_inner').classList.add('fadeOut');

        setTimeout(() => {
            state.openedMenuPoint = null;
            mainColumn_1.innerHTML = '';
        }, 2000);

        return;
    }

    if (mainColumn_1.firstChild) {
        mainColumn_1.firstChild.classList.remove('fadeIn');
        mainColumn_1.firstChild.classList.add('fadeOut');
    }

    setTimeout(() => {
        mainColumn_1.innerHTML = '<div id="quit_inner" class="fadeIn"></div>';
        const quitInner = qs('#quit_inner');

        state.openedMenuPoint = QUIT_OPEN;
    
        showQuit(mainColumn_1, quitInner, state, gameSettings);
    }, mainColumn_1.firstChild ? 2000 : 0);
};

const showQuit = (mainColumn_1, quitInner, state, gameSettings) => {
    quitInner.insertAdjacentHTML('beforeend', `
        <h2>Do you really want to quit from the game?</h2>
        <div>
            <button type="button" id="deleteYesBtn">Yes</button>
            <button type="button" id="deleteNoBtn">No</button>
        </div>
    `);

    const deleteYesBtn = qs('#deleteYesBtn');
    const deleteNoBtn = qs('#deleteNoBtn');
    const otherSoundsAudio = qs('#other_sound_effects_audio');

    [deleteYesBtn, deleteNoBtn].forEach((button) => {
        button.addEventListener('mouseover', () => {
            otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
            otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/menu-hover.mp3`;
            otherSoundsAudio.play();
        })
    })

    deleteYesBtn.addEventListener('click', () => {
        if (isInElectron()) {
            window.electron.closeApp();
        } else {
            console.log('force quit from the game');
        }
    });

    deleteNoBtn.addEventListener('click', () => {
        mainColumn_1.firstChild.classList.remove('fadeIn');
        mainColumn_1.firstChild.classList.add('fadeOut');

        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/cancel.mp3`;
        otherSoundsAudio.play();

        setTimeout(() => {
            mainColumn_1.innerHTML = '';
            state.openedMenuPoint = null;
        }, 2000);
    });
};