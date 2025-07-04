import { useState } from "react"
import fetchNews from "../api/fetchNews"

function SearchBar({ setArticles, setLoading }) {
  const [query, setQuery] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    const news = await fetchNews(query)
    setArticles(news)
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
  
/>

      <button
        onClick={handleSearch}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Go
      </button>
    </div>
  )
}

export default SearchBar
