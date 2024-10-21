import { qs, qsa } from "../commons.mjs";
import { isInElectron } from "../is-in-electron.mjs";
import { checkBackForMusicInMobile } from "./check-back-for-music-in-mobile.mjs";
import { updateStatusCallback } from "./update-status-callback.mjs";

export const showNewMessagePic = (currentSceneConversations, pingedName, chatState, gameSettings) => {
    const mobile_profilePicsContainer = qs('#mobile_profilePicsContainer');
    let textingStatus = JSON.parse(localStorage.getItem('textingStatus'));

    if (mobile_profilePicsContainer?.innerHTML === '') {
        const popup_pics_HTML = currentSceneConversations.map(([name, ]) => {
            return `
                <div id="${name}_popup" class="popup_pic_container" data-time="0">
                <img src="${isInElectron() ? '.' : '../../..'}/img/social-sync-pictures/${name}_profile.png" alt="${name}_popupPicture">
                <span class="flag">${textingStatus[name] ? textingStatus[name].unread : 1}</span>
                </div>
            `
        }).join("");
    
        mobile_profilePicsContainer.innerHTML = popup_pics_HTML;

        qsa('.popup_pic_container').forEach((element) => {
            element.addEventListener('click', () => {
                qsa('.messageBox').forEach((messageBox) => {
                    messageBox.classList.remove('open')
                });

                qsa('.messageList-element').forEach((listElement) => {
                    if (listElement.getAttribute('data-conversation').indexOf(element.id.split('_')[0]) > -1) {
                        listElement.querySelector('.flag.unread')?.classList.remove('unread');
                        return;
                    }
                });

                const matchingMessageBox = qs(`#${element.id.split('_')[0]}_messageBox`);
                matchingMessageBox.classList.add('open');

                chatState.beingOpen = element.id.split('_')[0];

                textingStatus = JSON.parse(localStorage.getItem('textingStatus'));
                const optionalMusic = checkBackForMusicInMobile(textingStatus, chatState.beingOpen, currentSceneConversations.find((arr) => arr[0] === chatState.beingOpen)[1], gameSettings);

                const updatedProperties  = {unread: 0};
                if (optionalMusic) updatedProperties['music'] = optionalMusic;

                const updatedStatus = {
                    ...textingStatus,
                    [element.id.split('_')[0]]: {
                        ...(textingStatus[element.id.split('_')[0]] || {}),
                        ...updatedProperties
                    }
                };

                textingStatus = updateStatusCallback(textingStatus, updatedStatus);
                localStorage.setItem('textingStatus', JSON.stringify(textingStatus));

                element.classList.remove('visible');
            })
        });
    }

    if(chatState.beingOpen !== pingedName) {
        const actualnewmessagePopup = qs(`#${pingedName}_popup`);
        actualnewmessagePopup.classList.add('visible');
        mobile_profilePicsContainer.prepend(actualnewmessagePopup);
    }
};