const { printReport } = require('./report.js')
const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0,-1)
    }
    return hostpath
}

function getURLsFromHTML(htmlBody,baseURL){
    const dom = new JSDOM(htmlBody)
    const linkList = dom.window.document.querySelectorAll("a")
    let urls = []
    for (const link of linkList) {
        if(link.href.slice(0,1) === '/') {
            // relative
        try {
            const urlObj = new URL(`${baseURL}${link.href}`)
            urls.push(urlObj.href)
        } catch (err){
            console.log(`error with relative url: ${err.message}`)
        }
    }
        else {
            // absolute
        try {
            const urlObj = new URL(`${link.href}`)
            urls.push(urlObj.href)
        } catch (err){
            console.log(`error with absolute url: ${err.message}`)
        }   
    }
    }
    return urls
}
async function crawlPage(baseURL,currentURL,pages) {
    console.log(`actively crawling : ${currentURL}`)
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
   if (baseURLObj.hostname !== currentURLObj.hostname){
    return pages
   }
   normalizedCurrentURL = normalizeURL(currentURL)
   if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++
    return pages
   }
    pages[normalizedCurrentURL] = 1
   try {
        const resp = await fetch(currentURL)
        if(resp.status > 399) {
            console.log(`error in fetch with status code : ${resp.status} on page : ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")) {
            console.log(`error in fetch with content type : ${contentType} on page : ${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()
        const urls = getURLsFromHTML(htmlBody,baseURL)
        for (const url of urls) {
            pages = await crawlPage(baseURL,url,pages)
        } 
   } catch(err) {
    console.log(`error in fetch :${err.message} on page: ${currentURL}`)
   }
return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}
