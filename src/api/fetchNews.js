import fetchSentiment from "./fetchSentiment"
import fetchBias from "./fetchBias"

const apiKey = "f0910cf126dc49faa23a35545b0aebdb" 

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const fetchNews = async (query) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&pageSize=12&sortBy=publishedAt&language=en&apiKey=${apiKey}`

    const res = await fetch(url)
    const data = await res.json()

    if (!data.articles) return []

    const analyzed = await Promise.all(
      data.articles.map(async (article, i) => {
       
        await delay(i * 250)

       
        if (!article?.title || !article?.source?.name) return null

        const sentiment = await fetchSentiment(article.title)
        const bias = await fetchBias(article.source.name || article.title)

        return { ...article, sentiment, bias }
      })
    )

   
    return analyzed.filter(Boolean)
  } catch (err) {
    console.error("❌ News fetch failed:", err.message)
    return []
  }
}

export default fetchNews
