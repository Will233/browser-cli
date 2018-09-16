/**
 * 一个简单的静态服务器
 */

const http = require('http')
const path = require('path')
const fs = require('fs')
const config = require('./config')
const mime = require('./mime')

class StaticServer {
  constructor () {
    this.port = config.port
    this.root = config.root
    this.indexPage = config.indexPage
  }

  start () {
    http.createServer((req, res) => {
      const pathName = path.join(this.root, path.normalize(req.url))
      // res.writeHead(200)
      // res.end(`Request path: ${pathName}`)
      this.routeHander(pathName, req, res)
    }).listen(this.port, err => {
      if (err) {
        console.error(err)
        console.info('Failed to start server')
      } else {
        console.info(`Server started at 127.0.0.1:${this.port}`)
      }
    })
  }

  notFound (req, res) {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.end(`<h1>Not Found</h1><p>The request URL ${req.url} was not found on this server!</p>`)
  }

  respondFile (pathName, req, res) {
    const readStream = fs.createReadStream(pathName)
    // 设置content-type ,以便浏览器识别和解析
    res.setHeader('Content-Type', mime.lookup(pathName))
    readStream.pipe(res)
  }

  routeHander (pathName, req, res) {
    console.info(pathName)
    fs.stat(pathName, (err, stat) => {
      if (!err) {
        this.respondFile(pathName, req, res)
      } else {
        this.notFound(req, res)
      }
    })
  }

}

module.exports = StaticServer