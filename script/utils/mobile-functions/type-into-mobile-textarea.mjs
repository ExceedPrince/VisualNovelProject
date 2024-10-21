import { decideComponentFromMultipleInMobile } from "./decide-component-from-multiple-in-mobile.mjs";

export const typeIntoMobileTextarea = (textarea, messageObject, text, messageSendBtn, mobileContainer, func, gameSettings) => {
    let index = 0;

    if (textarea.textContent.length > 0) return;
    textarea.classList.remove('highlighted');

    if (!gameSettings.settings.screen.isTypingOff) {
        mobileContainer.focus();
        mobileContainer.isTyping = true;
    }

    function type() {
        let finalText = decideComponentFromMultipleInMobile(messageObject, text, gameSettings);

        if (!finalText) return;
    
        if (gameSettings.settings.screen.isTypingOff) {
            textarea.textContent = finalText;
            mobileContainer.isTyping = false;
            textarea.removeEventListener('click', func);

            messageSendBtn.classList.remove('disabled');
            messageSendBtn.classList.add('highlighted');
    
            return;
        }
    
        if (index < finalText.length && mobileContainer.isTyping) {
            textarea.textContent += finalText.charAt(index);
            index++;
            setTimeout(type, 30);
        } else {
            mobileContainer.isTyping = false;
            textarea.removeEventListener('click', func);

            messageSendBtn.classList.remove('disabled');
            messageSendBtn.classList.add('highlighted');
        }
    }
    
    type();
};

