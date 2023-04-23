const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML} = require('./crawl.js');


test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toBe(expected);
  });
test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toBe(expected);
  });
test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toBe(expected);
  });
test('normalizeURL strip http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toBe(expected);
  });
test('getURLsFromHtml absolute', () => {
   const inputHtmlBody = `
   <html>
    <body>
      <a href = "https://blog.boot.dev/path/"> boot.dev </a>
    </body>
   </html>
   `
   const inputBaseUrl = 'https://blog.boot.dev/path/'
   const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl)
   const expected = ["https://blog.boot.dev/path/"]
   expect(actual).toEqual(expected)
  });
test('getURLsFromHtml relative', () => {
   const inputHtmlBody = `
   <html>
    <body>
      <a href = "/path/"> boot.dev </a>
    </body>
   </html>
   `
   const inputBaseUrl = 'https://blog.boot.dev'
   const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl)
   const expected = ["https://blog.boot.dev/path/"]
   expect(actual).toEqual(expected)
  });
test('getURLsFromHtml both', () => {
   const inputHtmlBody = `
   <html>
    <body>
      <a href = "/path1/"> path one </a>
      <a href = "https://blog.boot.dev/path2/"> path two </a>
    </body>
   </html>
   `
   const inputBaseUrl = 'https://blog.boot.dev'
   const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl)
   const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
   expect(actual).toEqual(expected)
  });
test('getURLsFromHtml invalid', () => {
   const inputHtmlBody = `
   <html>
    <body>
      <a href = "invalid"> Invalid URL </a>
    </body>
   </html>
   `
   const inputBaseUrl = 'https://blog.boot.dev'
   const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl)
   const expected = []
   expect(actual).toEqual(expected)
  });
