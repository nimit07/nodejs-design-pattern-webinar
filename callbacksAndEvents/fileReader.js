import { readFile, readFileSync } from 'fs'
import path from 'path'
const cache = new Map()
function inconsistentRead (filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename))
  } else {
    // asynchronous function
    readFile(path.resolve(filename).toString(), 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}

function consistentReadAsync (filename, callback) {
    if (cache.has(filename)) {
      // deferred callback invocation
      process.nextTick(() => callback(cache.get(filename)))
    } else {
      // asynchronous function
      readFile(path.resolve(filename).toString(), 'utf8', (err, data) => {
        cache.set(filename, data)
        callback(data)
      })
    }
  }
function consistentReadSync (filename) {
    if (cache.has(filename)) {
      return cache.get(filename)
    } else {
      const data = readFileSync(path.resolve(filename).toString(), 'utf8')
      cache.set(filename, data)
      return data
    }
  }

function createFileReader (filename) {
    const listeners = []
    consistentReadAsync(filename, value => {
      listeners.forEach(listener => listener(value))
    })
    return {
      onDataReady: listener => listeners.push(listener)
    }
  }


  const reader1 = createFileReader('data.txt')
  reader1.onDataReady(data => {
    console.log(`First call data: ${data}`)
    // ...sometime later we try to read again from
    // the same file
    const reader2 = createFileReader('data.txt')
    reader2.onDataReady(data => {
      console.log(`Second call data: ${data}`)
    })
  })


