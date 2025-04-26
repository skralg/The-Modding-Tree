addLayer("con",{
    name: "Constitution",
    symbol: "CON",
    row: 2,
    position: 0,
    startData() { return {
        unlocked: true,
        name: 'Constitution', // makes it available sooner to functions
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
            g: 0xff,
            b: 0x00,
            l: "CON",
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
    resource: "Constitution Points",
    type: "none",
    layerShown: false, // microtab embedded
    upgrades: {
    },
    clickables: {
        11: {
            title: "Endurance Running",
            display: "<br>Builds stamina and overall physical resilience.",
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
        },
        12: {
            title: "Interval Training",
            display: "<br>Boosts cardiovascular health and recovery.",
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
        },
        21: {
            title: "Obstacle Courses",
            display() {
                str = player.str.rgb.label()
                con = player.con.rgb.label()
                label = str + " " + con + "<br><br>"
                return  label + "Physically demanding challenges over time."
            },
            canClick() {
                if (player.str.points.eq(0)) return false;
                if (player.con.points.eq(0)) return false;
                return true
            },
            onClick() {
                player[this.layer].currAdd(player[this.layer].points)
                player.str.currAdd(player.str.points)
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
            fillStyle() { return {'background-color': player[this.layer].rgb.nodecolor()} },
            progress()  { return player[this.layer].current.div(player[this.layer].target) },
            display()   { return player[this.layer].current + " / " + player[this.layer].target },
        },
    },
    milestones: {
        0: {
            requirementDescription: "4 Constitution Points",
            effectDescription: "Gain another Character Attribute Point",
            done() { return player.con.points.gte(4) },
            unlocked() { return player.con.points.gte(4) },
            onComplete() { player.c.points = player.c.points.add(1) },
            style: { 'background-color': 'yellow' },
        },
    },
    tabFormat: [
        ['raw-html', '<h2>Constitution measures health, stamina, and vital force.</h2>'],
        'blank',
        ['raw-html', function() {
            color = player.con.rgb.nodecolor()
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
