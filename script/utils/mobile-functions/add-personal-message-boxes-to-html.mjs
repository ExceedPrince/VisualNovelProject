import { qs, qsa } from "../commons.mjs";
import { isInElectron } from "../is-in-electron.mjs";

export const addPersonalMessageBoxesToHTML = (partners, mobileRoot, chatState) => {
    const messageBoxesHTML = partners.map((name) => {
        return `
            <div id="${name}_messageBox" class="messageBox">
                <div class="messageBox_header">
                    <div class="messageBox_headerLeft">
                        <span class="messageBox_backBtn"><img src="${isInElectron() ? '.' : '../../..'}/img/svg/left-arrow.svg" alt="left-arrow"></span>
                        <span class="messageBox_picture">
                            <span class="messageBox_onlineStatus offline"></span>
                            <img src="${isInElectron() ? '.' : '../../..'}/img/social-sync-pictures/${name}_profile.png" alt="${name}_profile">
                        </span>
                        <span class="messageBox_name">${name}</span>
                    </div>
                    <div class="messageBox_headerRight">
                        <span class="messageBox_header_symbol"><img src="${isInElectron() ? '.' : '../../..'}/img/svg/info.svg" alt="info"></span>
                    </div>
                </div>
                <div class="messageBox_root"></div>
                <div class="mobile_keyboard">
                    <span id="${name}_messageTextarea" class="textarea disabled" role="textbox" contenteditable="true"></span>
                    <span id="${name}_messageSendBtn" class="messageSendBtn disabled"><img src="${isInElectron() ? '.' : '../../..'}/img/svg/send.svg" alt="send"></span>
                </div>
            </div>
        `;
    }).join('');

    mobileRoot.insertAdjacentHTML('beforeend', messageBoxesHTML);

    const messageBoxes = qsa('.messageBox');
    messageBoxes.forEach((box) => {
        box.querySelector('.messageBox_backBtn').addEventListener('click', () => {
            box.classList.remove('open');
            chatState.beingOpen = null;
        });
    });

    const textareas = qsa('.textarea');
    textareas.forEach((area) => {
        area.addEventListener('keydown', (event) => {
            event.preventDefault();
        });
        
        area.addEventListener('paste', (event) => {
            event.preventDefault();
        });
        
        area.addEventListener('input', (event) => {
            event.preventDefault();
        });
    })
};