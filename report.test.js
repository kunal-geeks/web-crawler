const { printReport, sortPages} = require('./report.js');
const { test, expect } = require('@jest/globals')
test('sortPages by value',() => {
    inputPages = {
      'https://wagslane.dev' : 10,
      'https://wagslane.dev/go' : 5,
      'https://wagslane.dev/python' : 5,
      'https://wagslane.dev/https' : 3,
      'https://wagslane.dev/javascript' : 5, 
    }
    actual = sortPages(inputPages)
    expected = {
      'https://wagslane.dev/https' : 3,
      'https://wagslane.dev/python' : 5,
      'https://wagslane.dev/javascript' : 5,
      'https://wagslane.dev/go' : 5,
      'https://wagslane.dev' : 10,
    }
    expect(actual).toEqual(expected)
  })