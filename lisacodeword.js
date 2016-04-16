//Lisa code:

var letter = require('./letter.js');
// var currentLetter = new Word('boat', 'water', 'sunshine');

// currentLetter.addLetter('b', 'w', 's');

currentLetter.addDud('boat', 'water', sunshine);
var Word = function(wrd){
    this.word = wrd;
    this.lets = [];
    this.found = false;
    this.getLets = function(){
        for(var i =0; i< this.word.length; i++); {
        	this.lets.push(new Letter(this.word[i]));
        }
    };

module.exports = Word;

// lisa code: for letter.js file
var Letter = function(let){
    this.charac = let;
    this.appear = false;
    this.letterRender = function(){
        if (this.charac == 'false'){
            console.log(" ");
        }else{
            console.log("Letter value", this.charac);
        }
    }
}

module.exports = Letter;