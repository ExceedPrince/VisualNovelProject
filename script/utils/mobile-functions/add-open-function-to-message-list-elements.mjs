import { qs, qsa } from "../commons.mjs";
import { checkBackForMusicInMobile } from "./check-back-for-music-in-mobile.mjs";
import { updateStatusCallback } from "./update-status-callback.mjs";

const notAvailableMessagePopups = [
    'There\'s nothing to discuss with this person now.',
    'I have nothing to say there.',
    'I prefer to remain silent for now.',
    'No words to exchange here.',
    'We don\'t have any topics to discuss.',
    'I\'m not not open for this conversation.',
    'I don\'t have anything to talk about.',
    'We have no current topics to discuss.',
    'I have no conversations to start here.',
    'This conversation can wait.'
];

export const addOpenFunctionToMessageListElements = (chatState, sceneConversations, gameSettings) => {
    const messageListElements = qsa('.messageList-element');

    const mobile_popup = qs('#mobile_popup');
    const mobilePopup_BG = qs('#mobilePopup_BG');
    const mobilePopup_container = qs('#mobilePopup_container');
    const mobilePopup_innerContainer = qs('#mobilePopup_innerContainer');

    messageListElements.forEach((listElement) => {
        const conversationName = listElement.getAttribute("data-conversation");
        const [firstName, ] = conversationName.split(' ');

        listElement.addEventListener('click', () => {
            if (qs(`#${firstName}_messageBox`)) {
                qs(`#${firstName}_messageBox`).classList.add('open');
                qs(`#${firstName}_popup`)?.classList.remove('visible');

                listElement.querySelector('.flag.unread')?.classList.remove('unread');

                chatState.beingOpen = firstName;
                let textingStatus = JSON.parse(localStorage.getItem('textingStatus'));
                const optionalMusic = checkBackForMusicInMobile(textingStatus, firstName, sceneConversations.find((arr) => arr[0] === firstName)[1], gameSettings);
                
                if (textingStatus[firstName]?.isOnline) {
                    const updatedProperties  = {unread: 0};
                    const updatedStatus = {
                        ...textingStatus,
                        [firstName]: {
                            ...(textingStatus[firstName] || {}),
                            ...updatedProperties
                        }
                    };
                    
                    textingStatus = updateStatusCallback(textingStatus, updatedStatus);
                }
                textingStatus[firstName]['music'] = optionalMusic;
				localStorage.setItem('textingStatus', JSON.stringify(textingStatus));
            } else {
                const selectedResponse = notAvailableMessagePopups[Math.floor(Math.random() * notAvailableMessagePopups.length)];

                mobilePopup_innerContainer.insertAdjacentHTML('beforeend', `
                    <div id="notAvailableMobileConversation">
                        ${selectedResponse}
                    </div>
                `);
            
                mobile_popup.classList.remove('fadeOut');
                mobile_popup.classList.add('fadeIn');

                mobilePopup_BG.addEventListener('click', () => {
                    mobile_popup.classList.remove('fadeIn');
                    mobile_popup.classList.add('fadeOut');

                    setTimeout(() => {
                        mobilePopup_innerContainer.innerHTML = '';
                    }, 2000);
                });
                mobilePopup_container.addEventListener('click', () => {
                    mobile_popup.classList.remove('fadeIn');
                    mobile_popup.classList.add('fadeOut');

                    setTimeout(() => {
                        mobilePopup_innerContainer.innerHTML = '';
                    }, 2000);
                });
            }
        });

    });
};