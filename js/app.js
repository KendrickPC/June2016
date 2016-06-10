// Since these variables are constant and immutable, (global scope variables)
// they are defined using THIS_FORMAT
var player_Initial_Start_X = 200;
var player_Initial_Start_Y = 392;

// global scope variable choice of character images
var characterImages = ['images/char-boy.png', 'images/char-cat-girl.png',
    'images/char-horn-girl.png', 'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

var Enemy = function(EnemyX, EnemyY, speed) {
    // In this app, we Start the Enemy function as a global variable and keep the 
    // Player variable as a local variable. 
    // The Enemy function should contain the instances of location
    // in regards to the X and Y variable for Canvas. Also, don't forget about 
    // the speed instance. 
    this.x = EnemyX;
    this.y = EnemyY;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Explain this code and link a reference that explains the
    // Enemy.prototype.update function. 
    if (this.x > 490) {
        this.x = -50;
        this.speed = randomSpeed();
    } else {
        this.x = this.x += this.speed * dt;
    }
// This is the collision detection function written with the logic that 
// if the player is left of the enemy, the player will reset with the global 
// scope function

    if (player.x + 70 >= this.x && // player.right is_right_of enemy.left
        player.x <= this.x + 70 && // player.left is_left_of enemy.right
        player.y + 50 <= this.y + 100 && // player.top is_above enemy.bottom
        player.y + 100 >= this.y + 50 // player.bottom is_below enemy.top
    ) {
        player.resetPosition();
    }
};
// The above function needs more selecting 
// A random speed function is added to randomize the speed of the Enemy bugs
// Test the variable for random speed
function randomSpeed(min, max) {
    min = 50;
    max = 400;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Code for the Player class. Please reference other 
// code samples regarding the local Player Variable.
var Player = function(HeroX, HeroY) {
    this.x = HeroX;
    this.y = HeroY;
    this.sprite = "images/char-boy.png";
};
// General open player.prototype.update function with the variable 
// scope as ...
Player.prototype.update = function() {};

// Similar to line 57 and 58
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x === 0) {
                this.x = 0;
            } else {
                this.x -= 100;
                console.log("left", this.x, this.y);
            }
            break;
        case 'right':
            if (this.x === 400) {
                this.x = 400;
            } else {
                this.x += 100;
                console.log("right", this.x, this.y);
            }
            break;
        case 'up':
// Reset player position for y = 60 to start the reset at the water 
            if (this.y === 60) {
                this.resetPosition();
            } else {
                this.y -= 83;
                console.log("up", this.x, this.y);
            }
            break;
        case 'down':
            if (this.y === 392) {
                this.y = 392;
            } else {
                this.y += 83;
                console.log("down", this.x, this.y);
            }
            break;
    }
};
Player.prototype.resetPosition = function() {
    player.x = player_Initial_Start_X;
    player.y = player_Initial_Start_Y;
    player.sprite = spriteRefresh();
    player.name = nameRefresh();
};

// Instantiate the objects.
// all enemy objects are placed in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-50, 60 + (83 * i), randomSpeed())); //60
}
// The player object is placed in a variable called player
var player = new Player(200, 392);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Allows character selection on the HTML sheet 
// Helper functions returns the sprite selected by the user
// in the radio button group.

var spriteRefresh = function() {
    var radio = document.forms.myForm.elements.user;
    var selected = 1;    
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            selected = radio[i].value;
        }
    }
    return characterImages[selected];
};
//Returns the name to display for the current sprite
var nameRefresh = function() {
    var radio = document.forms.myForm.elements.user;
    var selected = 1;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            selected = radio[i].value;
        }
    }
    if (selected === '0') return 'Boy';
    if (selected === '1') return 'Cat Girl';
    if (selected === '2') return 'Horn Girl';
    if (selected === '3') return 'Pink Girl';
    if (selected === '4') return 'Princess Girl';
};

// Variable GameReset is linked to index.html line #32
var gameReset = Player.prototype.resetPosition;

// Using jQuery for logging click locations. Data shows up in developer mode console. 
// Put the jquery file in the JS folder
var clickLocations = [];
function logClicks(x, y) {
  clickLocations.push({
    x: x,
    y: y
  });
  console.log('x location: ' + x + '; y location: ' + y);
}
$(document).click(function (loc) {
  // your code goes here!
  var x = loc.pageX;
  var y = loc.pageY;
  logClicks(x, y);
});