console.log("JavaScript is running...");

// Objects representing each player's current hand and score.
const player = {
	name: "",
	points: 0,
	roundWins: 0,
	hand: []
};

const ai = {
	name: "Gary Oak",
	points: 0,
	roundWins: 0,
	hand: []
};

player.name = prompt("What's your name, trainer?", "Ash Ketchum")


// This object contains all the data and methods for actually running the game itself.
const gameObject = {
	currentRound: 1,

// This is the library consisting of the playing cards.
library: [
	{name: "Bulbasaur", damage:60},
	{name: "Caterpie", damage:40},
	{name: "Charmander", damage:60},
	{name: "Clefairy", damage:50},
	{name: "Jigglypuff", damage:60},
	{name: "Mankey", damage:30},
	{name: "Meowth", damage:60},
	{name: "Nidoran - female", damage:60},
	{name: "Nidoran - male", damage:50},
	{name: "Oddish", damage:40},
	{name: "Pidgey", damage:50},
	{name: "Pikachu", damage:50},
	{name: "Poliwag", damage:50},
	{name: "Psyduck", damage:60},
	{name: "Rattata", damage:30},
	{name: "Squirtle", damage:60},
	{name: "Vulpix", damage:50},
	{name: "Weedle", damage:40}
],

// This array represents a virtual tabletop where players place their cards during combat.
gameBoard: [],

// This array represents cards is where all cards that have been through combat will go.
graveYard: [],

// This is a function that will shuffle the library
shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]]; 
		}
	return a;
	},

deal() {
	for (let i = 0; i < 3; i++) {
		player.hand.push(this.library[0]);
		this.library.splice(0, 1);
	}
	for (let i = 0; i < 3; i++) {
		ai.hand.push(this.library[0]);
		this.library.splice(0, 1);
	}
},

playCard() {
	this.gameBoard.push(player.hand[0]);
	player.hand.splice(0, 1);
	console.log(`${JSON.stringify(player.name)} played ${JSON.stringify(this.gameBoard[0].name)}!`); 
	this.gameBoard.push(ai.hand[0]);
	ai.hand.splice(0, 1);
	console.log(`${JSON.stringify(ai.name)} played ${JSON.stringify(this.gameBoard[1].name)}!`);
},

combat() {
	this.playCard();
	if (this.gameBoard[1].damage > this.gameBoard[0].damage) {
		ai.points++;
		console.log(`${JSON.stringify(this.gameBoard[0].name)} has fainted! Your opponent's current points for this round are: ${ai.points}...`);
	} else if (this.gameBoard[0].damage > this.gameBoard[1].damage) {
		player.points++;
		console.log(`${JSON.stringify(this.gameBoard[1].name)} has fainted! Your current points for this round are: ${player.points}!`);
	} else {
		console.log("Both pokemon have fainted! No points will be awarded.");
	}
	this.graveYard.push(this.gameBoard[0], this.gameBoard[1]);
	this.gameBoard.splice(0, 1);
	this.gameBoard.splice(0, 1);
},

aftermath() {
		if (player.points > ai.points) {
		player.roundWins++;
		console.log(`Congrats! You have won round ${this.currentRound}! Your current wins stand at: ${player.roundWins}.`);
	} else if (ai.points > player.points) {
		ai.roundWins++;
		console.log(`${JSON.stringify(ai.name)} wins round ${this.currentRound}. Their winnings are currently at: ${ai.roundWins}`);
	} else {
		console.log(`It's a tie! No winnings will be awarded this round.`);
	};
	player.points = 0;
	ai.points = 0;
	this.currentRound++;
	if (this.currentRound === 4) {
		this.calculateWinnings();
	} else {
		this.executeRound();
	};
},

calculateWinnings() {
	 if (player.roundWins > ai.roundWins) {
		console.log(`VICTORY`);
	} else if (ai.roundWins > player.roundWins) {
		console.log(`DEFEAT`);
	} else {
		console.log(`TIE`);
	};
},

executeRound() {
	console.log(`BEGIN ROUND ${this.currentRound}!`);
	this.deal();
	this.combat();
	this.combat();
	this.combat();
	this.aftermath();
},

initialize() {
	this.shuffle(this.library);
	this.executeRound();
},

};

	gameObject.initialize();
	


























