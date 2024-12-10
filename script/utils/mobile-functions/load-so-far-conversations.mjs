import { qs, qsa } from "../commons.mjs";
import { isInElectron } from "../is-in-electron.mjs";
import { continueConversation } from "./continue-conversation.mjs";
import { decideComponentFromMultipleInMobile } from "./decide-component-from-multiple-in-mobile.mjs";

function putTextMessageToHTML(chatRowElement, textingObj, gameSettings) {
    chatRowElement.innerHTML = `
        <div class="chatRow_bubble">
            ${decideComponentFromMultipleInMobile(textingObj, textingObj.text, gameSettings)}
        </div>
    `;
};

export const loadSoFarConversations = (textingPartners, textingStatus, gameSettings, chatState, timeState, mobilePartindex) => {
    Object.entries(textingPartners).forEach(([name, obj]) => {
        const [currentHour, currentMinute] = textingStatus.currentTime.split(":");
        const [startHour, startMinute] = obj.sheStartsAt.split(":");
        const [endHour, endMinute] = obj.sheEndsAt.split(":");
    
        let convertedCurrentTime = +currentHour * 60 + +currentMinute;
        const convertedStartTime = +startHour * 60 + +startMinute;
        const convertedEndTime = +endHour * 60 + +endMinute;

        if (!(convertedCurrentTime > convertedStartTime) || (convertedStartTime > convertedEndTime && convertedCurrentTime < convertedEndTime)) {
            return;
        }

        const messageBox = qs(`#${name}_messageBox`);
        const messageBoxRoot = messageBox.querySelector('.messageBox_root');
        let chatId = textingStatus[name]?.id;

        const textingObj = Array.from(obj.messages);

        for (let index = 0; index <= chatId; index++) {
            const chatRow = `<div class="chatRow ${textingObj[index].isFromHer ? 'left' : 'right'}"></div>`;
            messageBoxRoot.insertAdjacentHTML('beforeend', chatRow);
    
            const chatRowElements = messageBoxRoot.querySelectorAll('.chatRow');
            const chatRowElement = chatRowElements[chatRowElements.length -1];
            
            const sentPicture = decideComponentFromMultipleInMobile(textingObj[index], textingObj[index].sentPicture, gameSettings) ?? null;
    
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
            } else {
                if (textingObj[index].text && textingObj[index].isFromHer) {
                    putTextMessageToHTML(chatRowElement, textingObj[index], gameSettings);
                }

                if (!textingObj[index].isFromHer && !obj.isMandatory) {
                    putTextMessageToHTML(chatRowElement, textingObj[index], gameSettings);
                }

                if (!textingObj[index].isFromHer && obj.isMandatory) {
                    putTextMessageToHTML(chatRowElement, textingObj[index], gameSettings);
                }
            }
        }

        if (obj.isMandatory) {
            setTimeout(() => {
                messageBox.classList.add('open');
                messageBox.querySelector('.messageBox_backBtn').classList.add('disabled');
                qs(`#${name}_popup`)?.classList.remove('visible');

                if (textingStatus[name]?.isOnline) {
                    const partnerMessageBox = messageBox.querySelector('.messageBox_onlineStatus');
                    partnerMessageBox.classList.remove('offline');
                    partnerMessageBox.classList.add('online');
                }
            
                const listElement = Array.from(qsa('.messageList-element')).find((el) => 
                    el.getAttribute("data-conversation").split(' ')[0] === name);
    
                listElement?.querySelector('.flag.unread')?.classList.remove('unread');
    
                chatState.beingOpen = name;
            }, 100);
        }
        
        messageBoxRoot.scrollTo({ left: 0, top: messageBoxRoot.scrollHeight, behavior: "smooth" });
        
        chatId++;
        
        if (chatId < obj.messages.length && !timeState.shouldEndConversations) {
            continueConversation(`#${name}_messageBox`, obj, chatId, gameSettings, chatState, timeState, mobilePartindex);
        }
    });
};