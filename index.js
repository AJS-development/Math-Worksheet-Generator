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
   check: function(b) {return false}
  }
  percentsum = a + percentsum;
  return {
   min: percentsum - a, 
    max: percentsum,
    check: function(numb) {
      if (numb <= this.min || numb > this.max) return false; else return true;
      
    }
  }
}
var addition = init(settings.addition)
var subtraction = init(settings.subtractions)
var multiplication = init(settings.multiplication)
var division = init(settings.division)

for (var i = 0; i < settings.amount; i++) {
  var ra = Math.floor(Math.random() * percentsum) + 1
  if (addition.check(ra)) {
    // addition
    
  } else if (subtraction.check(ra)) {
    
    
  } else if (multiplication.check(ra)) {
    
    
  } else if (division.check(ra)) {
    
  } else {
    throw "ERROR"
    
  }
  
  
  
}
