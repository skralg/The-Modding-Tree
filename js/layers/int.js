addLayer("int",{
    name: "Intelligence",
    symbol: "INT",
    row: 2,
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "lightblue",
    requires: new Decimal(0),
    resource: "Intelligence Points",
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
