"use strict";
const fs = require('fs')

try {
const settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json","utf8"))
console.log("Loaded settings")
} catch (e) {
  console.log("failed to load settings, " + e);
  process.exit()
}
var percentsum = 0;
function init(a) {
  if (!a) return {
   min: -1000,
   max: -1000
  }
  percentsum = a + percentsum;
  return {
   min: percentsum - a, 
    max: percentsum
  }
}
var addition = init(settings.addition)
var subtraction = init(settings.subtractions)


for (var i = 0; i < settings.amount; i++) {
  
  
  
  
  
}
