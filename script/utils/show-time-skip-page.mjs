import { qs } from '../utils/commons.mjs';
import { storyPage } from "../pages/story-page.mjs";
import { mobilePage } from '../pages/mobile-page.mjs';
import { STORY, MOBILE } from '../constants/statics.mjs';
import { parts } from '../constants/parts.mjs';
import { mobileParts } from '../constants/mobile-parts.mjs';

export const showTimeSkipPage = (root, timeSkipNext, data, gameSettings) => {
	root.insertAdjacentHTML("afterbegin", `
		<div id="storyContainer" class="" tabindex="0">
			<div id="timeSkipContainer">${timeSkipNext.content}</div>
		</div>
	`);

    root.classList.remove('fadeOut');
	root.classList.add('fadeIn');

    const storyContainer = qs('#storyContainer');
    storyContainer.focus();

    function timeSkip(action = '', event = null) {
        if (action === 'keydown' && event.key !== 'ArrowRight') {
            return;
        }

        root.classList.remove('fadeIn');
		root.classList.add('fadeOut');

        localStorage.setItem('sceneChanged', 'true');

        storyContainer.removeEventListener("click", timeSkip);
        storyContainer.removeEventListener("keydown", timeSkip);

        setTimeout(() => {
            root.innerHTML = '';

            setTimeout(() => {
                if (timeSkipNext.nextSceneType === STORY) {
                    storyPage(timeSkipNext.isInEnding ? data : parts, +timeSkipNext.nextSceneNumber, gameSettings);
                }
                if (timeSkipNext.nextSceneType === MOBILE) {
                    mobilePage(mobileParts, +timeSkipNext.nextSceneNumber, gameSettings);
                }
            }, 1000);
        }, 2000);
    };

    storyContainer.addEventListener('click', () => timeSkip());
    storyContainer.addEventListener('keydown', (e) => timeSkip('keydown', e));
};