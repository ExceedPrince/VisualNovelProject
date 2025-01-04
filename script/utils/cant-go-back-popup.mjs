import { qs } from './commons.mjs';

export const cantGoBackPopup = async (storyContainer) => {
	if (qs('#cantGoBackContainer')) {
		return;
	}
	
	storyContainer.insertAdjacentHTML("beforeend", `
		<div id="cantGoBackContainer">
			<div id="cantGoBackBox">
			 	<p id="cantGoBackBox-inner"></p>
			</div>
		</div>
	`);

	const cantGoBackContainer = qs('#cantGoBackContainer');
	const cantGoBackBoxInner = qs('#cantGoBackBox-inner');

	const messages = [
		"Life doesn't have a rewind button, and neither does this story. Embrace your choices and move forward.",
		"I also wish I could go back and change some of my decisions, but that's not how life — or this game — works. Let's keep moving!",
		"Every choice shapes the story, and some paths only move forward. What happens next is up to you!",
		"Regret won't rewrite the past, but it can guide the future. There's no turning back now — what's done is done.",
		"Decisions are like stepping stones: once placed, they lead us forward, not back. Let's see where your path takes you!"
	];

	const chosenMessage = messages[Math.floor(Math.random() * messages.length)];
	cantGoBackBoxInner.innerHTML = chosenMessage;

	cantGoBackContainer.classList.add('fadeIn');
	setTimeout(() => {
		cantGoBackContainer.classList.remove('fadeIn');
		cantGoBackContainer.classList.add('fadeOut');

		setTimeout(() => {
			cantGoBackContainer.remove();;
		}, 3000);
	}, 5000);
};