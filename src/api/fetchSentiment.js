import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
apiKey: import.meta.env.VITE_GROQ_API_KEY,

  dangerouslyAllowBrowser: true
})

const fetchSentiment = async (text) => {
  try {
    const prompt = `Classify the following news headline strictly as one of these labels only: POSITIVE, NEGATIVE, or NEUTRAL.\nHeadline: "${text}"\nRespond with only the label.`

    const chat = await openai.chat.completions.create({
     model: "llama3-8b-8192",

      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    })

    const raw = chat.choices[0].message.content.trim()
    console.log(`🧠 Raw Groq response for "${text}":`, raw) // 👈 THIS is the log

    const label = raw.toUpperCase()

    if (label.includes("POSITIVE")) return "POSITIVE"
    if (label.includes("NEGATIVE")) return "NEGATIVE"
    if (label.includes("NEUTRAL")) return "NEUTRAL"
    return "NEUTRAL"
  } catch (err) {
    console.error("❌ Groq error:", err.message)
    return "NEUTRAL"
  }
}

export default fetchSentiment
