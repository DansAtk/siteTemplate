const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
app.use(methodOverride('_method'));

const crudTypes = ['a', 'b', 'c'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/', (req, res) => {
	res.send("POST RESPONSE");
});

//MONGO INDEX
app.get('/cruds', async (req, res) => {
	const { type } = req.query;
	if (type) {
		const cruds = await Crud.find({ type });
		res.render('cruds/index', { cruds, type });
	} else {
		const cruds = await Crud.find({});
		res.render('cruds/index', { cruds, type: 'All' });
	};
});

//MONGO NEW
app.get('/cruds/new', (req, res) => {
	res.render('cruds/new', { crudTypes });
});

//MONGO CREATE
app.post('/cruds/', async (req, res) => {
	//const { name, text, type } = req.body;
	const newCrud = new Crud(req.body);
	await newCrud.save();
	res.redirect(`/cruds/${newCrud._id}`);
});

//MONGO SHOW
app.get('/cruds/:id', async (req, res) => {
	const { id } = req.params;
	const item = await Crud.findById(id);
	res.render('cruds/show', { item });
});

//MONGO EDIT (JUST TEXT)
app.get('/cruds/:id/edit', async (req, res) => {
	const { id } = req.params;
	const item = await Crud.findById(id);
	res.render('cruds/edit', { item });
});

//MONGO EDIT (ALL)
app.get('/cruds/:id/editall', async (req, res) => {
	const { id } = req.params;
	const item = await Crud.findById(id);
	res.render('cruds/editall', { item, crudTypes });
});

//MONGO UPDATE (JUST TEXT)
app.patch('/cruds/:id', async (req, res) => {
	const { id } = req.params;
	const newText = req.body.text;
	const item = await Crud.findByIdAndUpdate(id, { text: newText }, { runValidators: true, new: true });
	res.redirect(`/cruds/${item._id}`);
});

//MONGO UPDATE (ALL)
app.put('/cruds/:id', async (req, res) => {
	const { id } = req.params;
	const item = await Crud.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
	res.redirect(`/cruds/${item._id}`);
});

//MONGO DESTROY
app.delete('/cruds/:id', async (req, res) => {
	const { id } = req.params;
	await Crud.findByIdAndDelete(id);
	res.redirect('/cruds');
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
