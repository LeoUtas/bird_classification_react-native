export default function toggleChosenBirdInfoID(ID, chosenID, setChosenID) {
    setChosenID((prev) => {
        const isAlreadyChosen = prev.includes(ID);
        if (isAlreadyChosen) {
            // Remove from chosenID
            return prev.filter((id) => id !== ID);
        } else {
            // Add to chosenID
            return [...prev, ID];
        }
    });
}
