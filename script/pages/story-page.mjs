import { 
	createInGameMenu, 
	navbarIconClick, 
	closeInGameMenu,
	refreshFallingIcons
} from '../menu/create-in-game-menu.mjs';
import { inGameMenuOperations } from '../menu/in-game-menu-operations.mjs';
import { qs, qsa } from '../utils/commons.mjs';
import { choicePopup } from '../utils/choice-popup.mjs';
import { incrementPaginationNumberByExtraScene } from '../utils/increment-pagination-number-by-extra-scene.mjs';
import { playSound } from '../utils/play-sound.mjs';
import { saveGame } from '../utils/save-game.mjs';
import { setStoryComponentFromMultiple } from '../utils/set-story-component-from-multiple.mjs';
import { stepBackward } from '../utils/step-backward.mjs';
import { stepForward } from '../utils/step-forward.mjs';
import { typingText } from '../utils/typing-text.mjs';
import { showTimeSkipPage } from '../utils/show-time-skip-page.mjs';
import { mobilePage } from './mobile-page.mjs';
import { mobileParts } from '../constants/mobile-parts.mjs';
import { selectEnding } from '../utils/ending-functions/select-ending.mjs';
import { startOutroVideo } from '../utils/ending-functions/start-outro-video.mjs';
import { isInElectron } from '../utils/is-in-electron.mjs';
import { cantGoBackPopup } from '../utils/cant-go-back-popup.mjs';

