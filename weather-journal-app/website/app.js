/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
let apiKey = '0a97adefbee609e683f0320feb8254c2';
// https://api.openweathermap.org/data/2.5/weather?zip=75009&appid=0a97adefbee609e683f0320feb8254c2 <~ this API call works

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Convert temperature in kelvin to Fahrenheits
function kelvinToFahrenheit(k){
    const f = ((k-273.15)*1.8)+32;
    return f.toFixed(2);
}


// Write an async function that uses fetch() to make a GET request
// to the OpenWeatherMap API.
const getWeather = async (baseURL, zipCode, apiKey)=>{
  const res = await fetch(`${baseURL}zip=${zipCode},us&appid=${apiKey}`)
  try {
    const projectData = await res.json();
    console.log(projectData);
    console.log(projectData.main['temp']);
    return projectData;
  }  catch(error) {
    console.log('error', error);
  }
}

// Write another async function that is called after the completed POST request.
const postWeather = async(url = '', data = {}) => {
  // console.log('postData', projectData);
  console.log(data);
  const response = await fetch(url,{
      method: 'POST',
      credentials: 'same-origin',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  try{
      // const newData = await res.json();
      // console.log('postData', newData);
      // return newData;
      console.log('POST test');
  }catch (error) {
      console.log('error', error);
  }
};

// Create an event listener for the element with the id: generate,
// with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', performAction);


// Inside that callback function call your async GET request w/ the parameters:
//    - base url
//    - user entered zip code (see input in html with id zip)
//    - personal API key
function performAction(e){
  const zipCode =  document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;
  getWeather(baseURL, zipCode, apiKey)
  .then (function(data){
     postWeather('/addData', {temperature: data.main.temp, date: newDate, userResponse: userResponse})
    })
    .then (() => updateUI());;
    // postWeather('', {
    //             temperature: kelvinToFahrenheit(projectData.main['temp']),
    //             date: d,
    //             userResponse: userResponse
    //         });
};

//Upddate UI
const updateUI = async () => {
    const request = await fetch('/all')

    try{
        const entryData = await request.json()
        JSON.stringify(entryData);
        console.log(entryData);
    document.getElementById('date').innerHTML = entryData[0].date;
    document.getElementById('temp').innerHTML = entryData[0].main.temp;
    document.getElementById('content').innerHTML = entryData[0].userResponse;

    }
    catch(error) {
        console.log('error', error)
    }
}
