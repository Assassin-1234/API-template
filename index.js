require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, (err) => console.log(err ? err : 'Connected to mongoDB'));

app.set('json spaces', 1);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const categories = fs.readdirSync('./src/routes');

categories.forEach((cat) => {
	const files = fs.readdirSync(`./src/routes/${cat}`).filter(f => f.endsWith('.js'));
	for (const file of files) {
		require(`./src/routes/${cat}/${file}`)(app);
	}
});

app.listen(3000, () => console.log('server running on port 3000! http://127.0.0.1:3000/'));