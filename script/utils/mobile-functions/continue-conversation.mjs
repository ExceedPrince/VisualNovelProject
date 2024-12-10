import { qs, qsa, wait } from "../commons.mjs";
import { updateStatusCallback } from "./update-status-callback.mjs";
import { isInElectron } from "../is-in-electron.mjs";
import { typeIntoMobileTextarea } from "./type-into-mobile-textarea.mjs";
import { decideComponentFromMultipleInMobile } from "./decide-component-from-multiple-in-mobile.mjs";
import { fillInChoiceContainer } from "./fill-in-choice-container.mjs";
import { choiceDataBase } from "../../constants/choice-database.mjs";
import { playMobileSounds } from "./play-mobile-sounds.mjs";

function putTextMessageToHTML(chatRowElement, textingObj, chatId, gameSettings) {
    chatRowElement.innerHTML = `
        <div class="chatRow_bubble">
            ${decideComponentFromMultipleInMobile(textingObj.messages[chatId], textingObj.messages[chatId].text, gameSettings)}
        </div>
    `;
};

export const continueConversation = async (boxId, textingObj, chatId, gameSettings, chatState, timeState, mobilePartindex) => {
    const messageBox = qs(boxId);
    const messageBoxRoot = messageBox.querySelector('.messageBox_root');
    const personName = boxId.split('_')[0].replace('#', '');
    let isSheOnline = JSON.parse(localStorage.getItem('textingStatus'))[personName]?.isOnline || false;

    const textarea = qs(`#${personName}_messageTextarea`);
    const messageSendBtn = qs(`#${personName}_messageSendBtn`);

    const isFromHer = decideComponentFromMultipleInMobile(textingObj.messages[chatId], textingObj.messages[chatId].isFromHer, gameSettings)

    const chatRow = `<div class="chatRow ${isFromHer ? 'left' : 'right'}"></div>`;
    messageBoxRoot.insertAdjacentHTML('beforeend', chatRow);

    const chatRowElements = messageBoxRoot.querySelectorAll('.chatRow');
    const chatRowElement = chatRowElements[chatRowElements.length -1];

    if (isSheOnline === false) {
        return;
    }

    if (textingObj.messages[chatId].waitingTime !== null) {
        const waitingTime = decideComponentFromMultipleInMobile(textingObj.messages[chatId], textingObj.messages[chatId].waitingTime, gameSettings);

        if(waitingTime !== null) await wait(waitingTime * 1000);
    }

    isSheOnline = JSON.parse(localStorage.getItem('textingStatus'))[personName].isOnline;
    if (isSheOnline === false) {
        return;
    }

    if (textingObj.messages[chatId].typingTime !== null) {
        const typingTime = decideComponentFromMultipleInMobile(textingObj.messages[chatId], textingObj.messages[chatId].typingTime, gameSettings);
        
        if(typingTime !== null) {
            chatRowElement.innerHTML = `
                <div class="typing-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            `;
    
            messageBoxRoot.scrollTo({ left: 0, top: messageBoxRoot.scrollHeight, behavior: "smooth" });
            await wait(typingTime * 1000);
        }
    }

    isSheOnline = JSON.parse(localStorage.getItem('textingStatus'))[personName].isOnline;
    if (isSheOnline === false) {
        chatRowElement.innerHTML = '';
        return;
    }

    if (textingObj.messages[chatId].bgMusic && chatState.beingOpen === personName) {
        playMobileSounds(false, true, decideComponentFromMultipleInMobile(textingObj.messages[chatId], textingObj.messages[chatId].bgMusic.name, gameSettings), gameSettings, textingObj.messages[chatId]);
    }
    
    const sentPicture = decideComponentFromMultipleInMobile(textingObj.messages[chatId], textingObj.messages[chatId].sentPicture, gameSettings) ?? null;

    if (sentPicture) {
        chatRowElement.innerHTML = `
            <div id="pic-${sentPicture}" class="chatRow_bubble withPic">
                <img src="${isInElectron() ? '.' : '../../..'}/img/special_scenes/${sentPicture}.png" alt="${sentPicture}">
            </div>
        `;

        const thisPicture = qs(`#pic-${sentPicture}`);
        thisPicture.addEventListener('click', () => {
            const mobileContainer = qs('#mobileContainer');

            mobileContainer.insertAdjacentHTML('beforeend', `
                <div id="mobile_specialScene" class="fadeIn" tabindex="0">
                    <img src="${isInElectron() ? '.' : '../../..'}/img/special_scenes/${sentPicture}.png" alt="${sentPicture}">
                </div>    
            `);
    
            const mobile_specialScene = qs('#mobile_specialScene');
            mobile_specialScene.focus();

            mobile_specialScene.addEventListener('click', () => {
                mobile_specialScene.classList.remove('fadeIn');
                mobile_specialScene.classList.add('fadeOut');

                setTimeout(() => {
                    mobile_specialScene.remove();
                    mobileContainer.focus();
                }, 2000);
            })
        });

        const galleryIndexNumber = gameSettings.gallery.findIndex((item) => item.id === sentPicture);
        gameSettings.gallery[galleryIndexNumber].isActivated = true;
        
    } else {

        if (textingObj.messages[chatId].text && isFromHer) {
            putTextMessageToHTML(chatRowElement, textingObj, chatId, gameSettings);
        }
    
        let playerAnswered = false;
        let playerChosed = {answer: null};
    
        if (textingObj.messages[chatId].text && !isFromHer) {
            const currentChatId = chatId;

            if (textingObj.messages[chatId].choiceNow && !textingObj.isMandatory) {
                const currentMobilePartIndex = mobilePartindex.toString().padStart(4, '0');
                const indexLetter = personName.charAt(0).toLowerCase();

                fillInChoiceContainer(`${currentMobilePartIndex}-${indexLetter}`, currentChatId, textingObj, textingObj.messages[chatId], playerChosed, gameSettings);
                
                let conditionMet = false;
                while (!conditionMet && !timeState.shouldStopTimeInterval) {
                    if (playerChosed.answer) {
                        conditionMet = true;

                        setTimeout(() => {
                            textarea.click();
                        }, 500);
                    }
            
                    if (!conditionMet) {
                        await wait(1000);
                    }
                }
            }

            const mobileContainer = qs('#mobileContainer');

            textarea.classList.add('highlighted');

            function typeEvent() {
                const currentMessage = textingObj.messages[currentChatId];
                const currentText = currentMessage.text;
    
                typeIntoMobileTextarea(textarea, currentMessage, currentText, messageSendBtn, mobileContainer, typeEvent, gameSettings);
            };

            textarea.addEventListener('click', typeEvent);

            function btnClickEvent() {
                if (!messageSendBtn.classList.contains('disabled')) {
                    textarea.textContent = '';
                    putTextMessageToHTML(chatRowElement, textingObj, currentChatId, gameSettings);

                    // check if player has to choose at the next time
                    for (let index = currentChatId + 1; index < textingObj.messages.length; index++) {
                        if (index === textingObj.messages.length - 1 && !textingObj.messages[index].choiceNow && !textingObj.isMandatory) {
                            messageBox.querySelector('.messageBox_backBtn').classList.remove('disabled');
                            break;
                        }

                        if (textingObj.messages[index].isFromHer) continue;

                        if (textingObj.messages[index].choiceNow) {
                            messageBox.querySelector('.messageBox_backBtn').classList.add('disabled');

                            qsa('.popup_pic_container').forEach((element) => {
                                element.classList.add('disabled');
                            });

                            break;
                        } 

                        if (!textingObj.messages[index].choiceNow && !textingObj.isMandatory) {
                            messageBox.querySelector('.messageBox_backBtn').classList.remove('disabled');
                            break;
                        }

                    }

                    messageSendBtn.removeEventListener('click', btnClickEvent);
                    messageSendBtn.classList.remove('highlighted');
                    messageSendBtn.classList.add('disabled');
    
                    playerAnswered = true;
                }
            }

            messageSendBtn.addEventListener('click', btnClickEvent);
        }
    
        if (!isFromHer && !textingObj.isMandatory) {
            let conditionMet = false;
            
            while (!conditionMet && !timeState.shouldStopTimeInterval) {
    
                if (playerAnswered) {
                    conditionMet = true;
                }
        
                if (!conditionMet) {
                    await wait(1000);
                }
            }
        }

        let shouldForceClick = false;

        if (!isFromHer && textingObj.isMandatory) {
            let conditionMet = false;
            let passedSeconds = 0;

            if (textingObj.messages[chatId].choiceNow) {
                const currentMobilePartIndex = mobilePartindex.toString().padStart(4, '0');
                const indexLetter = personName.charAt(0).toLowerCase();

                fillInChoiceContainer(`${currentMobilePartIndex}-${indexLetter}`, chatId, textingObj, textingObj.messages[chatId], playerChosed, gameSettings);
            }   

            while (!conditionMet && !timeState.shouldStopTimeInterval && passedSeconds <= 10) {
                if (passedSeconds === 10) {
                    shouldForceClick = true;
                }
                
                if (playerAnswered) {
                    conditionMet = true;
                }
                
                if (!conditionMet) {
                    await wait(1000);
                    passedSeconds++;
                }
            }
            
            if (shouldForceClick) {
                if (textingObj.isMandatory && textingObj.messages[chatId].choiceNow) {
                    const currentMobilePartIndex = mobilePartindex.toString().padStart(4, '0');
                    const indexLetter = personName.charAt(0).toLowerCase();
                    const choiceId = `${currentMobilePartIndex}-${indexLetter}`;

                    const choiceData = choiceDataBase[choiceId][chatId];
                    const mobile_choiceContainer = qs(`#mobile_choiceContainer`);
                    const mobileButtonContainer = qs('#mobileButtonContainer');
                    const inGame_navbar_icon = qs('#inGame_navbar_icon');
                    
                    const answer = playerChosed.answer || choiceData.options[choiceData.options.length - 1].option;
                    const slotNumber = +localStorage.getItem('slotNumber') || 0;
                    gameSettings.savingSlots[slotNumber].decisions[choiceData.character][choiceData.location][`${choiceId}-${chatId}`] = answer;
                
                    mobileButtonContainer.classList.remove('fadeOut');
                    mobileButtonContainer.classList.add('fadeIn');
                    inGame_navbar_icon.classList.remove('fadeOut');
                    inGame_navbar_icon.classList.add('fadeIn');
        
                    mobile_choiceContainer.classList.remove('fadeIn');
                    mobile_choiceContainer.classList.add('fadeOut');

                    await wait(2000);
                }

                if (textarea.textContent.length < 1) {
                    textarea.click();
                }

                const chosenAnswer = decideComponentFromMultipleInMobile(textingObj.messages[chatId], textingObj.messages[chatId].text, gameSettings);
                if (chosenAnswer?.length) {
                    await wait((chosenAnswer.length + 1) * 30);

                    messageSendBtn.classList.remove('disabled');
    
                    await wait(200);
    
                    messageSendBtn.click();
                }
            }
        }
    }

    messageBoxRoot.scrollTo({ left: 0, top: messageBoxRoot.scrollHeight, behavior: "smooth" });

    isSheOnline = JSON.parse(localStorage.getItem('textingStatus'))[personName]?.isOnline || false;
    if (isSheOnline === false) {
        return;
    }

    //Save textingStatus --- START
    let textingStatus = JSON.parse(localStorage.getItem('textingStatus') || '{}');

    if (Object.keys(textingStatus).length === 0) return;
    
    const updatedProperties  = 
        {
            id: chatId, 
            unread: chatState.beingOpen === personName ? 0 : textingStatus[personName].unread + 1, 
            isOnline: isSheOnline, 
            music: textingStatus[personName].music || ''
        };

    const updatedStatus = {
        ...textingStatus, 
        [personName]: {
            ...(textingStatus[personName] || {}),
            ...updatedProperties
        }
    };

    textingStatus = updateStatusCallback(textingStatus, updatedStatus);
    localStorage.setItem('textingStatus', JSON.stringify(textingStatus));
    
    //Save textingStatus --- END

    const mobileRoot_messageList = qs('#mobileRoot_messageList');
    const listElement = Array.from(qsa('.messageList-element')).find((el) => 
        el.getAttribute("data-conversation").split(' ')[0] === personName);
    const mobile_profilePicsContainer = qs('#mobile_profilePicsContainer');
    const actualnewmessagePopup = qs(`#${personName}_popup`);
    
    if (!mobileRoot_messageList) return;

    mobileRoot_messageList.prepend(listElement);
    
    if (chatState.beingOpen !== personName) {
        playMobileSounds(true, false, 'unseen-new-message', gameSettings);

        if (mobile_profilePicsContainer.firstChild !== actualnewmessagePopup) {
            mobile_profilePicsContainer.prepend(actualnewmessagePopup);
        }

        actualnewmessagePopup ? actualnewmessagePopup.querySelector('.flag').innerText = textingStatus[personName]?.unread : null;
        if (!actualnewmessagePopup?.classList.contains('visible')) {
            actualnewmessagePopup?.classList.add('visible');
        } 

        const flag = listElement.querySelector('.flag');
        flag.innerText = textingStatus[personName].unread;
        flag.classList.add('unread');
    } else {
        if (isFromHer) {
            playMobileSounds(true, false, 'seen-new-message', gameSettings);
        } else {
            playMobileSounds(true, false, 'sent-message', gameSettings);
        }
    }

    if (textingObj.messages[chatId]?.chatSkip) {
        const slotNumber = +localStorage.getItem('slotNumber') || 0;
        let character, location, choiceId;
		[character, location, choiceId] = textingObj.messages[chatId].choicePath.split('~');

		const selectedChoice = +gameSettings.savingSlots[slotNumber].decisions[character][location][choiceId].replace('option_', '');

        chatId += textingObj.messages[chatId].chatSkip[selectedChoice];
    }

    const navbarContainer = qs('#navbar_Container');
    let conditionMet = false;
            
    while (!conditionMet && !timeState.shouldStopTimeInterval) {

        if (!navbarContainer?.classList.contains('open')) {
            conditionMet = true;
        }

        if (!conditionMet) {
            await wait(1000);
        }
    }

    chatId++;

    if (chatId < textingObj.messages.length && !timeState.shouldEndConversations && isSheOnline) {
        continueConversation(boxId, textingObj, chatId, gameSettings, chatState, timeState, mobilePartindex);
    }
};
