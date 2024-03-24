import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

export async function fetchBirdInfoToFirebase(imageUri, birdInfo) {
    try {
        // Create a reference for the file in Firebase Storage
        const filename = imageUri.split("/").pop();
        const fileRef = storageRef(getStorage(), `birdImages/${filename}`);

        // Convert imageUri to blob or file
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload file
        await uploadBytes(fileRef, blob);

        // Get download URL
        const imageUrl = await getDownloadURL(fileRef);

        const birdData = {
            ...birdInfo,
            imageUri: imageUrl,
        };

        // Save bird info to Firestore
        const birdDocRef = doc(db, "birdInfo", birdData.ID);

        // Set the document with birdData. This will overwrite if birdInfo.ID exists
        await setDoc(birdDocRef, birdData);
    } catch (error) {
        console.error("Error fetching birdInfo to Firebase:", error);
    }
}
