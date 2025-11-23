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
            maxPoints: new Decimal(10),
            cost: new Decimal(0),
        },
    }},
    color: 'green',
    requires: new Decimal(0),
    resource: "Tavern Points",
    type: "none",
    layerShown: false,
    infoboxes: {
        tavern: {
            title: 'Tavern',
            body() {
                return "The tavern is a place to rest and recover. You can spend time here to gain strength and stamina.";
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
                ["clickable", 11],
            ],
        },
    },
});
