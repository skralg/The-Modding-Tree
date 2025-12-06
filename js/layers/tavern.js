addLayer('t', {
    name: "Tavern",
    symbol: "T",
    row: 0,
    position: 0,
    prevTab: 'm',
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        // Tavern
        tavern: {
            unlocked: false,
            points: new Decimal(0),
            rat_count: new Decimal(0),
            rat_hp: 4,
            rat_kills: 0,
            rat_meat: new Decimal(0),
            rat_teeth: new Decimal(0),
            rat_claws: new Decimal(0),
            rat_tails: new Decimal(0),
            attack_result: "",
            staff: {
                bartender: false,
                barmaid: false,
                barback: false,
                cook: false,
                stablehand: false,
                dishwasher: false,
                count() {
                    let total = 0;
                    if (this.bartender) total += 1;
                    if (this.barmaid) total += 1;
                    if (this.barback) total += 1;
                    if (this.cook) total += 1;
                    if (this.stablehand) total += 1;
                    if (this.dishwasher) total += 1;
                    return total;
                }
            },
            maxPoints: new Decimal(10),
            cost: new Decimal(0),
            hearth: new Decimal(50),
        },
    }},
    color: 'green',
    requires: new Decimal(0),
    resource: "Tavern Points",
    type: "none",
    layerData() {
        return {
            unlocked: player.t.tavern.unlocked,
            points: player.t.points,
        }
    },
    layerShown() { return false; }, //{ return hasUpgrade('m', 11) },
    update(diff) {
        //console.log("diff: " + diff);
        if (player.t.tavern.points.gte(player.t.tavern.maxPoints)) {
            player.t.tavern.unlocked = true;
        }

        // Calculate rat growth
        let rat_gain = .1 * diff; // minimum rat growth per 50 ticks
        let rat_max = 50; // maximum rats allowed
        //console.log("rat count: " + player.t.tavern.rat_count.toString());
        if (player.t.tavern.rat_count.lt(rat_max)) {
            player.t.tavern.rat_count = player.t.tavern.rat_count.add(rat_gain);
         } else {
            player.t.tavern.rat_count = new Decimal(rat_max);
        }
    },
    infoboxes: {
        tavern: {
            title: 'Tavern',
            body() {
                var flavor = "The tavern is a place to rest and recover. You can spend time here to gain strength and stamina.<br>";
                flavor += "<br>You have " + player.t.tavern.staff.count() + " staff members working in the tavern.<br>";
                if (player.t.tavern.rat_count.gt(0)) {
                    flavor += "<br>You currently have " + format(player.t.tavern.rat_count, 3) + " rats in the basement!<br>" +
                              "Defeat them by clicking the tavern clickable.<br>" +
                              "You have defeated " + format(player.t.tavern.rat_kills, 0) + " rats so far.";
                }
                if (player.t.tavern.rat_meat.gt(0)) { flavor += "<br>You have " + format(player.t.tavern.rat_meat, 0) + " rat meat.<br>"; }
                if (player.t.tavern.rat_teeth.gt(0)) { flavor += "<br>You have " + format(player.t.tavern.rat_teeth, 0) + " rat teeth.<br>"; }
                if (player.t.tavern.rat_claws.gt(0)) { flavor += "<br>You have " + format(player.t.tavern.rat_claws, 0) + " rat claws.<br>"; }
                if (player.t.tavern.rat_tails.gt(0)) { flavor += "<br>You have " + format(player.t.tavern.rat_tails, 0) + " rat tails.<br>"; }
                if (player.t.tavern.attack_result != "") { flavor += "<br><br>Attack result: " + player.t.tavern.attack_result; }
                return flavor;
            },
        },
    },
    clickables: {
        11: {
            title: "Tavern",
            display() {
                return "<br>Spend time in the tavern<br>" +
                    "Spend " + format(player.t.tavern.cost) + " points to gain " + format(player.t.tavern.points) + " points<br>" +
                    "You have " + format(player.t.tavern.points) + "/" + format(player.t.tavern.maxPoints) + " points<br>";
            },
            canClick() { return player.t.tavern.unlocked },
            onClick() {
                if (player.t.points.gte(player.t.tavern.cost)) {
                    player.t.points = player.t.points.sub(player.t.tavern.cost);
                    player.t.tavern.points = player.t.tavern.points.add(1);
                }
            },
        },
        12: {
            title: "Defeat Rats",
            unlocked() { return player.t.tavern.rat_count.gt(0) },
            display() {
                return "<br>Defeat rats in the tavern basement<br>" +
                    "You have " + format(player.t.tavern.rat_count, 0) + " rats to defeat.<br>" +
                    "Each click defeats 1 rat and grants 1 Strength point.<br>";
            },
            canClick() { return player.t.tavern.rat_count.gt(0) },
            onClick() {
                // Roll to see if we hit the rat using our current ability scores
                // A rat is AC 10, so we need to roll at least 10 to hit
                if (diceRoll(20) >= 10) {
                    player.t.tavern.attack_result = "Hit!";
                    // Calculate damage based on our current strength
                    damage = diceRoll(player.str.points.add(1)) + 1;
                } else {
                    player.t.tavern.attack_result = "Miss!";
                }
                player.t.tavern.rat_count = player.t.tavern.rat_count.sub(1);
                player.str.currAdd(new Decimal(1));
                player.t.tavern.rat_kills += 1;
            }
        },
        13: {
            title: "DEV: Hearth +1",
            onClick() {
                player.t.tavern.hearth = player.t.tavern.hearth.add(1);
            },
            canClick: true,
        },
        14: {
            title: "DEV: Rat +1",
            onClick() {
                player.t.tavern.rat_count = player.t.tavern.rat_count.add(1);
            },
            canClick: true,
        }
    },
    bars: {
        hearth: {
            direction: RIGHT,
            width: 500,
            height: 16,
            progress() { return player.t.tavern.hearth.div(100) },
            display() { return "Hearth Warmth: " + format(player.t.tavern.hearth, 1) + "%" },
            unlocked() { return true; },
            fillStyle() { return {'background-color': 'orange'} },
        },
        cleanliness: {
            direction: RIGHT,
            width: 500,
            height: 16,
            progress() {
                cleanliness = new Decimal(100).sub(player.t.tavern.rat_count.times(10));
                if (cleanliness.lt(0)) cleanliness = new Decimal(0);
                return cleanliness.div(100);
            },
            display() { return "Cleanliness: " + format(this.progress(), 1) + "%" },
            unlocked() { return true; },
            fillStyle() { return {'background-color': 'brown'} },
        },
    },
    tabFormat: [
        //"main-display",
        "blank",
        ["infobox", "tavern"],
        "blank",
        ["bar", "hearth"],
        ["bar", "cleanliness"],
        "blank",
        "clickables",
    ],
});