export const storyPage = (data, partindex, gameSettings, isNewGame = false, isFromLoad = false) => {
	if (partindex >= data.length) {
		localStorage.setItem('sceneChanged', 'false');
		console.log('All parts completed');
		return;
	}

	const slotNumber = +localStorage.getItem('slotNumber') || 0;
	const selectedStep = localStorage.getItem('sceneChanged') === undefined 
		|| localStorage.getItem('sceneChanged') === 'false' 
		? gameSettings.savingSlots[slotNumber].currentStep
		: 1;
	let step = selectedStep;
	const root = qs('#root');
	root.classList.remove('fadeOut');
	root.classList.add('fadeIn');
	let isTyping = !gameSettings.settings.screen.isTypingOff;
	let firstLoad = true;
	localStorage.setItem('sceneChanged', 'false');

	root.insertAdjacentHTML("afterbegin", `
		${createInGameMenu()}
		<div id="storyContainer" class="" tabindex="0">
			<div id="backgroundContainer"></div>
			<div id="characterContainer">
				<div id="char-left" class="chars">
					<img src="" alt="character" class="notVisible">
				</div>
				<div id="char-middle" class="chars">
					<img src="" alt="character" class="notVisible">
				</div>
				<div id="char-right" class="chars">
					<img src="" alt="character" class="notVisible">
				</div>
			</div>
			<div id="textContainer">
				<div id="textContainer-inner">
					<div id="char-name">${setStoryComponentFromMultiple(data[partindex].story[step].name, data[partindex].story[step], gameSettings)}</div>
					<p id="char-text"></p>
				</div>
			</div>
		</div>
		<div id="storyButtonContainer" class="fadeIn">
			<button type="button" id="saveBtn" class="storyButtons">Save Game</button>	
			<button type="button" id="quickSaveBtn" class="storyButtons">Quick Save</button>	
			<button type="button"id="quickReadBtn" class="storyButtons">Quick reading</button>
		</div>
	`);
	
	const backgroundContainer = qs('#backgroundContainer');
	const storyContainer = qs('#storyContainer');
	const characterContainer = qs('#characterContainer');
	const textContainer = qs('#textContainer');
	const characterName = qs('#char-name');
	const characterText = qs('#char-text');
	const saveBtn = qs('#saveBtn');
	const quickSaveBtn = qs('#quickSaveBtn');
	const quickReadBtn = qs('#quickReadBtn');
	const navbarIcon = qs('#inGame_navbar_icon');
	const navbarBG = qs('#unclickable_navbar_BG');
	const innerMenu_window = qs('#innerMenu_window');
	const otherSoundsAudio = qs('#other_sound_effects_audio');
	const navbarOptions = qsa('.navbar_options');
	
	setInterval(() => {
		refreshFallingIcons();
	}, 120_000)

	saveBtn.disabled = true;
	quickSaveBtn.disabled = true;
	quickReadBtn.disabled = true;
	changeBackground(backgroundContainer, data[partindex].story[step], gameSettings);

	if (characterName.innerText.length > 0) {
		characterName.classList.remove('d-none');
	} else {
		characterName.classList.add('d-none');
	}

	navbarIcon.addEventListener("mouseover", () => {
		otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
		otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/menu-hover.mp3`;
		otherSoundsAudio.play();
	});

	navbarIcon.addEventListener("click", () => {
		navbarIconClick(); 
		inGameMenuOperations('STORY', innerMenu_window, gameSettings, slotNumber, partindex, step, data[partindex].endingSceneType);
	});
	navbarBG.addEventListener("click", closeInGameMenu);

	setTimeout(() => {
		let currentStep = data[partindex].story[step];

		if (isFromLoad) {
			if (!currentStep.bgMusic) {
				currentStep.bgMusic = {name: '', command: ''};
			}
			
			for (let index = step; index > 0; index--) {
				if (data[partindex].story[index].bgMusic?.command === 'STOP' || data[partindex].story[index].bgMusic?.command === 'FADE_OUT') {
					break;
				}
				
				if (data[partindex].story[index].bgMusic?.command === 'START') {
					//currentStep.bgMusic.name = gameSettings.savingSlots[slotNumber].lastPlayedMusic;
					currentStep.bgMusic.name = data[partindex].story[index].bgMusic.name;
					currentStep.bgMusic.command = 'START';
					break;
				}
			}
		}

		playSound(gameSettings, currentStep, gameSettings.settings.audio);

		navbarOptions.forEach((option) => {
			option.addEventListener('mouseover', () => {
				otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
				otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/menu-hover.mp3`;
				otherSoundsAudio.play();
			});
		})

		isFromLoad = false;
	}, 200);

	setTimeout(() => {
		charContainerFilling(data[partindex].story[step]);

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
		}
	}, 2000);

	function clickNavigation() {
		firstLoad = false;

		if (storyContainer.isTyping) {
			storyContainer.isTyping = false;

			characterText.textContent = setStoryComponentFromMultiple(data[partindex].story[step].text, data[partindex].story[step], gameSettings);

			return;
		}

		if (data[partindex].story[step].outroNext) {
			playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio, true);

			root.classList.remove('fadeIn');
			root.classList.add('fadeOut');

			localStorage.setItem('sceneChanged', 'true');

			setTimeout(() => {
				root.innerHTML = "";
				startOutroVideo(root, data[partindex].story[step].outroNext, gameSettings);
			}, 2000);

			return;
		}

		// IF there is an endingNext AND also an extraSceneNext which won't go into the extraSceneNext OR there is no extraSceneNext
		if (data[partindex].story[step].endingNext && incrementPaginationNumberByExtraScene(data[partindex].story[step].extraSceneNext, gameSettings) !== 0) {
			playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio, true);
			
			root.classList.remove('fadeIn');
			root.classList.add('fadeOut');

			localStorage.setItem('sceneChanged', 'true');

			setTimeout(() => {
				root.innerHTML = "";
				selectEnding(data[partindex].story[step].endingNext, data, gameSettings);
			}, 2000);
			
			return;
		}

		if (step === data[partindex].lengthNum || (data[partindex].story[step].stepSkip && step + stepForward(data[partindex].story[step], gameSettings) > data[partindex].lengthNum)){
			let paginationNumber = 1;

			if (data[partindex].story[step].extraSceneNext) {
				paginationNumber += incrementPaginationNumberByExtraScene(data[partindex].story[step].extraSceneNext, gameSettings);
			}

			playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio, true);
			
			root.classList.remove('fadeIn');
			root.classList.add('fadeOut');

			localStorage.setItem('sceneChanged', 'true');

			setTimeout(() => {
				root.innerHTML = "";

				
				if (data[partindex].story[step].timeSkipNext) {
					localStorage.setItem('sceneChanged', 'false');
					showTimeSkipPage(root, data[partindex].story[step].timeSkipNext, data, gameSettings)
				} else {
					if (data[partindex].story[step].mobileSceneNext) {
						mobilePage(mobileParts, +data[partindex].story[step].mobileSceneNext, gameSettings);
					}

					storyPage(data, partindex + paginationNumber, gameSettings);
				}
			}, 2000);

			return;
		} 

		if (data[partindex].story[step].choiceNext) {
			storyContainer.removeEventListener("click", clickNavigation);
			storyContainer.removeEventListener("keydown", arrowNavigation);

			if (!qs('#choiceContainer')) {
				choicePopup(data[partindex].sceneId, step, textContainer, characterContainer, storyContainer, clickNavigation, arrowNavigation, gameSettings)
				.then(() => {
					step += stepForward(data[partindex].story[step], gameSettings);
					storyContainer.isTyping = true;
			
					storyContainer.className = '';
					characterText.textContent = '';
					charContainerFilling(data[partindex].story[step]);
					changeBackground(backgroundContainer, data[partindex].story[step], gameSettings);
					characterName.innerText = setStoryComponentFromMultiple(data[partindex].story[step].name, data[partindex].story[step], gameSettings);
					typingText(gameSettings, data[partindex].story[step], data[partindex].story[step].text, characterText, storyContainer);
				
					if (characterName.innerText.length > 0) {
						characterName.classList.remove('d-none');
					} else {
						characterName.classList.add('d-none');
					}
				});
			}

			return;
		} 

		step += stepForward(data[partindex].story[step], gameSettings);

		if (data[partindex].story[step].specialSceneNow) {
			loadingSpecialScene(data[partindex].story[step]);

			return;
		}

		if (!data[partindex].story[step].specialSceneNow && data[partindex].story[step].specialSceneId) {
			const galleryIndexNumber = gameSettings.gallery.findIndex((item) => item.id === setStoryComponentFromMultiple(data[partindex].story[step].specialSceneId, data[partindex].story[step], gameSettings));
			gameSettings.gallery[galleryIndexNumber].isActivated = true;
		}

		storyContainer.isTyping = true;

		storyContainer.className = '';
		characterText.textContent = '';

		changeBackground(backgroundContainer, data[partindex].story[step], gameSettings);
		charContainerFilling(data[partindex].story[step]);
		characterName.innerText = setStoryComponentFromMultiple(data[partindex].story[step].name, data[partindex].story[step], gameSettings);
		typingText(gameSettings, data[partindex].story[step], data[partindex].story[step].text, characterText, storyContainer);

		if (characterName.innerText.length > 0) {
			characterName.classList.remove('d-none');
		} else {
			characterName.classList.add('d-none');
		}

		if (!data[partindex].story[step].bgMusic || 
			data[partindex].story[step].bgMusic.command === 'STOP' || 
			(data[partindex].story[step].bgMusic.command !== 'STOP' && data[partindex].story[step].bgMusic.command !== 'FADE_OUT') ||
			(data[partindex].story[step].bgMusic && data[partindex].story[step].bgMusic.insideOfScene)
		) {
			playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio);
		}
	};

	function arrowNavigation(event) {
		firstLoad = false;

		if (event.key === 'ArrowLeft' && step > 1) {

			if (data[partindex].story[step - 1].choiceNext) {
				otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
				otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/denied-2.mp3`;
				otherSoundsAudio.play();

				cantGoBackPopup(storyContainer)

				return;
			}
			
			if (data[partindex].story[step].specialSceneNow) {
				loadingSpecialScene(data[partindex].story[step], data[partindex].story[step].specialSceneOut ? true : false);
				
				return;
			}

			step -= stepBackward(data[partindex].story[step], gameSettings);

			storyContainer.isTyping = false;
			changeBackground(backgroundContainer, data[partindex].story[step], gameSettings, true);
			charContainerBackFilling(data[partindex].story[step]);
			characterName.innerText = setStoryComponentFromMultiple(data[partindex].story[step].name, data[partindex].story[step], gameSettings);
			characterText.textContent = setStoryComponentFromMultiple(data[partindex].story[step].text, data[partindex].story[step], gameSettings);

			if (data[partindex].story[step].textClass) {
				characterText.className = setStoryComponentFromMultiple(data[partindex].story[step].textClass, data[partindex].story[step], gameSettings);
			} else {
				characterText.className = "";
			}
			
			playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio);
		}

		if (event.key === 'ArrowRight') {
			if (storyContainer.isTyping) {
				storyContainer.isTyping = false;
				characterText.textContent = setStoryComponentFromMultiple(data[partindex].story[step].text, data[partindex].story[step], gameSettings);

				return;
			}
			
			// IF there is an endingNext AND also an extraSceneNext which won't go into the extraSceneNext OR there is no extraSceneNext
			if (data[partindex].story[step].endingNext && incrementPaginationNumberByExtraScene(data[partindex].story[step].extraSceneNext, gameSettings) !== 0) {
				selectEnding(data[partindex].story[step].endingNext, data, gameSettings);

				return;
			}

			if (step === data[partindex].lengthNum || (data[partindex].story[step].stepSkip && step + stepForward(data[partindex].story[step], gameSettings) > data[partindex].lengthNum)){
				let paginationNumber = 1;

				if (data[partindex].story[step].extraSceneNext) {
					paginationNumber += incrementPaginationNumberByExtraScene(data[partindex].story[step].extraSceneNext, gameSettings);
				}

				playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio, true);

				root.classList.remove('fadeIn');
				root.classList.add('fadeOut');
				storyContainer.removeEventListener("keydown", arrowNavigation);

				localStorage.setItem('sceneChanged', 'true');

				setTimeout(() => {
					root.innerHTML = "";
	
					if (data[partindex].story[step].timeSkipNext) {
						localStorage.setItem('sceneChanged', 'false');
						showTimeSkipPage(root, data[partindex].story[step].timeSkipNext, data, partindex + paginationNumber, gameSettings)
					} else {
						if (data[partindex].story[step].mobileSceneNext) {
							mobilePage(mobileParts, +data[partindex].story[step].mobileSceneNext, gameSettings);
						} else {
							storyPage(data, partindex + paginationNumber, gameSettings);
						}
					}
				}, 2000);
	

				return;
			} 
			
			if (data[partindex].story[step].choiceNext) {
				storyContainer.removeEventListener("keydown", arrowNavigation);
				storyContainer.removeEventListener("click", clickNavigation);

				if (!qs('#choiceContainer')) {
					choicePopup(data[partindex].sceneId, step, textContainer, characterContainer, storyContainer, clickNavigation, arrowNavigation, gameSettings)
					.then(() => {
						step += stepForward(data[partindex].story[step], gameSettings);
						storyContainer.isTyping = true;
				
						storyContainer.className = '';
						characterText.textContent = '';
						charContainerFilling(data[partindex].story[step]);
						changeBackground(backgroundContainer, data[partindex].story[step], gameSettings);
						characterName.innerText = setStoryComponentFromMultiple(data[partindex].story[step].name, data[partindex].story[step], gameSettings);
						typingText(gameSettings, data[partindex].story[step], data[partindex].story[step].text, characterText, storyContainer);
					});
				}

				return;
			} 

			step += stepForward(data[partindex].story[step], gameSettings);

			if (data[partindex].story[step].specialSceneNow) {
				loadingSpecialScene(data[partindex].story[step]);
	
				return;
			}

			if (!data[partindex].story[step].specialSceneNow && data[partindex].story[step].specialSceneId) {
				const galleryIndexNumber = gameSettings.gallery.findIndex((item) => item.id === setStoryComponentFromMultiple(data[partindex].story[step].specialSceneId, data[partindex].story[step], gameSettings));
				gameSettings.gallery[galleryIndexNumber].isActivated = true;
			}
	
			storyContainer.className = '';
			characterText.textContent = '';
			changeBackground(backgroundContainer, data[partindex].story[step], gameSettings);
			charContainerFilling(data[partindex].story[step]);
			characterName.innerText = setStoryComponentFromMultiple(data[partindex].story[step].name, data[partindex].story[step], gameSettings);
			characterText.textContent = setStoryComponentFromMultiple(data[partindex].story[step].text, data[partindex].story[step], gameSettings);	
		
			if (data[partindex].story[step].textClass) {
				characterText.className = setStoryComponentFromMultiple(data[partindex].story[step].textClass, data[partindex].story[step], gameSettings);
			} else {
				characterText.className = "";
			}

			if (!data[partindex].story[step].bgMusic || data[partindex].story[step].bgMusic.command === 'STOP' || (data[partindex].story[step].bgMusic.command !== 'STOP' && data[partindex].story[step].bgMusic.command !== 'FADE_OUT')) {
				playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio);
			}
		}
	};

	function charContainerFilling(stepObject, isStepBack = false) {
		for (let index = 0; index < stepObject.charContainer.length; index++) {
			let charContainer;

			const selectedContainer = setStoryComponentFromMultiple(stepObject.charContainer[index], data[partindex].story[step], gameSettings);
			if (selectedContainer) {
				charContainer = qs(`#${selectedContainer}`);
			}

			if (!stepObject.class[index] && charContainer && firstLoad && !isQuickReading) {
				if (selectedContainer === 'char-left') {
					stepObject.class[index] = 'fadeLeft';
				}
				if (selectedContainer === 'char-middle') {
					stepObject.class[index] = 'fadeUp';
				}
				if (selectedContainer === 'char-right') {
					stepObject.class[index] = 'fadeRight';
				}
			}

			if (stepObject.class[index] && charContainer) {
				if (isStepBack) {
					charContainer.className = `chars notVisible`
				} else {
					charContainer.className = `chars`;
				}
				
				setTimeout(() => {
					charContainer.className = `chars ${setStoryComponentFromMultiple(stepObject.class[index], stepObject, gameSettings) || ''}`;
					if (charContainer.className.indexOf('Out') > -1) {
						setTimeout(() => {
							charContainer.classList.add('d-none');
						}, 200);
					} else {
						charContainer.classList.remove('d-none');
					}
				}, 0);
				
				if (
					charContainer 
					&& charContainer.querySelector('img').src.indexOf('.png') > -1 
					&& charContainer.querySelector('img').src.indexOf(stepObject.image[index]) === -1 
					&& charContainer.className.indexOf(stepObject.class[index]) > -1
				) {
					charContainer.className = 'chars';
					
					setTimeout(() => {
						charContainer.className = `chars ${setStoryComponentFromMultiple(stepObject.class[index], stepObject, gameSettings)  || ''}`;
					}, 0);
			   }
			} else {
				let stepBackClassAdded = false;

				if (charContainer?.querySelector('img').src.indexOf(stepObject.image[index]) === -1 && isStepBack ) {
					setTimeout(() => {
						index === 0 ? charContainer.className = 'chars fadeLeft' : 
							index === 1 ? charContainer.className = 'chars fadeUp' : 
							charContainer.className = 'chars fadeRight';
						
						stepBackClassAdded = true;
					}, 0);
				}
				
				if (charContainer && !stepBackClassAdded) {
					charContainer.className = 'chars';
				}
			}

 			if (stepObject.image[index] && charContainer) {
				const img = charContainer.querySelector('img');
				
				setTimeout(() => {
					let imgName = setStoryComponentFromMultiple(stepObject.image[index], data[partindex].story[step], gameSettings);
					img.src = `./img/characters/${imgName}.png`;
					img.classList.remove('notVisible');
				}, 50);
			}
		}
	};

	function charContainerBackFilling(stepObject) {
		const idArray = ['#char-left', '#char-middle', '#char-right'];

		for (let index = 0; index < idArray.length; index++) {
			const element = qs(idArray[index]);
			
			let imgName = setStoryComponentFromMultiple(stepObject.image[index], stepObject, gameSettings);
			if (element.querySelector('img').src.indexOf(imgName) === -1) {
				element.querySelector('img').src = '';
				element.querySelector('img').classList.add('notVisible');
			}
		}

		setTimeout(() => {
			charContainerFilling(stepObject, true);
		}, 0);
	};

	
	function loadingSpecialScene(stepObject, isFromArrowLeft = false) {
		storyContainer.removeEventListener("click", clickNavigation);
		storyContainer.removeEventListener("keydown", arrowNavigation);

		storyContainer.insertAdjacentHTML("beforeend", `
			<div id="specialSceneCover" class="fadeIn" tabindex="0"><div>
		`)

		const specialSceneCover = qs('#specialSceneCover');
		specialSceneCover.style.backgroundImage = `url("./img/${setStoryComponentFromMultiple(stepObject.background, stepObject, gameSettings)}.png")`;
		
		const storyButtonContainer = qs('#storyButtonContainer');
		storyButtonContainer.classList.add('fadeOut', 'noClick');
		
		setTimeout(() => {
			storyContainer.className = '';
			characterText.textContent = '';
			charContainerFilling(stepObject);
			characterName.innerText = ''; 

			if (characterName.innerText.length > 0) {
				characterName.classList.remove('d-none');
			} else {
				characterName.classList.add('d-none');
			}
			
			function makeSpecialSceneRemovable(event) {
				if ((event.type === 'keydown' && event.key === 'ArrowLeft')) {
					step -= stepBackward(stepObject, gameSettings);
					stepObject = data[partindex].story[step];

					charContainerBackFilling(stepObject);
					characterName.innerText = setStoryComponentFromMultiple(stepObject.name, stepObject, gameSettings);
					characterText.textContent = stepObject.text;

					if (characterName.innerText.length > 0) {
						characterName.classList.remove('d-none');
					} else {
						characterName.classList.add('d-none');
					}

					changeBackground(backgroundContainer, data[partindex].story[step], gameSettings, true);
					specialSceneCover.remove();

					storyButtonContainer.classList.add('fadeIn');
					storyButtonContainer.classList.remove('fadeOut', 'noClick');
					
					playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio);

					setTimeout(() => {
						storyContainer.focus();
						storyContainer.addEventListener("keydown", arrowNavigation);
						storyContainer.addEventListener("click", clickNavigation);
					}, 0);
					
					return;
				}

				changeBackground(backgroundContainer, data[partindex].story[step], gameSettings);
				specialSceneCover.classList.remove('fadeIn');
				specialSceneCover.classList.add('fadeOut');
				storyContainer.isTyping = true;

				storyButtonContainer.classList.add('fadeIn');
				storyButtonContainer.classList.remove('fadeOut', 'noClick');

				setTimeout(() => {
					if (event.type === 'click' || (event.type === 'keydown' && event.key === 'ArrowRight')) {
						characterName.innerText = setStoryComponentFromMultiple(stepObject.name, stepObject, gameSettings);

						if (characterName.innerText.length > 0) {
							characterName.classList.remove('d-none');
						} else {
							characterName.classList.add('d-none');
						}

						typingText(gameSettings, stepObject, stepObject.text, characterText, storyContainer);
					}
					
					specialSceneCover.remove();
					storyContainer.focus();
					storyContainer.addEventListener("keydown", arrowNavigation);
					storyContainer.addEventListener("click", clickNavigation);
				}, 2000);
			};

			playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio);
			
			specialSceneCover.focus();
			specialSceneCover.addEventListener('click', makeSpecialSceneRemovable);
			specialSceneCover.addEventListener('keydown', makeSpecialSceneRemovable);

			if (stepObject.specialSceneOut && specialSceneCover && !isFromArrowLeft) {
				specialSceneCover.click();
			}

			if (isFromArrowLeft) {
				const keydownArrowLeft = new KeyboardEvent('keydown', {
					key: 'ArrowLeft',
					code: 'ArrowLeft',
					keyCode: 37,
					bubbles: true,
					cancelable: true,
				});
			
				setTimeout(() => {
					specialSceneCover.dispatchEvent(keydownArrowLeft);
				}, 500);
			}
			
		}, 2000);

		if (stepObject.specialSceneId) {
			const galleryIndexNumber = gameSettings.gallery.findIndex((item) => item.id === setStoryComponentFromMultiple(stepObject.specialSceneId, stepObject, gameSettings));
			gameSettings.gallery[galleryIndexNumber].isActivated = true;
		}
	}

	function changeBackground(bg_container, stepObject, gameSettings, ignoreAnimation = false) {
		if (ignoreAnimation) {
			bg_container.style.backgroundImage = `url("./img/${setStoryComponentFromMultiple(stepObject.background, stepObject, gameSettings)}.png")`;
			return;
		}

		if (stepObject?.backGroundClass) {
			bg_container.insertAdjacentHTML('afterend', `
				<div id="secondary_backgroundContainer" class="${stepObject?.backGroundClass}"></div>
			`);

			const secondary_backgroundContainer = qs("#secondary_backgroundContainer");
			secondary_backgroundContainer.style.backgroundImage = `url("./img/${setStoryComponentFromMultiple(stepObject.background, stepObject, gameSettings)}.png")`;

			setTimeout(() => {
				bg_container.style.backgroundImage = `url("./img/${setStoryComponentFromMultiple(stepObject.background, stepObject, gameSettings)}.png")`;
				qs("#secondary_backgroundContainer").remove();
			}, 2000);
			
			return;
		}

		bg_container.style.backgroundImage = `url("./img/${setStoryComponentFromMultiple(stepObject.background, stepObject, gameSettings)}.png")`;
	};

	let isQuickReading = false
	quickReadBtn.addEventListener('click', () => {
		firstLoad = false;

		if (data[partindex].story[step + 1]?.specialSceneNow 
			|| step === data[partindex].lengthNum 
			|| data[partindex].story[step].choiceNext) {
			otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
			otherSoundsAudio.src = `${isInElectron() ? '.' : '../..'}/sounds/sound_effects/denied-2.mp3`;
			otherSoundsAudio.play();
								
			storyContainer.focus();

			return;
		}

		isQuickReading = !isQuickReading;
		
		if (isQuickReading) {
			storyContainer.removeEventListener("click", clickNavigation);
			storyContainer.removeEventListener("keydown", arrowNavigation);

			saveBtn.disabled = true;
			quickSaveBtn.disabled = true;

			let intervalId;
			const processStep = () => {

				if (data[partindex].story[step]?.backGroundClass) {
					data[partindex].story[step].backGroundClass = null;
				}

				if (data[partindex].story[step]?.specialSceneId) {
					const galleryIndexNumber = gameSettings.gallery.findIndex((item) => item.id === setStoryComponentFromMultiple(data[partindex].story[step].specialSceneId, data[partindex].story[step], gameSettings));
					gameSettings.gallery[galleryIndexNumber].isActivated = true;
				}

				step += stepForward(data[partindex].story[step], gameSettings);
			  
				storyContainer.isTyping = false;
				changeBackground(backgroundContainer, data[partindex].story[step], gameSettings, true);
				charContainerBackFilling(data[partindex].story[step]);
				characterName.innerText = setStoryComponentFromMultiple(data[partindex].story[step].name, data[partindex].story[step], gameSettings);
				characterText.textContent = setStoryComponentFromMultiple(data[partindex].story[step].text, data[partindex].story[step], gameSettings);
			  
				if (characterName.innerText.length > 0) {
					characterName.classList.remove('d-none');
				} else {
					characterName.classList.add('d-none');
				}

				if (data[partindex].story[step].textClass) {
					characterText.className = setStoryComponentFromMultiple(data[partindex].story[step].textClass, data[partindex].story[step], gameSettings);
				} else {
					characterText.className = "";
				}

				if (data[partindex].story[step].stepSkip && step + setStoryComponentFromMultiple(data[partindex].story[step].stepSkip, data[partindex].story[step], gameSettings) >= data[partindex].lengthNum) {
					Object.defineProperty(data[partindex].story[step], "bgMusic", {value: {"command": 'FADE_OUT'}})
				}

				playSound(gameSettings, data[partindex].story[step], gameSettings.settings.audio, false, true);

				if (
					!(isQuickReading 
					&& !data[partindex].story[step + 1]?.specialSceneNow 
					&& step < data[partindex].lengthNum 
					&& !data[partindex].story[step].choiceNext
					&& (step + setStoryComponentFromMultiple(data[partindex].story[step].stepSkip, data[partindex].story[step], gameSettings) < data[partindex].lengthNum || !data[partindex].story[step].stepSkip))
					//+ a menü behívása
					//+ mobilra váltás?
					//+ időugrás képernyő?
				) {
				  	clearInterval(intervalId);
				  	storyContainer.focus();
					storyContainer.addEventListener("keydown", arrowNavigation);
					storyContainer.addEventListener("click", clickNavigation);

					isQuickReading = false;
					saveBtn.disabled = false;
					quickSaveBtn.disabled = false;

					setTimeout(() => {
						storyContainer.click();
					}, 500);
				}
			}
			intervalId = setInterval(processStep, 300);

		} else {
			setTimeout(() => {
				saveBtn.disabled = false;
				quickSaveBtn.disabled = false;

				storyContainer.focus();
				storyContainer.addEventListener("keydown", arrowNavigation);
				storyContainer.addEventListener("click", clickNavigation);
			}, 500);
		}
	});

	saveBtn.addEventListener('click', () => saveGame('STORY', storyContainer, gameSettings, partindex, step, data[partindex].endingSceneType, false, null));
	quickSaveBtn.addEventListener('click', () => saveGame('STORY', storyContainer, gameSettings, partindex, step, data[partindex].endingSceneType, true, null));
};