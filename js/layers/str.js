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
    }},
    color: "red",
    requires: new Decimal(0),
    resource: "Strength Points",
    type: "none",
    layerShown() { return (player[this.layer].points == 0) ? false : true },
    upgrades: {
    },
    clickables: {
        11: {
            title: "Push-ups",
            display: "<br>Requires arms",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player[this.layer].currAdd(click_value)
            },
        },
        12: {
            title: "Pull-ups",
            display: "<br>Requires arms",
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
