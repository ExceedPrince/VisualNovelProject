export const answerCounter = (person, solutionKey, slotNumber, gameSettings) => {
    
    let correctChoices = 0;

    const importantEntries = Object.entries(gameSettings.savingSlots[slotNumber].decisions[person].importants);
    const mobileImportantEntries = Object.entries(gameSettings.savingSlots[slotNumber].decisions[person].mobileImportants);

    importantEntries.forEach(([key, value]) => {
        if (!key || !value) return;

        if (solutionKey[person].importants[key] === value) {
            correctChoices++;
        }
    });
    mobileImportantEntries.forEach(([key, value]) => {
        if (!key || !value) return;

        if (solutionKey[person].mobileImportants[key] === value) {
            correctChoices++;
        }
    });

    return correctChoices;
};