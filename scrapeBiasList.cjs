const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

const scrapeBiasData = async () => {
  const url = "https://www.allsides.com/media-bias/media-bias-ratings"

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
      }
    })

    const $ = cheerio.load(data)
    const rows = $("table.views-table tbody tr")

    const biasMap = {}

    rows.each((_, row) => {
      const sourceCell = $(row).find("td.views-field-title a")
      const domain = sourceCell.attr("href")?.split("/")[2] || ""
      const bias = $(row).find("td.views-field-field-bias-image").text().trim().toUpperCase()

      if (domain && bias) {
        biasMap[domain.replace("www.", "")] = bias
      }
    })

    fs.writeFileSync("./src/api/scrapedBias.json", JSON.stringify(biasMap, null, 2))
    console.log("✅ Bias data scraped and saved to scrapedBias.json")
  } catch (err) {
    console.error("❌ Failed to scrape:", err.message)
  }
}

scrapeBiasData()
