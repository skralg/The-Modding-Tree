addLayer("cha",{
    name: "Charisma",
    symbol: "CHA",
    row: 3,
    position: 0,
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
        rgb: {
            r: 0x7f,
            g: 0x00,
            b: 0x7f,
            l: "CHA",
            nodecolor() {
                return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
            },
            branchcolor() {
                r = this.r >> 1; g = this.g >> 1; b = this.b >> 1
                return "rgb(" + r + ", " + g + ", " + b + ")"
            },
            label() {
                return "<span style='background-color:" + this.nodecolor() + "'>" + this.l + "</span>"
            },
        },
    }},
    color() { return player[this.layer].rgb.nodecolor() },
    requires: new Decimal(0),
    resource: "Charisma Points",
    type: "none",
    layerShown() { return (player[this.layer].points.eq(0)) ? false : true },
    upgrades: {
    },
    clickables: {
        11: {
            title: "Improv Theater or Acting Workshops",
            display: "Boosts confidence and interpersonal flair.",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].currAdd(click_value)
            },
        },
        12: {
            title: "Public Speaking Clubs",
            display: "Refines persuasive communication skills.",
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
            unlocked: true,
            fillStyle() { return {'background-color': player[this.layer].rgb.nodecolor()}  },
            progress()  { return player[this.layer].current.div(player[this.layer].target) },
            display()   { return player[this.layer].current + " / " + player[this.layer].target },
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
