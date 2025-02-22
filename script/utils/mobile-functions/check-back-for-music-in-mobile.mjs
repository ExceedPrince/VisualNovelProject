import { decideComponentFromMultipleInMobile } from "./decide-component-from-multiple-in-mobile.mjs";
import { playMobileSounds } from "./play-mobile-sounds.mjs";

export const checkBackForMusicInMobile = (textingStatus, personName, currentSceneConversation, gameSettings) => {
    let result = '';

    for (let index = textingStatus[personName].id || 0; index >= 0; index--) {
        if (!currentSceneConversation.messages[index].bgMusic) {
            continue;
        }

        if (
            textingStatus[personName].music
            && currentSceneConversation.messages[index].bgMusic.name === textingStatus[personName].music
            && currentSceneConversation.messages[index].bgMusic.command === 'START'
        ) {
            break;
        }

        playMobileSounds(false, true, decideComponentFromMultipleInMobile(currentSceneConversation.messages[index], currentSceneConversation.messages[index].bgMusic.name, gameSettings), gameSettings, currentSceneConversation.messages[index]);
        
        result = currentSceneConversation.messages[index].bgMusic.name;
        break;
    }

    return textingStatus[personName].music || result;
};