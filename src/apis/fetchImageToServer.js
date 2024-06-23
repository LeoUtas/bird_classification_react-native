import {
    BIRD_CLASSIFICATION_BASE_URL_PRODUCTION,
    BIRD_CLASSIFICATION_BASE_URL_DEV,
} from "@env";

import axios from "axios";

export default async function fetchImageToServer(imageUri) {
    BIRD_CLASSIFICATION_BASE_URL_DEV;

    try {
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            name: "image.jpg", // Specify the name for the file
            type: "image/jpeg", // Specify the mime type
        });

        const response = await axios.post(
            `${BIRD_CLASSIFICATION_BASE_URL_DEV}/yolov8/bird-classifier`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
