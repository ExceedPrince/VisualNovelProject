import { qs, qsa } from "../commons.mjs";
import { continueConversation } from "./continue-conversation.mjs";

export const startConversation = (boxId, textingObj, gameSettings, chatState, timeState, mobilePartindex) => {
    let chatId = 0;
    const messageBox = qs(boxId);
    const personName = boxId.split('_')[0].replace('#', '');

    const partnerMessageBox = messageBox.querySelector('.messageBox_onlineStatus');
    partnerMessageBox.classList.remove('offline');
    partnerMessageBox.classList.add('online');
    
    if (textingObj.isMandatory) {
        messageBox.classList.add('open');
        messageBox.querySelector('.messageBox_backBtn').classList.add('disabled');

        chatState.beingOpen = personName;
        
        qsa('.messageList-element').forEach((listElement) => {
            if (listElement.getAttribute('data-conversation').indexOf(personName) > -1) {
                listElement.querySelector('.flag.unread')?.classList.remove('unread');
                return;
            }
        });
    }

    continueConversation(boxId, textingObj, chatId, gameSettings, chatState, timeState, mobilePartindex);
};