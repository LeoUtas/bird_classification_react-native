import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { deleteUser } from "firebase/auth";

export default async function fetchDeleteAccountToFirebase(userUid, user) {
    try {
        // check if there is any data of that userUid in Firestore
        const birdInfoCollection = collection(db, "birdInfo");
        const q = query(birdInfoCollection, where("userUid", "==", userUid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert(
                "It is required to empty your collection storage before deleting the account."
            );
            return;
        } else {
            deleteUser(user)
                .then(() => {
                    alert(
                        "We are sorry to see you go. Your account has been deleted."
                    );
                })
                .catch((error) => {
                    console.log("Error deleting user: ", error.message);
                });
            return false;
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
        return error.response;
    }
}
