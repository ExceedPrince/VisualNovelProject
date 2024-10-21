import { qs, qsa } from '../../utils/commons.mjs';
import { ABOUT_OPEN } from '../../constants/statics.mjs';

export const openAbout = (mainColumn_2, state) => {
    if (state.openedMenuPoint === ABOUT_OPEN) {
        qs('#about_inner').classList.remove('fadeIn');
        qs('#about_inner').classList.add('fadeOut');

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
        mainColumn_2.innerHTML = '<div id="about_inner" class="fadeIn"></div>';
        const about_inner = qs('#about_inner');

        state.openedMenuPoint = ABOUT_OPEN;
    
        showAbout(about_inner);
    }, mainColumn_2.firstChild ? 2000 : 0);
};

const showAbout = (about_inner) => {
    const aboutContent = `
        <h2>About Constrained Love</h2>
        <p><b>Version:</b> 1.0</p>
        <p><b>Built with:</b> Electron 29.2.0</p>
        <div id="about_description">
            <p>This game is my own personal product, a labor of creativity and dedication. The images in the game are a mix of my own work and contributions from MidJourney AI. Some of the music and sound effects were created using Suno AI, while others were downloaded from websites offering free, unrestricted use.</p>
            <p>The code for this game was entirely written by me, utilizing HTML, SCSS (CSS), and JavaScript, and is rendered with Electron. While the source code is open for anyone to view, using it or any of its media content for personal or commercial purposes without my permission is prohibited, as it infringes upon my personal rights as the creator.</p>
            <p>The story is based on my real-life experiences, although certain aspects have been altered or fictionalized for dramatic effect. All character names are fictional, and any resemblance to real persons, living or dead, is purely coincidental.</p>
        </div>
    `;

    about_inner.insertAdjacentHTML('beforeend', aboutContent);
};