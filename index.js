'use strict';

var chalk = require('chalk')

var colors = [ 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white' ]
var bgColors = colors.map(function (c) {
  return prependPrefix(c);
})
var styles = [ 'bold', 'dim', 'italic', 'underline', 'hidden', 'strikethrough' ]


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
  var randomColor = smartPick(colors)
  var result = [randomColor, smartPick(bgColors, prependPrefix(randomColor)), smartPick(styles)];
  console.log(result)
  return result
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
    var exSource = source.filter(function (current) {
      return current !== exception
    })
    return smartPick(exSource)
  }

  var currentRandomIndex = Math.floor(Math.random() * length)
  return source[currentRandomIndex]

}

console.omg = omg;
module.exports = exports = omg;
