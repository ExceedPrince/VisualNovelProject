import { qs } from '../commons.mjs';
import { parts } from '../../constants/parts.mjs';
import { mobileParts } from '../../constants/mobile-parts.mjs';
import { storyPage } from '../../pages/story-page.mjs';
import { showTimeSkipPage } from '../show-time-skip-page.mjs';
import { isInElectron } from '../is-in-electron.mjs';

const mobileExitDialogs = {
    timeSkipNext: [
        {title: 'Time moves on...', btn: 'Push Forward'},
        {title: 'Later that day...', btn: 'Proceed Further'},
        {title: 'After some time...', btn: 'Onward'},
        {title: 'Hours pass by...', btn: 'Advance'}
    ],
    exit: [
        {title: 'Let\'s close the day here', btn: 'Go to Bed'},
        {title: 'Time to End the Conversations', btn: 'Say Goodnight'},
        {title: 'Let\'s Wrap Up the Day', btn: 'Get Some Rest'},
        {title: 'Let\'s Wind Down the Day', btn: 'Turn In'},
        {title: 'The Evening is Over', btn: 'Goodnight'},
        {title: 'Let\'s Enjoy some Quiet Moments', btn: 'Call it a Night'},
        {title: 'Let\'s Conclude the Day', btn: 'Sleep Well'},
        {title: 'Time to Take a Rest', btn: 'End Day'},
        {title: 'Let\'s Let the Conversations Fade', btn: 'Say Goodbye'},
        {title: 'Night is Approaching', btn: 'Bedtime'},
    ]
}

const selectMobileDialog = (mobileExitDialogs, timeSkipNext) => {
    let array = null;

    if (timeSkipNext) {
        array = mobileExitDialogs.timeSkipNext;
    } else {
        array = mobileExitDialogs.exit;
    }

    return array[Math.floor(Math.random() * array.length)];
};

export const exitFromMobilePage = (gameSettings, mobilePartindex, nextStoryScene) => {
    const root = qs('#root');
    const mobile_popup = qs('#mobile_popup');
    const mobilePopup_innerContainer = qs('#mobilePopup_innerContainer');

    const selectedExitDialog = selectMobileDialog(mobileExitDialogs, mobileParts[mobilePartindex].timeSkipNext)

    if (mobilePopup_innerContainer.innerHTML !== '') {
        mobilePopup_innerContainer.innerHTML = '';
    }
    
    mobilePopup_innerContainer.insertAdjacentHTML('beforeend', `
        <h2>${selectedExitDialog.title}</h2>
        <div id="mobileExitBtnContainer">
            <button>${selectedExitDialog.btn}</button>
        </div>
    `);

    mobile_popup.classList.remove('fadeOut');
    mobile_popup.classList.add('fadeIn');

    const otherSoundsAudio = qs('#other_sound_effects_audio');
    const forwardBtn = qs('#mobileExitBtnContainer button');

    forwardBtn.addEventListener('mouseover', () => {
        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/menu-hover.mp3`;
        otherSoundsAudio.play();
    });

    forwardBtn.addEventListener('click', () => {
        root.classList.remove('fadeIn');
        root.classList.add('fadeOut');
    
        localStorage.setItem('sceneChanged', 'true');
    
        const audioSettings = gameSettings.settings.audio;
        const bgMusicAudio = qs('#bg_music_audio');
        let startingVolume = audioSettings.bgMusic/100;
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

        otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/proceed.mp3`;
        otherSoundsAudio.play();
            
        fadeOutAudio();
		
        setTimeout(() => {
            root.innerHTML = '';
    
            if (mobileParts[mobilePartindex].timeSkipNext) {
                localStorage.setItem('sceneChanged', 'false');
                showTimeSkipPage(root, mobileParts[mobilePartindex].timeSkipNext, mobileParts, gameSettings);
            } else {
                storyPage(parts, +nextStoryScene, gameSettings);
            }
        }, 2000);
    })

};