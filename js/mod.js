let modInfo = {
	name: "The RPG Tree",
	author: "simple",
	pointsName: "levels",
	modFiles: [
		"layers.js", "tree.js",
		"layers/str.js", "layers/dex.js", "layers/con.js",
		"layers/int.js", "layers/wis.js", "layers/cha.js",
		"layers/map.js"
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
	head: 0,
	shoulders: 0,
	neck: 0,
	arms: 0,
	hands: 0,
	ring: 0,
	body: 0,
	waist: 0,
	legs: 0,
	feet: 0,
	weapon: 0,
	shield: 0,
	// equipment: tools
	axe: 0,
	pick: 0,
	backpack: 0,
	map: 0,
	// Inventory
	balls: 0,
	cards: 0,
	wood: 0,
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
