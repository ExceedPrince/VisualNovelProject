import { qs } from '../../utils/commons.mjs';
import { isInElectron } from '../../utils/is-in-electron.mjs';
import { QUIT_OPEN } from '../../constants/statics.mjs';

export const openQuit = (mainColumn_2, state) => {
    if (state.openedMenuPoint === QUIT_OPEN) {
        qs('#quit_inner').classList.remove('fadeIn');
        qs('#quit_inner').classList.add('fadeOut');

        setTimeout(() => {
            state.openedMenuPoint = null;
            mainColumn_2.innerHTML = '';
        }, 2000);

        return;
    }

    if (mainColumn_2.firstChild) {
        mainColumn_2.firstChild.classList.remove('fadeIn');
        mainColumn_2.firstChild.classList.add('fadeOut');
    }

    setTimeout(() => {
        mainColumn_2.innerHTML = '<div id="quit_inner" class="fadeIn"></div>';
        const quitInner = qs('#quit_inner');

        state.openedMenuPoint = QUIT_OPEN;
    
        showQuit(mainColumn_2, quitInner, state);
    }, mainColumn_2.firstChild ? 2000 : 0);
};

const showQuit = (mainColumn_2, quitInner, state) => {
    quitInner.insertAdjacentHTML('beforeend', `
        <h2>Do you really want to quit from the game?</h2>
        <div>
            <button type="button" id="deleteYesBtn">Yes</button>
            <button type="button" id="deleteNoBtn">No</button>
        </div>
    `);

    const deleteYesBtn = qs('#deleteYesBtn');
    const deleteNoBtn = qs('#deleteNoBtn');

    deleteYesBtn.addEventListener('click', () => {
        if (isInElectron()) {
            window.electron.closeApp();
        } else {
            console.log('force quit from the game');
        }
    });

    deleteNoBtn.addEventListener('click', () => {
        mainColumn_2.firstChild.classList.remove('fadeIn');
        mainColumn_2.firstChild.classList.add('fadeOut');

        setTimeout(() => {
            mainColumn_2.innerHTML = '';
            state.openedMenuPoint = null;
        }, 2000);
    });
};