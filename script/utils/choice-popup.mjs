import { choiceDataBase } from '../constants/choice-database.mjs';
import { qs } from './commons.mjs';
import { saveChoice } from './save-choice.mjs';
import { isInElectron } from "../utils/is-in-electron.mjs";

export const choicePopup = async (sceneId, stepId, textContainer, characterContainer, storyContainer, clickNavigation, arrowNavigation, gameSettings) => {
	textContainer.classList.add('fadeOut');
	characterContainer.classList.add('fadeOut');
	const storyButtonContainer = qs('#storyButtonContainer');
	storyButtonContainer.classList.add('fadeOut', 'noClick');

	storyContainer.insertAdjacentHTML("beforeend", `
		<div id="choiceContainer">
			<div id="choiceBox">
				<h2>${choiceDataBase[sceneId][stepId].question}</h2>
			 	<div id="choiceBox-inner"></div>
			</div>
		</div>
	`)

	const otherSoundsAudio = qs('#other_sound_effects_audio');
	const choiceContainer = qs('#choiceContainer');
	const choiceBoxInner = qs('#choiceBox-inner');

	choiceContainer.classList.add('fadeIn');

	return new Promise((resolve) => {
		const choiceData = choiceDataBase[sceneId][stepId];

        choiceData.options.forEach((item, index) => {
            choiceBoxInner.innerHTML += `<button id="${item.option}" class="choiceBtn">${item.value}</button>`;

            setTimeout(() => {
				qs(`button#${item.option}`).addEventListener("mouseover", () => {
					if (choiceContainer.classList.contains('fadeOut')) return;
					
					otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
					otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/menu-hover.mp3`;
					otherSoundsAudio.play();
				});

                qs(`button#${item.option}`).addEventListener("click", () => {
					const audioSettings = gameSettings.settings.audio;

					otherSoundsAudio.volume = audioSettings.soundEffects/100;
					otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/accepted.mp3`;
					
					otherSoundsAudio.play().catch(error => {
						console.error('Audio playback failed:', error);
					});

                    textContainer.classList.add('fadeIn');
                    textContainer.classList.remove('fadeOut');
                    characterContainer.classList.add('fadeIn');
                    characterContainer.classList.remove('fadeOut');
					storyButtonContainer.classList.add('fadeIn');
					storyButtonContainer.classList.remove('fadeOut', 'noClick');

                    choiceContainer.classList.add('fadeOut');
                    choiceContainer.classList.remove('fadeIn');

					saveChoice(gameSettings, choiceData, item.option, sceneId, stepId);

                    setTimeout(() => {
                        choiceContainer.remove();

						storyContainer.focus();
						storyContainer.addEventListener("keydown", arrowNavigation);
						storyContainer.addEventListener("click", clickNavigation);

                        resolve(true);
                    }, 2000);
                });
            }, 300 * (index + 1));
        });
    });
};