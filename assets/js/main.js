// DATABASE
var pokemonDB = [
	{
		name: 'charmander',
		type: 'fire',
		hp: 39,
		attack: 52,
		defense: 43,
		level: 1,
		img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
	},
	{
		name: 'bulbasaur',
		type: 'grass',
		hp: 45,
		attack: 49,
		defense: 49,
		level: 1,
		img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
	},
	{
		name: 'squirtle',
		type: 'water',
		hp: 44,
		attack: 48,
		defense: 65,
		level: 1,
		img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
	}
];

// STATE
var gameState = {
	userPokemon: '',
	rivalPokemon: ''
};
console.log();

// ELEMENTS

var pokemonsEl = document
	.querySelector('.select-screen')
	.querySelectorAll('.character');

console.log(pokemonsEl);

var battleScreenEl = document.getElementById('battle-screen');

var attackBtnsEl = document
	.getElementById('battle-screen')
	.querySelectorAll('.attack');

console.log(attackBtnsEl);

var i = 0;
// INITIAL LOOP TO ASSIGN ALL DATA - GIVES FUNCTION TO ALL CHARACTERS ON SCREEN SELECT
while (i < pokemonsEl.length) {
	pokemonsEl[i].onclick = function() {
		// currently selected pokemon's name
		var pokemonName = this.dataset.pokemon;

		// elements for character battle images
		var player1Img = document
			.querySelector('.player1')
			.getElementsByTagName('img');
		var player2Img = document
			.querySelector('.player2')
			.getElementsByTagName('img');

		// save the current pokemon
		gameState.userPokemon = pokemonName;

		// cpu picks a pokemon
		cpuRandomNum();

		// transition from select screen to battle screen
		battleScreenEl.classList.toggle('active');

		// filter through array to find pokemon name that matches pokemonName variable, assign one to player1Img and other to player2Img

		// current user as chosen by random filtering array
		var currentUserPokemon = pokemonDB.filter(function(pokemon) {
			return pokemon.name === gameState.userPokemon;
		});
		// use that user variable to assign to character image
		player1Img[0].src = currentUserPokemon[0].img;

		// cpu as chosen by random filtering array
		var currentRivalPokemon = pokemonDB.filter(function(pokemon) {
			return pokemon.name === gameState.rivalPokemon;
		});
		// use the cpu/rival variable to assign a character image to cpu
		player2Img[0].src = currentRivalPokemon[0].img;

		// filter returns new array with the matching item from original array so since we're using the new array and the only item in it is the matching item from the original the index must be 0 hence the  currentUserPokemon[0].img
		console.log(gameState);
	};
	// increment while loop
	i++;
}

// loop through attack buttons and add an onclick to them
// initialize counting/looping variable
var a = 0;
// create loop and set it to run through length of array
while (a < attackBtnsEl.length) {
	// for each index, add this annonymous onclick function to pull the attack data, assign it to a variable and log it to prove its capturing the proper attack based on whats been clicked (rock, paper, or scissors)
	attackBtnsEl[a].onclick = function() {
		var attackName = this.dataset.attack;
		gameState.currentUserAttack = attackName;
		console.log(currentUserAttack);
	};
	a++;
}

// GENERATE RANDOM NUMBER FROM 0 TO 2 (0, 1, 2)
var generateRandomNum = function() {
	return Math.floor(Math.random() * 3);
};

// USE RANDOM NUMBER TO BLIND PICK A POKEMON FROM HTML DATA(SET) VALUES AS OPPONENT
var cpuRandomNum = function() {
	return (gameState.rivalPokemon =
		pokemonsEl[generateRandomNum()].dataset.pokemon);
};

// user chooses attack

// cpu health goes down (add in chance to miss and possibly crit if health means anything)
// cpu attacks
// user health goes down (accuracy & crit)

// rock > scissors
// scissors > paper
// paper > rock

// damage done is impacted by defense so less health may be taken

// // pokemon
// // create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)
// var pokemons = [
// 	{
// 		name: 'charmander',
// 		type: 'fire',
// 		attack: 52,
// 		stamina: 39,
// 		level: 1
// 	},
// 	{
// 		name: 'charmander',
// 		type: 'fire',
// 		attack: 52,
// 		stamina: 39,
// 		level: 1
// 	}
// ];

// var attack = 20;
// var level = 10;
// var stack = 1.3;
// var stamina = 39;

// // create a formula for attacks
// console.log((attack * level * stack) / 7);

// // create a formula for health
// //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
// console.log(0.2 * Math.sqrt(level) * stamina * 15);

// // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// // p1 vs p2

// // when one user loses all his health declare a winner
