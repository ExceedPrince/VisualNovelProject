import { qs, qsa } from "../commons.mjs";

export const checkForEndOfConversation = (textingStatus, timeString, currentSceneConversations) => {
    currentSceneConversations.forEach(([partnerName, partnerObj]) => {
        if (partnerObj.sheEndsAt === timeString) {
            textingStatus[partnerName].isOnline = false;

            const partner = Array.from(qsa('.messageList-element')).find((el) => 
                el.getAttribute("data-conversation").split(' ')[0] === partnerName);

            partner.querySelector('.messageList-element-right span').innerText = 'Offline';

            const statusPoint = partner.querySelector('.messageList-element-right .onlineStatus');
            statusPoint.classList.remove('online');
            statusPoint.classList.add('offline');

            const onlineElements = Array.from(qsa('.messageList-element .onlineStatus.online'));

        if (onlineElements.length > 0) {
                const lastOnlineElement = onlineElements[onlineElements.length - 1].closest('.messageList-element');
                
                lastOnlineElement.after(partner);
            }

            const partnerMessageBox = qs(`#${partnerName}_messageBox`);
            const partnerMessageBoxStatusPoint = partnerMessageBox.querySelector('.messageBox_onlineStatus');
            partnerMessageBoxStatusPoint.classList.remove('online');
            partnerMessageBoxStatusPoint.classList.add('offline');

            if (partnerObj.isMandatory) {
                partnerMessageBox.querySelector('.messageBox_backBtn').classList.remove('disabled');
            }
        }
    });

    return textingStatus;
};