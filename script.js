import { preloadPage } from './script/pages/preload-page.mjs';
import { qs } from './script/utils/commons.mjs';
import { getGameData } from './script/utils/get-game-data.mjs';
import { isInElectron } from './script/utils/is-in-electron.mjs';

let gameSettings = null;
let compatibleState = {isCompatible: window.innerWidth >= 768};
const deviceWarningPage = `
	<div id="deviceWarning-container">
		<h1>Warning</h1>
		<p>This game is designed for devices with a resolution of 768px or higher and is optimized for PC, or with a screen ratio greater than 4:3.</p>
		<br>
		<p>Please switch to a compatible device and refresh to continue playing.</p>
		<img class="flashing_1sec_delay" src="./img/svg/full-screen.svg" alt="full-screen">
	</div>
`;

function adjustScale() {
	const root = document.getElementById('root');
	const colorCover = document.getElementById('colorCover');
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const screenRatio = screenWidth / screenHeight;
    const sixteenNineRatio = 16 / 9;

	if (screenWidth < 1024) {
	
		// Calculate the scale to maintain a 4:3 ratio
		const scale = Math.min(screenWidth / 1024, screenHeight / 768);
	
		// Apply the scale and center the root element
		root.style.transform = `scale(${screenHeight < 768 ? '1' : scale})`;
	
		// Center the root element by adjusting margins
		const marginLeft = (screenWidth - 1024 * scale) / 2;
		const marginTop = (screenHeight - 768 * scale) / 2;
		root.style.left = `${marginLeft}px`;
		root.style.top = `${marginTop}px`;
	
		colorCover.style.transform = `scale(${screenHeight < 768 ? '1' : scale})`;
		colorCover.style.left = `${marginLeft}px`;
		colorCover.style.top = `${marginTop}px`;
    } else {
		root.style.transform = 'scale(1)';
		root.style.left = '';
		root.style.top = '';
		colorCover.style.transform = 'scale(1)';
		colorCover.style.left = '';
		colorCover.style.top = '';
	}

	if (screenHeight < 768) {
		// Magasság kisebb, mint 768px - tartalom 4:3 arányban zsugorodik
		const targetHeight = screenHeight; // Tartalom magassága a képernyő magassága
		const targetWidth = targetHeight * (4 / 3); // 4:3 arány alapján kiszámított szélesség

		// Középre igazítás
		const marginLeft = (screenWidth - targetWidth) / 2;
		const marginTop = (screenHeight - targetHeight) / 2;

		root.style.width = `${targetWidth}px`;
		root.style.height = `${targetHeight}px`;
		root.style.left = `${marginLeft}px`;
		root.style.top = `${marginTop}px`;

		colorCover.style.width = `${targetWidth}px`;
		colorCover.style.height = `${targetHeight}px`;
		colorCover.style.left = `${marginLeft}px`;
		colorCover.style.top = `${marginTop}px`;
	} else {
		root.style.transform = 'scale(1)';
		root.style.left = '';
		root.style.top = '';
		root.style.width = '';
		root.style.height = '';
		colorCover.style.transform = 'scale(1)';
		colorCover.style.left = '';
		colorCover.style.top = '';
		colorCover.style.width = '';
		colorCover.style.height = ''
	}

	if (screenWidth > 2560 && screenHeight > 768 && screenRatio > sixteenNineRatio) {
		const targetHeight = screenHeight;
		const targetWidth = targetHeight * sixteenNineRatio;

		root.style.width = `${targetWidth}px`;

		colorCover.style.width = `${targetWidth}px`;
	}

	if (qs('#mainMenu_container')) {
		const marker = document.querySelector('#marker');

		if (marker.classList.contains('inCenter')) {
			const hamburger = document.querySelector('.hamburger');
			marker.style.left = hamburger.offsetLeft + 'px';
			marker.style.width = hamburger.offsetWidth + 'px';
		}

		if (qs('.mainMenu_options.option-chosen')) {
			console.log('chosen-es')
			marker.style.left = qs('.mainMenu_options.option-chosen').offsetLeft + 'px';
			marker.style.width = qs('.mainMenu_options.option-chosen').offsetWidth + 'px';
		}
	}

	const minimumHeightForFourThreeRatio = (768 / 4) * 3;

	if (window.innerWidth < 768 || screenHeight < minimumHeightForFourThreeRatio || screenRatio < 4 / 3) {
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