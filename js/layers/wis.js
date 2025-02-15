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
    layerShown() {
        if (player[this.layer].points == 0) {
            return false
        }
        return true
    },
    upgrades: {
    },
    clickables: {
    },
    buyables: {
    },
    infoboxes: {
    },
})
