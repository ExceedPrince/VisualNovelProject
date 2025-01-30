export const adjustTextingStatusTime = (textingStatus) => {
    const [hours, minutes] = textingStatus.currentTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes - 2);

    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");

    textingStatus.currentTime = `${newHours}:${newMinutes}`;

    return textingStatus;
};