import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: import.meta.env.VITE_GROQ_API_KEY,

  dangerouslyAllowBrowser: true
})

const fetchBias = async (textOrSource) => {
  try {
    const prompt = `Classify the political bias of the following news source or headline as LEFT, CENTER, or RIGHT:\n"${textOrSource}"\nRespond with only the label.`

    const chat = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    })

    const raw = chat.choices[0].message.content.trim().toUpperCase()
    console.log("🧠 Groq bias response:", raw)

    if (["LEFT", "CENTER", "RIGHT"].includes(raw)) return raw
    if (raw.includes("LEFT")) return "LEFT"
    if (raw.includes("CENTER")) return "CENTER"
    if (raw.includes("RIGHT")) return "RIGHT"
    return "UNKNOWN"
  } catch (err) {
    console.error("Groq bias error:", err.message)
    return "UNKNOWN"
  }
}

export default fetchBias
