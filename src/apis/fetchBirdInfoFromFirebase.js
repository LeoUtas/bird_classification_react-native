import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function fetchBirdInfoFromFirestore(
    collectionName,
    userUid
) {
    try {
        // Create a Firestore query based on collection and userUID
        const q = query(
            collection(db, collectionName),
            where("userUid", "==", userUid)
        );

        // Execute the query and get the query snapshot
        const querySnapshot = await getDocs(q);

        // Array to store transformed data
        const fetchedData = [];

        // Iterate over each document snapshot in the query snapshot
        querySnapshot.forEach((doc) => {
            // Transform the fetched data and add it to the array
            fetchedData.push(transformFetchedData(doc.data()));
        });

        return fetchedData;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}

// Function to transform fetched data
function transformFetchedData(data) {
    return {
        ID: data.ID,
        execution_time: data.execution_time,
        imageUri: data.imageUri,
        predicted_index: data.predicted_index,
        predicted_label: data.predicted_label,
        predicted_probability: data.predicted_probability,
        predicted_scientific_name: data.predicted_scientific_name,
        userUid: data.userUid,
        funFact: data.funFact,
    };
}
