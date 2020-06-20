//--------------------------STATE OBJECT----------------------------------------
//------------------------------------------------------------------------------
var gameState = {
	// PLAYER
	userPokemon: '',
	// CPU
	rivalPokemon: '',
	// DATABASE TO STORE CHARACTER STATS
	pokemonDB: [
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
	],
	// GRAB ELEMENTS FROM HTML TO MANIPULATE
	elements: {
		pokemonEl: document
			.querySelector('.select-screen')
			.querySelectorAll('.character'),
		battleScreenEl: document.getElementById('battle-screen'),
		attackBtnsEl: document
			.getElementById('battle-screen')
			.querySelectorAll('.attack')
	},

	//--------------------------LOOPS TO RUN GAME-------------------------------
	//--------------------------------------------------------------------------
	init: function() {
		var i = 0;
		// INITIAL LOOP TO ASSIGN ALL DATA - GIVES FUNCTION TO ALL CHARACTERS ON SCREEN SELECT
		while (i < gameState.elements.pokemonEl.length) {
			gameState.elements.pokemonEl[i].onclick = function() {
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
				gameState.cpuRandomNum();

				// transition from select screen to battle screen
				gameState.elements.battleScreenEl.classList.toggle('active');

				// filter through array to find pokemon name that matches pokemonName variable, assign one to player1Img and other to player2Img

				// current user as chosen by random filtering array
				gameState.currentUserPokemon = gameState.pokemonDB.filter(function(
					pokemon
				) {
					return pokemon.name === gameState.userPokemon;
				});
				// use that user variable to assign to character image
				player1Img[0].src = gameState.currentUserPokemon[0].img;

				// cpu as chosen by random filtering array
				gameState.currentRivalPokemon = gameState.pokemonDB.filter(function(
					pokemon
				) {
					return pokemon.name === gameState.rivalPokemon;
				});
				// use the cpu/rival variable to assign a character image to cpu
				player2Img[0].src = gameState.currentRivalPokemon[0].img;

				// filter returns new array with the matching item from original array so since we're using the new array and the only item in it is the matching item from the original the index must be 0 hence the  currentUserPokemon[0].img
				gameState.currentUserPokemon[0].health = gameState.calculateHealth(
					gameState.currentUserPokemon
				);
				gameState.currentUserPokemon[0].originalHealth = gameState.calculateHealth(
					gameState.currentUserPokemon
				);
				gameState.currentRivalPokemon[0].health = gameState.calculateHealth(
					gameState.currentRivalPokemon
				);
				gameState.currentRivalPokemon[0].originalHealth = gameState.calculateHealth(
					gameState.currentRivalPokemon
				);
				console.log(gameState);
			};
			// increment while loop
			i++;
		}

		// loop through attack buttons and add an onclick to them
		// initialize counting/looping variable
		var a = 0;
		// create loop and set it to run through length of array
		while (a < gameState.elements.attackBtnsEl.length) {
			// for each index, add this annonymous onclick function to pull the attack data, assign it to a variable and log it to prove its capturing the proper attack based on whats been clicked (rock, paper, or scissors)
			gameState.elements.attackBtnsEl[a].onclick = function() {
				var attackName = this.dataset.attack;
				gameState.currentUserAttack = attackName;
				// console.log(gameState.currentUserAttack);
				gameState.play(attackName, gameState.cpuAttack());
			};
			a++;
		}
	},

	//-------------------GAME LOGIC - ROCK, PAPER, SCISSORS---------------------
	//--------------------------------------------------------------------------
	play: function(userAttack, rivalAttack) {
		var currentUserPokemon = gameState.currentUserPokemon[0];
		var currentRivalPokemon = gameState.currentRivalPokemon[0];
		currentUserPokemon.player = 'user';
		currentRivalPokemon.player = 'cpu';
		switch (userAttack) {
			case 'rock':
				if (rivalAttack === 'paper') {
					if (
						currentUserPokemon.health >= 1 &&
						currentRivalPokemon.health >= 1
					) {
						// user
						gameState.attackMove(
							currentUserPokemon.attack,
							currentUserPokemon.level,
							0.8,
							0.5,
							currentRivalPokemon,
							currentUserPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// rival
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								2,
								currentUserPokemon,
								currentRivalPokemon
							);
							console.log(
								'Paper beats rock - it is super effective against you!'
							);
						}
					}
				} else if (rivalAttack === 'scissors') {
					if (
						currentUserPokemon.health >= 1 &&
						currentRivalPokemon.health >= 1
					) {
						// user
						gameState.attackMove(
							currentUserPokemon.attack,
							currentUserPokemon.level,
							0.8,
							2,
							currentRivalPokemon,
							currentUserPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// rival
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								0.5,
								currentUserPokemon,
								currentRivalPokemon
							);
							console.log('Rock beats scissors - it is super effective!!!');
						}
					}
				} else {
					if (
						currentUserPokemon.health >= 1 &&
						currentRivalPokemon.health >= 1
					) {
						if (
							currentUserPokemon.health >= 1 &&
							currentRivalPokemon.health >= 1
						) {
							// user
							gameState.attackMove(
								currentUserPokemon.attack,
								currentUserPokemon.level,
								0.8,
								0.1,
								currentRivalPokemon,
								currentUserPokemon
							);
							if (currentRivalPokemon.health >= 1) {
								// rival
								gameState.attackMove(
									currentRivalPokemon.attack,
									currentRivalPokemon.level,
									0.8,
									0.1,
									currentUserPokemon,
									currentRivalPokemon
								);
							}

							console.log('You both chose rock - it hits you both weakly!');
						}
					}
				}
				break;

			case 'paper':
				if (rivalAttack === 'rock') {
					if (
						currentUserPokemon.health >= 1 &&
						currentRivalPokemon.health >= 1
					) {
						if (
							currentUserPokemon.health >= 1 &&
							currentRivalPokemon.health >= 1
						) {
							// user
							gameState.attackMove(
								currentUserPokemon.attack,
								currentUserPokemon.level,
								0.8,
								2,
								currentRivalPokemon,
								currentUserPokemon
							);
							console.log('Paper beats rock - you are super effective!');
							if (currentRivalPokemon.health >= 1) {
								// rival
								gameState.attackMove(
									currentRivalPokemon.attack,
									currentRivalPokemon.level,
									0.8,
									0.5,
									currentUserPokemon,
									currentRivalPokemon
								);
							}
						}
					} else if (rivalAttack === 'scissors') {
						if (
							currentUserPokemon.health >= 1 &&
							currentRivalPokemon.health >= 1
						) {
							// user
							gameState.attackMove(
								currentUserPokemon.attack,
								currentUserPokemon.level,
								0.8,
								0.5,
								currentRivalPokemon,
								currentUserPokemon
							);
							if (currentRivalPokemon.health >= 1) {
								// rival
								gameState.attackMove(
									currentRivalPokemon.attack,
									currentRivalPokemon.level,
									0.8,
									2,
									currentUserPokemon,
									currentRivalPokemon
								);
								console.log(
									'Scissors beats paper - it is super effective against you!'
								);
							}
						} else {
							if (
								currentUserPokemon.health >= 1 &&
								currentRivalPokemon.health >= 1
							) {
								// user
								gameState.attackMove(
									currentUserPokemon.attack,
									currentUserPokemon.level,
									0.8,
									0.1,
									currentRivalPokemon,
									currentUserPokemon
								);
								if (currentRivalPokemon.health >= 1) {
									// rival
									gameState.attackMove(
										currentRivalPokemon.attack,
										currentRivalPokemon.level,
										0.8,
										0.1,
										currentUserPokemon,
										currentRivalPokemon
									);
								}
								console.log('You both chose paper - it hits you both weakly!');
							}
							break;
						}
					}
				}
			case 'scissors':
				if (rivalAttack === 'paper') {
					if (
						currentUserPokemon.health >= 1 &&
						currentRivalPokemon.health >= 1
					) {
						// user
						gameState.attackMove(
							currentUserPokemon.attack,
							currentUserPokemon.level,
							0.8,
							2,
							currentRivalPokemon,
							currentUserPokemon
						);
						console.log('Scissors beats paper - you are super effective!');
						if (currentRivalPokemon.health >= 1) {
							// rival
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								0.5,
								currentUserPokemon,
								currentRivalPokemon
							);
						}
					}
				} else if (rivalAttack === 'rock') {
					if (
						currentUserPokemon.health >= 1 &&
						currentRivalPokemon.health >= 1
					) {
						// user
						gameState.attackMove(
							currentUserPokemon.attack,
							currentUserPokemon.level,
							0.8,
							0.5,
							currentRivalPokemon,
							currentUserPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// rival
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								2,
								currentUserPokemon,
								currentRivalPokemon
							);
							console.log(
								'Rock beats scissors - it is super effective against you!'
							);
						}
					} else {
						if (
							currentUserPokemon.health >= 1 &&
							currentRivalPokemon.health >= 1
						) {
							// user
							gameState.attackMove(
								currentUserPokemon.attack,
								currentUserPokemon.level,
								0.8,
								0.1,
								currentRivalPokemon,
								currentUserPokemon
							);
							if (currentRivalPokemon.health >= 1) {
								// rival
								gameState.attackMove(
									currentRivalPokemon.attack,
									currentRivalPokemon.level,
									0.8,
									0.1,
									currentUserPokemon,
									currentRivalPokemon
								);
							}
							console.log('You both chose scissors - it hits you both weakly!');
						}
						break;
					}
				}
		}
	},
	//-----------------------------GAME FUNCTIONS-------------------------------
	//--------------------------------------------------------------------------

	// GENERATE ENEMY ATTACK TYPE (ROCK PAPER OR SCISSORS)
	cpuAttack: function() {
		var attacks = ['rock', 'paper', 'scissors'];
		return attacks[gameState.generateRandomNum()];
	},
	// HEALTH
	calculateHealth: function(user) {
		return 0.2 * Math.sqrt(user[0].level) * user[0].defense * user[0].hp;
	},
	// CALCULATE ATTACK DAMAGE, PRINT REMAINING HEALTH,
	attackMove: function(attack, level, stack, critical, enemy, attacker) {
		console.log(enemy.name + ' before: ' + Math.round(enemy.health));

		var attackAmount = attack * level * (stack + critical);
		enemy.health = enemy.health - attackAmount;
		console.log(enemy.name + ' after: ' + Math.round(enemy.health));

		// This is block of code is throwing an error - it should target the HTML to visually decrease the health bar upon damage taken. However, this is returning undefined.
		// var userHP = document
		// 	.querySelector('.player-1')
		// 	.querySelector('.stats')
		// 	.querySelector('.health')
		// 	.querySelector('.health-bar')
		// 	.querySelector('.inside');

		// var cpuHP = document
		// 	.querySelector('.player-2')
		// 	.querySelector('.stats')
		// 	.querySelector('.health')
		// 	.querySelector('.health-bar')
		// 	.querySelector('.inside');

		// if (enemy.player === 'user') {
		// 	var minusPercent = (enemy.health * 100) / enemy.originalHealth;
		// 	userHP.style.width = (minusPercent < 0 ? 0 : minusPercent) + '%';
		// } else {
		// 	var minusPercent = (enemy.health * 100) / enemy.originalHealth;
		// 	cpuHP.style.width = (minusPercent < 0 ? 0 : minusPercent) + '%';
		// }

		gameState.checkWinner(enemy, attacker);
	},
	//CHECK FOR WINNER IF EITHER FAINTS
	checkWinner: function(enemy) {
		if (enemy.health <= 0) {
			console.log('You are the very best like no one ever was!!!!');
		}
	},

	// GENERATE RANDOM NUMBER FROM 0 TO 2 (0, 1, 2)
	generateRandomNum: function() {
		return Math.floor(Math.random() * 3);
	},

	// USE RANDOM NUMBER TO BLIND PICK A POKEMON FROM HTML DATA(SET) VALUES AS OPPONENT
	cpuRandomNum: function() {
		return (gameState.rivalPokemon =
			gameState.elements.pokemonEl[
				gameState.generateRandomNum()
			].dataset.pokemon);
	}
};

gameState.init();
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
