import { db, storage } from "../../../Firebase/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export async function fetchExamplesFromFirebase(path) {
    try {
        const imageListRef = ref(storage, path);
        const imageRefs = await listAll(imageListRef);

        const urlPromises = imageRefs.items.map((imageRef) => {
            return getDownloadURL(imageRef);
        });

        const imageUrls = await Promise.all(urlPromises);
        return imageUrls;
    } catch (error) {
        console.error("Error fetching example images: ", error);
        return [];
    }
}
