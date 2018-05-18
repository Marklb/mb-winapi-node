// const edge = require((process.versions['electron']) ? 'electron-edge' : 'edge')

// const edgePromise = (src) => {
//   const f = edge.func(src)
//   return (obj) => {
//     return new Promise((resolve, reject) => {
//       f(obj, (e, ret) => {
//         if (e) { return reject(e) }
//         resolve(ret)
//       })
//     })
//   }
// }

const edgePromise = Promise.reject(new Error('edge and electron-edge dependency removed'))

module.exports = edgePromise
module.exports.func = edgePromise
