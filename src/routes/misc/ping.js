module.exports = (app) => {

	app.post('/ping', (req, res) => {
		res.send('pong!')
	});

};