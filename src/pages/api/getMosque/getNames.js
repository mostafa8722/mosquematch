import axios from "axios";

export default async function GetMosques(req, res) {
  console.log(req.body.input);
  const input = req.body.input;
  const apiKey = process.env.MAP_API; // Replace with your actual API key
  const apiUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

  try {
    const response = await axios.get(apiUrl, {
      params: {
        input: input,
        key: apiKey,
        types: "mosque",
        components: "country:uk", // Set the country to the UK
      },
    });
    console.log("server:", response.data.predictions[0].structured_formatting);
    const predictions = response.data.predictions.map((prediction) => {
      const mosqueName = prediction.description;

      return {
        id: prediction.place_id,
        name: mosqueName,
      };
    });

    res.json(predictions);
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
