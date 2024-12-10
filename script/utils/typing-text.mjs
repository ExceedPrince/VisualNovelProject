import { setStoryComponentFromMultiple } from './set-story-component-from-multiple.mjs'

export const typingText = (gameSettings, stepObject, text, element, container) => {
	let index = 0;
	element.textContent = '';
	element.className = setStoryComponentFromMultiple(stepObject.textClass, stepObject, gameSettings);

	function type() {
		let finalText = setStoryComponentFromMultiple(text, stepObject, gameSettings);

		if (gameSettings.settings.screen.isTypingOff) {
			element.textContent = finalText;
			container.isTyping = false;

			return;
		}

		if (index < finalText.length && container.isTyping) {
			element.textContent += finalText.charAt(index);
			index++;
			setTimeout(type, 30);
		} else {
			container.isTyping = false;
		}
	}

	type();
}