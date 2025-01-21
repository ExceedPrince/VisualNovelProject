import { qs } from "../commons.mjs";
import { mobileParts } from "../../constants/mobile-parts.mjs";
import { checkForNewStartingConversation } from "./check-for-new-starting-conversation.mjs";
import { exitFromMobilePage } from "./exit-from-mobile-page.mjs";
import { updateStatusCallback } from "./update-status-callback.mjs";
import { fillInMissedChoices } from "./fill-in-missed-choices.mjs";
import { checkForEndOfConversation } from "./check-for-end-of-conversation.mjs";
import { isInElectron } from "../is-in-electron.mjs";

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
    const timeData = collectTimeData(currentScene, currentSceneConversations);
    const chronologicalTimeData = createChronologicalList(timeData);
    let intervalNum = 2000;
    let isSpeededUp = false;
    let interval;

    function startInterval() {
        clearInterval(interval);
        interval = setInterval(() => {
            const navbarContainer = qs('#navbar_Container');

            if (timeState.canSpeedUp) {
                const remainedTimeData = chronologicalTimeData.filter((time) => time.minutes > convertedCurrentTime && timeState.canSpeedUp[1] !== time.value)
                const speedUpContainer = qs('#mobile_speedUpContainer');
                
                if (remainedTimeData[0].minutes - convertedCurrentTime >= 5) {
                    speedUpContainer.innerHTML = `
                        <img src="${isInElectron() ? '.' : '../../..'}/img/svg/forward.svg" class="${isSpeededUp ? 'half-faded' : ''}" alt="forward"></img>
                    `;
                    speedUpContainer.classList.add('fadeIn');

                    speedUpContainer.addEventListener('click', () => {
                        if (speedUpContainer.innerHTML !== '') {
                            const otherSoundsAudio = qs('#other_sound_effects_audio');
                            otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
                            otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/accepted.mp3`;
                            otherSoundsAudio.play();

                            intervalNum = 500;
                            startInterval();
                            isSpeededUp = true;
                        }
                    });
                }

                if (remainedTimeData[0].minutes - convertedCurrentTime === 2) {
                    if (isSpeededUp) {
                        isSpeededUp = false;
                    }

                    timeState.canSpeedUp = false;
                    intervalNum = 2000;
                    startInterval();

                    speedUpContainer.classList.remove('fadeIn');

                    setTimeout(() => {
                        speedUpContainer.innerHTML = '';
                    }, 300);
                }
            }

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


        }, intervalNum);
    };

    startInterval();
};

function collectTimeData (currentScene, currentSceneConversations) {
    const convObjects = currentSceneConversations.map((item) => item[1]);
    const result = {
        sheStartsAt: [],
        sheEndsAt: [],
    };
    
    convObjects.forEach((conversation, index) => {
        result.sheStartsAt.push({
            id: index,
            value: conversation.sheStartsAt,
        });
    
        result.sheEndsAt.push({
            id: index,
            value: conversation.sheEndsAt,
        });
    });
    
    result.sheEndsAt.push({
        id: result.sheEndsAt.length,
        value: currentScene.endTime,
    });

    return result;
};

function createChronologicalList(data) {
    const convertToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;
        if (hours < 6) { // only requiremet at this moment is: do not have messenger talk in very early hours in the morning
            totalMinutes += 24 * 60;
        }
        return totalMinutes;
    };

    const combined = [
        ...data.sheStartsAt.map(item => ({
            ...item,
            minutes: convertToMinutes(item.value),
        })),
        ...data.sheEndsAt.map(item => ({
            ...item,
            minutes: convertToMinutes(item.value),
        })),
    ];

    combined.sort((a, b) => a.minutes - b.minutes);

    return combined;
}