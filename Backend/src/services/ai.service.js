const axios = require("axios");

exports.generateAIResponse = async (messages) => {
  try {
    const response = await axios.post(
      process.env.AI_API_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    throw new Error("AI service failed");
  }
};