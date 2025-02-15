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
