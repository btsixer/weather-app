/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '0a97adefbee609e683f0320feb8254c2';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Write an async function that uses fetch() to make a GET request
// to the OpenWeatherMap API.
const getWeather = async (baseURL, zipCode, apiKey)=>{
  const res = await fetch(baseURL+zipCode+apiKey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

// Create an event listener for the element with the id: generate,
// with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', performAction);


// Inside that callback function call your async GET request w/ the parameters:
//    - base url
//    - user entered zip code (see input in html with id zip)
//    - personal API key
function performAction(e){
  const zipCode =  document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKey)
}
