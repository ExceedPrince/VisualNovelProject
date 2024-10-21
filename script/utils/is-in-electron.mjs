export const isInElectron = () => {
    return navigator.userAgent.indexOf('Electron') > -1;
}