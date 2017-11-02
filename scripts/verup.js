const fs = require('fs')

const packageConfigPath = 'package.json'
const packageConfig = JSON.parse(fs.readFileSync(packageConfigPath))

const oldVersion = packageConfig.version

const verArr = oldVersion.split('.')
// Increment lowest version part
verArr[verArr.length-1] = parseInt(verArr[verArr.length-1]) + 1

const newVersion = verArr.join('.')

packageConfig.version = newVersion
fs.writeFileSync(packageConfigPath, JSON.stringify(packageConfig, null, 2))

console.log(`[Verup]: ${oldVersion} -> ${newVersion}`)
