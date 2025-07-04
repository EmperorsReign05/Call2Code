import { useState } from "react"
import NewsFeed from "./components/NewsFeed"
import fetchNews from "./api/fetchNews"
import "./styles.css"

function App() {
  const [query, setQuery] = useState("")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (text = query) => {
    if (!text.trim()) return
    setLoading(true)
    const results = await fetchNews(text)
    setArticles(results)
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch()
  }

  const suggested = ["AI", "Climate Change", "Elections", "Immigration", "Stock Market"]

  return (
    <div className="main-container">
      <div className="centered-box">
        <h1>NewsLens</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search a topic (e.g. AI, Elections)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => handleSearch()}>Go</button>
        </div>

        {articles.length === 0 && !loading && (
          <div className="landing-intro">
            <div className="emoji">📰</div>

            <p className="tagline" align="center">Decode the media — see how news is framed.</p>
            <p className="subtext" align="center">We analyze sentiment and political bias in real time using APIs.</p>
            <div className="try-searching" align="center">Try searching for:</div>

            <div className="suggested">
              {suggested.map((topic) => (
                <button
                  key={topic}
                  className="suggestion-pill"
                  onClick={() => handleSearch(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <NewsFeed articles={articles} loading={loading} />

      {articles.length === 0 && !loading && (
        <footer className="footer">
          Built with ❤️ by Prison Breakers at Call2Code Hackathon
        </footer>
      )}
    </div>
  )
}

export default App
