import { 
	createInGameMenu, 
	navbarIconClick, 
	closeInGameMenu,
	refreshFallingIcons
} from '../menu/create-in-game-menu.mjs';
import { inGameMenuOperations } from '../menu/in-game-menu-operations.mjs';
import { qs, qsa } from '../utils/commons.mjs';
import { isInElectron } from '../utils/is-in-electron.mjs';
import { addOpenFunctionToMessageListElements } from '../utils/mobile-functions/add-open-function-to-message-list-elements.mjs';
import { addPersonalMessageBoxesToHTML } from '../utils/mobile-functions/add-personal-message-boxes-to-html.mjs';
import { changeMobileTime } from '../utils/mobile-functions/change-mobile-time.mjs';
import { createmessageList, addMessageListToHTML } from '../utils/mobile-functions/create-message-list.mjs';
import { generateRandomBatteryLevel } from '../utils/mobile-functions/generate-random-battery-level.mjs';
import { loadSoFarConversations } from '../utils/mobile-functions/load-so-far-conversations.mjs';
import { renderBatterySVG } from '../utils/mobile-functions/render-battery-svg.mjs';
import { showNewMessagePic } from '../utils/mobile-functions/show-new-message-pic.mjs';
import { playSound } from '../utils/play-sound.mjs';
import { saveGame } from '../utils/save-game.mjs';
import { showTimeSkipPage } from '../utils/show-time-skip-page.mjs';

