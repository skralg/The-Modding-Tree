addLayer('m', {
    name: 'Map',
    symbol: 'M',
    row: 0,
    position: 3,
    componentStyles: {
        clickable() {return {'margin': '10px'}},
        //upgrade()   {return {'margin': '5px'}},
        "h-line"()  {return {'margin-bottom': '5px', 'margin-top': '5px'}},
    },
    branchWidth: 5,
    resource: 'Acres of Land',
    color: 'green',
    startData() {
        return {
            unlocked: true,
            points: new Decimal(10),
            location: '45', // Default is the Village ID
            visited: [45],  // Visited tiles are not obscured
            mapTileVisible(obj) {
                //console.log('mapTileVisible');
                return true;
                if (obj.id == this.location) return true;
                return obj.branches.includes(parseInt(this.location));
            },
            clickable(obj) {return parseInt(obj.id) != this.location},
            marked(obj)    {return parseInt(obj.id) == this.location},
            move(obj)      {
                id = parseInt(obj.id);
                if (!this.visited.includes(id)) this.visited.push(id);
                this.location = obj.id;
            },
            title(obj,t)   {
                id = parseInt(obj.id);
                if (this.visited.includes(id)) return t;
                return '';
            },
            ifVisited(obj,t) {
                id = parseInt(obj.id);
                if (this.visited.includes(id)) return t;
                return '';
            },
        }
    },
    layerShown() { return player.map > 0 },
    infoboxes: {
        maps: {
            title: 'The Magical Map of the Known Realms',
            body: 'This magical map always shows you where you are, and the surrounding areas. '
            + 'It refuses to show anything farther away.  As you travel around the world, there '
            + 'are things you can buy or structures you can build that will help you with various '
            + 'things.',
        },
    },
    clickables: {
        14: {
            branches: [24],
            title()    {return player[this.layer].ifVisited(this, 'Ruins')},
            display()  {return player[this.layer].ifVisited(this, 'Ruined')},
            style()    {return {'background-color': '#A5A5A5'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        15: {
            branches: [25],
            title()    {return player[this.layer].ifVisited(this, 'Tower')},
            display()  {return player[this.layer].ifVisited(this, '')},
            style()    {return {'background-color': '#7393B3'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        16: {
            branches: [25],
            title()    {return player[this.layer].ifVisited(this, 'Quarry')},
            display()  {return player[this.layer].ifVisited(this, '')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        24: {
            branches: [14, 25, 35],
            title()    {return player[this.layer].ifVisited(this, 'Desert')},
            display()  {return player[this.layer].ifVisited(this, '')},
            style()    {return {'background-color': '#FAD5A5'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        25: {
            branches: [15, 16, 24, 26, 35],
            title()    {return player[this.layer].ifVisited(this, 'Mountains')},
            display()  {return player[this.layer].ifVisited(this, 'Tall')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        26: {
            branches: [16, 25, 36],
            title()    {return player[this.layer].ifVisited(this, 'Mine')},
            display()  {return player[this.layer].ifVisited(this, 'Not mine')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        32: {
            branches: [43],
            title()    {return player[this.layer].ifVisited(this, 'Cliffs')},
            display()  {return player[this.layer].ifVisited(this, '')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        33: {
            branches: [44],
            title()    {return player[this.layer].ifVisited(this, 'Cabin')},
            display()  {return player[this.layer].ifVisited(this, 'Quaint')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        34: {
            branches: [35, 44, 45],
            title()    {return player[this.layer].ifVisited(this, 'Plains')},
            display()  {return player[this.layer].ifVisited(this, 'Farms')},
            style()    {return {'background-color': '#F5DEB3'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        35: {
            branches: [24, 25, 34, 36, 45],
            title()    {return player[this.layer].ifVisited(this, 'Hills')},
            display()  {return player[this.layer].ifVisited(this, 'Game')},
            style()    {return {'background-color': '#4CBB17'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        36: {
            branches: [26, 35],
            title()    {return player[this.layer].ifVisited(this, 'Cave')},
            display()  {return player[this.layer].ifVisited(this, 'Grues')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        37: {
            branches: [46, 47],
            title()    {return player[this.layer].ifVisited(this, 'Dock')},
            display()  {return player[this.layer].ifVisited(this, 'Wet')},
            style()    {return {'background-color': '#9FE2BF'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        42: {
            branches: [43],
            title()    {return player[this.layer].ifVisited(this, 'Dock')},
            display()  {return player[this.layer].ifVisited(this, 'Wet')},
            style()    {return {'background-color': '#9FE2BF'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        43: {
            branches: [42, 32, 44, 53],
            title()    {return player[this.layer].ifVisited(this, 'Ocean')},
            display()  {return player[this.layer].ifVisited(this, 'Salty')},
            style()    {return {'background-color': '#9FE2BF'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        44: {
            branches: [33, 34, 43, 45, 54, 55],
            title()    {return player[this.layer].ifVisited(this, 'A small forest')},
            display()  {return player[this.layer].ifVisited(this, 'Trees! Herbs! Bunnies!')},
            tooltip: 'A small forested area with small game and plenty of vegetation.',
            style()    {return {'background-color': '#228B22'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        45: {
            tooltip: 'A quaint little village.',
            branches: [34, 35, 44, 46, 55],
            title()    {return player[this.layer].ifVisited(this, 'Village')},
            display()  {return player[this.layer].ifVisited(this, "There's no place<br>like home!")},
            style()    {return {'background-color': 'purple', 'margin': '5px'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        46: {
            branches: [37, 45, 47],
            title()    {return player[this.layer].ifVisited(this, 'Lake')},
            display()  {return player[this.layer].ifVisited(this, 'Freshwater')},
            style()    {return {'background-color': '#9FE2BF'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        47: {
            branches: [37, 46],
            title()    {return player[this.layer].ifVisited(this, 'Island')},
            display()  {return player[this.layer].ifVisited(this, '')},
            style()    {return {'background-color': '#9FE2BF'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        53: {
            branches: [43],
            title()    {return player[this.layer].ifVisited(this, 'Lighthouse')},
            display()  {return player[this.layer].ifVisited(this, 'Unlit')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        54: {
            branches: [44, 65],
            title()    {return player[this.layer].ifVisited(this, 'Rainforest')},
            display()  {return player[this.layer].ifVisited(this, 'Wet')},
            style()    {return {'background-color': '#2AAA8A'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        55: {
            branches: [44, 45, 56],
            title()    {return player[this.layer].ifVisited(this, 'Cemetary')},
            display()  {return player[this.layer].ifVisited(this, 'Spooky')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        56: {
            branches: [55, 57],
            title()    {return player[this.layer].ifVisited(this, 'Temple')},
            display()  {return player[this.layer].ifVisited(this, 'Serene')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        57: {
            branches: [56],
            title()    {return player[this.layer].ifVisited(this, 'Tomb')},
            display()  {return player[this.layer].ifVisited(this, 'Still')},
            style()    {return {'background-color': '#708090'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        65: {
            branches: [54, 66],
            title()    {return player[this.layer].ifVisited(this, 'Swamp')},
            display()  {return player[this.layer].ifVisited(this, 'Damp')},
            style()    {return {'background-color': '#8A9A5B'}},
            unlocked() {return player[this.layer].mapTileVisible(this)},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
        66: {
            branches: [65],
            title()    {return player[this.layer].ifVisited(this, 'Ruins')},
            display()  {return player[this.layer].ifVisited(this, 'Ruined')},
            style()    {return {'background-color': '#708090'}},
            canClick() {return player[this.layer].clickable(this)},
            marked()   {return player[this.layer].marked(this)},
            onClick()  {player[this.layer].move(this)},
        },
    },
    upgrades: {
        11: {
            title: 'Tavern',
            description: 'Cheerful',
            cost: new Decimal(100),
            currencyDisplayName: 'Wood',
            currencyLocation() { return player.wood },
            unlocked() {
                // Visible everywhere if bought, else only when you are at the Village
                return hasUpgrade(this.layer, 11) || player[this.layer].location == 45;
            },
        },
        12: {
            title: 'Stable',
            description: 'Have horse, will travel',
            cost: new Decimal(2),
            currencyDisplayName: 'Acres',
            unlocked() {
                // Visible everywhere if bought, else only when you are at the Village
                return hasUpgrade(this.layer, 12) || player[this.layer].location == 45;
            },
        },
        13: {
            title: 'School',
            description: 'It takes a village.',
            cost: new Decimal(3),
            currencyDisplayName: 'Acres',
            unlocked() {
                // Visible everywhere if bought, else only when you are at the Village
                return hasUpgrade(this.layer, 13) || player[this.layer].location == 45;
            },
        },
        14: {
            title: 'Forge',
            description: 'You hear hammers pounding.',
            cost: new Decimal(4),
            currencyDisplayName: 'Acres',
            unlocked() {
                // Visible everywhere if bought, else only when you are at the Village
                return hasUpgrade(this.layer, 14) || player[this.layer].location == 45;
            },
        },
        15: {
            title: 'Alley',
            description: 'Dank. Very dank.',
            cost: new Decimal(.125),
            currencyDisplayName: 'Acres',
            unlocked() {
                // Visible everywhere if bought, else only when you are at the Village
                return hasUpgrade(this.layer, 15) || player[this.layer].location == 45;
            },
        },
        16: {
            title: 'Sewers',
            description: 'A grate in the Alley. Gross. And smelly.',
            cost: new Decimal(.125),
            currencyDisplayName: 'Acres',
            unlocked() {
                // Visible everywhere if bought, else only when you are at the Village
                return hasUpgrade(this.layer, 16) ||
                    (player[this.layer].location == 45 && hasUpgrade(this.layer, 15));
            },
            canAfford() { // requires Alley
                return hasUpgrade(this.layer, 15);
            },
        },
        17: {
            title: 'General Store',
            description: 'A typical store.',
            cost: new Decimal(1),
            currencyDisplayName: 'Acre',
            unlocked() {
                // Visible everywhere if bought, else only when you are at the Village
                return hasUpgrade(this.layer, 15) || player[this.layer].location == 45;
            },
        },
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
        'main-display',
        'clickables',
        'h-line',
        'upgrades',
    ],
})
