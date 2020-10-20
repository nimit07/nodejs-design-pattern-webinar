function addCps (a, b, callback) {
    callback(a + b)
  }


//   console.log('before')
//   addCps(1, 2, result => console.log(`Result: ${result}`))
//   console.log('after')

  
  function additionAsync (a, b, callback) {
    setTimeout(() => callback(a + b), 100)
  }

console.log('before')
additionAsync(1, 2, result => console.log(`Result: ${result}`))
console.log('after')