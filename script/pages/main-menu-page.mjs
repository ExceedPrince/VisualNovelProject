import { qs, qsa } from '../utils/commons.mjs';
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

function addingEscapeBtn(e) {
    if(e.key === "Escape" && qs('#inGame_navbar_icon')) {
        qs('#inGame_navbar_icon').click();
    }
}

export const mainMenuPage = (gameSettings) => {
    const bgMusicAudio = qs('#bg_music_audio');
    bgMusicAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/bg_musics/MainMenu_song.mp3`;
    bgMusicAudio.volume = gameSettings.settings.audio.bgMusic/100;
	bgMusicAudio.play();

    const root = qs('#root');

    root.innerHTML = '';
    root.classList.remove('fadeOut',)
    root.insertAdjacentHTML('afterbegin', `
        <div id="mainMenu_container" class="fadeIn ${gameSettings.endings.reina ? 'completed' : ''}">
            <div id="mainTitle" class="fadeIn_1sec_delay">
                <img src="${isInElectron() ? '.' : '../..'}/img/assets/logo.png" alt="logo"/>
                <h1>Constrained Love</h1>
            </div>
            <h1 id="versionNumber">v0.9.0</h1>
            <div id="mainColumn_1" class="mainMenu_column"></div>
            <div id="mainEndingContainer" class="noClick"></div>

            <div class="mainMenu fadeIn_1sec_delay">
                <input type="checkbox"/>
                <div class="hamburger">
                    <div id="menu_padlock">
                        <img id="padlock-head" src="${isInElectron() ? '.' : '../..'}/img/assets/padlock-head.png" alt="padlock-head"/>
                        <img id="padlock-body" src="${isInElectron() ? '.' : '../..'}/img/assets/padlock-body.png" alt="padlock-body"/>
                    </div>
                </div>
                <div class="action_items_bar">
                    <div class="action_items">
                        <div id="mainMenu_newGame" class="mainMenu_options first_item">New Game</div>
                        <div id="mainMenu_loadGame" class="mainMenu_options second_item">Load Game</div>
                        <div id="mainMenu_gallery" class="mainMenu_options third_item">Gallery</div>
                        <div id="mainMenu_settings" class="mainMenu_options fourth_item">Settings</div>
                        <div id="mainMenu_about" class="mainMenu_options fifth_item">About</div>
                        <div id="mainMenu_quitGame" class="mainMenu_options sixth_item">Quit Game</div>
                        <div id="marker" class="inCenter"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="falling-icons">
            <i></i><i></i><i></i><i></i><i></i>
            <i></i><i></i><i></i><i></i><i></i>
            <i></i><i></i><i></i><i></i><i></i>
        </div>
    `);

    const mainColumn_1 = qs('#mainColumn_1');
    const mainMenu_newGame = qs('#mainMenu_newGame');
    const mainMenu_loadGame = qs('#mainMenu_loadGame');
    const mainMenu_gallery = qs('#mainMenu_gallery');
    const mainMenu_settings = qs('#mainMenu_settings');
    const mainMenu_about = qs('#mainMenu_about');
    const mainMenu_quitGame = qs('#mainMenu_quitGame');
    const main_ending_container = qs('#mainEndingContainer');
    
    const marker = document.querySelector('#marker');
    const hamburger = document.querySelector('.hamburger');
    const action_items_bar = document.querySelector('.action_items_bar');

    Object.entries(gameSettings.endings).forEach(([name, value], index) => {
        main_ending_container.insertAdjacentHTML('beforeend', `
            <div id="${name}_ending_row" class="notVisible">
                <img class="ending-heart" src="${isInElectron() ? '.' : '../..'}/img/svg/tick.svg" alt="tick"/>
                <span>${endingObject[name]}</span>
            </div>
        `);

        setTimeout(() => {
            if (value) {
                qs(`#${name}_ending_row`).classList.add('pulseFadeIn');

                const otherSoundsAudio = qs('#other_sound_effects_audio');
                otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;

                if (otherSoundsAudio.src.indexOf("chimes") === -1) {
                    otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/chimes.mp3`;
                    otherSoundsAudio.play();
                }
            }
        }, (index + 1) * 200);
    });

    const state = {
        openedMenuPoint: null
    }

    mainMenu_newGame.addEventListener('click', (e) => {checkMenuClick(e); newGame(root, gameSettings)});
    mainMenu_loadGame.addEventListener('click', (e) => {checkMenuClick(e); loadGame(mainColumn_1, gameSettings, state)});
    mainMenu_gallery.addEventListener('click', (e) => {checkMenuClick(e); openGallery(root, mainColumn_1, gameSettings, state)});
    mainMenu_settings.addEventListener('click', (e) => {checkMenuClick(e); openSettings(mainColumn_1, gameSettings, state)});
    mainMenu_about.addEventListener('click', (e) => {checkMenuClick(e); openAbout(mainColumn_1, state)});
    mainMenu_quitGame.addEventListener('click', (e) => {checkMenuClick(e); openQuit(mainColumn_1, state, gameSettings)});

    const otherSoundsAudio = qs('#other_sound_effects_audio');

    qsa('.mainMenu_options').forEach((link) => {
        link.addEventListener('mouseover', (e) => {
            moveIndicator(e.target);
            marker.classList.remove('inCenter');

            otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
            otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/menu-hover.mp3`;
            otherSoundsAudio.play();
        });

    });

    function moveIndicator(e) {
        marker.style.left = e.offsetLeft + 'px';
        marker.style.width = e.offsetWidth + 'px';
    }

    function checkMenuClick (e) {
        qsa('.mainMenu_options').forEach((option) =>{
            if (option !== e.target) {
                option.classList.remove('option-chosen');
            } else {
                e.target.classList.toggle('option-chosen');

                if (e.target.classList.contains('option-chosen')) {
                    marker.style.left = e.offsetLeft + 'px';
                    marker.style.width = e.offsetWidth + 'px';
                }
            }

        });
    };

    qs('input').addEventListener('mouseover', (e) => {
        moveIndicator(hamburger);
        marker.classList.add('inCenter');

        if(e.target.checked) {
            otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
            otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/menu-hover.mp3`;
            otherSoundsAudio.play();
        }
    });
    qs('input').addEventListener('mouseleave', () => {
        if(qs('.option-chosen')) {
            marker.classList.remove('inCenter');
            marker.style.left = qs('.option-chosen').offsetLeft + 'px';
            marker.style.width = qs('.option-chosen').offsetWidth + 'px';
            return;
        };
    });
    action_items_bar.addEventListener('mouseleave', () => {
        if(qs('.option-chosen')) {
            marker.style.left = qs('.option-chosen').offsetLeft + 'px';
            marker.style.width = qs('.option-chosen').offsetWidth + 'px';
            return;
        };

        marker.style.left = hamburger.offsetLeft + 'px';
        marker.style.width = hamburger.offsetWidth + 'px';
        marker.classList.add('inCenter');
    });
    
    window.addEventListener('keydown', addingEscapeBtn);
};