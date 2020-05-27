// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require bodyParser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// Add a GET route that returns the projectData object in your server code
app.get('/all', getData);
function getData(req,res){
    res.send(projectData);
    console.log(projectData);
};

// Then, add a POST route that adds incoming data to projectData.
app.post('/addData', function(req, res) {
  // res.send('Test the POST route');
	const newData = {
		temperature: req.body.temperature,
		date: req.body.date,
		userResponse: req.body.userResponse
	};
	projectData = newData;
	res.send(projectData);
  console.log(projectData);
});
