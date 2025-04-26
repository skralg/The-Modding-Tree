addLayer("int",{
    name: "Intelligence",
    symbol: "INT",
    row: 2,
    position: 1,
    startData() { return {
        unlocked: true,
        name: 'Intelligence', // makes it available sooner to functions
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
            r: 0x00,
            g: 0x00,
            b: 0xff,
            l: "INT",
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
    //style: {'color': 'white'},
    componentStyles: {
        clickables: {'h2': 'white'},
    },
    color() { return player[this.layer].rgb.nodecolor() },
    requires: new Decimal(0),
    resource: "Intelligence Points",
    type: "none",
    layerShown: false, // microtab embedded
    upgrades: {
    },
    clickables: {
        11: {
            title: "Puzzle-Solving & Strategy Games",
            display: "Sharpens analytical thinking.",
            style: {'color': '#c0c0c0'},
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
        },
        12: {
            title: "Learning a New Language or Subject",
            display: "Challenges your mind and expands knowledge.",
            style: {'color': '#c0c0c0'},
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
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
            requirementDescription: "2 Intelligence Points",
            effectDescription: "Unlock the Map",
            done() { return player.int.points.gte(2) },
            unlocked() { return player.int.points.gte(2) },
            onComplete() { player.map = 1 },
            style: { 'background-color': 'lightblue' },
        },
        1: {
            requirementDescription: "4 Intelligence Points",
            effectDescription: "Gain another Character Attribute Point",
            done() { return player.int.points.gte(4) },
            unlocked() { return player.int.points.gte(4) },
            onComplete() { player.c.points = player.c.points.add(1) },
            style: { 'background-color': 'lightblue' },
        },
    },
    tabFormat: [
        ['raw-html', '<h2>Intelligence measures mental acuity, accuracy of recall, and the ability to reason.</h2>'],
        'blank',
        ['raw-html', function() {
            color = player[this.layer].rgb.nodecolor()
            pts = player[this.layer].points
            name = player[this.layer].name
            return 'You have invested <h2 style="color: ' + color +
            //'; text-shadow: ' + color + ' 0px 0px 10px;">' +
            '; text-shadow: white 0px 0px 10px;">' +
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
