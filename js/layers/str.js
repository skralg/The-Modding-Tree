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
            l: "STR",
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
    color() { return player.str.rgb.nodecolor() },
    requires: new Decimal(0),
    resource: "Strength Points",
    type: "none",
    layerShown() { return !player.str.points.eq(0) },
    upgrades: {
    },
    clickables: {
        11: {
            title: "Weight lifting & Resistance Training",
            display: "Focus on compound lifts (squats, deadlifts) to build raw power",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player.str.currAdd(click_value)
            },
        },
        12: {
            title: "Rock Climbing",
            display: "Challenges muscles, grip strength, and overall power.",
            canClick: true,
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player.str.currAdd(click_value)
            },
        },
        21: {
            title: "Chop wood",
            display: "<br>Requires an axe",
            canClick() { return player.axe > 0 },
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player.str.currAdd(click_value)
                // might need to be modified later
                player.wood += click_value
            },
        },
        22: {
            title: "Mine ore",
            display: "<br>Requires a pick",
            canClick() { return player.pick > 0 },
        },
        31: {
            title: "Martial Arts",
            display() {
                str = player.str.rgb.label()
                dex = player.dex.rgb.label()
                label = str + " " + dex + "<br>"
                return  label + "Combines raw power with agile, precise movements."
            },
            canClick() {
                if (player.str.points.eq(0)) return false;
                if (player.dex.points.eq(0)) return false;
                return true
            },
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player.str.currAdd(click_value)
                player.dex.currAdd(click_value)
            },
        },
        32: {
            title: "Obstacle Course Races",
            display() {
                str = player.str.rgb.label()
                con = player.con.rgb.label()
                label = str + " " + con + "<br>"
                return  label + "Tasks you with physically demanding challenges over time."
            },
            canClick() {
                if (player.str.points.eq(0)) return false;
                if (player.con.points.eq(0)) return false;
                return true
            },
            onClick() {
                click_value = 1 // 1 point of upgrade for this clickable
                player.str.currAdd(click_value)
                player.con.currAdd(click_value)
            },
        },
    },
    buyables: {
    },
    infoboxes: {
        top: {
            title: "Strength Training",
            body: "Let's get strong!",
        },
    },
    bars: {
        b1: {
            direction: RIGHT,
            width: 500,
            height: 16,
            unlocked: true,
            fillStyle() { return {'background-color': player.str.rgb.nodecolor()}  },
            progress()  { return player.str.current.div(player.str.target) },
            display()   { return player.str.current + " / " + player.str.target },
        },
    },
    milestones: {
        0: {
            requirementDescription: "2 Strength Points",
            effectDescription: "Unlock Equipment",
            done() { return player.str.points.gte(2) },
            unlocked() { return player.str.points.gte(2) },
            style: { 'background-color': 'red' },
        },
        1: {
            requirementDescription: "3 Strength Points",
            effectDescription: "Unlock Inventory",
            done() { return player.str.points.gte(3) },
            unlocked() { return player.str.points.gte(3) },
            style: { 'background-color': 'red' },
        },
        2: {
            requirementDescription: "4 Strength Points",
            effectDescription: "Gain another Character Attribute Point",
            done() { return player.str.points.gte(4) },
            unlocked() { return player.str.points.gte(4) },
            onComplete() { player.c.points = player.c.points.add(1) },
            style: { 'background-color': 'red' },
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
