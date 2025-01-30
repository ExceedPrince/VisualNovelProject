import { qs, qsa } from '../../utils/commons.mjs';
import { SETTINGS_OPEN } from '../../constants/statics.mjs';

import { convertDataTwoWays } from '../../utils/convert-data-two-ways.mjs';
import { GAME_DATA_1, GAME_DATA_2 } from '../../constants/statics.mjs';
import { useGameSettings } from '../../utils/use-game-settings.mjs';
import { isInElectron } from '../../utils/is-in-electron.mjs';

export const openSettings = (mainColumn_1, gameSettings, state) => {

    if (state.openedMenuPoint === SETTINGS_OPEN) {
        qs('#settings_inner').classList.remove('fadeIn');
        qs('#settings_inner').classList.add('fadeOut');

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
        mainColumn_1.innerHTML = '<div id="settings_inner" class="fadeIn"></div>';
        const settingsInner = qs('#settings_inner');

        state.openedMenuPoint = SETTINGS_OPEN;
    
        showSettings(gameSettings, settingsInner);
    }, mainColumn_1.firstChild ? 2000 : 0);
};

const showSettings = async (gameSettings, settingsInner) => {
    settingsInner.insertAdjacentHTML('beforeend', `
        <div id="settings_ranges">
            <p id="brightness_section">Brightness: <span>${gameSettings.settings.screen.brightness}</span>%</p>
            <input type="range" id="brightness_input" name="brightness" data-location="screen" value="${gameSettings.settings.screen.brightness}" min="0" max="200" step="1" />
            <p id="saturation_section">Saturation: <span>${gameSettings.settings.screen.saturation}</span>%</p>
            <input type="range" id="saturation_input" name="saturation" data-location="screen" value="${gameSettings.settings.screen.saturation}" min="0" max="200" step="1" />
            <p id="colorTemperature_section">Color Temperature: <span>${gameSettings.settings.screen.colorTemperature}</span>%</p>
            <input type="range" id="colorTemperature_input" name="colorTemperature" data-location="screen" value="${gameSettings.settings.screen.colorTemperature}" min="0" max="100" step="1" />
            <p id="bgMusic_section">Background Music: <span>${gameSettings.settings.audio.bgMusic}</span>%</p>
            <input type="range" id="bgMusic_input" name="bgMusic" data-location="audio" value="${gameSettings.settings.audio.bgMusic}" min="0" max="100" step="1" />
            <p id="soundEffects_section">Sound Effects: <span>${gameSettings.settings.audio.soundEffects}</span>%</p>
            <input type="range" id="soundEffects_input" name="soundEffects" data-location="audio" value="${gameSettings.settings.audio.soundEffects}" min="0" max="100" step="1" />
            <p id="mouseSounds_section">Mouse Sounds: <span>${gameSettings.settings.audio.mouseSounds}</span>%</p>
            <input type="range" id="mouseSounds_input" name="mouseSounds" data-location="audio" value="${gameSettings.settings.audio.mouseSounds}" min="0" max="100" step="1" />
        </div>
        <div id="settings_checkboxes">
            <label>
                Fullscreen:
                <input type="checkbox" id="isFullScreen_checkbox" data-location="screen" name="isFullScreen" ${gameSettings.settings.screen.isFullScreen && 'checked'}>
            </label>
            <label>
                Turn Typing Off:
                <input type="checkbox" id="isTypingOff_checkbox" data-location="screen" name="isTypingOff" ${gameSettings.settings.screen.isTypingOff && 'checked'}>
            </label>
            <label>
                Silence All:
                <input type="checkbox" id="silenceAll_checkbox" data-location="audio" name="silenceAll" ${gameSettings.settings.audio.silenceAll && 'checked'}>
            </label>
        </div>
        <button id="settingReset_btn">Reset All</button>
    `);

    const bg_music_audio = qs('#bg_music_audio');
    const otherSoundsAudio = qs('#other_sound_effects_audio');
    const mouse_audio = qs('#mouse_audio');

    const allRangeInput = qsa('#settings_ranges input');
    allRangeInput.forEach((element) => {
        element.addEventListener('mouseover', () => {
            otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
            otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/load-hover.mp3`;
            otherSoundsAudio.play();
        });

        element.addEventListener('change', (e) => {
            const location = e.target.getAttribute('data-location');

            gameSettings.settings[location][e.target.name] = +e.target.value;

            useGameSettings(gameSettings.settings, qs('#root'), qs('#colorCover'));
            qs(`#${e.target.name}_section span`).innerText = e.target.value;

            const silenceAll_checkbox = qs('#silenceAll_checkbox');

            if(e.target.name === 'soundEffects') {
                otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/proceed.mp3`;
                otherSoundsAudio.play();
            }

            if (bg_music_audio.volume === 0 && otherSoundsAudio.volume === 0 && mouse_audio.volume === 0) {
                gameSettings.settings.audio.silenceAll = true;
                silenceAll_checkbox.checked = true;
            } else {
                gameSettings.settings.audio.silenceAll = false;
                silenceAll_checkbox.checked = false;
            }

            const splittedData = convertDataTwoWays(gameSettings);
	
            localStorage.setItem(GAME_DATA_1, splittedData[0]); 
            localStorage.setItem(GAME_DATA_2, splittedData[1]); 
        });
    });

    const allCheckboxInput = qsa('#settings_checkboxes input');
    allCheckboxInput.forEach((element) => {
        element.addEventListener('change', (e) => {
            const location = e.target.getAttribute('data-location');

            gameSettings.settings[location][e.target.name] = e.target.checked;

            const bg_music_audio = qs('#bg_music_audio');
            const otherSoundsAudio = qs('#other_sound_effects_audio');
            const mouse_audio = qs('#mouse_audio');

            const bgMusic_sectionSpan = qs('#bgMusic_section span');
            const soundEffects_sectionSpan = qs('#soundEffects_section span');
            const mouseSounds_sectionSpan = qs('#mouseSounds_section span');

            const bgMusic_input = qs('#bgMusic_input');
            const soundEffects_input = qs('#soundEffects_input');
            const mouseSounds_input = qs('#mouseSounds_input');

            switch (e.target.name) {
                case 'isFullScreen':
                    if (isInElectron()) {
                        window.electron.toggleFullscreen();
                    } else {
                        console.log('isFullScreen');
                    }
                    break;
                case 'silenceAll':
                    if (e.target.checked) {
                        gameSettings.settings.audio.bgMusic = 0;
                        gameSettings.settings.audio.soundEffects = 0;
                        gameSettings.settings.audio.mouseSounds = 0;

                        bgMusic_sectionSpan.innerText = 0;
                        soundEffects_sectionSpan.innerText = 0;
                        mouseSounds_sectionSpan.innerText = 0;

                        bg_music_audio.volume = gameSettings.settings.audio.bgMusic / 100;
                        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects / 100;
                        mouse_audio.volume = gameSettings.settings.audio.mouseSounds / 100;

                        bgMusic_input.value = 0;
                        soundEffects_input.value = 0;
                        mouseSounds_input.value = 0;
                    } else {
                        gameSettings.settings.audio.bgMusic = 70;
                        gameSettings.settings.audio.soundEffects = 70;
                        gameSettings.settings.audio.mouseSounds = 70;

                        bgMusic_sectionSpan.innerText = 70;
                        soundEffects_sectionSpan.innerText = 70;
                        mouseSounds_sectionSpan.innerText = 70;

                        bg_music_audio.volume = gameSettings.settings.audio.bgMusic / 100;
                        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects / 100;
                        mouse_audio.volume = gameSettings.settings.audio.mouseSounds / 100;

                        bgMusic_input.value = 70;
                        soundEffects_input.value = 70;
                        mouseSounds_input.value = 70;
                    }
                    break;
            }

            const splittedData = convertDataTwoWays(gameSettings);

            localStorage.setItem(GAME_DATA_1, splittedData[0]); 
            localStorage.setItem(GAME_DATA_2, splittedData[1]); 
        });
    });

    const settingReset_btn = qs('#settingReset_btn');
    const isFullScreen_checkbox = qs('#isFullScreen_checkbox');
    const isFullscreenElectron = await window.electron.checkIsFullscreen();
    
    if (isInElectron() && gameSettings.settings.screen.isFullScreen !== isFullscreenElectron) {
        isFullScreen_checkbox.checked = isFullscreenElectron;
        gameSettings.settings.screen.isFullScreen = isFullscreenElectron;
	}

    settingReset_btn.addEventListener('mouseover', () => {
        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/menu-hover.mp3`;
        otherSoundsAudio.play();
    });

    settingReset_btn.addEventListener('click', () => {
        const defaultGameData = {
            settings: {
                screen: {
                    brightness: 100,
                    saturation: 100,
                    colorTemperature: 50,
                    isFullScreen: gameSettings.settings.screen.isFullScreen,
                    isTypingOff: false
                },
                audio: {
                    bgMusic: 70,
                    soundEffects: 70,
                    mouseSounds: 70,
                    silenceAll: false
                }
            }
        };
        
        //Screen part
        const brightness_sectionSpan = qs('#brightness_section span');
        const saturation_sectionSpan = qs('#saturation_section span');
        const colorTemperature_sectionSpan = qs('#colorTemperature_section span');

        const brightness_input = qs('#brightness_input');
        const saturation_input = qs('#saturation_input');
        const colorTemperature_input = qs('#colorTemperature_input');
        const isTypingOff_checkbox = qs('#isTypingOff_checkbox');

        brightness_sectionSpan.innerText = defaultGameData.settings.screen.brightness;
        saturation_sectionSpan.innerText = defaultGameData.settings.screen.saturation;
        colorTemperature_sectionSpan.innerText = defaultGameData.settings.screen.colorTemperature;

        brightness_input.value = defaultGameData.settings.screen.brightness;
        saturation_input.value = defaultGameData.settings.screen.saturation;
        colorTemperature_input.value = defaultGameData.settings.screen.colorTemperature;

        isTypingOff_checkbox.checked = defaultGameData.settings.audio.isTypingOff_checkbox;

        useGameSettings(defaultGameData.settings, qs('#root'), qs('#colorCover'));

        // Music part
        const bg_music_audio = qs('#bg_music_audio');
        const otherSoundsAudio = qs('#other_sound_effects_audio');
        const mouse_audio = qs('#mouse_audio');

        const bgMusic_sectionSpan = qs('#bgMusic_section span');
        const soundEffects_sectionSpan = qs('#soundEffects_section span');
        const mouseSounds_sectionSpan = qs('#mouseSounds_section span');

        const bgMusic_input = qs('#bgMusic_input');
        const soundEffects_input = qs('#soundEffects_input');
        const mouseSounds_input = qs('#mouseSounds_input');
        const silenceAll_checkbox = qs('#silenceAll_checkbox');

        bgMusic_sectionSpan.innerText = defaultGameData.settings.audio.bgMusic;
        soundEffects_sectionSpan.innerText = defaultGameData.settings.audio.soundEffects;
        mouseSounds_sectionSpan.innerText = defaultGameData.settings.audio.mouseSounds;

        bg_music_audio.volume = defaultGameData.settings.audio.bgMusic / 100;
        otherSoundsAudio.volume = defaultGameData.settings.audio.soundEffects / 100;
        mouse_audio.volume = defaultGameData.settings.audio.mouseSounds / 100;

        bgMusic_input.value = defaultGameData.settings.audio.bgMusic;
        soundEffects_input.value = defaultGameData.settings.audio.soundEffects;
        mouseSounds_input.value = defaultGameData.settings.audio.mouseSounds;

        silenceAll_checkbox.checked = defaultGameData.settings.audio.silenceAll;

        //Save all
        gameSettings.settings = defaultGameData.settings;

        const splittedData = convertDataTwoWays(gameSettings);

        localStorage.setItem(GAME_DATA_1, splittedData[0]); 
        localStorage.setItem(GAME_DATA_2, splittedData[1]);
    });
};