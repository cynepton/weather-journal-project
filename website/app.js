//Sample structure of data received from opewnweather is available at sample-data.json
//This data is solely for the purpose of understanding how to correctly read the data
// Only the temperate information is read for now with `apiData.main.temp`
/**
 * Global Variables 
*/
const sourceUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=9cbd9a29df5e8111ea1256178312c18c&units=imperial';

const userFeelings = document.getElementById('feelings');
const zipCode = document.getElementById('zip');
const generateButton = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/**
 * async function to get weather report
 */
async function weatherReport(url = '') {
    const res = await fetch(url);
    try{
        let data = await res.json();
        return data;
    } catch(error){
        // send errors to JS console
        console.log("error", error);
    }
}

// update UI with new data
function newWeatherData(e){
    let zipCodeValue = zipCode.value;
    let userFeelingsValue = userFeelings.value;

    weatherReport(`${sourceUrl}${zipCodeValue}${apiKey}`).then(
        function (data){
        postData('http://localhost:3000/add', {temperature:data.main.temp, date:newDate, userResponse:userFeelingsValue})
        }).then(
            function () {
            updateUi()
        })    
}

async function postData(url = '', data = {}) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000/'
        },
        body: JSON.stringify(data),
    });
    try{
        let newPostData = await res.json();
        return newPostData;
    }catch (error){
        console.log("error", error);
    }
}

async function updateUi() {
    const req = await fetch ('http://localhost:3000/all');
    try{
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    }catch(error){
        console.log('error', error);
    }
}

generateButton.addEventListener('click', newWeatherData);