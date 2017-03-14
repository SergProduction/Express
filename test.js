let fs = require('fs')

let ico = fs.readFileSync('favicon.ico')

console.log( ico.toString() )