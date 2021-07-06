/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window Binding: In global scope, "this" refers to the window or console
* 2. Implicit Binding: When using dot notation, "this" refers to the object before the dot
* 3. New Binding: When using a constructor, "this" refers to a specific instance of an object returned by the constructor function
* 4. Explicit Binding: Using the call() or apply() method overrides this and what the constructor objects are set to
*
* write out a code example of each explanation above
*/

'use strict';

// Principle 1
// code example for Window Binding

console.log("Principle 1: Window Binding");
function iLove(school) {
  console.log(this);
  return `I love ${school}!`;
}
console.log(iLove("Lambda School"));


// Principle 2
// code example for Implicit Binding
console.log("\nPrinciple 2: Implicit Binding");
const iSpy = {
  preamble: 'I spy with my little eye',
  speak: function(letter) {
    console.log(`${this.preamble} something that begins with '${letter.toUpperCase()}'...`);
    console.log(this);
  }
}
iSpy.speak('A');


// Principle 3
// code example for New Binding

console.log("\nPrinciple 3: New Binding");
function iSpyGame(letter) {
  this.preamble = 'I spy with my little eye';
  this.letter = letter;
  this.speak = function() {
    console.log(`${this.preamble} something that begins with '${this.letter.toUpperCase()}'...`);
    console.log(this);
  }
}

const michael = new iSpyGame('M');
const steph = new iSpyGame('S');

michael.speak();
steph.speak();

// Principle 4
// code example for Explicit Binding

console.log("\nPrinciple 4: Explicit Binding");

michael.speak.call(steph);
steph.speak.apply(michael);