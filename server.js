// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http')
const { parse } = require('url')
const _ = require('force-ssl-heroku')
const next = require('next')
const querystring = require('querystring')
const { readFileSync } = require('fs')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()
const { basename } = require('path')
const glob = require('glob')
const accepts = require('accepts')
const supportedLanguages = glob
  .sync('./static/locales/*.json')
  .map(f => basename(f, '.json'))
//console.log(supportedLanguages) [ 'en-US', 'zh-CN' ]
const localeDataCache = new Map()
const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0]
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`intl/locale-data/jsonp/${lang}`)
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  return localeDataCache.get(lang)
}

const getMessages = locale => {
  return require(`./static/locales/${locale}.json`)
}

app.prepare().then(() => {
  createServer((req, res) => {
    //根据不同的域名host访问不同的doc目录
    //请求local文件
    const accept = accepts(req)
    const locale = accept.language(accept.languages(supportedLanguages)) || 'en-US'
    req.locale = locale
    req.localeDataScript = getLocaleDataScript(locale)
    req.messages = getMessages(locale)
    handle(req, res)

  }).listen(port, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
