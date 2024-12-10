import { qs } from "../commons.mjs";
import { LINDSAY_LOWER, NEUTRAL_LOWER } from "../../constants/statics.mjs";
import { isInElectron } from "../is-in-electron.mjs";
import { navigateToThankYouPage } from "./navigate-to-thank-you-page.mjs";

export const startOutroVideo = (root, endingName, gameSettings) => {
    let videoName = '';

    if (endingName.toLowerCase() === LINDSAY_LOWER || endingName.toLowerCase() === NEUTRAL_LOWER) {
        videoName = 'Bad_outro';
    } else {
        videoName = `${endingName}_outro`;
    }

    root.classList.remove('fadeOut');
	root.classList.add('fadeIn');

    root.insertAdjacentHTML('beforeend', `
        <div id="videoContainer">
            <video id="outro_video" autoplay>
                <source src="${isInElectron() ? '.' : '../../..'}/videos/${videoName}.mp4" type="video/mp4">
            </video>
        </div>
    `);

    const videoElement = qs('#outro_video');
    const videoContainer = qs('#videoContainer');

    videoElement.addEventListener('ended', fadeOutAndClearVideo);

    setTimeout(() => {
        videoContainer.insertAdjacentHTML('beforeend', `
            <div id='videoStopBtn'>X</div>
        `);

        const button = qs('#videoStopBtn')
        button.addEventListener('click', fadeOutAndClearVideo);
    }, 10000);

    function fadeOutAndClearVideo() {
        videoElement.pause();
        root.classList.remove('fadeIn')
        root.classList.add('fadeOut');

        setTimeout(() => {
            root.innerHTML = '';
            navigateToThankYouPage(root, endingName, gameSettings);
        }, 2000);
    }
};