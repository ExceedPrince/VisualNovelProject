import { qs } from "../utils/commons.mjs";
import { isInElectron } from '../utils/is-in-electron.mjs';

export const showQuitWindow = (innerMenu_window, quit_window, state) => {
    quit_window.innerHTML = `
        <h2>Are you sure you want to quit from the game? </br>Any unsaved progress will be lost.</h2>
        <div>
            <button type="button" id="quitYesBtn">Yes</button>
            <button type="button" id="quitNoBtn">No</button>
        </div>
    `;

    const quitYesBtn = qs('#quitYesBtn');
    const quitNoBtn = qs('#quitNoBtn');

    quitNoBtn.addEventListener('click', () => {
        innerMenu_window.firstChild.classList.remove('fadeIn');
        innerMenu_window.firstChild.classList.add('fadeOut');
        innerMenu_window.classList.remove('fadeIn');
        innerMenu_window.classList.add('fadeOut');

        setTimeout(() => {
            innerMenu_window.innerHTML = '';
            state.openedMenuPoint = null;
        }, 2000);
    });

    quitYesBtn.addEventListener('click', () => {
        if (isInElectron()) {
            window.electron.closeApp();
        } else {
            console.log('force quit from the game')
        }
    });
};