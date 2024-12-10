import { qs } from '../utils/commons.mjs';
import { newGame } from './menu_functions/new-game.mjs';
import { loadGame } from './menu_functions/load-game.mjs';
import { openGallery } from './menu_functions/open-gallery.mjs';
import { openSettings } from './menu_functions/open-settings.mjs';
import { openAbout } from './menu_functions/open-about.mjs';
import { openQuit } from './menu_functions/open-quit.mjs';
import { isInElectron } from '../utils/is-in-electron.mjs';
import { 
    LINDSAY_LOWER,
    REINA_LOWER,
    DAENA_LOWER,
    HAILEY_LOWER,
    BRIANNA_LOWER,
    NEUTRAL_LOWER,
    HAREM_LOWER,
    SAD_TRUE_ENDING,
    LINDSAYS_BAD_ENDING,
    DAENAS_GOOD_ENDING,
    HAILEYS_GOOD_ENDING,
    BRIANNAS_GOOD_ENDING,
    REINAS_GOOD_ENDING,
    HAREM_DREAM_ENDING,
} from '../constants/statics.mjs';

const endingObject = {
    [LINDSAY_LOWER]: LINDSAYS_BAD_ENDING,
    [REINA_LOWER]: REINAS_GOOD_ENDING,
    [DAENA_LOWER]: DAENAS_GOOD_ENDING,
    [HAILEY_LOWER]: HAILEYS_GOOD_ENDING,
    [BRIANNA_LOWER]: BRIANNAS_GOOD_ENDING,
    [NEUTRAL_LOWER]: SAD_TRUE_ENDING,
    [HAREM_LOWER]: HAREM_DREAM_ENDING,
};

export const mainMenuPage = (gameSettings) => {
    const bgMusicAudio = qs('#bg_music_audio');
    bgMusicAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/bg_musics/MainMenu_song.mp3`;
    bgMusicAudio.volume = gameSettings.settings.audio.bgMusic/100;
	bgMusicAudio.play();

    const root = qs('#root');

    root.innerHTML = '';
    root.classList.remove('fadeOut',)
    root.insertAdjacentHTML('afterbegin', `
        <div id="mainMenu_container" class="fadeIn">
            <h1 id="mainTitle">Constrained Love</h1>
            <div id="mainMenu_flexContainer">
                <div id="mainColumn_1" class="mainMenu_column">
                    <div class="mainMenu_column_inner">
                        <div id="mainMenu_newGame" class="mainMenu_options">New Game</div>
                        <div id="mainMenu_loadGame" class="mainMenu_options">Load Game</div>
                        <div id="mainMenu_gallery" class="mainMenu_options">Gallery</div>
                        <div id="mainMenu_settings" class="mainMenu_options">Settings</div>
                        <div id="mainMenu_about" class="mainMenu_options">About</div>
                        <div id="mainMenu_quitGame" class="mainMenu_options">Quit Game</div>
                    </div>
                </div>
                <div id="mainColumn_2" class="mainMenu_column"></div>
            </div>
            <div id="mainEndingContainer" class="noClick"></div>
        </div>
        <div class="falling-icons">
            <i></i><i></i><i></i><i></i><i></i>
            <i></i><i></i><i></i><i></i><i></i>
            <i></i><i></i><i></i><i></i><i></i>
        </div>
    `);

    const mainColumn_2 = qs('#mainColumn_2');
    const mainMenu_newGame = qs('#mainMenu_newGame');
    const mainMenu_loadGame = qs('#mainMenu_loadGame');
    const mainMenu_gallery = qs('#mainMenu_gallery');
    const mainMenu_settings = qs('#mainMenu_settings');
    const mainMenu_about = qs('#mainMenu_about');
    const mainMenu_quitGame = qs('#mainMenu_quitGame');
    const main_ending_container = qs('#mainEndingContainer');

    Object.entries(gameSettings.endings).forEach(([name, value], index) => {
        main_ending_container.insertAdjacentHTML('beforeend', `
            <div id="${name}_ending_row" class="notVisible">${endingObject[name]}</div>
        `);

        setTimeout(() => {
            if (value) {
                qs(`#${name}_ending_row`).classList.add('fadeIn_opacity_only');
            }
        }, (index + 1) * 200);
    });

    const state = {
        openedMenuPoint: null
    }

    mainMenu_newGame.addEventListener('click', () => newGame(root, gameSettings));
    mainMenu_loadGame.addEventListener('click', () => loadGame(mainColumn_2, gameSettings, state));
    mainMenu_gallery.addEventListener('click', () => openGallery(root, mainColumn_2, gameSettings, state));
    mainMenu_settings.addEventListener('click', () => openSettings(mainColumn_2, gameSettings, state));
    mainMenu_about.addEventListener('click', () => openAbout(mainColumn_2, state));
    mainMenu_quitGame.addEventListener('click', () => openQuit(mainColumn_2, state));
};