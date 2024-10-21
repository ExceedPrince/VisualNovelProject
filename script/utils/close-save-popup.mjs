import { qs } from './commons.mjs';

export const closeSavePopup = (saveContainer) => {
	saveContainer.classList.remove('fadeIn');
	saveContainer.classList.add('fadeOut');

	const saveBG = qs('#save_BG');
	const storyContainer = qs('#storyContainer');
	const mobileContainer = qs('#mobileContainer');

	saveBG.remove();

	setTimeout(() => {
		saveContainer.remove();

		if (storyContainer) storyContainer.focus();
		if (mobileContainer) mobileContainer.focus();
	}, 2000);
};