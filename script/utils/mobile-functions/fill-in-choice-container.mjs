import { qs, qsa, wait } from "../commons.mjs";
import { choiceDataBase } from "../../constants/choice-database.mjs";
import { playMobileSounds } from "./play-mobile-sounds.mjs";

export const fillInChoiceContainer = async (choiceId, chatId, textingObj, currentTextObj, playerChosed, gameSettings) => {
    const choiceData = choiceDataBase[choiceId][chatId];
    const mobile_choiceContainer = qs(`#mobile_choiceContainer`);
    const mobileButtonContainer = qs('#mobileButtonContainer');
    const inGame_navbar_icon = qs('#inGame_navbar_icon');

    mobile_choiceContainer.innerHTML = '';
    mobile_choiceContainer.classList.remove('fadeOut');
    
    mobile_choiceContainer.insertAdjacentHTML('beforeend', `
        <div id="choice_innerContainer">
            <div id="choice_innerContainer_topHalf">
                <div id="choice_questionContainer">
                    <div id="choice_questionInnerContainer">${choiceData.question}</div>
                </div>
            </div>
            <div id="choice_innerContainer_bottomHalf">
                <div class="choiceOptions left"></div>
                <div class="choiceOptions right"></div>
            </div>
        </div>
    `);

    const visibleOptions = choiceData.options.filter((option) => option.value !== '');

    visibleOptions.forEach((option, index) => {
        const optionBricket = `
            <div class="mobile_option" data-value="${option.option}">
                ${option.value}
            </div>
        `;

        qs(`.choiceOptions.${index % 2 === 0 ? 'left' : 'right'}`).innerHTML += optionBricket;
    });

    mobileButtonContainer.classList.remove('fadeIn');
    mobileButtonContainer.classList.add('fadeOut');
    inGame_navbar_icon.classList.remove('fadeIn');
    inGame_navbar_icon.classList.add('fadeOut');

    mobile_choiceContainer.classList.add('fadeIn');

    await wait(2000);

    const allOptions = qsa('.mobile_option');
    Array.from(allOptions).forEach((element) => {
        element.addEventListener('click', () => {
            playMobileSounds(true, false, 'accepted', gameSettings);

            const answer = element.getAttribute('data-value');
            const slotNumber = +localStorage.getItem('slotNumber') || 0;
            gameSettings.savingSlots[slotNumber].decisions[choiceData.character][choiceData.location][`${choiceId}-${chatId}`] = answer;

            playerChosed.answer = answer;

            qsa('.popup_pic_container').forEach((element) => {
                element.classList.remove('disabled');
            });

            mobileButtonContainer.classList.remove('fadeOut');
            mobileButtonContainer.classList.add('fadeIn');
            inGame_navbar_icon.classList.remove('fadeOut');
            inGame_navbar_icon.classList.add('fadeIn');

            mobile_choiceContainer.classList.remove('fadeIn');
            mobile_choiceContainer.classList.add('fadeOut');
        });
    });
};
