export const qs = (element) =>  document.querySelector(element);

export const qsa = (element) => document.querySelectorAll(element);

export const wait = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}