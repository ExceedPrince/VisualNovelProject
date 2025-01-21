import { qs, qsa } from "../utils/commons.mjs";
import { closeSavePopup } from '../utils/close-save-popup.mjs';

export const createInGameMenu = () => {
    const navBarScratch = `
        <div id="inGame_navbar_icon" class="fadeIn">
            <div id="line_0" class="navbarLine"></div>
            <div id="line_1" class="navbarLine"></div>
            <div id="line_2" class="navbarLine"></div>
        </div>
    `;

    const sideNavbarScratch = `
        <div id="navbar_Container">
            <div class="falling-icons inGame-falling-icons">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i>
            </div>
            <div id="navbar_inner">
                <div id="navbar_backToMainMenu" class="navbar_options">Main Menu</div>
                <div id="navbar_saveGame" class="navbar_options">Save Game</div>
                <div id="navbar_loadGame" class="navbar_options">Load Game</div>
                <div id="navbar_settings" class="navbar_options">Settings</div>
                <div id="navbar_quit" class="navbar_options">Quit</div>
            </div>
        </div>
        <div id="innerMenu_window"></div>
        <div id="unclickable_navbar_BG"></div>
    `;

    return navBarScratch + sideNavbarScratch;
};

export const refreshFallingIcons = () => {
    const navbarContainer = qs('#navbar_Container');
    const inGameFallingIcons = qs('.inGame-falling-icons');

    if (!inGameFallingIcons) return;
    
    inGameFallingIcons.classList.add('fadeOut');

    setTimeout(() => {
        inGameFallingIcons.remove();
        navbarContainer.insertAdjacentHTML('afterbegin', `
            <div class="falling-icons inGame-falling-icons">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i>
            </div>
        `);
    }, 2000);
};

export const navbarIconClick = () => {
    const navbarIcon = qs('#inGame_navbar_icon');
    const navbarContainer = qs('#navbar_Container');
    const navbarBG = qs('#unclickable_navbar_BG');

    const innerMenu_window = qs('#innerMenu_window');

    const saveContainer = qs('#saveContainer');
	const saveBG = qs('#save_BG');

    if (saveContainer && saveBG) {
        closeSavePopup(saveContainer);
    }

    if (navbarIcon.classList.contains('open') && innerMenu_window?.children.length > 0) {
        navbarIcon.classList.remove('open');
        navbarContainer.classList.remove('open');
        navbarBG.classList.remove('open'); 

        closeInGameMenu();

        return;
    }

    setTimeout(() => {
        navbarIcon.classList.toggle('open');
        navbarContainer.classList.toggle('open');
        navbarBG.classList.toggle('open');        
    }, saveContainer || saveBG ? 2000 : 0);
};

export const closeInGameMenu = () => {
    const navbarIcon = qs('#inGame_navbar_icon');
    const navbarContainer = qs('#navbar_Container');
    const navbarBG = qs('#unclickable_navbar_BG');
    const innerMenu_window = qs('#innerMenu_window');

    navbarIcon.classList.remove('open');
    navbarContainer.classList.remove('open');
    navbarBG.classList.remove('open');

    innerMenu_window.classList.remove('fadeIn');
    innerMenu_window.classList.add('fadeOut');
    innerMenu_window.innerHTML = '';
};