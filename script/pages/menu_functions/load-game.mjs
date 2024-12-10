import { qs, qsa } from '../../utils/commons.mjs';
import { storyPage } from '../story-page.mjs';
import { parts } from '../../constants/parts.mjs';
import { slotSample } from '../../constants/slot-sample.mjs';
import { LOAD_OPEN } from '../../constants/statics.mjs';
import { mobilePage } from '../mobile-page.mjs';
import { mobileParts } from '../../constants/mobile-parts.mjs';

import { convertDataTwoWays } from '../../utils/convert-data-two-ways.mjs';
import { GAME_DATA_1, GAME_DATA_2 } from '../../constants/statics.mjs';
import { getGameData } from '../../utils/get-game-data.mjs';

export const loadGame = (mainColumn_2, gameSettings, state) => {
    if (state.openedMenuPoint === LOAD_OPEN) {
        qs('#loadBox_inner').classList.remove('fadeIn');
        qs('#loadBox_inner').classList.add('fadeOut');

        setTimeout(() => {
            state.openedMenuPoint = null;
            mainColumn_2.innerHTML = '';
        }, 2000);

        return;
    }

    if (mainColumn_2.firstChild) {
        mainColumn_2.firstChild.classList.remove('fadeIn');
        mainColumn_2.firstChild.classList.add('fadeOut');
    }
    
    setTimeout(() => {
        mainColumn_2.innerHTML = '<div id="loadBox_inner" class="fadeIn"></div>';
        const loadBoxInner = qs('#loadBox_inner');

        state.openedMenuPoint = LOAD_OPEN;
    
        showLoadSlots(gameSettings, loadBoxInner);
    }, mainColumn_2.firstChild ? 2000 : 0);
};

const showLoadSlots = (gameSettings, loadBoxInner) => {
    gameSettings.savingSlots.slice(0, 6).map((slot) => {
        loadBoxInner.insertAdjacentHTML("beforeend", `
            <div id="loadSlot_${slot.id}" class="loadSlot">
                <div class="loadSlot_inner ${slot.image ? 'loadable' : ''}">
                    <img src="${slot.image || ""}" data-slot-number="${slot.id}"/>
                    ${slot.image && `<button id="delete_slotBtn_${slot.id}" class="deleteSlot_btn">kuka</button>`}
                </div>
                <p class="loadSlot_date">${slot.dateTime || '-'}</p>
            </div>
        `);
    });

    const bgMusicAudio = qs('#bg_music_audio');

    const loadImages = qsa('.loadSlot_inner.loadable img');
    loadImages.forEach((img) => {
        img.addEventListener('click', () => {
            const slotNumber = img.getAttribute('data-slot-number');
            localStorage.setItem('slotNumber', slotNumber);

            root.classList.remove('fadeIn');
            root.classList.add('fadeOut');

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
    })

    //Delete part
    const deleteBtns = qsa('.deleteSlot_btn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.id.replace('delete_slotBtn_', '');

            loadBoxInner.innerHTML = '';
            loadBoxInner.insertAdjacentHTML("beforeend", `
                <h2>Are you sure you want to delete this game slot?</h2>
                <div>
                    <button type="button" id="deleteYesBtn">Yes</button>
                    <button type="button" id="deleteNoBtn">No</button>
                </div>
            `);

            const deleteYesBtn = qs('#deleteYesBtn');
            const deleteNoBtn = qs('#deleteNoBtn');

            deleteYesBtn.addEventListener('click', () => {
                const modifiedSample = {...slotSample, id: id}
                gameSettings.savingSlots[id] = modifiedSample;
    
                const splittedData = convertDataTwoWays(gameSettings);
                localStorage.setItem(GAME_DATA_1, splittedData[0]); 
                localStorage.setItem(GAME_DATA_2, splittedData[1]);

                const newGameData = getGameData();

                showLoadSlots(newGameData, loadBoxInner);
            });

            deleteNoBtn.addEventListener('click', () => {
                loadBoxInner.innerHTML = '';

                showLoadSlots(gameSettings, loadBoxInner);
            });
 
        });
    });
};