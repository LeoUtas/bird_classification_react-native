import {
    BIRD_CLASSIFICATION_BASE_URL_PRODUCTION,
    BIRD_CLASSIFICATION_BASE_URL_DEV,
} from "@env";

export default async function fetchSpeciesToServer(species) {
    try {
        const response = await fetch(
            `${BIRD_CLASSIFICATION_BASE_URL_PRODUCTION}/birdclassification/get_ai_response/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ species: species }),
            }
        );

        if (!response.ok) {
            // If the server response is not ok, throw an error
            throw new Error(
                "Network response was not ok when fetching species"
            );
        }

        const data = await response.json();
        return data.ai_response;
    } catch (error) {
        console.error("Error fetching species to server:", error);
    }
}
