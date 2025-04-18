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
    resource: "Hit Points",
    type: "none",
    layerShown() { return true},
    upgrades: {
    },
    clickables: {
        11: {
            title: "Cheat+1",
            display() { return "Add 1 point" },
            canClick: true,
            onClick() { player[this.layer].points = player[this.layer].points.add(1) },
        },
        12: {
            title: "Cheat*10",
            display() { return "10x points" },
            canClick() { return true },
            onClick() { player[this.layer].points = player[this.layer].points.mul(10) },
        },
        21: {
            title: "Get Strong",
            display: "Strength Training",
            style() {
                return {'background-color': 'red'}
            },
            unlocked() {
                if (player["str"].points.eq(0)) {
                    return true
                }
                return false
            },
            canClick() {
                if (player["str"].points == 0 && player[this.layer].points.gt(0)) {
                    return true
                }
                return false
            },
            onClick() {
                player["str"].points = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(1)
            },
        },
        22: {
            title: "Get Fast",
            display: "Dexterity Training",
            style() {
                return {'background-color': 'orange'}
            },
            unlocked() {
                if (player["dex"].points.eq(0)) {
                    return true
                }
                return false
            },
            canClick() {
                if (player["dex"].points.eq(0) && player[this.layer].points.gt(0)) {
                    return true
                }
                return false
            },
            onClick() {
                player["dex"].points = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(1)
            },
        },
        31: {
            title: "Get Tough",
            display: "Constitution Training",
            style() {
                return {'background-color': 'yellow'}
            },
            unlocked() {
                if (player["con"].points.eq(0)) {
                    return true
                }
                return false
            },
            canClick() {
                if (player["con"].points.eq(0) && player[this.layer].points.gt(0)) {
                    return true
                }
                return false
            },
            onClick() {
                player["con"].points = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(1)
            },
        },
        32: {
            title: "Get Smart",
            display: "Intelligence Training",
            style() {
                return {'background-color': 'lightblue'}
            },
            unlocked() {
                if (player["int"].points.eq(0)) {
                    return true
                }
                return false
            },
            canClick() {
                if (player["int"].points.eq(0) && player[this.layer].points.gt(0)) {
                    return true
                }
                return false
            },
            onClick() {
                player["int"].points = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(1)
            },
        },
        41: {
            title: "Get Wise",
            display: "Wisdom Training",
            style() {
                return {'background-color': 'green'}
            },
            unlocked() {
                if (player["wis"].points.eq(0)) {
                    return true
                }
                return false
            },
            canClick() {
                if (player["wis"].points.eq(0) && player[this.layer].points.gt(0)) {
                    return true
                }
                return false
            },
            onClick() {
                player["wis"].points = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(1)
            },
        },
        42: {
            title: "Get Nice",
            display: "Charisma Training",
            style() {
                return {'background-color': 'purple'}
            },
            unlocked() {
                if (player["cha"].points.eq(0)) {
                    return true
                }
                return false
            },
            canClick() {
                if (player["cha"].points.eq(0) && player[this.layer].points.gt(0)) {
                    return true
                }
                return false
            },
            onClick() {
                player["cha"].points = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(1)
            },
        },
    },
    buyables: {
    },
    infoboxes: {
    },
    branches() {
        return [
            ["str", player["str"].rgb.branchcolor()],
            ["dex", player["dex"].rgb.branchcolor()],
            ["con", player["con"].rgb.branchcolor()],
            ["int", player["int"].rgb.branchcolor()],
            ["wis", player["wis"].rgb.branchcolor()],
            ["cha", player["cha"].rgb.branchcolor()],
            ["e", "white"]
        ]
    },
})

addLayer("e", {
    name: "Equipment",
    symbol: "E",
    row: 0,
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        equipment: {
            // armor
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
            // tools
            axe: 0,
            pick: 0,
        }
    }},
    color: "#3333FF",
    requires: new Decimal(0),
    resource: "Weight Allowance",
    type: "none",
    layerShown() {return true},
    upgrades: {
    },
    clickables: {
        11: {
            title: "Head",
            display() { return "<br>Level " + player[this.layer].equipment.head },
            canClick: false,
            style: {'background-color': 'gray'},
        },
        21: {
            title: "Shoulders",
            display() { return "<br>Level " + player[this.layer].equipment.shoulders },
            style: {'background-color': 'gray'},
        },
        23: {
            title: "Neck",
            display() { return "<br>Level " + player[this.layer].equipment.neck },
            style: {'background-color': 'gray'},
        },
        31: {
            title: "Arms",
            display() { return "<br>Level " + player[this.layer].equipment.arms },
            style: {'background-color': 'gray'},
        },
        32: {
            title: "Body",
            display() { return "<br>Level " + player[this.layer].equipment.body },
            style: {'background-color': 'gray'},
        },
        33: {
           title: "Ring",
           display() { return "<br>Level " + player[this.layer].equipment.ring },
           style: {'background-color': 'gray'},
        },
        51: {
            title: "Weapon",
            display() { return "<br>Level " + player[this.layer].equipment.weapon },
            style: {'background-color': 'gray'},
        },
        52: {
            title: "Hands",
            display() { return "<br>Level " + player[this.layer].equipment.hands },
            style: {'background-color': 'gray'},
        },
        53: {
            title: "Waist",
            display() { return "<br>Level " + player[this.layer].equipment.waist },
            style: {'background-color': 'gray'},
        },
        54: {
            title: "Shield",
            display() { return "<br>Level " + player[this.layer].equipment.shield },
            style: {'background-color': 'gray'},
        },
        61: {
            title: "Legs",
            display() { return "<br>Level " + player[this.layer].equipment.legs },
            style: {'background-color': 'gray'},
        },
        71: {
            title: "Feet",
            display() { return "<br>Level " + player[this.layer].equipment.feet },
            style: {'background-color': 'gray'},
        },
        81: {
            title: "Axe",
            display() { return "<br>Level " + player[this.layer].equipment.axe },
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
            balls: 0,
            cards: 0,
            wood: 0,
        }
    }},
    color: "white",
    requires: new Decimal(0),
    resource: "Extra Backpack Slots",
    type: "none",
    layerShown: true,
    upgrades: {
    },
    clickables: {
        11: {
            title() { return "<h2>Wood</h2>" },
            display() { return '<h2>' + player[this.layer].inventory.wood + '</h2>'},
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
    layerShown() {return true},
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
    layerShown() {return true},
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
    row: 0,
    position: 3,
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#ccccff",
    resource: "Fame",
    type: "none",
    layerShown() { return true },
    infoboxes: {
        quests: {
            title: 'Quest Log and Status',
            body: "Quests are one of the ways to make the numbers go up.<br>TODO: Lock questing behind ... something.",
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
                if (completes == 0) return player['e'].equipment.axe = 1;

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
