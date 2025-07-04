function NewsFeed({ articles, loading }) {
  if (loading) {
    return <p className="text-center mt-10 text-pink-300 text-base">Loading latest news...</p>
  }

  // show message only if a query has been searched but returns no results
  if (articles && Array.isArray(articles) && articles.length === 0 && !loading) {
  return null // don't show anything on initial render
}


  const getSentimentColor = (sentiment) => {
    if (sentiment === "POSITIVE") return "text-pink-400"
    if (sentiment === "NEGATIVE") return "text-yellow-400"
    return "text-indigo-300"
  }

  const getBiasColor = (bias) => {
    if (bias === "LEFT") return "text-pink-400"
    if (bias === "RIGHT") return "text-yellow-400"
    if (bias === "CENTER") return "text-indigo-300"
    return "text-gray-400"
  }

  return (
    <div className="min-h-screen w-full px-4 py-8 bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {articles.map((article, i) => {
          if (!article || !article.title) return null

          return (
            <div
              key={i}
              className="bg-gradient-to-b from-blue-800 to-blue-900 border border-blue-700 rounded-2xl p-5 shadow-lg hover:shadow-pink-400/30 transition-transform transform hover:-translate-y-1 duration-300"
            >
              <h2 className="text-lg font-semibold text-white mb-3 leading-snug">
                {article.title}
              </h2>

              <p className="text-sm text-indigo-300 mb-1">
                {article.source?.name || "Unknown Source"}
              </p>

              {article.sentiment && (
                <p className={`text-sm font-semibold ${getSentimentColor(article.sentiment)} mb-1`}>
                  Sentiment: {article.sentiment}
                </p>
              )}

              {article.bias && (
                <p className={`text-sm font-semibold ${getBiasColor(article.bias)} mb-2`}>
                  Bias: {article.bias}
                </p>
              )}

              {article.url?.startsWith("http") ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-semibold text-pink-400 hover:text-pink-300 hover:underline transition"
                >
                  Read more →
                </a>
              ) : (
                <span className="text-sm text-indigo-400">No link available</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NewsFeed
