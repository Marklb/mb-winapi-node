const edge = require('edge')

const edgePromise = (src) => {
  const f = edge.func(src)
  return (obj) => {
    return new Promise((resolve, reject) => {
      f(obj, (e, ret) => {
        if (e) { return reject(e) }
        resolve(ret)
      })
    })
  }
}

module.exports = edgePromise
module.exports.func = edgePromise
