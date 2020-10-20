import { EventEmitter } from 'events'
import { readFile } from 'fs'

/**
 * 
 The function we just defined returns an EventEmitter instance that will produce three events:

fileread, when a file is being read
found, when a match has been found
error, when an error occurs during reading the file
 */
function findRegex (files, regex) {
  const emitter = new EventEmitter()
  for (const file of files) {
    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err)
      }
      emitter.emit('fileread', file)
      const match = content.match(regex)
      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem))
      }
    })
  }
  return emitter
}

findRegex(
    ['/Users/nimkhandelwal/test/recro/fileA.txt', '/Users/nimkhandelwal/test/recro/fileB.json'],
    /hello \w+/g
  )
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', err => console.error(`Error emitted ${err.message}`))