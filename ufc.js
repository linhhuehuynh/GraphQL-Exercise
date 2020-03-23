var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        fighter(name: String!): fighter
        fighters(weightclass: String!): [fighter]
    },
    type fighter {
        name: String
        nickname: String
        wins: Int
        losses: Int
        height: Float
        weightclass: String
        city: String
        state: String
        country: String
    }
`);
var fighterData = [
    {
        name: 'Andrei Arlovski',
        nickname: 'The Pit Bull',
        wins: 28,
        losses: 19, 
        height: 1.91,
        weightclass: 'Heavyweights',
        city: 'New York City',
        state:'New York',
    },
    {
        name: 'Alistair Overeem',
        nickname: 'The Reem',
        wins: 45,
        losses: 17, 
        height: 1.96,
        weightclass: 'Heavyweights',
        city: 'Washington',
        state:'D.C.',
    },
    {
        name: 'Junior dos Santos',
        nickname: 'Cigano',
        wins: 21,
        losses: 6, 
        height: 1.93,
        weightclass: 'Heavyweights',
        city: 'Raleigh',
        state:'North Carolina',
    },
    {
        name: 'Todd Duffee',
        nickname: 'Irish Car Bomb',
        wins: 9,
        losses: 3, 
        height: 1.93,
        weightclass: 'Heavyweights',
        city: 'Vancouver',
        country:'Canada',
    },
    {
        name: 'Daniel Cormier',
        nickname: 'DC',
        wins: 22,
        losses: 2, 
        height: 1.80,
        weightclass: 'Heavyweights',
        city: 'Anaheim',
        state:'California',
    },
    {
        name: 'Ed Herman',
        nickname: 'Short Fuse',
        wins: 25,
        losses: 14, 
        height: 1.88,
        weightclass: 'Light heavyweights',
        city: 'Moscow',
        country:'Russia',
    },
    {
        name: 'Maurício Rua',
        nickname: 'Shogun',
        wins: 26,
        losses: 11, 
        height: 1.85,
        weightclass: 'Light heavyweights',
        city: 'São Paulo',
        country:'Brazil',
    },
    {
        name: 'Luke Rockhold',
        nickname: 'N/A',
        wins: 16,
        losses: 5, 
        height: 1.91,
        weightclass: 'Light heavyweights',
        city: 'Las Vegas',
        state:'Neveda',
    },
    {
        name: 'Chris Weidman',
        nickname: 'The All-American',
        wins: 14,
        losses: 5, 
        height: 1.88,
        weightclass: 'Light heavyweights',
        city: 'Boston',
        state:'Massachusetts',
    },
    {
        name: 'Anderson Silva',
        nickname: 'The Spider',
        wins: 34,
        losses: 10, 
        height: 1.88,
        weightclass: 'Middleweights',
        city: 'Rio de Janeiro',
        country:'Brazil',
    },
    {
        name: 'Tim Boetsch',
        nickname: 'The Barbarian',
        wins: 21,
        losses: 13, 
        height: 1.83,
        weightclass: 'Middleweights',
        city: 'Wichita',
        state:'Kansas',
    },
    {
        name: 'Brad Tavares',
        nickname: 'N/A',
        wins: 17,
        losses: 6, 
        height: 1.85,
        weightclass: 'Middleweights',
        city: 'New York City',
        state:'New York',
    },
    {
        name: 'Derek Brunson',
        nickname: 'N/A',
        wins: 20,
        losses: 7, 
        height: 1.85,
        weightclass: 'Middleweights',
        city: 'Anaheim',
        state:'California',
    },
    {
        name: 'Cezar Ferreira',
        nickname: 'Mutante',
        wins: 13,
        losses: 8, 
        height: 1.85,
        weightclass: 'Middleweights',
        city: 'Sacramento',
        state:'California',
    },
    {
        name: 'Diego Sanchez',
        nickname: 'Nightmare',
        wins: 29,
        losses: 12, 
        height: 1.78,
        weightclass: 'Welterweights',
        city: 'Las Vegas',
        state:'Nevada',
    },
    {
        name: 'Matt Wiman',
        nickname: 'Handsome',
        wins: 16,
        losses: 8, 
        height: 1.78,
        weightclass: 'Lightweights',
        city: 'Washington',
        state:'D.C.',
    },
    {
        name: 'Frankie Edgar',
        nickname: 'The Answer',
        wins: 23,
        losses: 7, 
        height: 1.68,
        weightclass: 'Featherweights',
        city: 'Raleigh',
        state: 'North Carolina',
    },
    {
        name: 'Urijah Faber',
        nickname: 'The California Kid',
        wins: 35,
        losses: 10, 
        height: 1.68,
        weightclass: 'Bantamweights',
        city: 'Las Vegas',
        state: 'Nevada',
    },
    {
        name: 'Joseph Benavidez',
        nickname: 'N/A',
        wins: 27,
        losses: 5, 
        height: 1.63,
        weightclass: 'Flyweights',
        city: 'Minneapolis',
        state: '‎Minnesota',
    },
    {
        name: 'Yair Rodríguez',
        nickname: 'El Pantera',
        wins: 13,
        losses: 2, 
        height: 1.80,
        weightclass: 'Featherweights',
        city: 'Boston',
        state: '‎Massachusetts',
    },
    
]
var getFighter = function(args) { 
    var name = args.name;
    return fighterData.filter(fighter => {
        return fighter.name == name;
    })[0];
}
var getFighters = function(args) {
    if (args.weightclass) {
        var weightclass = args.weightclass;
        return fighterData.filter(fighter => fighter.weightclass === weightclass);
    } else {
        return fighterData;
    }
}
var root = {
    fighter: getFighter,
    fighters: getFighters
};

var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));