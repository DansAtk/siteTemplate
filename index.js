const express = require('express');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const app = express();
uuid();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let data = [
	{
		id: uuid(),
		name: "crud1",
		text: "A"
	},
	{
		id: uuid(),
		name: "crud2",
		text: "B"
	},
	{
		id: uuid(),
		name: "crud3",
		text: "C"
	},
	{
		id: uuid(),
		name: "crud4",
		text: "D"
	},
	{
		id: uuid(),
		name: "crud5",
		text: "E"
	}
]

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/', (req, res) => {
	res.send("POST RESPONSE");
});

//INDEX
app.get('/crud', (req, res) => {
	res.render('crud/index', { data });
});

//NEW
app.get('/crud/new', (req, res) => {
	res.render('crud/new');
});

//CREATE
app.post('/crud/', (req, res) => {
	const { name, text } = req.body;
	data.push( { id: uuid(), name, text } );
	res.redirect('/crud');
});

//SHOW
app.get('/crud/:id', (req, res) => {
	const { id } = req.params;
	const item = data.find(c => c.id === id);
	res.render('crud/show', { item });
});

//EDIT
app.get('/crud/:id/edit', (req, res) => {
	const { id } = req.params;
	const item = data.find(c => c.id === id);
	res.render('crud/edit', { item });
});

//UPDATE
app.patch('/crud/:id', (req, res) => {
	const { id } = req.params;
	const newText = req.body.text;
	const item = data.find(c => c.id === id);
	item.text = newText;
	res.redirect('/crud');
});

//DESTROY
app.delete('/crud/:id', (req, res) => {
	const { id } = req.params;
	data = data.filter(c => c.id !== id);
	res.redirect('/crud');
});

app.get('*', (req, res) => {
	res.render('notfound');
});

app.post('*', (req, res) => {
	res.render('notfound');
});

app.listen(3000, () => {
	console.log('LISTENING ON PORT 3000');
});
