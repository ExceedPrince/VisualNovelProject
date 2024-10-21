import { qs } from '../utils/commons.mjs';

export const playSound = (gameSettings, stepObject, audioSettings, isEndOfScene = false) => {
	const bgMusicAudio = qs('#bg_music_audio');
	const otherSoundsAudio = qs('#other_sound_effects_audio');

	if (audioSettings.silenceAll) {
		return;
	}

	if (stepObject.bgMusic) {
		const slotNumber = +localStorage.getItem('slotNumber') || 0;

		let bgMusicName = stepObject.bgMusic.name;
		let bgMusicCommand = stepObject.bgMusic.command;
		let selectedChoice = null;
 
		if (typeof stepObject.bgMusic.name === 'object' && stepObject.bgMusic.name !== null && stepObject.choicePath) {
			let character, location, choiceId;
			[character, location, choiceId] = stepObject.choicePath.split('~');

			selectedChoice = +gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId].replace('option_', '');

			bgMusicName = stepObject.bgMusic.name[selectedChoice];
			bgMusicCommand = stepObject.bgMusic.command[selectedChoice];
		}

		if (bgMusicName && bgMusicAudio.src.indexOf(bgMusicName) === -1) {
			bgMusicAudio.src = `./sounds/bg_musics/${bgMusicName}.mp3`;
		}

		if (bgMusicCommand === 'START') {
			bgMusicAudio.volume = audioSettings.bgMusic/100;
			bgMusicAudio.play();
		}
		if (bgMusicCommand === 'STOP') {
			bgMusicAudio.pause();
			bgMusicAudio.currentTime = 0;
		}
		if (bgMusicCommand === 'FADE_OUT' && (isEndOfScene || stepObject.timeSkipNext || stepObject.bgMusic.insideOfScene)) {
			let startingVolume = audioSettings.bgMusic/100;
			const fadeDuration = 2000;
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
		}
	}

	if (stepObject.otherSoundEffect && !isEndOfScene) {
		let soundEffectName = stepObject.otherSoundEffect;
		const slotNumber = +localStorage.getItem('slotNumber') || 0;
		let selectedChoice = null;

		if (typeof stepObject.otherSoundEffect === 'object' && stepObject.otherSoundEffect !== null && stepObject.choicePath) {
			let character, location, choiceId;
			[character, location, choiceId] = stepObject.choicePath.split('~');
	
			selectedChoice = +gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId].replace('option_', '');
			
			soundEffectName = stepObject.otherSoundEffect[selectedChoice];
		}

		if (soundEffectName) {
			otherSoundsAudio.volume = audioSettings.soundEffects/100;
			otherSoundsAudio.src = `./sounds/sound_effects/${soundEffectName}.mp3`;
			otherSoundsAudio.play();
		}

	}
};