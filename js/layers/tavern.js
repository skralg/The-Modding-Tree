addLayer('t', {
    name: "Tavern",
    symbol: "T",
    row: -1,
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
            rat_kills: new Decimal(0),
            maxPoints: new Decimal(10),
            cost: new Decimal(0),
        },
    }},
    color: 'green',
    requires: new Decimal(0),
    resource: "Tavern Points",
    type: "none",
    layerShown() { return hasUpgrade('m', 11) },
    infoboxes: {
        tavern: {
            title: 'Tavern',
            body() {
                var flavor = "The tavern is a place to rest and recover. You can spend time here to gain strength and stamina.";
                if (player.t.tavern.rat_count.gt(0)) {
                    flavor += "<br><br>You currently have " + format(player.t.tavern.rat_count, 0) + " rats in the basement!<br>" +
                              "Defeat them by clicking the tavern clickable.<br>" +
                              "You have defeated " + format(player.t.tavern.rat_kills, 0) + " rats so far.";
                }
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
                if (player.t.tavern.rat_count.gt(0)) {
                    player.t.tavern.rat_count = player.t.tavern.rat_count.sub(1);
                    player.str.currAdd(new Decimal(1));
                    player.t.tavern.rat_kills = player.t.tavern.rat_kills.add(1);
                }
            }
        }
    },
    update(diff) {
        if (player.t.tavern.points.gte(player.t.tavern.maxPoints)) {
            player.t.tavern.unlocked = true;
        }
    },
    layerData() {
        return {
            unlocked: player.t.tavern.unlocked,
            points: player.t.points,
        }
    },
    tabFormat: {
        "Tavern": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["infobox", "tavern"],
                "clickables",
            ],
        },
    },
});
