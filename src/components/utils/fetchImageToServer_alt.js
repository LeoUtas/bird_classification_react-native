import { BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT_PRODUCTION } from "@env";

const BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT =
    BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT_PRODUCTION;

// const BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT =
//     "http://localhost:5001/mobilenet/bird-classifier";

export default async function fetchImageToServer(imageUri) {
    try {
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            name: "image.jpg",
            type: "image/jpeg",
        });

        // Notice the `body: formData` in the fetch options to attach the form data to the request
        const response = await fetch(BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT, {
            method: "POST",
            headers: {},
            body: formData, // Attach the formData as the request body
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
