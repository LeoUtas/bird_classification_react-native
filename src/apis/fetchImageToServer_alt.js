import {
    BIRD_CLASSIFICATION_BASE_URL_PRODUCTION,
    BIRD_CLASSIFICATION_BASE_URL_DEV,
} from "@env";

export default async function fetchImageToServer(imageUri) {
    try {
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            name: "image.jpg",
            type: "image/jpeg",
        });

        // Notice the `body: formData` in the fetch options to attach the form data to the request
        const response = await fetch(
            `${BIRD_CLASSIFICATION_BASE_URL_PRODUCTION}/mobilenet/bird-classifier`,
            {
                method: "POST",
                headers: {},
                body: formData, // Attach the formData as the request body
            }
        );

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
