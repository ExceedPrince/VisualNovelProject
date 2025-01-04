import { qs } from '../utils/commons.mjs';
import { navigateToThankYouPage } from '../utils/ending-functions/navigate-to-thank-you-page.mjs';
import { isInElectron } from '../utils/is-in-electron.mjs';
import { useGameSettings } from '../utils/use-game-settings.mjs';

import { mainMenuPage } from './main-menu-page.mjs';

export const preloadPage = (gameSettings, isCompatibleDevice, deviceWarningPage) => {
    const root = qs('#root');
    const colorCover = qs('#colorCover');

    useGameSettings(gameSettings.settings, root, colorCover);

    const firstPreload = `
    <div id="preload_container" class="fadeIn">
        <div id="preload_inner">
            <h1 id="preload_warning">Attention!</h1>
            <h2 id="preload_subwarning" class="fadeIn_1sec_delay">Mature Content Warning</h2>
            <p id="preload_warning_message" class="fadeIn_3sec_delay">This prototype game contains nudity and mature themes which may be inappropriate for some audiences. <br>Please proceed with caution.</p>
            <p id="preload_action" class="flashing_5sec_delay">Click to continue</p>
        </div>
    </div>
`;

    const secondPreload = `
        <div id="preload_container" class="fadeIn">
            <video id="preload_video" autoplay>
                <source src="${isInElectron() ? '.' : '../..'}/videos/Logo_video.mp4" type="video/mp4">
            </video>
        </div>
    `;

    let first_preload_container;
   
    if (isCompatibleDevice.isCompatible === false) {
        root.innerHTML = deviceWarningPage;
        return;
    } 
    root.innerHTML = '';
    root.insertAdjacentHTML('afterbegin', firstPreload);
    first_preload_container = qs('#preload_container');

    setTimeout(() => {
        first_preload_container.addEventListener('click', () => playIntroVideo(root, first_preload_container, secondPreload, gameSettings));
    }, 6000);
};

function playIntroVideo(root, first_preload_container, secondPreload, gameSettings) {
    const otherSoundsAudio = qs('#other_sound_effects_audio');

    otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/proceed.mp3`;
    otherSoundsAudio.play();

    first_preload_container.classList.remove('fadeIn');
    first_preload_container.classList.add('fadeOut');

    first_preload_container.removeEventListener("keydown", playIntroVideo);

    setTimeout(() => {
        root.innerHTML = secondPreload;
        const second_preload_container = qs('#preload_container');
        second_preload_container.classList.remove('fadeOut');
        const videoElement = qs('#preload_video');

        if (JSON.parse(localStorage.getItem('canSkipIntro'))) {
            second_preload_container.addEventListener('click', () => fadeOutAndClearVideo(videoElement, root, gameSettings));
        }
        videoElement.addEventListener('ended', () => fadeOutAndClearVideo(videoElement, root, gameSettings));
    }, 2000);
};
function fadeOutAndClearVideo(videoElement, root, gameSettings) {
    videoElement.pause();
    root.classList.remove('fadeIn')
    root.classList.add('fadeOut');

    setTimeout(() => {
        root.innerHTML = '';
        localStorage.setItem('canSkipIntro', true);
        mainMenuPage(gameSettings);
    }, 2000);
};
