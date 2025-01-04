import { qs, qsa } from "../commons.mjs";
import { isInElectron } from "../is-in-electron.mjs";
import { addOpenFunctionToMessageListElements } from "./add-open-function-to-message-list-elements.mjs";
import { showNewMessagePic } from "./show-new-message-pic.mjs";
import { startConversation } from "./start-conversation.mjs";
import { updateStatusCallback } from "./update-status-callback.mjs";

const importantPartners = [
    {pic: 'Reina_profile', name: 'Reina Rue', isOnline: true, unread: 1},
    {pic: 'Brianna_profile', name: 'Brianna Dior', isOnline: true, unread: 1},
    {pic: 'Daena_profile', name: 'Daena Varon', isOnline: true, unread: 1},
    {pic: 'Hailey_profile', name: 'Hailey Jimenez', isOnline: true, unread: 1},
    {pic: 'Lindsay_profile', name: 'Lindsay Lawrie', isOnline: true, unread: 1},
    {pic: 'Samantha_profile', name: 'Samantha Pearl', isOnline: true, unread: 1},
    {pic: 'Donald_profile', name: 'Donald Cherry', isOnline: true, unread: 1},
    {pic: 'Pete_profile', name: 'Pete Cherry', isOnline: true, unread: 1},
];

export const checkForNewStartingConversation = (timeString, currentSceneConversations, loadedMessageList, chatState, timeState, gameSettings, mobilePartindex) => {
    if (currentSceneConversations.length < 0) return;

    const isThereNewConversation = currentSceneConversations.some(([, obj]) => obj.sheStartsAt === timeString);

    if (!isThereNewConversation) return;

    const messageContainer = qs('#mobileRoot_messageList');

    const usedNameList = loadedMessageList.map((partner) => partner.name.split(' ')[0]);
    let textingStatus = JSON.parse(localStorage.getItem('textingStatus'));
    const convertedTextingStatus = Object.entries(textingStatus);

    if (convertedTextingStatus.length > 1) {
        for (const entryArray of convertedTextingStatus) {
            const [name, value] = entryArray;

            if (name === 'currentTime') continue;

            const character = importantPartners.find((partner) => partner.name.indexOf(name) > -1);
            
            if (usedNameList.indexOf(name) > -1) {
                const newConversationIndex = loadedMessageList.findIndex((elem) => elem.name.indexOf(name) > -1);
                loadedMessageList.splice(newConversationIndex, 1);
            } else {
                usedNameList.push(name);
            }
            loadedMessageList.unshift({...value, pic: character.pic, name: character.name});
        }
    }
    
    currentSceneConversations.forEach((element) => {
        const [name, obj] = element;

        if (obj.sheStartsAt !== timeString) return;

        if (!textingStatus.hasOwnProperty(name)) {

            if (usedNameList.indexOf(name) > -1) {
                const newConversation = loadedMessageList.find((elem) => elem.name.indexOf(name) > -1);
                const newConversationIndex = loadedMessageList.findIndex((elem) => elem.name.indexOf(name) > -1);
    
                loadedMessageList.splice(newConversationIndex, 1);
                loadedMessageList.unshift({...newConversation, isOnline: true, unread: 1});
            } else {
                const newConversation = importantPartners.find((elem) => elem.name.indexOf(name) > -1);
                loadedMessageList.unshift(newConversation);
            }
        }

        loadedMessageList = loadedMessageList
            .sort((a, b) => b.unread - a.unread)
            .sort((a, b) => b.isOnline - a.isOnline);

        const newLoadedMessageListToHTML = loadedMessageList.map((item) => (
            `<div class="messageList-element" data-conversation="${item.name}">
                    <div class="messageList-element-left">
                        <img src="${isInElectron() ? '.' : '../../..'}/img/social-sync-pictures/${item.pic}.png" alt="${item.name}">
                        <span>
                            ${item.name}
                            <span class="flag ${item.unread ? 'unread' : ''}">${item.unread}</span>
                        </span>
                    </div>
                    <div class="messageList-element-right">
                        <span>${item.isOnline ? 'Online' : 'Offline'}</span>
                        <div class="onlineStatus ${item.isOnline ? 'online' : 'offline'}"></div>
                    </div>
                </div>`
        )).join('');

        messageContainer.innerHTML = newLoadedMessageListToHTML;

        const updatedProperties  = {id: 0, unread: 0, isOnline: true};
        const updatedStatus = {
            ...textingStatus,
            [name]: {
                ...(textingStatus[name] || {}),
                ...updatedProperties
            }
        };

        textingStatus = updateStatusCallback(textingStatus, updatedStatus);
        localStorage.setItem('textingStatus', JSON.stringify(textingStatus));

        startConversation(`#${name}_messageBox`, obj, gameSettings, chatState, timeState, mobilePartindex);

        if (obj.isMandatory === false) {
            showNewMessagePic(currentSceneConversations, name, chatState, gameSettings);
        }

        addOpenFunctionToMessageListElements(chatState, currentSceneConversations, gameSettings);
    });
};