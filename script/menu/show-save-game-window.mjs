import { qs, qsa } from "../utils/commons.mjs";
import { createDateForSaving } from '../utils/create-data-for-saving.mjs';
import { saveProgressWithImage } from '../utils/save-progress-with-image.mjs';

export const showSaveGameWindow = (pageType, saveGame_window, innerMenu_window, state, gameSettings, slotNumber, sceneNumber, stepNumber) => {
    saveGame_window.innerHTML = '<div id="saveGame_window_inner"></div>';
    const saveGame_window_inner = qs('#saveGame_window_inner');

    // Clear previous slots
    saveGame_window_inner.innerHTML = '';

    gameSettings.savingSlots.slice(0, 6).map((slot) => {
        saveGame_window_inner.insertAdjacentHTML("beforeend", `
            <div id="saveSlot_${slot.id}" class="saveSlot">
                <div class="saveSlot_inner">
                    <img src="${slot.image || ""}" alt="Save Slot Image"/>
                </div>
                <p class="saveSlot_date">${slot.dateTime || '-'}</p>
            </div>
        `);
    });

    const storyContainer = qs('#storyContainer');
    const mobileContainer = qs('#mobileContainer');
    const currentContainer = storyContainer || mobileContainer;
    const textingStatus = pageType === 'MOBILE' ? JSON.parse(localStorage.getItem('textingStatus')) : null;

    const saveSlots = qsa('.saveSlot');
    saveSlots.forEach((slotElement) => {
        slotElement.addEventListener('click', () => {
            const slotId = slotElement.id.split('_')[1];

			if (gameSettings.savingSlots[slotId].dateTime) {
				saveGame_window_inner.innerHTML = `
					<h2>Are you sure you want to overwrite this saving slot?</h2>
					<div>
						<button type="button" id="overWriteSaveYesBtn">Yes</button>
						<button type="button" id="overWriteSaveNoBtn">No</button>
					</div>
				`;

				const overWriteSaveYesBtn = qs('#overWriteSaveYesBtn');
				const overWriteSaveNoBtn = qs('#overWriteSaveNoBtn');
				
				overWriteSaveNoBtn.addEventListener('click', () => {
					showSaveGameWindow(pageType, saveGame_window, innerMenu_window, state, gameSettings, slotNumber, sceneNumber, stepNumber);
				});

				overWriteSaveYesBtn.addEventListener('click', () => {
                    let currentGameSlotObject = { ...gameSettings.savingSlots[slotNumber] }; // Create a shallow copy
                    currentGameSlotObject.currentScene = sceneNumber.toString().padStart(4, '0');
                    currentGameSlotObject.currentStep = stepNumber;
                    currentGameSlotObject.dateTime = createDateForSaving();
                    currentGameSlotObject.id = slotId.toString();
                    currentGameSlotObject.currentSceneType = pageType;

                    if (textingStatus) currentGameSlotObject.textingStatus = textingStatus;
        
                    // Update the game settings
                    gameSettings.savingSlots[slotId] = currentGameSlotObject;
					
					saveProgressWithImage(currentContainer, gameSettings, slotId);

					innerMenu_window.classList.remove('fadeIn');
                    innerMenu_window.classList.add('fadeOut');

                    setTimeout(() => {
                        state.openedMenuPoint = null;
                        showSaveGameWindow(pageType, saveGame_window, innerMenu_window, state, gameSettings, slotNumber, sceneNumber, stepNumber);
                        innerMenu_window.innerHTML = '';
                    }, 2000);
        
				});

				return;
			}

            let currentGameSlotObject = { ...gameSettings.savingSlots[slotNumber] }; // Create a shallow copy
            currentGameSlotObject.currentScene = sceneNumber.toString().padStart(4, '0');
            currentGameSlotObject.currentStep = stepNumber;
            currentGameSlotObject.dateTime = createDateForSaving();
            currentGameSlotObject.id = slotId.toString();
            currentGameSlotObject.currentSceneType = pageType;

            if (textingStatus) currentGameSlotObject.textingStatus = textingStatus;

            // Update the game settings
            gameSettings.savingSlots[slotId] = currentGameSlotObject;

            saveProgressWithImage(currentContainer, gameSettings, slotId);

            innerMenu_window.classList.remove('fadeIn');
            innerMenu_window.classList.add('fadeOut');

            setTimeout(() => {
                state.openedMenuPoint = null;
                showSaveGameWindow(pageType, saveGame_window, innerMenu_window, state, gameSettings, slotNumber, sceneNumber, stepNumber);
                innerMenu_window.innerHTML = '';
            }, 2000);
        });
    });
};