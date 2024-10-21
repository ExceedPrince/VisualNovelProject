export const renderBatterySVG = (level) => {
    return level > 70 ? 'full' : level <=70 && level > 33 ? 'mid' : 'low';
};