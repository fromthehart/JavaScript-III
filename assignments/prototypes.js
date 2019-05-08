/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(attributes) {
  this.createdAt = attributes.createdAt;
  this.name = attributes.name;
  this.dimensions = attributes.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

// const game = new GameObject({createdAt: 'London', name: 'Joe', dimensions: '640x480'});
// console.log(game);
// console.log(game.destroy());

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(attributes) {
  GameObject.call(this, attributes);
  this.healthPoints = attributes.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
}

// const character = new CharacterStats({createdAt: 'London', name: 'Joe', dimensions: '640x480', healthPoints: 30});
// console.log(character);
// console.log(character.takeDamage());
// console.log(character.destroy());

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(attributes) {
  CharacterStats.call(this, attributes);
  this.team = attributes.team;
  this.weapons = attributes.weapons;
  this.language = attributes.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
}

// const human = new Humanoid({createdAt: 'London', name: 'Joe', dimensions: '640x480', healthPoints: 30, team: 'Green', weapons: ['sword', 'axe'], language: 'German'});

// console.log(human);
// console.log(human.greet());
// console.log(human.takeDamage());
// console.log(human.destroy());

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!


  function Hero(attributes) {
    Humanoid.call(this, attributes);
    this.alive = attributes.alive;
    this.pronoun = attributes.pronoun;
  }

  Hero.prototype = Object.create(Humanoid.prototype);

  Hero.prototype.attack = function(enemy) {
    if (!enemy.alive) return `${enemy.name} is already dead.`; // Attacking a dead enemy would be impolite
    randomWeapon = this.weapons[Math.floor(Math.random() * this.weapons.length)]; // Pick one of the weapons at random
    let attackReport = `${this.name} attacks ${enemy.name} with ${this.pronoun} ${randomWeapon}.\n`;
    let damageReport = this.inflictDamage(enemy);
    return attackReport + damageReport;
  }

  Hero.prototype.inflictDamage = function(enemy) {
    let hit = Math.floor(Math.random() * 11); // Random damage from 0 - 10

    if (hit > 3) {
      // Return a different string depending on strength of the hit
      let strength = (hit > 7) ? `${this.name} lands a strong blow!\n` : `${this.name} hits ${enemy.name}.\n`;
      return strength + enemy.takeDamage(hit);
    } else return `It's a miss.`; // Any hit of strength 3 or less is considered a miss
  }

  Hero.prototype.takeDamage = function(damage) {
    this.healthPoints -= damage; // Subtract the damage from health
    if (this.healthPoints < 0) { // If health is below zero, make it zero and flag the player as dead
      this.healthPoints = 0;
      this.alive = false;
      return "Death has been dealt. " + this.destroy(); // .destroy() from GameObject
    }
    return `${this.name} takes ${damage} ${(damage > 1) ? 'points' : 'point'} of damage.`;
  }

  function Villain(attributes) {
    Hero.call(this, attributes);
  }

  Villain.prototype = Object.create(Hero.prototype);

  const goodun = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 40,
    alive: true,
    name: 'Elvis Deadly',
    team: 'Memphis Mafia',
    pronoun: 'his',
    weapons: [
      'Blue Suede Shoes',
      'Pelvis',
    ],
    language: 'Elvis-ish',
  });

  const badun = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 40,
    alive: true,
    name: "Bustin' Bieber",
    team: 'Beliebers',
    pronoun: 'his',
    weapons: [
      'Posters from Tiger Beat Magazine',
      "Umlaut from 'Where Are Ü Now'" ,
    ],
    language: 'Canadian',
  });

  function battleItOut(player1, player2) {    
    console.log(`A battle between ${player1.name} and ${player2.name} commences!`);
    console.log(player1.greet()); // ... but first, some polite greetings
    console.log(player2.greet());

    let round = 0;
    while (player1.alive && player2.alive) {
      round++;
      console.log(`\n*** Round ${round} ***`);
      console.log(player1.attack(player2));
      if (player2.alive) console.log(player2.attack(player1)); 
    }
    return (player1.alive) ? `\n*** The End ***\n${player1.name} is victorious after ${round} rounds!` : `\n*** The End ***\n${player2.name} is the victor after ${round} rounds!`;
  }

  console.log("\n ==== Stretch Task ====");
  console.log(battleItOut(goodun, badun));