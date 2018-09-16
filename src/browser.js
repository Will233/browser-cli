/**
 * 主文件入口
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const loadPage = async (url) => {
 const browser = await puppeteer.launch()
 const page = await browser.newPage()
 await page.goto(url || 'http://localhost:9999/index.html', {
   waitUntil: 'networkidle2'
 })
 page.on('console', msg => {
   console.log('PAGE LOG:', msg.text())
 })


 let addRes = await page.addScriptTag({
   url: 'http://localhost:9999/js/hello.js'
 })
 await addRes.dispose()
 
 let document = await page.evaluateHandle(() => window.document)
 let res = await page.evaluateHandle((doc) => {
   console.info(doc.title)
   console.info(doc.location.href)
   return doc.title
 }, document)
 console.info(await res.jsonValue())
 await res.dispose()

 await browser.close()
}

const runScript = async (filePath, url) => {
 const browser = await puppeteer.launch()
 const page = await browser.newPage()
 await page.goto(url || 'http://localhost:9999/index.html', {
   waitUntil: 'networkidle2'
 })
 // 捕获浏览器错误
 page.on('error', msg => {
  console.error('ERROR', msg.test())
 })
 // 记录console信息
 page.on('console', msg => {
   console.log('PAGE:', msg.text())
 })
 // 记录页面错误
 page.on('pageerror', msg => {
   console.error('PAGEERROR', msg)
 })
 // 记录请求失败
 page.on('requestfailed', req => {
   console.log('Request failed', req)
 })
 // get script path
 let scriptPath = ''
 if (filePath.indexOf('http://') === 0 || filePath.indexOf('https://') === 0) {
   scriptPath = filePath
 } else {
   scriptPath = path.join(filePath)
 }
 let content = fs.readFileSync(scriptPath, {
   encoding: 'utf-8'
 })
 console.log(`scriptPath: ${scriptPath}`)
 console.log('------------- script content --------------')
 console.log(content)
 console.log('-------------------------------------------')
 let addRes = await page.addScriptTag({
   // url: 'http://localhost:9999/js/hello.js'
  //  path: scriptPath
   content: content
 })
 await addRes.dispose()
 await browser.close()
}

const test = (flag) => {
  console.log(`test ${flag}`)
}
module.exports = {
  loadPage: loadPage,
  runScript: runScript,
  test: test
}
