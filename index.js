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
function getr(sett) {
  var a = Math.floor(Math.random()*sett.max)+sett.min
  var b = Math.floor(Math.random()*sett.max)+sett.min
  if (!a || !b) return getr(sett)
  return [a,b]
}
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
console.log("Initiating operators")
var addition = init(settings.addition.percent)
var subtraction = init(settings.subtraction.percent)
var multiplication = init(settings.multiplication.percent)
var division = init(settings.division.percent)
var worksheet = "                           M A T H   W O R K S H E E T                       \n";
var answers = "                              A N S W E R S                           /n";
var numbers = []
function push(a,b,op) {
  numbers.push({a:a,b:b,op:op})
  
}
console.log("Initialised \nGenerating numbers");
for (var i = 0; i < settings.amount; i++) {
  var ra = Math.floor(Math.random() * percentsum) + 1
  if (addition.check(ra)) {
    console.log("Question " + (i + 1) + " is addition")
   var nombe = getr(settings.addition)
        push(numbe[0],numbe[1],0)
   
    
  } else if (subtraction.check(ra)) {
     console.log("Question " + (i + 1) + " is subtraction")
    function subtract() {
    var sett = settings.subtraction
    var numbe = getr(sett)
    if (sett.negativenumb) {
      push(numbe[0],numbe[1],1)
      
    } else {
      if (numbe[0] - numbe[1] >= 0) {
        push(numbe[0],numbe[1],1)
        
      } else if (numbe[1] - numbe[0] >= 0) {
        push(numbe[1],numbe[0],1)
      } else {
        subtract()
      }
    }
  }
  subtract()
  } else if (multiplication.check(ra)) {
     console.log("Question " + (i + 1) + " is multiplication")
var sett = settings.multiplication
   var numbe = getr(sett)
    push(numbe[0],numbe[1],2)
    
    
  } else if (division.check(ra)) {
     console.log("Question " + (i + 1) + " is division")
    function divide() {
      var sett = settings.division
    var numbe = getr(sett)
      if (sett.hard) {
        var ish = Math.floor(Math.random() * 100)
        if (ish <= sett.hard) {
          push(numbe[0],numbe[1],3)
          return
        }
      }
      
     var a = numbe[0] * Math.floor(Math.random()*sett.max/4 + 1)
     push(a,numbe[0],3)
    }
    divide()
  } else {
    throw "ERROR"
    
  }
}
console.log("Done generating. \nGenerating Answers")
  var current = 0;
  function fill(a,b) {
    if (!a) return
    a = a.toString()
   var j = b - a.length + 1
    var r = a
    for (var i = 0; i<j;i++) {
      r = r + " "
    }
    return r;
  }
  for (var i in numbers) {
    var numb = numbers[i]
    var answer = false;
    if (numb.op == 0) answer = numb.a + numb.b
    if (numb.op == 1) answer = numb.a - numb.b
    if (numb.op == 2) answer = numb.a * numb.b
    if (numb.op == 3) answer = numb.a / numb.b
    answers += (i + 1) + ". " + answer + "\n"
    process.stdout.write("Done with question" + (i + 1) + "\r")
  }
  fs.writeFileSync("./answers",answers)
  console.log("\nDone generating answers\nGenerating questions")
  for (var k=0;k<Math.ceil(numbers.length/3);k++) {
    worksheet = worksheet + "\n"
  for (var i = 0;i < 3; i ++) { 
    
   var numb = numbers[current + i];
   if (!numb) continue
    worksheet = worksheet + "   " + fill((i + 1 + current) + ". ",7) + fill(numb.a,10)
    process.stdout.write("Done with question" + (i + 1) + "\r")
    
  }
  worksheet = worksheet + "\n"
  for (var i = 0;i < 3; i ++) { 
 
   var numb = numbers[current + i];
   if (!numb) continue
   var sign = "";
   if (numb.op == 0) sign = "+"
   if (numb.op == 1) sign = "-"
   if (numb.op == 2) sign = "*"
   if (numb.op == 3) sign = "%"
    worksheet = worksheet + "       " + sign + "   " + fill(numb.b,10)
    
    
  }
  worksheet = worksheet + "\n"
    for (var i = 0;i < 3; i ++) { 
        if (!numbers[i + current]) continue
      worksheet += "      _______________"
      
    }
  current += 3;
   worksheet = worksheet + "\n"
    worksheet = worksheet + "\n"
     worksheet = worksheet + "\n"
      worksheet = worksheet + "\n"
       worksheet = worksheet + "\n"
}

fs.writeFileSync('./worksheet',worksheet)
console.log("\nDone")
