import { isInElectron } from '../is-in-electron.mjs';

const isOnline = (shouldOnline) => shouldOnline === false ? false : Math.random() > 0.5;

const conversations = [
    {pic: 'Reina_profile', name: 'Reina Rue', isOnline: isOnline(false), unread: 0},
    {pic: 'Brianna_profile', name: 'Brianna Dior', isOnline: isOnline(false), unread: 0},
    {pic: 'Daena_profile', name: 'Daena Varon', isOnline: isOnline(false), unread: 0},
    {pic: 'Hailey_profile', name: 'Hailey Jimenez', isOnline: isOnline(false), unread: 0},
    {pic: 'Lindsay_profile', name: 'Lindsay Lawrie', isOnline: isOnline(false), unread: 0},
    {pic: 'Samantha_profile', name: 'Samantha Pearl', isOnline: isOnline(), unread: 0},
    {pic: 'Donald_profile', name: 'Donald Cherry', isOnline: isOnline(), unread: 0},
    {pic: 'Pete_profile', name: 'Pete Cherry', isOnline: isOnline(), unread: 0},
    {pic: 'Adam_profile', name: 'Adam Ross', isOnline: isOnline(), unread: 0},
    {pic: 'Cody_profile', name: 'Cody Cook', isOnline: isOnline(), unread: 0},
    {pic: 'Freddy_profile', name: 'Freddy Allison', isOnline: isOnline(), unread: 0},
    {pic: 'Anna_profile', name: 'Anna Grant', isOnline: isOnline(), unread: 0},
    {pic: 'Jennifer_profile', name: 'Jennifer Burton', isOnline: isOnline(), unread: 0},
    {pic: 'Maisy_profile', name: 'Maisy Scott', isOnline: isOnline(), unread: 0},
    {pic: 'Yasmin_profile', name: 'Yasmin Hardy', isOnline: isOnline(), unread: 0},
    {pic: 'Olivia_profile', name: 'Olivia Scott', isOnline: isOnline(), unread: 0},
    {pic: 'Jade_profile', name: 'Jade Taylor', isOnline: isOnline(), unread: 0},
    {pic: 'Izabella_profile', name: 'Izabella Petersen', isOnline: isOnline(), unread: 0},
    {pic: 'Amy_profile', name: 'Amy Carr', isOnline: isOnline(), unread: 0},
    {pic: 'Caitlyn_profile', name: 'Caitlyn Murphy', isOnline: isOnline(), unread: 0},
];

export const createmessageList = (bannedNames, textingStatus = null) => {
    const filteredArray = conversations.filter((item) => !bannedNames.includes(item.name));

    for (let i = filteredArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredArray[i], filteredArray[j]] = [filteredArray[j], filteredArray[i]];
    }

    if (textingStatus) {
        const convertedTextingStatus = Object.entries(textingStatus);
        const usedNameList = filteredArray.map((partner) => partner.name.split(' ')[0]);

        for (const [name, obj] of convertedTextingStatus) {
            if (name === 'currentTime') continue;

            if (usedNameList.indexOf(name) > -1) {
                const newConversation = filteredArray.find((elem) => elem.name.indexOf(name) > -1);
                const newConversationIndex = filteredArray.findIndex((elem) => elem.name.indexOf(name) > -1);
    
                filteredArray.splice(newConversationIndex, 1);
                filteredArray.unshift({...newConversation, isOnline: obj.isOnline, unread: obj.unread});
            } else {
                const newConversation = conversations.find((elem) => elem.name.indexOf(name) > -1);
                filteredArray.unshift({...newConversation, isOnline: obj.isOnline, unread: obj.unread});
            }
        }
    }

    //Return 10 conversations
    return filteredArray
        .slice(0, 10)
        .sort((a, b) => b.unread - a.unread)
        .sort((a, b) => b.isOnline - a.isOnline);
};

export const addMessageListToHTML = (messageList) => {
    return messageList.map((item) => (
        `<div class="messageList-element" data-conversation="${item.name}">
                <div class="messageList-element-left">
                    <img src="${isInElectron() ? '.' : '../../..'}/img/social-sync-pictures/${item.pic}.png" alt="${item.name}">
                    <span>
                        ${item.name}
                        <span class="flag ${item.unread > 0 ? "unread" : ""}">${item.unread}</span>
                    </span>
                </div>
                <div class="messageList-element-right">
                    <span>${item.isOnline ? 'Online' : 'Offline'}</span>
                    <div class="onlineStatus ${item.isOnline ? 'online' : 'offline'}"></div>
                </div>
            </div>`
    )).join('');
};