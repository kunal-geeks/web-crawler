function printReport(pages) {
  console.log(`================`)
  console.log(`    REPORT      `)
  console.log(`================`)
  const sortedPages = sortPages(pages)
for (const sortedPage of sortedPages) {
  const url = sortedPage[0]
  const hits = sortedPage[1] 
 console.log(`Found ${hits} links to page ${url}`);
}
  console.log(`================`)
  console.log(`   END REPORT   `)
  console.log(`================`)
}
function sortPages(pages) {
  const sorted = Object.entries(pages)
  .sort(([, a], [, b]) => b - a)
  return sorted
}
module.exports = {
  printReport,
  sortPages
}
