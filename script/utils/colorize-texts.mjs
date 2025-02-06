export const colorizeTexts = (textContainer, name) => {
    if (name === 'Tyler' || name === '') {
        textContainer.classList.add('tyler');
    } else {
        textContainer.classList.remove('tyler');
    }
}