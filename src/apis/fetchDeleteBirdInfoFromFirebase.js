import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default async function fetchDeleteBirdInfoFromFirebase(ID, path) {
    try {
        // delete data from Firestore collections
        await deleteDoc(doc(db, "birdInfo", ID));

        const storage = getStorage();

        const userImageRef = ref(storage, path);

        // Delete the image file from Firebase storage
        deleteObject(userImageRef);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return error.response;
    }
}
