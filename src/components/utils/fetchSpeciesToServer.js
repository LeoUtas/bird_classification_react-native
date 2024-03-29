import { BIRD_CLASSIFICATION_REQUEST_FUNFACT_ENDPOINT_PRODUCTION } from "@env";

// const BIRD_CLASSIFICATION_REQUEST_FUNFACT_ENDPOINT =
//     "http://localhost:5001/openai/funfact";

// const BIRD_CLASSIFICATION_REQUEST_FUNFACT_ENDPOINT =
//     "http://localhost:8000/birdclassification/get_ai_response/";

export default async function fetchSpeciesToServer(species) {
    const BIRD_CLASSIFICATION_REQUEST_FUNFACT_ENDPOINT =
        BIRD_CLASSIFICATION_REQUEST_FUNFACT_ENDPOINT_PRODUCTION;

    try {
        const response = await fetch(
            BIRD_CLASSIFICATION_REQUEST_FUNFACT_ENDPOINT,
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
