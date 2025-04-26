function abilityModifier(points) {
    if (points == 0 || points == 1) return -5;
    if (points == 2 || points == 3) return -4;
    if (points == 4 || points == 5) return -3;
    if (points == 6 || points == 7) return -2;
    if (points == 8 || points == 9) return -1;
    if (points == 10 || points == 11) return 0;
    if (points == 12 || points == 13) return 1;
    if (points == 14 || points == 15) return 2;
    if (points == 16 || points == 17) return 3;
    if (points == 18 || points == 19) return 4;
    if (points == 20 || points == 21) return 5;
    if (points == 22 || points == 23) return 6;
    if (points == 24 || points == 25) return 7;
    if (points == 26 || points == 27) return 8;
    if (points == 28 || points == 29) return 9;
    if (points == 30) return 10;
}

addLayer("c",{
    name: "Character",
    symbol: "C",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
    }},
    color: "gray",
    requires: new Decimal(0),
    resource: "Ability Points",
    type: "none",
    layerShown: true,
    componentStyles: {
        clickable: {'border-radius': '10%'},
        microtabs: {'align-self': 'flex-start', 'margin': '5px', 'border-width': '0px'},
    },
    shouldNotify() {
        // No points, no notify
        if (player.c.points.eq(0)) return false;
        // If we have points, and locked abilities, notify
        if (player.str.points.eq(0)) return true;
        if (player.dex.points.eq(0)) return true;
        if (player.con.points.eq(0)) return true;
        if (player.int.points.eq(0)) return true;
        if (player.wis.points.eq(0)) return true;
        if (player.cha.points.eq(0)) return true;
    },
    upgrades: {
    },
    clickables: {
        cheat1: {
            title: "Cheat+1",
            display: "<br>Add 1 Ability point<br><br>",
            canClick: true,
            onClick() { player[this.layer].points = player[this.layer].points.add(1) },
        },
        cheat10: {
            title: "Cheat*10",
            display: "<br>Multiply Ability points by 10",
            canClick: true,
            onClick() { player[this.layer].points = player[this.layer].points.mul(10) },
        },
        STR: {
            title: "Get Strong",
            display() {
                if (player.str.points.gt(0)) return '<br><br>Strength Training Unlocked!<br><br><br>'
                return '<br>Unlock Training: <b>Strength</b><br><br>Cost: 1 Ability Point'
            },
            style: {'margin': '5px'},
            canClick() { return player.str.points.eq(0) },
            onClick() {
                player.str.points = new Decimal(1)
                player.c.points = player.c.points.sub(1)
            },
        },
        DEX: {
            title: "Get Fast",
            display() {
                if (player.dex.points.gt(0)) return '<br><br>Dexterity Training Unlocked!<br><br><br>'
                return '<br>Unlock Training: <b>Dexterity</b><br><br>Cost: 1 Ability Point'
            },
            style: {'margin': '5px'},
            canClick() { return player.dex.points.eq(0) },
            onClick() {
                player.dex.points = new Decimal(1)
                player.c.points = player.c.points.sub(1)
            },
        },
        CON: {
            title: "Get Tough",
            display() {
                if (player.con.points.gt(0)) return '<br><br>Constitution Training Unlocked!<br><br><br>'
                return '<br>Unlock Training: <b>Constitution</b><br><br>Cost: 1 Ability Point'
            },
            style: {'margin': '5px'},
            canClick() { return player.con.points.eq(0) },
            onClick() {
                player.con.points = new Decimal(1)
                player.c.points = player.c.points.sub(1)
            },
        },
        INT: {
            title: "Get Smart",
            display() {
                if (player.int.points.gt(0)) return '<br><br>Intelligence Training Unlocked!<br><br><br>'
                return '<br>Unlock Training: <b>Intelligence</b><br><br>Cost: 1 Ability Point'
            },
            style: {'margin': '5px'},
            canClick() { return player.int.points.eq(0) },
            onClick() {
                player.int.points = new Decimal(1)
                player.c.points = player.c.points.sub(1)
            },
        },
        WIS: {
            title: "Get Wise",
            display() {
                if (player.wis.points.gt(0)) return '<br><br>Wisdom Training Unlocked!<br><br><br>'
                return '<br>Unlock Training: <b>Wisdom</b><br><br>Cost: 1 Ability Point'
            },
            style: {'margin': '5px'},
            canClick() { return player.wis.points.eq(0) },
            onClick() {
                player.wis.points = new Decimal(1)
                player.c.points = player.c.points.sub(1)
            },
        },
        CHA: {
            title: "Get Nice",
            display() {
                if (player.cha.points.gt(0)) return '<br><br>Charisma Training Unlocked!<br><br><br>'
                return '<br>Unlock Training: <b>Charisma</b><br><br>Cost: 1 Ability Point'
            },
            style: {'margin': '5px'},
            canClick() { return player.cha.points.eq(0) },
            onClick() {
                player.cha.points = new Decimal(1)
                player.c.points = player.c.points.sub(1)
            },
        },
        Strength: {
            title: 'Strength',
            tooltip: 'Ability Modifier boxed, Ability Score circled',
            style: {'background-color': '#c0c0c0', 'width': '150px'},
            display() {
                pts = player.str.points
                mod = abilityModifier(pts)
                if (mod < 0) {sign = ''} else {sign = '+'}
                return '<div class="attrMod">' + sign + mod + '</div>' +
                       '<div class="attrPts">' + pts + '</div>'
            },
        },
        Dexterity: {
            title: 'Dexterity',
            tooltip: 'Ability Modifier boxed, Ability Score circled',
            style: {'background-color': '#c0c0c0', 'width': '150px'},
            display() {
                pts = player.dex.points
                mod = abilityModifier(pts)
                if (mod < 0) {sign = ''} else {sign = '+'}
                return '<div class="attrMod">' + sign + mod + '</div>' +
                       '<div class="attrPts">' + pts + '</div>'
            },
        },
        Constitution: {
            title: 'Constitution',
            tooltip: 'Ability Modifier boxed, Ability Score circled',
            style: {'background-color': '#c0c0c0', 'width': '150px'},
            display() {
                pts = player.con.points
                mod = abilityModifier(pts)
                if (mod < 0) {sign = ''} else {sign = '+'}
                return '<div class="attrMod">' + sign + mod + '</div>' +
                       '<div class="attrPts">' + pts + '</div>'
            },
        },
        Intelligence: {
            title: 'Intelligence',
            tooltip: 'Ability Modifier boxed, Ability Score circled',
            style: {'background-color': '#c0c0c0', 'width': '150px'},
            display() {
                pts = player.int.points
                mod = abilityModifier(pts)
                if (mod < 0) {sign = ''} else {sign = '+'}
                return '<div class="attrMod">' + sign + mod + '</div>' +
                       '<div class="attrPts">' + pts + '</div>'
            },
        },
        Wisdom: {
            title: 'Wisdom',
            tooltip: 'Ability Modifier boxed, Ability Score circled',
            style: {'background-color': '#c0c0c0', 'width': '150px'},
            display() {
                pts = player.wis.points
                mod = abilityModifier(pts)
                if (mod < 0) {sign = ''} else {sign = '+'}
                return '<div class="attrMod">' + sign + mod + '</div>' +
                       '<div class="attrPts">' + pts + '</div>'
            },
        },
        Charisma: {
            title: 'Charisma',
            tooltip: 'Ability Modifier boxed, Ability Score circled',
            style: {'background-color': '#c0c0c0', 'width': '150px'},
            display() {
                pts = player.cha.points
                mod = abilityModifier(pts)
                if (mod < 0) {sign = ''} else {sign = '+'}
                return '<div class="attrMod">' + sign + mod + '</div>' +
                       '<div class="attrPts">' + pts + '</div>'
            },
        },
    },
    buyables: {
    },
    infoboxes: {
    },
    branches() {
        return [
            ["str", player.str.rgb.branchcolor()],
            ["dex", player.dex.rgb.branchcolor()],
            ["con", player.con.rgb.branchcolor()],
            ["int", player.int.rgb.branchcolor()],
            ["wis", player.wis.rgb.branchcolor()],
            ["cha", player.cha.rgb.branchcolor()],
            ["e", "white"]
        ]
    },
    microtabs: {
        tabs: {
            'Character': {
                shouldNotify() { return player.c.points.gt(0) },
                prestigeNotify() { return player.c.points.gt(0) },
                glowColor: 'green',
                content: [
                    ['row', [['clickable', 'STR'], ['clickable', 'DEX'], ['clickable', 'CON']]],
                    ['row', [['clickable', 'INT'], ['clickable', 'WIS'], ['clickable', 'CHA']]],
                    'h-line',
                    ['row', [['clickable', 'cheat1'], ['clickable', 'cheat10']]],
                ],
            },
            'STR': {
                buttonStyle: {'background-color': '#ff0000'},
                unlocked() { return player.str.points.gt(0) },
                embedLayer: 'str',
            },
            'DEX': {
                buttonStyle: {'background-color': '#ffa500', 'color': 'black'},
                unlocked() { return player.dex.points.gt(0) },
                embedLayer: 'dex',
            },
            'CON': {
                buttonStyle: {'background-color': '#ffff00', 'color': 'black'},
                unlocked() { return player.con.points.gt(0) },
                embedLayer: 'con',
            },
            'INT': {
                buttonStyle: {'background-color': '#0000ff'},
                unlocked() { return player.int.points.gt(0) },
                embedLayer: 'int',
            },
            'WIS': {
                buttonStyle: {'background-color': '#007f00'},
                unlocked() { return player.wis.points.gt(0) },
                embedLayer: 'wis',
            },
            'CHA': {
                buttonStyle: {'background-color': '#7f007f'},
                unlocked() { return player.cha.points.gt(0) },
                embedLayer: 'cha',
            },
        },
    },
    tabFormat: [
        'main-display',
        ['row', [
            ['clickable', 'Strength'],
            ['clickable', 'Dexterity'],
            ['clickable', 'Constitution'],
            ['clickable', 'Intelligence'],
            ['clickable', 'Wisdom'],
            ['clickable', 'Charisma'],
        ]],
        ['microtabs', 'tabs']
    ],
})


