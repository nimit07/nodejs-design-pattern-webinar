const myModule = (() => {
    const privateFoo = () => {}
    const privateBar = []
    const exported = {
      publicFoo: () => {},
      publicBar: () => {}
    }
    return exported
  })() // once the parenthesis here are parsed, the function
       // will be invoked
  console.log(myModule)
  console.log(myModule.privateFoo, myModule.privateBar)

  /*
//   For instance, the following code wouldn't be valid when using ES modules:

if (condition) {
  import module1 from 'module1'
} else {
  import module2 from 'module2'
}

// While in CommonJS, it is perfectly fine to write something like this:

let module = null
if (condition) {
  module = require('module1')
} else {
  module = require('module2')
}

*/

