addLayer("str",{
    name: "Strength",
    symbol: "STR",
    row: 1,
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
            r: 0xff,
            g: 0x00,
            b: 0x00,
            nodecolor() {
                return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
            },
            branchcolor() {
                r = this.r >> 1; g = this.g >> 1; b = this.b >> 1
                return "rgb(" + r + ", " + g + ", " + b + ")"
            },
        },
    }},
    color() { return player[this.layer].rgb.nodecolor() },
    requires: new Decimal(0),
    resource: "Strength Points",
    type: "none",
    layerShown() { return (player[this.layer].points.eq(0)) ? false : true },
    upgrades: {
    },
    clickables: {
        11: {
            title: "Weight lifting & Resistance Training",
            display: "Focus on compound lifts (squats, deadlifts) to build raw power",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].currAdd(click_value)
            },
        },
        12: {
            title: "Rock Climbing",
            display: "Challenges muscles, grip strength, and overall power.",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].currAdd(click_value)
            },
        },
        21: {
            title: "Chop wood",
            display: "<br>Requires an axe",
            canClick() {
                return (player['e']['equipment']['axe'] == 0) ? false : true
            },
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].currAdd(click_value)
                // might need to be modified later
                player["i"]["inventory"]["wood"] += click_value
            },
        },
        22: {
            title: "Mine ore",
            display: "<br>Requires a pick",
            canClick() {
                return (player['e']['equipment']['pick'] == 0) ? false : true
            },
        },
    },
    buyables: {
    },
    infoboxes: {
        top: {
            title: "Strength Training",
            body: "Let's get strong!",
        }
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
    milestones: {
        0: {
            requirementDescription: "1 Milestone Point",
            effectDescription: "Feel Good",
            done() { return player[this.layer].points.gte(1) },
        },
        1: {
            requirementDescription: "2 Milestone Points",
            effectDescription: "Feel better",
            done() { return player[this.layer].points.gte(2) },
        },
    },
    tabFormat: [
        ["infobox", "top"],
        "main-display",
        "blank",
        ["bar", "b1"],
        "blank",
        "clickables",
        "blank",
        "milestones",
    ],
})
