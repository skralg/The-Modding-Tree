addLayer("cha",{
    name: "Charisma",
    symbol: "CHA",
    row: 3,
    position: 0,
    startData() { return {
        unlocked: true,
        name: 'Charisma', // makes it available sooner to functions
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
    layerShown: false, // microtab embedded
    upgrades: {
    },
    clickables: {
        11: {
            title: "Improv Theater",
            display: "<br>Boosts confidence and interpersonal flair.",
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
        },
        12: {
            title: "Speaking Clubs",
            display: "<br>Refines persuasive communication skills.",
            canClick: true,
            onClick() {player[this.layer].currAdd(player[this.layer].points)},
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
            requirementDescription: "4 Charisma Points",
            effectDescription: "Gain another Character Attribute Point",
            done() { return player.cha.points.gte(4) },
            unlocked() { return player.cha.points.gte(4) },
            onComplete() { player.c.points = player.c.points.add(1) },
            style: { 'background-color': 'purple' },
        },
    },
    tabFormat: [
        ['raw-html', '<h2>Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality.</h2>'],
        'blank',
        ['raw-html', function() {
            color = player.cha.rgb.nodecolor()
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
