console.log("TEST indexOf")

console.log("caso 1")

var phrase = 'hola mundo'
var index = indexOf(phrase, 'm')

if (typeof index === 'number'
    && index === 5)
    console.log('✅ 😉')
else
    console.error('❌ 🤡')



console.log("caso 2")

var phrase = 'adios mundo cruel'
var index = indexOf(phrase, 'mundo')

if (typeof index === 'number'
    && index === 6)
    console.log('✅ 😉')
else
    console.error('❌ 🤡')


console.log("caso 3")

var phrase = 'There is a cat, there is a dog, there is a person'
var index = indexOf(phrase, 'delphin')

if (typeof index === 'number'
    && index === -1)
    console.log('✅ 😉')
else
    console.error('❌ 🤡')


console.log("caso 4")

var phrase = 'There is a cat, there is a dog, there is a person'
var index = indexOf(phrase, 'is', 9)

if (typeof index === 'number'
    && index === 6)
    console.log('✅ 😉')
else
    console.error('❌ 🤡')