addLayer("e", {
    name: "Equipment",
    symbol: "E",
    row: 0,
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#3333FF",
    requires: new Decimal(0),
    resource: "Equipment Rating",
    type: "none",
    layerShown() { return player.str.points.gte(2) },
    upgrades: {
    },
    clickables: {
        11: {
            title: "Head",
            display() { return "<br>Level " + player.head },
            canClick: false,
            style: {'background-color': 'gray'},
        },
        21: {
            title: "Shoulders",
            display() { return "<br>Level " + player.shoulders },
            style: {'background-color': 'gray'},
        },
        23: {
            title: "Neck",
            display() { return "<br>Level " + player.neck },
            style: {'background-color': 'gray'},
        },
        31: {
            title: "Arms",
            display() { return "<br>Level " + player.arms },
            style: {'background-color': 'gray'},
        },
        32: {
            title: "Body",
            display() { return "<br>Level " + player.body },
            style: {'background-color': 'gray'},
        },
        33: {
           title: "Ring",
           display() { return "<br>Level " + player.ring },
           style: {'background-color': 'gray'},
        },
        51: {
            title: "Weapon",
            display() { return "<br>Level " + player.weapon },
            style: {'background-color': 'gray'},
        },
        52: {
            title: "Hands",
            display() { return "<br>Level " + player.hands },
            style: {'background-color': 'gray'},
        },
        53: {
            title: "Waist",
            display() { return "<br>Level " + player.waist },
            style: {'background-color': 'gray'},
        },
        54: {
            title: "Shield",
            display() { return "<br>Level " + player.shield },
            style: {'background-color': 'gray'},
        },
        61: {
            title: "Legs",
            display() { return "<br>Level " + player.legs },
            style: {'background-color': 'gray'},
        },
        71: {
            title: "Feet",
            display() { return "<br>Level " + player.feet },
            style: {'background-color': 'gray'},
        },
        81: {
            title: "Axe",
            display() { return "<br>Level " + player.axe },
            style: {'background-color': 'gray'},
        },
    },
    buyables: {
    },
    infoboxes: {
    },
    branches: [
        ["i", "white"]
    ],
})

