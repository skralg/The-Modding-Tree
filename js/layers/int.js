addLayer("int",{
    name: "Intelligence",
    symbol: "INT",
    row: 2,
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        // Current and Target for point skillup
        current: new Decimal(0),
        target: new Decimal(10),
        // Convenience functions
        currAdd(x) {
            this.current = this.current.plus(x)
            c = this.current
            t = this.target
            if (c.gte(t)) {
                this.current = new Decimal(0)
                this.points = this.points.plus(1)
                this.target = this.target.times(10)
            }
        },
    }},
    color: "lightblue",
    requires: new Decimal(0),
    resource: "Intelligence Points",
    type: "none",
    layerShown() { return (player[this.layer].points == 0) ? false : true },
    upgrades: {
    },
    clickables: {
        11: {
            title: "Meditate",
            display: "<br>Relax",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].currAdd(click_value)
            },
        },
    },
    buyables: {
    },
    infoboxes: {
    },
    bars: {
        b1: {
            direction: RIGHT,
            width: 500,
            height: 16,
            fillStyle: {'background-color': 'lightblue'},
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
        "milestones",
    ],
})
