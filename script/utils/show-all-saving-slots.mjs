import { qs, qsa } from '../utils/commons.mjs';
import { createDateForSaving } from './create-data-for-saving.mjs';
import { isInElectron } from './is-in-electron.mjs';
import { saveProgressWithImage } from './save-progress-with-image.mjs';

export const showAllSavingSlots = (pageType, gameSettings, slotNumber, sceneNumber, stepNumber, endingSceneType, saveContainer, saveBox, saveBoxInner, closeSavePopup, pageContainer) => {
	gameSettings.savingSlots.slice(0, 6).map((slot) => {
		saveBoxInner.insertAdjacentHTML("beforeend", `
			<div id="saveSlot_${slot.id}" class="saveSlot">
				<div class="saveSlot_inner">
				<image src="${slot.image || (isInElectron() ? '.' : '../..') + '/img/assets/empty_slot.png'}"/>
				</div>
				<p class="saveSlot_date">${slot.dateTime || '-'}</p>
			</div>
		`);
	});

	const textingStatus = pageType === 'MOBILE' ? JSON.parse(localStorage.getItem('textingStatus')) : null;

	const saveSlots = qsa('.saveSlot');
    saveSlots.forEach((slotElement) => {
		const otherSoundsAudio = qs('#other_sound_effects_audio');

		slotElement.querySelector('img').addEventListener('mouseover', () => {
			otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
			otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/load-hover.mp3`;
			otherSoundsAudio.play();
		});

        slotElement.addEventListener('click', () => {
            const slotId = slotElement.id.split('_')[1];

			if (gameSettings.savingSlots[slotId].dateTime) {
				saveBox.classList.add('noGrid');
				saveBox.innerHTML = `
					<h2>Are you sure you want to overwrite this saving slot?</h2>
					<div class="overwriteQuestionBtn">
						<button type="button" id="overWriteSaveYesBtn">Yes</button>
						<button type="button" id="overWriteSaveNoBtn">No</button>
					</div>
				`;

				const overWriteSaveYesBtn = qs('#overWriteSaveYesBtn');
				const overWriteSaveNoBtn = qs('#overWriteSaveNoBtn');
				
				overWriteSaveNoBtn.addEventListener('click', () => {
					saveBox.innerHTML = `<span id="saveXBtn"><img src="${isInElectron() ? '.' : '../..'}/img/svg/x-icon.svg" alt="x-icon"/></span><h2>Choose a saving slot</h2><div id="saveBox-inner"></div>`;
					qs('#saveXBtn').addEventListener('click', () => closeSavePopup(saveContainer));

					otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
					otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/cancel.mp3`;
					otherSoundsAudio.play();

					showAllSavingSlots(pageType, gameSettings, slotNumber, sceneNumber, stepNumber, endingSceneType, saveContainer, saveBox, qs('#saveBox-inner'), closeSavePopup, pageContainer);
				});

				overWriteSaveYesBtn.addEventListener('click', () => {
                    let currentGameSlotObject = { ...gameSettings.savingSlots[slotNumber] }; // Create a shallow copy
                    currentGameSlotObject.currentScene = sceneNumber.toString().padStart(4, '0');
                    currentGameSlotObject.currentStep = stepNumber;
					currentGameSlotObject.currentSceneType = pageType;
					currentGameSlotObject.endingSceneType = endingSceneType;
                    currentGameSlotObject.dateTime = createDateForSaving();
                    currentGameSlotObject.id = slotId.toString();

                    if (textingStatus) currentGameSlotObject.textingStatus = textingStatus;
        
                    // Update the game settings
                    gameSettings.savingSlots[slotId] = currentGameSlotObject;
					
					saveProgressWithImage(pageContainer, gameSettings, slotId);

					otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
					otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/proceed.mp3`;
					otherSoundsAudio.play();

					closeSavePopup(saveContainer);
				});

				return;
			}

			let currentGameSlotObject = { ...gameSettings.savingSlots[slotNumber] }; // Create a shallow copy
            currentGameSlotObject.currentScene = sceneNumber.toString().padStart(4, '0');
            currentGameSlotObject.currentStep = stepNumber;
            currentGameSlotObject.dateTime = createDateForSaving();
            currentGameSlotObject.id = slotId.toString();
			currentGameSlotObject.currentSceneType = pageType;
			currentGameSlotObject.endingSceneType = endingSceneType;

			if (textingStatus) currentGameSlotObject.textingStatus = textingStatus;

            // Update the game settings
            gameSettings.savingSlots[slotId] = currentGameSlotObject;
			
			saveProgressWithImage(pageContainer, gameSettings, slotId);

			closeSavePopup(saveContainer);
		});
	});
};