export const mobilePage = (mobileData, mobilePartindex, gameSettings, isFromLoad = false) => {
	const slotNumber = +localStorage.getItem('slotNumber') || 0;
	const root = qs('#root');
	root.classList.remove('fadeOut');
	root.classList.add('fadeIn');
	let isTyping = !gameSettings.settings.screen.isTypingOff;
    let step = 1;
    gameSettings.savingSlots[slotNumber].currentStep = step;
	const textingStatus = isFromLoad ? gameSettings.savingSlots[slotNumber].textingStatus : {};
	localStorage.setItem('textingStatus', JSON.stringify(textingStatus));

	const sceneTalkPartners = Object.keys(mobileData[mobilePartindex].textingPartner);

	const batteryLevel = generateRandomBatteryLevel();
	const batterySVG = renderBatterySVG(batteryLevel);
	const loadedMessageList = createmessageList(mobileData[mobilePartindex].keepOut, isFromLoad ? textingStatus : null);

	root.insertAdjacentHTML("afterbegin", `
		${createInGameMenu()}
		<div id="mobileContainer" class="" tabindex="0">
			<div id="mobile_blackBG">
				<div id="mobileFrame">
					<div id="mobileHeader">
						<div class="mobileHeader_section">
							<span>CrystalCall NET</span>
						</div>
						<div class="mobileHeader_section">
							<span><img src="${isInElectron() ? '.' : '../..'}/img/svg/alarm.svg" alt="alarm"></span>
							<span><img src="${isInElectron() ? '.' : '../..'}/img/svg/wifi.svg" alt="wifi"></span>
							<span><img src="${isInElectron() ? '.' : '../..'}/img/svg/signal.svg" alt="signal"></span>
							<span>${batteryLevel}%</span>
							<span><img src="${isInElectron() ? '.' : '../..'}/img/svg/battery-${batterySVG}.svg" alt="battery"></span>
							<span id="mobileTime">
								${localStorage.getItem('sceneChanged') === 'true' ?
								mobileData[mobilePartindex].startTime :
								gameSettings.savingSlots[slotNumber].textingStatus.currentTime ? 
								gameSettings.savingSlots[slotNumber].textingStatus.currentTime : mobileData[mobilePartindex].startTime}
							</span>
						</div>
					</div>
					<div id="mobileRoot">
						<div id="mobileRootHeader">
							<img src="${isInElectron() ? '.' : '../..'}/img/assets/social-sync.png" alt="messenger_icon">
							<span>SocialSync</span>
						</div>
						<hr>
						<div id="mobileRoot_messageList">
							${addMessageListToHTML(loadedMessageList)}
						</div>
					</div>
					<div id="mobile_profilePicsContainer"></div>
				</div>
				<div id="mobile_speedUpContainer"></div>
			</div>
			<div id="mobile_choiceContainer"></div>
			<div id="mobile_popup">
			    <div id="mobilePopup_BG">
					<div id="mobilePopup_container">
						<div id="mobilePopup_innerContainer"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="mobileButtonContainer" class="fadeIn">
			<button type="button" id="saveBtn" class="mobileButtons">Save Game</button>	
			<button type="button" id="quickSaveBtn" class="mobileButtons">Quick Save</button>	
		</div>
	`);
	
	const mobileContainer = qs('#mobileContainer');
	const saveBtn = qs('#saveBtn');
	const quickSaveBtn = qs('#quickSaveBtn');
	const navbarIcon = qs('#inGame_navbar_icon');
	const navbarBG = qs('#unclickable_navbar_BG');
	const innerMenu_window = qs('#innerMenu_window');
	const navbarOptions = qsa('.navbar_options');

	const otherSoundsAudio = qs('#other_sound_effects_audio');

	saveBtn.disabled = true;        
	quickSaveBtn.disabled = true;

	const timeState = {
		shouldStopTimeInterval: false,
		shouldEndConversations: false,
		canSpeedUp: false
	};

	const chatState = {
		beingOpen: null
	};

	setInterval(() => {
		refreshFallingIcons();
	}, 120_000)

	setTimeout(() => {
		navbarIcon.addEventListener("mouseover", () => {
			otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
			otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/menu-hover.mp3`;
			otherSoundsAudio.play();
		});
		
		navbarIcon.addEventListener("click", () => {
			navbarIconClick(); 
			inGameMenuOperations('MOBILE', innerMenu_window, gameSettings, slotNumber, mobilePartindex, step, null, timeState);
		});
		navbarBG.addEventListener("click", closeInGameMenu);

		navbarOptions.forEach((option) => {
			option.addEventListener('mouseover', () => {
				otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
				otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/menu-hover.mp3`;
				otherSoundsAudio.play();
			});
		})
	}, 3000);

	if (isFromLoad) {
		const currentSceneConversations = Object.entries(mobileData[mobilePartindex].textingPartner);

		currentSceneConversations.forEach(([name, obj]) => {
			if (obj.isMandatory === false && textingStatus[name]?.unread > 0) {
				showNewMessagePic(currentSceneConversations, name, chatState, gameSettings);
			}
		});
	}

	setTimeout(() => {
		/*charContainerFilling(data[partindex].story[step]);

		if (storyContainer) {
			storyContainer.focus();
			storyContainer.isTyping = isTyping;
	
			storyContainer.addEventListener("click", clickNavigation);
			qs('#storyContainer').addEventListener("keydown", arrowNavigation);

			saveBtn.disabled = false;
			quickSaveBtn.disabled = isNewGame === true ? true : false;
			quickReadBtn.disabled = false;
	
			typingText(gameSettings, data[partindex].story[step], data[partindex].story[step].text, characterText, storyContainer);
			root.classList.remove('fadeIn');
		}*/

		if (mobileContainer) {
			mobileContainer.focus();
			mobileContainer.isTyping = isTyping;
		}

		const bgMusic_Audio = qs('#bg_music_audio');
		if (mobileData[mobilePartindex].bgMusic && bgMusic_Audio) {
			bgMusic_Audio.src = '';
	
			bgMusic_Audio.volume = gameSettings.settings.audio.bgMusic/100;
			bgMusic_Audio.src = `${isInElectron() ? '.' : '../..'}/sounds/bg_musics/${mobileData[mobilePartindex].bgMusic.name}.mp3`;
		
			bgMusic_Audio.play().catch(error => {
				console.error('Audio playback failed:', error);
			});
		}

 		changeMobileTime(
			localStorage.getItem('sceneChanged') === 'true' ? mobileData[mobilePartindex].startTime : gameSettings.savingSlots[slotNumber].textingStatus.currentTime ? gameSettings.savingSlots[slotNumber].textingStatus.currentTime : mobileData[mobilePartindex].startTime, 
			mobileData[mobilePartindex].endTime,
			mobilePartindex, 
			timeState,
			chatState,
			gameSettings,
			mobileData[mobilePartindex].nextStoryScene,
			loadedMessageList
		);

		const mobileRoot = qs('#mobileRoot');
		addPersonalMessageBoxesToHTML(sceneTalkPartners, mobileRoot, chatState);
		addOpenFunctionToMessageListElements(chatState, sceneTalkPartners, gameSettings);

		if (isFromLoad) {
			loadSoFarConversations(mobileData[mobilePartindex].textingPartner, textingStatus, gameSettings, chatState, timeState, mobilePartindex)
		}

		saveBtn.disabled = false;
		quickSaveBtn.disabled = false;
		localStorage.setItem('sceneChanged', 'false');
	}, 1000);

	saveBtn.addEventListener('click', () => saveGame('MOBILE', mobileContainer, gameSettings, mobilePartindex, step, null, false));
	quickSaveBtn.addEventListener('click', () => saveGame('MOBILE', mobileContainer, gameSettings, mobilePartindex, step, null, true));
};