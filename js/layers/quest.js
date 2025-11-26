addLayer("q", {
    name: "Quests",
    symbol: "Q",
    row: 1,
    position: 5,
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#ccccff",
    resource: "Fame",
    type: "none",
    layerShown() { return player.int.points.gte(3) },
    infoboxes: {
        quests: {
            title: 'Quest Log and Status',
            body: "Quests are one of the ways to make the numbers go up.",
        },
    },
    challenges: {
        11: {
            name() {
                return 'Gear up ' + challengeCompletions(this.layer, 11) + '/10';
            },
            completionLimit: 10,
            challengeDescription() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return 'We have to figure out how to get some wood, so we can build things.<br>';
                // Default need-dev response
                return 'Challenge ' + (completes + 1) + ' has not been developed yet<br>';
            },
            goalDescription() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return  'Find an axe<br>';
                // Default need-dev response
                return 'Goal ' + (completes + 1) + ' is not implemented<br>';
            },
            rewardDescription() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return 'The STR ability to chop down trees to obtain wood.';
                // Default need-dev response
                return 'Reward ' + (completes + 1) + ' is not implemented<br>';
            },
            canComplete() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 0) return hasUpgrade('m', 31);
                // Default need-dev response
                return false;
            },
            onComplete() {
                completes = challengeCompletions(this.layer, 11);
                if (completes == 1) return player.axe = player.axe.add(1);
                // Default need-dev response
                alert('Q:C:11 completion ' + completes + ' has no onComplete()!');
            },
        },
        12: {
            name() {
                return 'Help out ' + challengeCompletions(this.layer, 12) + '/10';
            },
            unlocked() {
                return player.axe.gte(1);
            },
            completionLimit: 10,
            challengeDescription() {
                completes = challengeCompletions(this.layer, 12);
                if (completes == 0) return 'We have to figure out how to get some wood, so we can build things.<br>';
                if (completes == 1) return 'The tavern keeper needs some help. Something about a rat problem?<br>';
                // Default need-dev response
                return 'Challenge ' + (completes + 1) + ' has not been developed yet<br>';
            },
            goalDescription() {
                completes = challengeCompletions(this.layer, 12);
                if (completes == 0) return 'Chop trees (STR task) to acquire 100 wood to build a tavern<br>';
                if (completes == 1) return 'Defeat 10 rats.<br>';
                // Default need-dev response
                return 'Goal ' + (completes + 1) + ' is not implemented<br>';
            },
            rewardDescription() {
                completes = challengeCompletions(this.layer, 12);
                if (completes == 0) return 'The ability to build a tavern in the village.';
                if (completes == 1) return 'Expand your domain.'; // land ownership
                // Default need-dev response
                return 'Reward ' + (completes + 1) + ' is not implemented<br>';
            },
            onEnter() {
                completes = challengeCompletions(this.layer, 12);
                if (completes == 1) {
                    player.t.tavern.rat_count = player.t.tavern.rat_count.add(15);
                }
            },
            canComplete() {
                completes = challengeCompletions(this.layer, 12);
                if (completes == 0) return player.wood.gte(100);
                if (completes == 1) return player.t.tavern.rat_kills.gte(10);
                // Default need-dev response
                return false;
            },
            onComplete() {
                completes = challengeCompletions(this.layer, 12);
                if (completes == 1) return; // No effect needed
                if (completes == 2) {
                    player.m.points = player.m.points.add(1);
                    return;
                }
                // Default need-dev response
                alert('Q:C:12 completion ' + completes + ' has no onComplete()!');
            }
        },
    },
    tabFormat: [
        'main-display',
        ['infobox', 'quests'],
        'challenges',
    ],
    branches() {return [["m", "white"]]},
})
