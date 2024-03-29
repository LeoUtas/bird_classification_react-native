import { BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT_PRODUCTION } from "@env";
import axios from "axios";

// const BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT =
//     "http://localhost:5001/mobilenet/bird-classifier";

// const BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT =
//     "http://localhost:5001/yolov8/bird-classifier";

export default async function fetchImageToServer(imageUri) {
    const BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT =
        BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT_PRODUCTION;

    try {
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            name: "image.jpg", // Specify the name for the file
            type: "image/jpeg", // Specify the mime type
        });

        const response = await axios.post(
            BIRD_CLASSIFICATION_TOPREDICT_ENDPOINT,
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
