// server.js
// where your node app starts

// init project
const express = require('express'),
	  multer = require('multer');

const app = express(),
	  upload = multer();

//Serve the static files directly by built-in middleware func
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});
app.post('/get-file-size', upload.single('file'), (req, res) => {
	const data = {
		originalname: req.file.originalname,
		mimetype: req.file.mimetype,
		size: req.file.size
	};
	console.log(`${req.ip} got file meta`);
	console.log(data);
	res.type('json').send(JSON.stringify(data, null, 1));
});
// Respond not found to all the wrong routes
app.use((req, res) => {
  res.status(404);
  res.type('txt').send('404 - Page Not Found');
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
