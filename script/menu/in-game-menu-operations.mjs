import { qs } from "../utils/commons.mjs";
import { showBackToMainWindow } from "./show-back-to-main-window.mjs";
import { showSaveGameWindow } from "./show-save-game-window.mjs";
import { showLoadGameWindow } from "./show-load-game-window.mjs";
import { showSettingsWindow } from "./show-settings-window.mjs";
import { showQuitWindow } from "./show-quit-window.mjs";
import { BACK_TO_MENU_OPEN, SAVE_OPEN, LOAD_OPEN, SETTINGS_OPEN, QUIT_OPEN } from '../constants/statics.mjs';

export const inGameMenuOperations = (pageType, innerMenu_window, gameSettings, slotNumber, sceneNumber, stepNumber, endingSceneType = null, timeState = null) => {
    const navbar_backToMainMenu = qs('#navbar_backToMainMenu');
    const navbar_saveGame = qs('#navbar_saveGame');
    const navbar_loadGame = qs('#navbar_loadGame');
    const navbar_settings = qs('#navbar_settings');
    const navbar_quit = qs('#navbar_quit');

    const state = {
        openedMenuPoint: null
    }

    //BACK TO MAIN MENU
    navbar_backToMainMenu.addEventListener('click', () => {
        if (state.openedMenuPoint === BACK_TO_MENU_OPEN && qs('#backToMain_window')) {
            innerMenu_window.classList.remove('fadeIn');
            innerMenu_window.classList.add('fadeOut');
    
            setTimeout(() => {
                state.openedMenuPoint = null;
                innerMenu_window.innerHTML = '';
            }, 2000);
    
            return;
        }

        if (innerMenu_window.firstChild && !qs('#backToMain_window')) {
            innerMenu_window.firstChild.classList.remove('fadeIn');
            innerMenu_window.firstChild.classList.add('fadeOut');
        }
        
        setTimeout(() => {
            if (!qs('#backToMain_window')) {
                innerMenu_window.innerHTML = '<div id="backToMain_window"></div>';
                innerMenu_window.classList.remove('fadeOut');
                innerMenu_window.classList.add('fadeIn');
            }

            const backToMain_window = qs('#backToMain_window');
    
            state.openedMenuPoint = BACK_TO_MENU_OPEN;
        
            showBackToMainWindow(backToMain_window, innerMenu_window, state, timeState, gameSettings);
        }, innerMenu_window.firstChild ? 2000 : 0);
    });

    //SAVE THE GAME
    navbar_saveGame.addEventListener('click', () => {
        if (state.openedMenuPoint === SAVE_OPEN && qs('#saveGame_window')) {
            innerMenu_window.classList.remove('fadeIn');
            innerMenu_window.classList.add('fadeOut');
    
            setTimeout(() => {
                state.openedMenuPoint = null;
                innerMenu_window.innerHTML = '';
            }, 2000);
    
            return;
        }

        if (innerMenu_window.firstChild && !qs('#saveGame_window')) {
            innerMenu_window.firstChild.classList.remove('fadeIn');
            innerMenu_window.firstChild.classList.add('fadeOut');
        }

        setTimeout(() => {
            if (!qs('#saveGame_window')) {
                innerMenu_window.innerHTML = '<div id="saveGame_window"></div>';
                innerMenu_window.classList.remove('fadeOut');
                innerMenu_window.classList.add('fadeIn');
            }

            const saveGame_window = qs('#saveGame_window');
    
            state.openedMenuPoint = SAVE_OPEN;
        
            showSaveGameWindow(pageType, saveGame_window, innerMenu_window, state, gameSettings, slotNumber, sceneNumber, stepNumber, endingSceneType);
        }, innerMenu_window.firstChild ? 2000 : 0);
    });

    //SHOW GAME SLOTS AND LOAD A GAME
    navbar_loadGame.addEventListener('click', () => {
        if (state.openedMenuPoint === LOAD_OPEN && qs('#loadGame_window')) {
            innerMenu_window.classList.remove('fadeIn');
            innerMenu_window.classList.add('fadeOut');
    
            setTimeout(() => {
                state.openedMenuPoint = null;
                innerMenu_window.innerHTML = '';
            }, 2000);
    
            return;
        }

        if (innerMenu_window.firstChild && !qs('#loadGame_window')) {
            innerMenu_window.firstChild.classList.remove('fadeIn');
            innerMenu_window.firstChild.classList.add('fadeOut');
        }

        setTimeout(() => {
            if (!qs('#loadGame_window')) {
                innerMenu_window.innerHTML = '<div id="loadGame_window"></div>';
                innerMenu_window.classList.remove('fadeOut');
                innerMenu_window.classList.add('fadeIn');
            }

            const loadGame_window = qs('#loadGame_window');
    
            state.openedMenuPoint = LOAD_OPEN;
        
            showLoadGameWindow(loadGame_window, state, gameSettings, timeState);
        }, innerMenu_window.firstChild ? 2000 : 0);
    });

    //SHOW GAME SETTINGS
    navbar_settings.addEventListener('click', () => {
        if (state.openedMenuPoint === SETTINGS_OPEN && qs('#settings_window')) {
            innerMenu_window.classList.remove('fadeIn');
            innerMenu_window.classList.add('fadeOut');
    
            setTimeout(() => {
                state.openedMenuPoint = null;
                innerMenu_window.innerHTML = '';
            }, 2000);
    
            return;
        }

        if (innerMenu_window.firstChild && !qs('#settings_window')) {
            innerMenu_window.firstChild.classList.remove('fadeIn');
            innerMenu_window.firstChild.classList.add('fadeOut');
        }

        setTimeout(() => {
            if (!qs('#settings_window')) {
                innerMenu_window.innerHTML = '<div id="settings_window"></div>';
                innerMenu_window.classList.remove('fadeOut');
                innerMenu_window.classList.add('fadeIn');
            }

            const settings_window = qs('#settings_window');
    
            state.openedMenuPoint = SETTINGS_OPEN;
        
            showSettingsWindow(settings_window, gameSettings);
        }, innerMenu_window.firstChild ? 2000 : 0);
    });

    //QUIT FROM THE GAME
    navbar_quit.addEventListener('click', () => {
        if (state.openedMenuPoint === QUIT_OPEN && qs('#quit_window')) {
            innerMenu_window.classList.remove('fadeIn');
            innerMenu_window.classList.add('fadeOut');
    
            setTimeout(() => {
                state.openedMenuPoint = null;
                innerMenu_window.innerHTML = '';
            }, 2000);
    
            return;
        }

        if (innerMenu_window.firstChild && !qs('#quit_window')) {
            innerMenu_window.firstChild.classList.remove('fadeIn');
            innerMenu_window.firstChild.classList.add('fadeOut');
        }

        setTimeout(() => {
            if (!qs('#quit_window')) {
                innerMenu_window.innerHTML = '<div id="quit_window"></div>';
                innerMenu_window.classList.remove('fadeOut');
                innerMenu_window.classList.add('fadeIn');
            }

            const quit_window = qs('#quit_window');
    
            state.openedMenuPoint = QUIT_OPEN;
        
            showQuitWindow(innerMenu_window, quit_window, state, gameSettings);
        }, innerMenu_window.firstChild ? 2000 : 0);
    });
};