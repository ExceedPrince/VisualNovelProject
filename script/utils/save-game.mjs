import { createDateForSaving } from './create-data-for-saving.mjs';
import { saveProgressWithImage } from './save-progress-with-image.mjs';
import { closeSavePopup } from './close-save-popup.mjs';
import { showAllSavingSlots } from './show-all-saving-slots.mjs';
import { qs } from './commons.mjs';
import { getGameData } from './get-game-data.mjs';

export const saveGame = (pageType, pageContainer, gameSettings, sceneNumber, stepNumber = 1, endingSceneType = null, isQuickSave = false) => {
	const slotNumber = +localStorage.getItem('slotNumber') || 0;
	
	if (isQuickSave && slotNumber >= 6) {
		console.log("ez a tartalék slot vagy új játék") //legyen majd rendes üzenet a ui-on
		return;
	}

	pageContainer.insertAdjacentHTML("afterend", `
		<div id="saveContainer">
			<div id="saveBox">
				<span id="saveXBtn">X</span>
				${isQuickSave ? `
						<h2>Are you sure you want to overwrite this saving slot?</h2>
						<div>
							<button type="button" id="quickSaveYesBtn">Yes</button>
							<button type="button" id="quickSaveNoBtn">No</button>
						</div>
					`
					: `
						<h2>Choose a saving slot</h2>
			 			<div id="saveBox-inner"></div>
					`
				}
			</div>
		</div>
		<div id="save_BG"></div>
	`);

	const saveContainer = qs('#saveContainer');
	const saveBox = qs('#saveBox');
	const saveXBtn = qs('#saveXBtn');
	const saveBoxInner = qs('#saveBox-inner');
	const quickSaveYesBtn = qs('#quickSaveYesBtn');
	const quickSaveNoBtn = qs('#quickSaveNoBtn');
	const saveBG = qs('#save_BG');

	saveContainer.classList.add('fadeIn');

	saveXBtn.addEventListener('click', () => closeSavePopup(saveContainer));
	saveBG.addEventListener('click', () => closeSavePopup(saveContainer));
	
	let currentGameSlotObject = gameSettings.savingSlots[slotNumber];
	let currentGameSetting = gameSettings;

	currentGameSlotObject.currentSceneType = pageType;
	currentGameSlotObject.endingSceneType = endingSceneType;

	if (isQuickSave) {
		quickSaveYesBtn.addEventListener("click", () => {
			currentGameSlotObject.currentScene = sceneNumber.toString().padStart(4, '0');
			currentGameSlotObject.currentStep = stepNumber;
			currentGameSlotObject.dateTime = createDateForSaving();

			if (pageType === 'MOBILE') currentGameSlotObject.currentSceneType = pageType;

			currentGameSetting.savingSlots[slotNumber] = currentGameSlotObject;
			
			saveProgressWithImage(pageContainer, currentGameSetting, slotNumber);

			closeSavePopup(saveContainer);
		});
	
		quickSaveNoBtn.addEventListener("click", () => closeSavePopup(saveContainer));

		return;
	}

	if (pageType === 'STORY') {
		showAllSavingSlots(pageType, currentGameSetting, slotNumber, sceneNumber, stepNumber, endingSceneType, saveContainer, saveBox, saveBoxInner, closeSavePopup, pageContainer);
	}

	if (pageType === 'MOBILE') {
		showAllSavingSlots(pageType, currentGameSetting, slotNumber, sceneNumber, stepNumber, endingSceneType, saveContainer, saveBox, saveBoxInner, closeSavePopup, pageContainer);
	}
};