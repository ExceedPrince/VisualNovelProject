import { defaultGameData } from '../constants/default-game-data.mjs';
import { GAME_DATA_1, GAME_DATA_2 } from '../constants/statics.mjs';
import { convertDataTwoWays } from './convert-data-two-ways.mjs';
import { getDataFromTwoWays } from './get-data-from-two-ways.mjs';

export const getGameData = () => {
	const localData1 = localStorage.getItem(GAME_DATA_1);
	const localData2 = localStorage.getItem(GAME_DATA_2);
  
	if (!localData1 || !localData2) {
		const splittedData = convertDataTwoWays(defaultGameData);
	  	localStorage.setItem(GAME_DATA_1, splittedData[0]);
	  	localStorage.setItem(GAME_DATA_2, splittedData[1]);
	  	return defaultGameData;
	} else {
	  	try {
			return JSON.parse(getDataFromTwoWays([localData1, localData2]));
	  	} catch (error) {
			console.error('Error decoding local data:', error);
			return defaultGameData;
	  	}
	}
};