import { qs } from '../utils/commons.mjs';
import { isInElectron } from '../utils/is-in-electron.mjs';
import { useGameSettings } from '../utils/use-game-settings.mjs';

import { mainMenuPage } from './main-menu-page.mjs';

export const preloadPage = (gameSettings) => {
    const root = qs('#root');
    const colorCover = qs('#colorCover');

    useGameSettings(gameSettings.settings, root, colorCover);

    const firstPreload = `
        <div id="preload_container" class="fadeIn">
            <h1 id="preload_title">ExceedPrince production</h1>
        </div>
    `;

    const secondPreload = `
        <div id="preload_container" class="fadeIn">
            <div id="preload_inner">
                <h1 id="preload_warning">Attention!</h1>
                <h2 id="preload_subwarning" class="fadeIn_1sec_delay">Explicit Content Warning</h2>
                <p id="preload_warning_message" class="fadeIn_3sec_delay">This game contains nudity and explicit material which may be inappropriate for some audiences. <br>Please proceed with caution.</p>
                <p id="preload_action" class="flashing_5sec_delay">Click to continue</p>
            </div>
        </div>
    `;

    root.insertAdjacentHTML('afterbegin', firstPreload);

    const first_preload_container = qs('#preload_container');

    setTimeout(() => {
        first_preload_container.classList.remove('fadeIn');
        first_preload_container.classList.add('fadeOut');
    }, 5000);

    let second_preload_container;

    setTimeout(() => {
        root.innerHTML = '';
        root.insertAdjacentHTML('afterbegin', secondPreload);
        second_preload_container = qs('#preload_container');

        setTimeout(() => {
            second_preload_container.addEventListener('click', () => canProceed(root, second_preload_container, gameSettings));
        }, 6000);
    }, 7000);
};


function canProceed(root, second_preload_container, gameSettings) {
    const otherSoundsAudio = qs('#other_sound_effects_audio');

    otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/proceed.mp3`;
    otherSoundsAudio.play();

    second_preload_container.classList.remove('fadeIn');
    second_preload_container.classList.add('fadeOut');

    second_preload_container.removeEventListener("keydown", canProceed);

    setTimeout(() => {
        root.innerHTML = '';
        mainMenuPage(gameSettings);
    }, 2000);
};