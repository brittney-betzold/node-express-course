// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')
const{ items, singlePerson }= require('./06-alternative-flavor');
require('./07-mind-grenade')
console.log(items);
console.log(singlePerson);
sayHi('susan')
sayHi(names.brittney)
sayHi(names.john)
sayHi(names.peter)
sayHi(names.alyssa);
sayHi(names.josh)

console.log(data);
