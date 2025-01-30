import { qs } from '../../utils/commons.mjs';
import { storyPage } from '../story-page.mjs';
import { parts } from '../../constants/parts.mjs';
import { isInElectron } from '../../utils/is-in-electron.mjs';

export const newGame = (root, gameSettings) => {
    root.classList.remove('fadeIn');
    root.classList.add('fadeOut');

    const bgMusicAudio = qs('#bg_music_audio');
    const otherSoundsAudio = qs('#other_sound_effects_audio');

    otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
    otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/proceed.mp3`;
    otherSoundsAudio.play();

    setTimeout(() => {
        root.innerHTML = '';
        setTimeout(() => {
            bgMusicAudio.volume = gameSettings.settings.audio.bgMusic/100;

            const freeSlots = gameSettings.savingSlots.filter((slot) => slot.dateTime === null);

            if (freeSlots.length === 0) {
                localStorage.setItem('slotNumber', '6');
                storyPage(parts, 25, gameSettings, true);
            } else {
                localStorage.setItem('slotNumber', freeSlots[0].id);
                storyPage(parts, 25, gameSettings, true);
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
};