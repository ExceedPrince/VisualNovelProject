import { preloadPage } from './script/pages/preload-page.mjs';
import { qs } from './script/utils/commons.mjs';
import { getGameData } from './script/utils/get-game-data.mjs';
import { isInElectron } from './script/utils/is-in-electron.mjs';

let gameSettings = null;
let compatibleState = {isCompatible: window.innerWidth >= 768};
const deviceWarningPage = `
	<div id="deviceWarning-container">
		<h1>Warning</h1>
		<p>This game is designed for devices with a resolution of 768px or higher and is optimized for PC.</p>
		<br>
		<p>Please switch to a compatible device and refresh to continue playing.</p>
		<img class="flashing_1sec_delay" src="./img/svg/full-screen.svg" alt="full-screen">
	</div>
`;

function adjustScale() {
	const root = document.getElementById('root');
	const colorCover = document.getElementById('colorCover');

	if (window.innerWidth < 1024) {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
	
		// Calculate the scale to maintain a 4:3 ratio
		const scale = Math.min(screenWidth / 1024, screenHeight / 768);
	
		// Apply the scale and center the root element
		root.style.transform = `scale(${scale})`;
	
		// Center the root element by adjusting margins
		const marginLeft = (screenWidth - 1024 * scale) / 2;
		const marginTop = (screenHeight - 768 * scale) / 2;
		root.style.left = `${marginLeft}px`;
		root.style.top = `${marginTop}px`;
	
		colorCover.style.transform = `scale(${scale})`;
    } else {
		root.style.transform = `scale(1)`;
		colorCover.style.transform = `scale(1)`;
	}

	if (window.innerWidth < 768) {
		compatibleState.isCompatible = false;
		root.innerHTML = deviceWarningPage;
	}
}

function _load() {
	gameSettings = getGameData();

	if (isInElectron() && gameSettings.settings.screen.isFullScreen) {
		window.electron.toggleFullscreen();
	}

	if (compatibleState.isCompatible) {
		preloadPage(gameSettings, compatibleState, deviceWarningPage);
	} else {
		root.innerHTML = deviceWarningPage;
	}
};
	
window.addEventListener("load", _load);
adjustScale();
window.addEventListener('resize', adjustScale);

window.addEventListener("click", () => {
	if (gameSettings.settings.audio.silenceAll) {
		return;
	}

	const mouseAudio = qs('#mouse_audio');
	mouseAudio.play();
})