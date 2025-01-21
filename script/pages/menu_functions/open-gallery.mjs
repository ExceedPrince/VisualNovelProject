import { qs, qsa } from '../../utils/commons.mjs';
import { GALLERY_OPEN } from '../../constants/statics.mjs';
import { isInElectron } from '../../utils/is-in-electron.mjs';

export const openGallery = (root, mainColumn_1, gameSettings, state) => {

    if (state.openedMenuPoint === GALLERY_OPEN) {
        qs('#gallery_inner').classList.remove('fadeIn');
        qs('#gallery_inner').classList.add('fadeOut');

        setTimeout(() => {
            state.openedMenuPoint = null;
            mainColumn_1.innerHTML = '';
        }, 2000);

        return;
    }

    if (mainColumn_1.firstChild) {
        mainColumn_1.firstChild.classList.remove('fadeIn');
        mainColumn_1.firstChild.classList.add('fadeOut');
    }
    
    setTimeout(() => {
        mainColumn_1.innerHTML = '<div id="gallery_inner" class="fadeIn"></div>';
        const galleryInner = qs('#gallery_inner');

        state.openedMenuPoint = GALLERY_OPEN;
    
        showGallery(root, gameSettings, galleryInner);
    }, mainColumn_1.firstChild ? 2000 : 0);
};

const showGallery = (root, gameSettings, galleryInner) => {
    const galleryTiles = gameSettings.gallery.map((tile) => {
        if (tile.isActivated) {
            return `
                <div id="picture_${tile.id}" class="gallery_tiles">
                    <img src="${isInElectron() ? '.' : '../../..'}/img/special_scenes/${tile.id}.png" alt="${tile.id}"/>
                </div>
            `
        } else {
            return `
                <div id="picture_${tile.id}" class="gallery_tiles noClick">
                    <img src="${isInElectron() ? '.' : '../../..'}/img/assets/locked_picture.png" alt="locked_picture"/>
                </div>
            `;
        }
    }).join("");

    galleryInner.insertAdjacentHTML('beforeend', `
        <div id="gallery_container">
            ${galleryTiles}
        </div>
    `);

    const allGalleryTiles = qsa('.gallery_tiles');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('show', entry.isIntersecting);
        })
    }, {
        rootMargin: '20px'
    });

    allGalleryTiles.forEach((tile) => {
        observer.observe(tile);
    });

    const otherSoundsAudio = qs('#other_sound_effects_audio');

    qsa('.gallery_tiles img').forEach((img) => {
        img.addEventListener('mouseover', () => {
           // if (!root.classList.contains('fadeOut')) {
                otherSoundsAudio.volume = gameSettings.settings.audio.soundEffects/100;
                otherSoundsAudio.src = `${isInElectron() ? '.' : '../../..'}/sounds/sound_effects/load-hover.mp3`;
                otherSoundsAudio.play();
           // }
        });

        img.addEventListener('click', (event) => {
            root.insertAdjacentHTML('afterend', `
                <div id="fullScreenGalleryImg" class="fadeIn"></div>
            `);

            const fullScreenGalleryImg = qs('#fullScreenGalleryImg');
            fullScreenGalleryImg.style.backgroundImage = `url("${event.target.src}")`;

            fullScreenGalleryImg.addEventListener('click', (e) => {
                e.target.classList.remove('fadeIn');
                e.target.classList.add('fadeOut');

                setTimeout(() => {
                    e.target.remove();
                }, 2000);
            });
        });
    });

};