import { qs } from "../commons.mjs";
import { isInElectron } from "../is-in-electron.mjs";

const isNameArray = (name, chatObj) => typeof name === 'object' && name !== null && chatObj.choicePath;

export function playMobileSounds(isSoundEffect, isBGMusic, name, gameSettings, chatObj = null) {
    const audioSettings = gameSettings.settings.audio;
    const otherSoundsAudio = qs('#other_sound_effects_audio');
    const bgMusic_Audio = qs('#bg_music_audio');

    if (isSoundEffect && otherSoundsAudio) {
        otherSoundsAudio.src = '';

        otherSoundsAudio.volume = audioSettings.soundEffects/100;
        otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/${name}.mp3`;

        otherSoundsAudio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    }

    if (isBGMusic && bgMusic_Audio && chatObj !== null) {
		const slotNumber = +localStorage.getItem('slotNumber') || 0;
		let character, location, choiceId;

		if (isNameArray(name, chatObj)) {
			[character, location, choiceId] = chatObj.choicePath.split('~');
		} else {
			character = location = choiceId = null;
		}

		const choiceOrderNumber = +gameSettings.savingSlots[slotNumber]?.decisions?.[character]?.[location]?.[choiceId]?.replace('option_', '');
		const selectedName = isNameArray(name, chatObj) ? name[choiceOrderNumber] : name;
		const selectedCommand = isNameArray(name, chatObj) ? chatObj.bgMusic.command[choiceOrderNumber]: chatObj.bgMusic.command;

        if (selectedName && bgMusic_Audio.src.indexOf(selectedName) === -1) {
			bgMusic_Audio.src = `${isInElectron() ? '.' : '../..'}/sounds/bg_musics/${selectedName}.mp3`;
		}

		if (selectedCommand === 'START') {
			bgMusic_Audio.volume = audioSettings.bgMusic/100;
            bgMusic_Audio.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
		}
		if (selectedCommand === 'STOP') {
			bgMusic_Audio.pause();
			bgMusic_Audio.currentTime = 0;
		}
		if (selectedCommand === 'FADE_OUT') {
			let startingVolume = audioSettings.bgMusic/100;
			const fadeDuration = 2000;
			const fadeSteps = 50;
			const fadeStepDuration = fadeDuration / fadeSteps;
			
			const fadeOutAudio = () => {
				bgMusic_Audio.volume = Math.max(0, bgMusic_Audio.volume - (startingVolume / fadeSteps));

				if (bgMusic_Audio.volume > 0) {
				  	setTimeout(fadeOutAudio, fadeStepDuration);
				} else {
                    bgMusic_Audio.pause();
                    bgMusic_Audio.currentTime = 0;
				}
			};
			  
			fadeOutAudio();
		}
	}
}

