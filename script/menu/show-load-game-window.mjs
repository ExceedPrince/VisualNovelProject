import { qs, qsa } from "../utils/commons.mjs";
import { parts } from '../constants/parts.mjs';
import { storyPage } from '../pages/story-page.mjs';
import { mobilePage } from "../pages/mobile-page.mjs";
import { mobileParts } from "../constants/mobile-parts.mjs";
import { isInElectron } from "../utils/is-in-electron.mjs";

export const showLoadGameWindow = (loadGame_window, state, gameSettings, timeState) => {
    if (loadGame_window.children.length === 0) {
        gameSettings.savingSlots.slice(0, 6).map((slot) => {
            loadGame_window.insertAdjacentHTML("beforeend", `
                <div id="loadSlot_${slot.id}" class="loadSlot">
                    <div class="loadSlot_inner ${slot.image ? 'loadable' : ''}">
                        <img src="${slot.image || (isInElectron() ? '.' : '../..') + '/img/assets/empty_slot.png'}" data-slot-number="${slot.id}"/>
                    </div>
                    <p class="loadSlot_date">${slot.dateTime || '-'}</p>
                </div>
            `);
        });
    }

    const bgMusicAudio = qs('#bg_music_audio');
    const otherSoundsAudio = qs('#other_sound_effects_audio');

    qsa('.loadSlot_inner img').forEach((slot) => {
        slot.addEventListener('mouseover', () => {
            if (!qs('#root').classList.contains('fadeOut')) {
                otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
                otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/load-hover.mp3`;
                otherSoundsAudio.play();
            }
        });
    });

    const loadImages = qsa('.loadSlot_inner.loadable img');
    loadImages.forEach((img) => {
        img.addEventListener('click', () => {
            const slotNumber = img.getAttribute('data-slot-number');
            loadGame_window.classList.add('noGrid');

            loadGame_window.innerHTML = `
					<h2>Are you sure you want to load another game slot? Any unsaved progress will be lost.</h2>
					<div>
						<button type="button" id="loadYesBtn">Yes</button>
						<button type="button" id="loadNoBtn">No</button>
					</div>
				`;

			const loadYesBtn = qs('#loadYesBtn');
			const loadNoBtn = qs('#loadNoBtn');

            [loadYesBtn, loadNoBtn].forEach((button) => {
                button.addEventListener('mouseover', () => {
                    otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
                    otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/menu-hover.mp3`;
                    otherSoundsAudio.play();
                });
            });

            loadNoBtn.addEventListener('click', () => {
                loadGame_window.innerHTML = '';
                loadGame_window.classList.remove('noGrid');

                otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
                otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/cancel.mp3`;
                otherSoundsAudio.play();

                showLoadGameWindow(loadGame_window, state, gameSettings);
            });

            loadYesBtn.addEventListener('click', () => {
                localStorage.setItem('slotNumber', slotNumber);
                localStorage.setItem('textingStatus', '');

                otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
                otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/proceed.mp3`;
                otherSoundsAudio.play();
    
                root.classList.remove('fadeIn');
                root.classList.add('fadeOut');

                if (timeState) timeState.shouldStopTimeInterval = true;
    
                setTimeout(() => {
                    root.innerHTML = '';
    
                    setTimeout(() => {
                        bgMusicAudio.volume = gameSettings.settings.audio.bgMusic/100;

                        if (gameSettings.savingSlots[slotNumber].currentSceneType === 'STORY') {
                            storyPage(parts, +gameSettings.savingSlots[slotNumber].currentScene, gameSettings, false, true);
                        }
    
                        if (gameSettings.savingSlots[slotNumber].currentSceneType === 'MOBILE') {
                            mobilePage(mobileParts, +gameSettings.savingSlots[slotNumber].currentScene, gameSettings, true);
                        }
                    }, 2000);
                }, 2000);
    
                let startingVolume = gameSettings.settings.audio.bgMusic/100;
                const fadeDuration = 1500;
                const fadeSteps = 50;
                const fadeStepDuration = fadeDuration / fadeSteps;
                
                const fadeOutAudio = () => {
                    bgMusicAudio.volume = Math.max(0, bgMusicAudio.volume - (startingVolume / fadeSteps));
            
                    if (bgMusicAudio.volume > 0) {
                        setTimeout(fadeOutAudio, fadeStepDuration);
                    } else {
                        bgMusicAudio.pause();
                        bgMusicAudio.currentTime = 0;
                    }
                };
                    
                fadeOutAudio();
            });

        });
    })
};