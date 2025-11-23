// Map layer.  Lots of stuff in here.

function copperGain() { // Passive income generator
    let gain = Decimal.dZero;
    if (hasUpgrade('m', 11)) gain = gain.plus(1);  // base amount is 1 copper per 10 seconds (50 ticks-ish)
    
    return gain;
}
function mapTileVisible(obj) {
    //console.log('mapTileVisible');
    //return true;
    if (obj.id == player.m.location) return true;
    return obj.branches().includes(parseInt(player.m.location)) && hasUpgrade('m', 12);
}
function move(obj) {
    id = parseInt(obj.id);
    if (!this.m.visited.includes(id)) this.m.visited.push(id);
    this.m.location = obj.id;
}
function clickable(obj) {return parseInt(obj.id) != player.m.location}
function marked(obj)    {return parseInt(obj.id) == player.m.location}
function title(obj, t)  {
    id = parseInt(obj.id);
    if (player.m.visited.includes(id)) return t;
    return '';
}
function ifVisited(obj, t) {
    id = parseInt(obj.id);
    if (player.m.visited.includes(id)) return t;
    return '';
}

function hasVisited(obj) { return player.m.visited.includes(parseInt(obj.id));}

function m_title(obj) {
    if (hasVisited(obj)) return m_clickables[parseInt(obj.id)].title;
    return '';
}
function m_display(obj) {
    if (hasVisited(obj)) return m_clickables[parseInt(obj.id)].display;
    return '';
}
function m_style(obj) {
    if (hasVisited(obj)) return m_clickables[parseInt(obj.id)].style;
    return {};
}
function m_branches(obj) {
    if (hasVisited(obj)) return m_clickables[parseInt(obj.id)].branches;
    return [];
}
function m_tooltip(obj) {
    if (hasVisited(obj)) return m_clickables[parseInt(obj.id)].tooltip;
    return '';
}

m_clickables = {
    14: {
        title: 'Ruins',
        display: 'Ruined',
        branches: [24],
        style: {'background-color': '#A5A5A5'},
    },
    15: {
        title: 'Tower',
        display: 'Tall',
        branches: [25],
        style: {'background-color': '#7393B3'},
    },
    16: {
        title: 'Quarry',
        display: '',
        branches: [25],
        style: {'background-color': '#708090'},
    },
    24: {
        title: 'Desert',
        display: '',
        branches: [14, 25, 35],
        style: {'background-color': '#FAD5A5'},
    },
    25: {
        title: 'Mountains',
        display: 'Tall',
        branches: [15, 16, 24, 26, 35],
        style: {'background-color': '#708090'},
    },
    26: {
        title: 'Mine',
        display: 'Not mine',
        branches: [16, 25, 36],
        style: {'background-color': '#708090'},
    },
    32: {
        title: 'Cliffs',
        display: '',
        branches: [43],
        style: {'background-color': '#708090'},
    },
    33: {
        title: 'Cabin',
        display: 'Quaint',
        branches: [44],
        style: {'background-color': '#708090'},
    },
    34: {
        title: 'Plains',
        display: 'Farms',
        branches: [35, 44, 45],
        style: {'background-color': '#F5DEB3'},
    },
    35: {
        title: 'Hills',
        display: 'Game',
        branches: [24, 25, 34, 36, 45],
        style: {'background-color': '#4CBB17'},
    },
    36: {
        title: 'Cave',
        display: 'Grues',
        branches: [26, 35],
        style: {'background-color': '#708090'},
    },
    37: {
        title: 'Dock',
        display: 'Wet',
        branches: [46, 47],
        style: {'background-color': '#9FE2BF'},
    },
    42: {
        title: 'Dock',
        display: 'Wet',
        branches: [43],
        style: {'background-color': '#9FE2BF'},
    },
    43: {
        title: 'Ocean',
        display: 'Salty',
        branches: [32, 42, 44, 53],
        style: {'background-color': '#9FE2BF'},
    },
    44: {
        title: 'A small forest',
        display: 'Trees! Herbs! Bunnies!',
        branches: [33, 34, 43, 45, 54, 55],
        style: {'background-color': '#228B22'},
        tooltip: 'A small forested area with small game and plenty of vegetation.',
    },
    45: {
        title: 'Village',
        display: "There's no place<br>like home!",
        branches: [34, 35, 44, 46, 55],
        style: {'background-color': 'purple', 'margin': '5px'},
        tooltip: 'A quaint little village.',
    },
    46: {
        title: 'Lake',
        display: 'Freshwater',
        branches: [37, 45, 47],
        style: {'background-color': '#9FE2BF'},
    },
    47: {
        title: 'Island',
        display: '',
        branches: [37, 46],
        style: {'background-color': '#9FE2BF'},
    },
    53: {
        title: 'Lighthouse',
        display: 'Unlit',
        branches: [43],
        style: {'background-color': '#708090'},
    },
    54: {
        title: 'Rainforest',
        display: 'Wet',
        branches: [44, 65],
        style: {'background-color': '#2AAA8A'},
    },
    55: {
        title: 'Cemetary',
        display: 'Spooky',
        branches: [44, 45, 56],
        style: {'background-color': '#708090'},
    },
    56: {
        title: 'Temple',
        display: 'Serene',
        branches: [55, 57],
        style: {'background-color': '#708090'},
    },
    57: {
        title: 'Tomb',
        display: 'Still',
        branches: [56],
        style: {'background-color': '#708090'},
    },
    65: {
        title: 'Swamp',
        display: 'Damp',
        branches: [54, 66],
        style: {'background-color': '#8A9A5B'},
    },
    66: {
        title: 'Ruins',
        display: 'Ruined',
        branches: [65],
        style: {'background-color': '#708090'},
    },
}

