(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
        });
    };
    __webpack_require__.r = function(exports) {
        if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };
    __webpack_require__.t = function(value, mode) {
        if (1 & mode) value = __webpack_require__(value);
        if (8 & mode) return value;
        if (4 & mode && "object" === typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./assets/js/main.js");
})({
    "./assets/js/main.js": function(module, exports) {
        eval("// DATABASE\nvar pokemonDB = [{\n  name: 'charmander',\n  type: 'fire',\n  hp: 39,\n  attack: 52,\n  defense: 43,\n  level: 1,\n  img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'\n}, {\n  name: 'bulbasaur',\n  type: 'grass',\n  hp: 45,\n  attack: 49,\n  defense: 49,\n  level: 1,\n  img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'\n}, {\n  name: 'squirtle',\n  type: 'water',\n  hp: 44,\n  attack: 48,\n  defense: 65,\n  level: 1,\n  img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'\n}]; // STATE\n\nvar gameState = {\n  userPokemon: '',\n  rivalPokemon: ''\n};\nconsole.log(); // ELEMENTS\n\nvar pokemonsEl = document.querySelector('.select-screen').querySelectorAll('.character');\nconsole.log(pokemonsEl);\nvar battleScreenEl = document.getElementById('battle-screen');\nvar attackBtnsEl = document.getElementById('battle-screen').querySelectorAll('.attack');\nconsole.log(attackBtnsEl);\nvar i = 0; // INITIAL LOOP TO ASSIGN ALL DATA - GIVES FUNCTION TO ALL CHARACTERS ON SCREEN SELECT\n\nwhile (i < pokemonsEl.length) {\n  pokemonsEl[i].onclick = function () {\n    // currently selected pokemon's name\n    var pokemonName = this.dataset.pokemon; // elements for character battle images\n\n    var player1Img = document.querySelector('.player1').getElementsByTagName('img');\n    var player2Img = document.querySelector('.player2').getElementsByTagName('img'); // save the current pokemon\n\n    gameState.userPokemon = pokemonName; // cpu picks a pokemon\n\n    cpuRandomNum(); // transition from select screen to battle screen\n\n    battleScreenEl.classList.toggle('active'); // filter through array to find pokemon name that matches pokemonName variable, assign one to player1Img and other to player2Img\n    // current user as chosen by random filtering array\n\n    var currentUserPokemon = pokemonDB.filter(function (pokemon) {\n      return pokemon.name === gameState.userPokemon;\n    }); // use that user variable to assign to character image\n\n    player1Img[0].src = currentUserPokemon[0].img; // cpu as chosen by random filtering array\n\n    var currentRivalPokemon = pokemonDB.filter(function (pokemon) {\n      return pokemon.name === gameState.rivalPokemon;\n    }); // use the cpu/rival variable to assign a character image to cpu\n\n    player2Img[0].src = currentRivalPokemon[0].img; // filter returns new array with the matching item from original array so since we're using the new array and the only item in it is the matching item from the original the index must be 0 hence the  currentUserPokemon[0].img\n\n    console.log(gameState);\n  }; // increment while loop\n\n\n  i++;\n} // loop through attack buttons and add an onclick to them\n// initialize counting/looping variable\n\n\nvar a = 0; // create loop and set it to run through length of array\n\nwhile (a < attackBtnsEl.length) {\n  // for each index, add this annonymous onclick function to pull the attack data, assign it to a variable and log it to prove its capturing the proper attack based on whats been clicked (rock, paper, or scissors)\n  attackBtnsEl[a].onclick = function () {\n    var attackName = this.dataset.attack;\n    gameState.currentUserAttack = attackName;\n    console.log(currentUserAttack);\n  };\n\n  a++;\n} // GENERATE RANDOM NUMBER FROM 0 TO 2 (0, 1, 2)\n\n\nvar generateRandomNum = function generateRandomNum() {\n  return Math.floor(Math.random() * 3);\n}; // USE RANDOM NUMBER TO BLIND PICK A POKEMON FROM HTML DATA(SET) VALUES AS OPPONENT\n\n\nvar cpuRandomNum = function cpuRandomNum() {\n  return gameState.rivalPokemon = pokemonsEl[generateRandomNum()].dataset.pokemon;\n}; // user chooses attack\n// cpu health goes down (add in chance to miss and possibly crit if health means anything)\n// cpu attacks\n// user health goes down (accuracy & crit)\n// rock > scissors\n// scissors > paper\n// paper > rock\n// damage done is impacted by defense so less health may be taken\n// // pokemon\n// // create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)\n// var pokemons = [\n// \t{\n// \t\tname: 'charmander',\n// \t\ttype: 'fire',\n// \t\tattack: 52,\n// \t\tstamina: 39,\n// \t\tlevel: 1\n// \t},\n// \t{\n// \t\tname: 'charmander',\n// \t\ttype: 'fire',\n// \t\tattack: 52,\n// \t\tstamina: 39,\n// \t\tlevel: 1\n// \t}\n// ];\n// var attack = 20;\n// var level = 10;\n// var stack = 1.3;\n// var stamina = 39;\n// // create a formula for attacks\n// console.log((attack * level * stack) / 7);\n// // create a formula for health\n// //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)\n// console.log(0.2 * Math.sqrt(level) * stamina * 15);\n// // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon\n// // p1 vs p2\n// // when one user loses all his health declare a winner\n\n//# sourceURL=webpack:///./assets/js/main.js?");
    }
});