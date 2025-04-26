addLayer("str",{
    name: "Strength",
    symbol: "STR",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
        name: 'Strength', // makes it available sooner to functions
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
    color() { return player[this.layer].rgb.nodecolor() },
    requires: new Decimal(0),
    resource: "Strength Points",
    type: "none",
    layerShown: false, // microtab embedded
    upgrades: {
    },
    clickables: {
        11: {
            title: "Weight lifting",
            display: "<br>Focus on squats and deadlifts to build raw power",
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
        },
        12: {
            title: "Rock Climbing",
            display: "<br>Challenges muscles, grip strength, and overall power.",
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
        },
        21: {
            title: "Chop wood",
            display: "<br>Requires an axe",
            canClick() { return player.axe.gt(0) },
            onClick() {
                player[this.layer].currAdd(player[this.layer].points)
                click_value = player.axe // axe value
                player.wood = player.wood.add(click_value)
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
                label = str + ' ' + dex + '<br><br>'
                return  label + "Combines power with precise movements."
            },
            canClick() {
                if (player.str.points.eq(0)) return false;
                if (player.dex.points.eq(0)) return false;
                return true
            },
            onClick() {
                player[this.layer].currAdd(player[this.layer].points)
                player.dex.currAdd(player.dex.points)
            },
        },
        32: {
            title: "Obstacle Courses",
            display() {
                str = player.str.rgb.label()
                con = player.con.rgb.label()
                label = str + " " + con + "<br><br>"
                return label + "Physically demanding challenges over time."
            },
            canClick() {
                if (player.str.points.eq(0)) return false;
                if (player.con.points.eq(0)) return false;
                return true
            },
            onClick() {
                player[this.layer].currAdd(player[this.layer].points)
                player.con.currAdd(player.con.points)
            },
        },
    },
    buyables: {
    },
    bars: {
        b1: {
            direction: RIGHT,
            width: 500,
            height: 16,
            unlocked: true,
            fillStyle() { return {'background-color': player[this.layer].rgb.nodecolor()} },
            progress()  { return player[this.layer].current.div(player[this.layer].target) },
            display()   { return player[this.layer].current + " / " + player[this.layer].target },
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
        ['raw-html', '<h2>Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.</h2>'],
        'blank',
        ['raw-html', function() {
            color = player.str.rgb.nodecolor()
            pts = player[this.layer].points
            name = player[this.layer].name
            return 'You have invested <h2 style="color: ' + color +
                   '; text-shadow: ' + color + ' 0px 0px 10px;">' +
                   pts + '</h2> Attribute Points in ' + name
        }],
        'blank',
        ['bar', 'b1'],
        'blank',
        'clickables',
        'blank',
        'milestones',
    ],
})
