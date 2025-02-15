addLayer("dex",{
    name: "Dexterity",
    symbol: "DEX",
    row: 1,
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        // Current and Target for point skillup
        current: new Decimal(0),
        target: new Decimal(10),
    }},
    color: "orange",
    requires: new Decimal(0),
    resource: "Dexterity Points",
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
        11: {
            title: "Stretching",
            display: "Warm-up time",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].current = player[this.layer].current.add(click_value)
                c = player[this.layer].current
                t = player[this.layer].target
                if (c.gte(t)) {
                    player[this.layer].current = new Decimal(0)
                    player[this.layer].points = player[this.layer].points.add(1)
                    player[this.layer].target = player[this.layer].target.mul(10)
                }
            },
        },
        12: {
            title: "Somersaults",
            display: "Wheee!",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].current = player[this.layer].current.add(click_value)
                c = player[this.layer].current
                t = player[this.layer].target
                if (c.gte(t)) {
                    player[this.layer].current = new Decimal(0)
                    player[this.layer].points = player[this.layer].points.add(1)
                    player[this.layer].target = player[this.layer].target.mul(10)
                }
            },
        },
        21: {
            title: "Juggle",
            display: "<br>Requiresjuggling balls",
            canClick() {
                if (player['i']['inventory']['balls'] > 0) {
                    return true
                }
                return false
            },
        },
        22: {
            title: "Card Tricks",
            display: "<br>Requires a deck of cards",
            canClick() {
                if (player['i']['inventory']['cards'] > 0) {
                    return true
                }
                return false
            },
        },
    },
    buyables: {
    },
    infoboxes: {
        top: {
            title: "Dexterity Training",
            body: "Let's get nimble!",
        }
    },
    bars: {
        b1: {
            direction: RIGHT,
            width: 500,
            height: 16,
            fillStyle: {'background-color': 'red'},
            progress() {
                c = player[this.layer].current
                t = player[this.layer].target
                return c / t
            },
            unlocked: true,
            display() {
                c = player[this.layer].current
                t = player[this.layer].target
                return c + " / " + t
            },
        },
    },
    tabFormat: [
        ["infobox", "top"],
        "main-display",
        "blank",
        ["bar", "b1"],
        "blank",
        "clickables",
    ],
})
