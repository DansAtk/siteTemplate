const mongoose = require('mongoose');

const Crud = require('./models/Crud');

mongoose.connect('mongodb://localhost:27017/defaultApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!");
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!");
        console.log(err);
    });

/*
const c = new Crud({
    name: 'CrudA',
    text: 'A',
    type: 'a'
});

c.save()
    .then(c => {
        console.log(c);
    })
    .catch(e => {
        console.log(e);
    });
*/

const seedCruds = [
    {
        name: 'crud1',
        text: 'A',
        type: 'a'
    },
    {
        name: 'crud2',
        text: 'B',
        type: 'b'
    },
    {
        name: 'crud3',
        text: 'C',
        type: 'c'
    },
    {
        name: 'crud4',
        text: 'D',
        type: 'a'
    },
    {
        name: 'crud5',
        text: 'E',
        type: 'b'
    }
];

Crud.insertMany(seedCruds)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });