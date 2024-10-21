import { qs } from "../commons.mjs";
import { mobileParts } from "../../constants/mobile-parts.mjs";
import { checkForNewStartingConversation } from "./check-for-new-starting-conversation.mjs";
import { exitFromMobilePage } from "./exit-from-mobile-page.mjs";
import { updateStatusCallback } from "./update-status-callback.mjs";
import { fillInMissedChoices } from "./fill-in-missed-choices.mjs";
import { checkForEndOfConversation } from "./check-for-end-of-conversation.mjs";

export const changeMobileTime = (currentTime, endTime, mobilePartindex, timeState, chatState, gameSettings, nextStoryScene, loadedMessageList) => {
    const [currentHour, currentMinute] = currentTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    let convertedCurrentTime = +currentHour * 60 + +currentMinute;
    const convertedEndTime = +endHour * 60 + +endMinute;

    const mobileTime = qs('#mobileTime');

    const convertBackTimeToString = (time) => {
        const hour = Math.floor(time / 60);
        const minute = time - hour * 60;

        return `${hour === 24 ? '00' : hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
    };

    const currentScene = mobileParts[mobilePartindex];
    const currentSceneConversations = Object.entries(currentScene.textingPartner);

    const interval = setInterval(() => {
        const navbarContainer = qs('#navbar_Container');
        if (!navbarContainer?.classList.contains('open')) {
            convertedCurrentTime += 1;

            if (timeState.shouldStopTimeInterval) {
                clearInterval(interval);
                mobileTime.innerHTML = convertBackTimeToString(convertedCurrentTime);
                return;
            }
    
            if (convertedCurrentTime === 1440) convertedCurrentTime = 0;

            if (convertedCurrentTime >= convertedEndTime && convertedEndTime - convertedCurrentTime >= 0) {
                clearInterval(interval);
                mobileTime.innerHTML = endTime;

                if (timeState) timeState.shouldEndConversations = true;
    
                setTimeout(() => {
                    const updatedGameSettings = fillInMissedChoices(gameSettings, mobilePartindex);
                    exitFromMobilePage(updatedGameSettings, mobilePartindex, nextStoryScene);
                }, 2000);
            } else {
                const timeString = convertBackTimeToString(convertedCurrentTime);
                mobileTime.innerHTML = timeString;
                let currentTextingStatus = JSON.parse(localStorage.getItem('textingStatus'));

                const timeCheckedTextingStatus = checkForEndOfConversation(currentTextingStatus, timeString, currentSceneConversations);
    
                const updatedStatus = {...timeCheckedTextingStatus, currentTime: timeString};
                currentTextingStatus = updateStatusCallback(timeCheckedTextingStatus, updatedStatus);
                localStorage.setItem('textingStatus', JSON.stringify(currentTextingStatus));
    
                checkForNewStartingConversation(timeString, currentSceneConversations, loadedMessageList, chatState, timeState, gameSettings, mobilePartindex);
            }
        }
    }, 2000);
};