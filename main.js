const { normalizeURL, getURLsFromHTML, crawlPage} = require('./crawl.js')
const { printReport } = require('./report.js')
const readline = require('readline')
async function main() {
    if(process.argv.length < 3) {
      console.log("no website provided")
      process.exit(1)
    }
    if(process.argv.length > 3) {
      console.log("too many command line args")
      process.exit(1)
    }
    baseURL = process.argv[2]
    console.log(`starting crawl of ${baseURL}`)
    pages = await crawlPage(baseURL,baseURL,{})
    printReport(pages)
}
main()
    