addLayer("con",{
    name: "Constitution",
    symbol: "CON",
    row: 2,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "Yellow",
    requires: new Decimal(0),
    resource: "Constitution Points",
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
