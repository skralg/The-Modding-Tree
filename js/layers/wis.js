addLayer("wis",{
    name: "Wisdom",
    symbol: "WIS",
    row: 3,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "green",
    requires: new Decimal(0),
    resource: "Wisdom Points",
    type: "none",
    layerShown() { return (player[this.layer].points == 0) ? false : true },
    upgrades: {
    },
    clickables: {
    },
    buyables: {
    },
    infoboxes: {
    },
    tabFormat: [
        ["infobox", "top"],
        "main-display",
        "blank",
        ["bar", "b1"],
        "blank",
        "clickables",
        "milestones",
    ],
})
