import { qs } from './commons.mjs';

export const useGameSettings = (settings, root, colorCover) => {
    const brightness = settings.screen.brightness;
    const grayScale = 100 - settings.screen.saturation;
    const colorTemperature = valueForColorCover(settings.screen.colorTemperature);

    root.style['filter'] = 
        `brightness(${brightness}%) grayscale(${grayScale}%)`;
    colorCover.style['background'] = colorTemperature;
    colorCover.style['filter'] = 
        `brightness(${brightness}%) grayscale(${grayScale}%)`;

    const bg_music_audio = qs('#bg_music_audio');
    const otherSoundsAudio = qs('#other_sound_effects_audio');
    const mouse_audio = qs('#mouse_audio');

    bg_music_audio.volume = settings.audio.bgMusic / 100;
    otherSoundsAudio.volume = settings.audio.soundEffects / 100;
    mouse_audio.volume = settings.audio.mouseSounds / 100;
};

function valueForColorCover(value) {
    if (value < 0 || value > 100) {
      throw new Error('Value should be in the range 0 to 100');
    }
  
    let color, alpha;
    
    if (value <= 50) {
      alpha = 0.25 * (1 - (value / 50));
      color = `rgba(0, 150, 255, ${alpha})`;
    } else {
      alpha = 0.25 * (1 - ((100 - value) / 50));
      color = `rgba(255, 200, 0, ${alpha})`;
    }
  
    return color;
};