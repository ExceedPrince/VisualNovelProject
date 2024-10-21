import { convertDataTwoWays } from './convert-data-two-ways.mjs';
import { GAME_DATA_1, GAME_DATA_2 } from '../constants/statics.mjs';

export const saveProgressWithImage = (storyContainer, currentGameSetting, slotNumber) => {
	html2canvas(storyContainer).then((canvas) => {
		const scale = 0.15;
		const scaledCanvas = document.createElement('canvas');
		scaledCanvas.width = canvas.width * scale;
		scaledCanvas.height = canvas.height * scale;

		const ctx = scaledCanvas.getContext('2d');
		ctx.scale(scale, scale);
		ctx.drawImage(canvas, 0, 0);

		const dataURL = scaledCanvas.toDataURL('image/png', 0.2);

		currentGameSetting.savingSlots[slotNumber].image = dataURL;
		const splittedData = convertDataTwoWays(currentGameSetting);
	
		localStorage.setItem(GAME_DATA_1, splittedData[0]); 
		localStorage.setItem(GAME_DATA_2, splittedData[1]); 
	});
};