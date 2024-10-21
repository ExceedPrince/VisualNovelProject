import { preloadPage } from './script/pages/preload-page.mjs';
import { qs } from './script/utils/commons.mjs';
import { getGameData } from './script/utils/get-game-data.mjs';

let gameSettings = null;

function _load() {
	gameSettings = getGameData();

	preloadPage(gameSettings);
};
	
window.addEventListener("load", _load);

window.addEventListener("click", () => {
	if (gameSettings.settings.audio.silenceAll) {
		return;
	}

	const mouseAudio = qs('#mouse_audio');
	mouseAudio.play();
})