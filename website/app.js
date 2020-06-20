/* Global Variables */
const sourceURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apikey = '&APPID=9cbd9a29df5e8111ea1256178312c18c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

async function weatherReport(url = '') {
    const response = await fetch(url);
    try{
        // Transform into JSON
        const alldata = await response.json();
        console.log(alldata);
        return alldata;
    } catch(error){
        // send errors to JS console
        console.log("error", error);
    }
}