addLayer('m', {
    name: 'Map',
    symbol: 'M',
    row: 0,
    position: 3,
    //leftTab: true,
    componentStyles: {
        clickable: {'margin': '10px'},
        //upgrade()   {return {'margin': '5px'}},
        "h-line":  {'margin-bottom': '5px', 'margin-top': '5px'},
    },
    branchWidth: 5,
    resource: 'Acres of Land',
    color: 'green',
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            location: '45', // Default is the Village ID
            visited: [45]  // Visited tiles are not obscured
        }
    },
    layerShown() { return false || player.map > 0 },
    update(diff) {
        // Copper gain is every 10 seconds
        let gain = copperGain().div(10).times(diff);
        player.copper = player.copper.plus(gain);
        //console.log('Added ' + gain + ' copper in ' + diff + ' ticks for ' + player.copper);
    },
    infoboxes: {
        maps: {
            title: 'The Magical Map of the Known Realms',
            body: 'This magical map always shows you where you are, and the surrounding areas. '
            + 'It refuses to show anything farther away.  As you travel around the world, there '
            + 'are things you can buy or structures you can build that will help you with various '
            + 'things.',
        },
        village: {
            title: 'The Village',
            body() {
                amenities = []
                if (hasUpgrade('m', 11)) amenities.push('a tavern that provides income');
                if (hasUpgrade('m', 12)) amenities.push('a stable that keeps horses for travel');
                if (hasUpgrade('m', 13)) amenities.push('a school to learn new things');
                if (hasUpgrade('m', 14)) amenities.push('a forge to make weapons and armor');
                if (hasUpgrade('m', 17)) amenities.push('a store to buy and sell things');
                out = 'A quaint little village. '
                if (amenities.length > 0) {
                    out += 'You own the following buildings:<br>';
                    for (i = 0; i < amenities.length; i++) {
                        out += amenities[i] + '<br>';
                        if (i < amenities.length - 1) out += ', ';
                    }
                } else {
                    out += 'It has room to grow.';
                }
                // Challenge text modifications
                if (inChallenge('q', 11) && challengeCompletions('q', 11) == 0) {
                    if (hasUpgrade('m', 31)) {
                        out += '<br><br>You helped an old man chop wood for the winter, and he gave you an axe.';
                    } else {
                        out += '<br><br>There is an old man here who needs wood to keep his family warm. '
                        + 'He is looking for help. If you help him, he might reward you.'
                    }
                }
                return out;
            },
            unlocked() {
                // Visible at the Village
                return player[this.layer].location == 45;
            },
        },
    },
    clickables: {
        14: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        15: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        16: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        24: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        25: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        26: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        32: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        33: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        34: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        35: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        36: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        37: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        42: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        43: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        44: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        45: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        46: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        47: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        53: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        54: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        55: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        56: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        57: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        65: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
        66: {
            branches() {return m_branches(this)},
            title()    {return m_title(this)},
            tooltip()  {return m_tooltip(this)},
            display()  {return m_display(this)},
            style()    {return m_style(this)},
            unlocked() {return mapTileVisible(this)},
            canClick() {return clickable(this)},
            marked()   {return marked(this)},
            onClick()  {move(this)},
        },
    },
    upgrades: {
        11: {
            title: 'Tavern',
            description: 'Generates Income',
            cost: 100,
            currencyDisplayName: 'Wood',
            currencyInternalName: 'wood',
            display() { return 'woggle' },
            effect() { return copperGain() },
            effectDisplay() { return format(this.effect(), precision=0) + ' copper every 10 seconds' },
            unlocked() {
                return player.m.location == 45 // Visible at the Village
                    && challengeCompletions('q', 12) > 0;
            },
        },
        12: {
            title: 'Stable',
            description: 'Have horse, will travel',
            cost: new Decimal(2),
            currencyDisplayName: 'Acres',
            unlocked() {
                return player.m.location == 45; // Visible at the Village
            },
        },
        13: {
            title: 'School',
            description: 'It takes a village.',
            cost: new Decimal(3),
            currencyDisplayName: 'Acres',
            unlocked() {
                return player.m.location == 45; // Visible at the Village
            },
        },
        14: {
            title: 'Forge',
            description: 'You hear hammers pounding.',
            cost: new Decimal(4),
            currencyDisplayName: 'Acres',
            unlocked() {
                return player.m.location == 45; // Visible at the Village
            },
        },
        15: {
            title: 'Alley',
            description: 'Dank. Very dank.',
            cost: new Decimal(.125),
            currencyDisplayName: 'Acres',
            unlocked() {
                return player.m.location == 45; // Visible at the Village
            },
        },
        16: {
            title: 'Sewers',
            description: 'A grate in the Alley. Gross. And smelly.',
            cost: new Decimal(.125),
            currencyDisplayName: 'Acres',
            unlocked() {
                // Visible at the Village if you have the Alley
                return player.m.location == 45 && hasUpgrade('m', 15);
            },
            canAfford() { // requires Alley
                return hasUpgrade('m', 15);
            },
        },
        17: {
            title: 'General Store',
            description: 'A typical store.',
            cost: new Decimal(1),
            currencyDisplayName: 'Acre',
            unlocked() {
                return player.m.location == 45; // Visible at the Village
            },
        },
        // Quest things start on row 3, so we still have room for a 2nd line of 'normal' upgrades
        31: {
            title: 'Help chop wood',
            description: 'Help an old man chop wood for the winter',
            cost: new Decimal(0),
            fullDisplay() {
                return '<h3>Help Chop Wood</h3><br>Help an old man chop wood for the winter<br><br>Reward: An Axe';
            },
            unlocked() {
                return player[this.layer].location == 45
                    && inChallenge('q', 11)
                    && challengeCompletions('q', 11) == 0;
            },
        },
    },
    tabFormat: [
        ['infobox', 'maps'],
        ['raw-html', function() {
            color = 'green'
            pts = player.m.points
            cash = calcCopper()
            return 'You have <h2 style="color: ' + color +
                   '; text-shadow: ' + color + ' 0px 0px 10px;">' +
                   pts + '</h2> Acres of Land<br>' +
                   'Coinage: ' + cash + '<br>'
        }],
        'clickables',
        'h-line',
        ['infobox', 'village'],
        'upgrades',
        ['tree', [['t']]],
    ],
})
