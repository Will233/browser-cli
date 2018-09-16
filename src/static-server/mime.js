/**
 * mime
 */

 const path = require('path')
 const mimeTypes = {
   'css': 'text/css',
   'gif': 'image/gif',
   'html': 'text/html',
   'ico': 'image/x-icon',
   'jpeg': 'image/jpeg',
   'js': 'application/javascript'
 }

 const lookup = (pathName) => {
   let ext = path.extname(pathName)
   // 获取最后一个扩展名
   ext = ext.split('.').pop()
   return mimeTypes[ext] || mimeTypes['txt']
 }

 module.exports = {
   lookup: lookup
 }