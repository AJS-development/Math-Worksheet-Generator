"use strict";
const fs = require('fs')

try {
var settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json","utf8"))
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
var addition = init(settings.addition.percent)
var subtraction = init(settings.subtraction.percent)
var multiplication = init(settings.multiplication.percent)
var division = init(settings.division.percent)
var worksheet = "                           M A T H   W O R K S H E E T                       /n";
var answer = "                              A N S W E R S                           /n";
var numbers = []
function push(a,b,op) {
  numbers.push({a:a,b:b,op:op})
  
}
for (var i = 0; i < settings.amount; i++) {
  var ra = Math.floor(Math.random() * percentsum) + 1
  if (addition.check(ra)) {
    // addition (0)
    var numbe = [Math.floor(Math.random()*settings.addition.max) + settings.addition.min,Math.floor(Math.random()*settings.addition.max) + settings.addition.min]
      push(numbe[0],numbe[1],0)
   
    
  } else if (subtraction.check(ra)) {
    function subtract() {
    var sett = settings.subtraction
    var numbe = [Math.floor(Math.random()*sett.max)+sett.min,Math.floor(Math.random()*sett.max)+sett.min]
    if (sett.negativenumb) {
      push(numbe[0],numbe[1],1)
      
    } else {
      if (numbe[0] - numbe[1] >= 0) {
        push(numbe[0],numbe[1],1)
        
      } else if (numbe[1] - numbe[0] >= 0) {
        push(numbe[1],numbe[2],1)
      } else {
        subtract()
      }
    }
  }
  subtract()
  } else if (multiplication.check(ra)) {
var sett = settings.multiplication
    var numbe = [Math.floor(Math.random()*sett.max)+sett.min,Math.floor(Math.random()*sett.max)+sett.min]
    push(numbe[0],numbe[1],3)
    
    
  } else if (division.check(ra)) {
    function divide() {
      var sett = settings.division
    var numbe = [Math.floor(Math.random()*sett.max)+sett.min,Math.floor(Math.random()*sett.max)+sett.min]
      if (sett.hard) {
        var ish = Math.floor(Math.random() * 100)
        if (ish <= sett.hard) {
          push(numbe[0],numbe[1],4)
          return
        }
      }
      
     var a = numbe[0] * numbe[1]
     push(a,numbe[0],4)
    }
    divide()
  } else {
    throw "ERROR"
    
  }
}
  var current = 0;
  function fill(a,b) {
    if (!a) return
   var j = b - a.length + 1
    var r = a
    for (var i = 0; i<j;i++) {
      r = r + " "
    }
    return r;
  }
  for (var k=0;k<Math.ceil(numbers.length/3);k++) {
  for (var i = 0;i < 3; i ++) { 
   var numb = numbers[current + i];
    worksheet = worksheet + " " + fill((i + 1) + ". ",4) + fill(numb.a,20)
    
    
  }
  worksheet += "\n"
  for (var i = 0;i < 3; i ++) { 
   var numb = numbers[current + i];
   var sign = "";
   if (numb.op == 0) sign = "+"
   if (numb.op == 1) sign = "-"
   if (numb.op == 2) sign = "\xD7"
   if (numb.op == 3) sign = "\xF7"
    worksheet = worksheet + " " + sign + "   " + fill(numb.b,20)
    
    
  }
  worksheet += "\n"
    for (var i = 0;i < 3; i ++) { 
      worksheet += "      ____________________"
      
    }
  current += 4;
  
}

fs.writeFileSync('./worksheet.txt',worksheet)
