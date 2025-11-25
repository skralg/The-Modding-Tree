// The Dungeons & Dragons SRD v5.2 has been referenced for these works. They hold a Creative Commons license.
// AI such as ChatGPT has been used for some creative upgrade and clickable text, but never for code.
// Not that I'm against AI writing code, just that I enjoy writing it myself.

let modInfo = {
	name: "The RPG Tree",
	author: "simple",
	pointsName: "levels",
	modFiles: [
		"layers.js", "tree.js",
		"layers/str.js", "layers/dex.js", "layers/con.js",
		"layers/int.js", "layers/wis.js", "layers/cha.js",
		"layers/map.js", "layers/quest.js", "layers/tavern.js",
	],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}


// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "Quests, Map",
}

let changelog = `<h1>Change Log:</h1><br>
<h3>v0.1</h3><br>
Initial creation<br>
<h3>v0.2</h3><br>
Character attributes<br>
<h3>v0.3</h3><br>
Quests, Map<br>`

let winText = `gg!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	// equipment: armor
	head: new Decimal(0),
	shoulders: new Decimal(0),
	neck: new Decimal(0),
	arms: new Decimal(0),
	hands: new Decimal(0),
	ring: new Decimal(0),
	body: new Decimal(0),
	waist: new Decimal(0),
	legs: new Decimal(0),
	feet: new Decimal(0),
	weapon: new Decimal(0),
	shield: new Decimal(0),
	// equipment: tools
	axe: new Decimal(0),
	shovel: new Decimal(0),
	pick: new Decimal(0),
	backpack: new Decimal(0),
	map: new Decimal(0),
	// Inventory
	balls: new Decimal(0),
	cards: new Decimal(0),
	wood: new Decimal(0),
	// Money
	copper: new Decimal(0),
}}


// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