addLayer("i",{
    name: "Inventory",
    symbol: "I",
    row: 0,
    position: 2,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        inventory: {
            // misc
        }
    }},
    color: "white",
    requires: new Decimal(0),
    resource: "Extra Backpack Slots",
    type: "none",
    layerShown() { return player.str.points.gte(3) },
    upgrades: {
    },
    clickables: {
        11: {
            title() { return "<h2>Wood</h2>" },
            display() { return '<h2>' + player.wood + '</h2>'},
            canClick: false,
            style: {'background-color': 'saddlebrown'},
        },
    },
    buyables: {
    },
    infoboxes: {
    },
})

addLayer("pve", {
    name: "Training Ground", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PvE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    // color: "#4BDC13",
    color: "#4B4B4B",
    requires: new Decimal(0), // new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Kills", // Name of prestige currency
    //baseResource: "Dagger Stabs", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "T", description: "T: Click for 1 Dagger Stab", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return false},
    upgrades: {
        11: {
            title: "Upgrade Dagger",
            description: "Upgrade your little dagger to something a bit better",
            cost: new Decimal(1),
        },
    },
    clickables: {
        11: {
            title: "Attack",
            tooltip: "Attack: Wooden Dummy",
            display() {
                st = getClickableState(this.layer, this.id)
                if (typeof(st) == 'undefined' || st == '') {
                    setClickableState(this.layer, this.id, 0)
                    st = 0
                }
                return "Wooden Dummy<br><i>" + st + " kills</i>"
            },
            canClick() {return true},
            onClick() {
                st = getClickableState(this.layer, this.id)
                setClickableState(this.layer, this.id, st + 1)
                player[this.layer].points = player[this.layer].points.add(1)
                player.points = player.points.add(1)
            },
            branches: [[12,"#4B4B4B"]],
        },
        12: {
            title: "Attack",
            tooltip: "Attack: Small Rat",
            display() {
                st = getClickableState(this.layer, this.id)
                if (typeof(st) == 'undefined' || st == '') {
                    setClickableState(this.layer, this.id, 0)
                    st = 0
                }
                return "Small Rat<br><i>" + st + " kills</i>"
            },
            canClick() {return true},
            onClick() {
                st = getClickableState(this.layer, this.id)
                setClickableState(this.layer, this.id, st + 1)
                player[this.layer].points = player[this.layer].points.add(1)
                player.points = player.points.add(1)
                return 0
            },
        },
    },
    buyables: {
        11: {
            title: 'Buy some armor',
            cost(x) { return new Decimal(1).mul(x) },
            display() { return 'Armor Level: ' + getBuyableAmount(this.layer, this.id) + ' for ' + this.cost() },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    infoboxes: {
        training: {
            title: 'The Training Yard',
            body: "Level up your character through combat!",
        },
    },
    bars: {
        bigBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            display: "Wooden Dummy",
            fillStyle: "solid",
            progress() { return .50 },
            unlocked() { return true },
        },
    },
})

addLayer("pvp", {
    name: "Training Ground Version 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PvP", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    // color: "#4BDC13",
    color: "#4B4B4B",
    requires: new Decimal(0), // new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Kills", // Name of prestige currency
    //baseResource: "Dagger Stabs", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "T", description: "T: Click for 1 Dagger Stab", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return false},
    upgrades: {
        11: {
            title: "Upgrade Dagger",
            description: "Upgrade your little dagger to something a bit better",
            cost: new Decimal(1),
        },
    },
    clickables: {
        wd: {
            title: "Attack",
            tooltip: "Attack: Wooden Dummy",
            display() {
                st = getClickableState(this.layer, this.id)
                if (typeof(st) == 'undefined' || st == '') {
                    setClickableState(this.layer, this.id, 0)
                    st = 0
                }
                return "Wooden Dummy<br><i>" + st + " kills</i>"
            },
            canClick() {return true},
            onClick() {
                st = getClickableState(this.layer, this.id)
                setClickableState(this.layer, this.id, st + 1)
                player[this.layer].points = player[this.layer].points.add(1)
                player.points = player.points.add(1)
            },
            branches: [[12,"#4B4B4B"]],
        },
        sr: {
            title: "Attack",
            tooltip: "Attack: Small Rat",
            display() {
                st = getClickableState(this.layer, this.id)
                if (typeof(st) == 'undefined' || st == '') {
                    setClickableState(this.layer, this.id, 0)
                    st = 0
                }
                return "Small Rat<br><i>" + st + " kills</i>"
            },
            canClick() {return true},
            onClick() {
                st = getClickableState(this.layer, this.id)
                setClickableState(this.layer, this.id, st + 1)
                player[this.layer].points = player[this.layer].points.add(1)
                player.points = player.points.add(1)
                return 0
            },
        },
    },
    buyables: {
        11: {
            title: 'Buy some armor',
            cost(x) { return new Decimal(1).mul(x) },
            display() { return 'Armor Level: ' + getBuyableAmount(this.layer, this.id) + ' for ' + this.cost() },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    infoboxes: {
        training: {
            title: 'The Training Yard Version 2<br>using progress bars!',
            body: "Level up your character through combat!",
        },
    },
    bars: {
        wd: {
            direction: RIGHT,
            width: 110,
            height: 10,
            // display: "Wooden Dummy",
            fillStyle: {'background-color' : "#FF0000"},
            baseStyle: {'background-color' : "#969696"},
            textStyle: {'color': '#04e050'},
            borderStyle: {'border-width': '1px', 'border-color': 'black'},
            progress() { return .50 },
            unlocked() { return true },
        },
    },
    tabFormat: [
        ["infobox", "training"],
        "main-display",
        "h-line",
        [
            "row",
            [
                [
                    "column",
                    [
                        ["clickable", "wd"],
                        ["bar", "wd"],
                    ],
                ],
                "blank",
                [
                    "column",
                    [
                        ["clickable", "sr"],
                    ],
                ],
            ],
        ],
    ],
})

addLayer("q", {
    name: "Quests",
    symbol: "Q",
    row: 1,
    position: 5,
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#ccccff",
    resource: "Fame",
    type: "none",
    layerShown() { return player.int.points.gte(3) },
    infoboxes: {
        quests: {
            title: 'Quest Log and Status',
            body: "Quests are one of the ways to make the numbers go up.",
        },
    },
    challenges: {
        11: {
            name() {
                return 'Gear up ' + challengeCompletions(this.layer, 11) + '/10';
            },
            completionLimit: 10,
            challengeDescription() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return 'We have to figure out how to get some wood, so we can build things.<br>';

                return 'Challenge ' + (completes + 1) + ' has not been developed yet';
            },
            goalDescription() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return  'Find an axe<br>';

                return 'Goal ' + (completes + 1) + ' is not implemented';
            },
            rewardDescription() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return 'The STR ability to chop down trees to obtain wood.';

                return 'Reward ' + (completes + 1) + ' is not implemented';
            },
            canComplete() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return hasUpgrade('m', 31);

                return false;
            },
            onComplete() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 1) return player.axe.eq(1);

                alert('Q layer challenge 11 completion ' + completes + ' has no onComplete()!');
            },
        },
    },
    tabFormat: [
        'main-display',
        ['infobox', 'quests'],
        'challenges',
    ],
    branches() {return [["m", "white"]]},
})
