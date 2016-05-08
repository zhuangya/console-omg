'use strict';

var chalk = require('chalk')

function omg (msg, styleArray) {

  var styleFunc = (styleArray || randomStyle()).reduce(function (soFar, current) {
    return soFar[current]
  }, chalk)

  console.log(styleFunc('=== O M G ================================', '[', new Date().toLocaleString(), ']'))
  console.log('\n')
  console.log(msg)
  console.log('\n')
  console.log(styleFunc('=== O M G ================================'))
}

function randomStyle () {
  var colors = [ 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray' ]
  var bgColors = colors.map(function (c) {
    return prependPrefix(c);
  })
  var styles = [ 'reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough' ]

  var randomColor = smartPick(colors)

  return [randomColor, smartPick(colors, prependPrefix(randomColor)), smartPick(styles)];
}


function prependPrefix (source, prefix) {
  prefix = prefix || 'bg'
  return [prefix, source[0].toUpperCase(), source.substr(1)].join('')
}

function smartPick (source, exception) {
  var length = source.length;

  if (length < 2) {
    throw new Error('source too short')
  }

  if (exception) {
    source.splice(exception, source.indexOf(exception))
    return smartPick(source)
  }

  var currentRandomIndex = Math.floor(Math.random() * length)
  return source[currentRandomIndex]

}

console.omg = omg;
module.exports = exports = omg;
