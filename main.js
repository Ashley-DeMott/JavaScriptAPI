// Create a request for the Weather API (Put in API key = 6X6AN44CEB6825G9TBEL9H235, 1000 daily requests)
// Learn how to create a requrest and handle the response/incoming data

// Find common API requests
// https://www.visualcrossing.com/resources/blog/five-easy-weather-api-calls-to-get-the-weather-data-you-need/

// Process the json weather data, updating the respective HTML elements
function processWeatherData(response) {
    var location = response.resolvedAddress;
    var days = response.days;

    /* Add data to each section - generate or fill? (requesting 7 days always, or different numbers? <-- currently always 7, fill*/

    // TODO: Add a location HTML element to display:
    // "Weather for " + location
    var weatherLocation = document.getElementById("weatherLocation");
    weatherLocation.innerHTML = "Weather for " + response.resolvedAddress;

    // For each day in the HTML,
    var day_elements = document.getElementsByClassName("day");
    for (let i = 0; i < days.length; i++) {
        // Insert the retrieved datetime into the day's time/date
        var date = day_elements[i].querySelector(".day__info").querySelector(".day__info__date");
        date.innerHTML = days[i].datetime;

        // Insert the retrieved dow into the day's dow
        var dow = day_elements[i].querySelector(".day__info").querySelector(".day__info__dow");
        dow.innerHTML = days[i].dow;

        // Insert the retrieved tempmax into the day's high temp
        var highTemp = day_elements[i].querySelector(".day__temps").querySelector(".temp--high");
        highTemp.innerHTML = days[i].tempmax;

        // Insert the retrieved tempmin into the day's low temp
        var lowTemp = day_elements[i].querySelector(".day__temps").querySelector(".temp--low");
        lowTemp.innerHTML = days[i].tempmin;
    }
    /*
    console.log("Location: " + location);
    for (var i = 0; i < days.length; i++) {
        console.log(days[i].datetime + ": tempmax=" + days[i].tempmax + ", tempmin=" + days[i].tempmin);
    }*/
}

// The ids for the HTML elements representing error messages
const ErrorIDs = ["unexpectedError", "connectionError", "exceedsRequests", "invalidLocation", "API"];

// Hide all HTML elements with the specified error IDs
function hideErrors() {
    for (let i = 0; i < ErrorIDs.length; i++) {
        var error = document.getElementById(ErrorIDs[i]);
        error.style.display = "none";
    }
}

// Format a string for use in a URL
function removeSpace(string) {
    // Any spaces must be replaced with % 20, commas with % 2C
    string.replace(/\s+/g, "%20");
    string.replace(',', "%2C");
    return string;
}

const API_KEY = "6X6AN44CEB6825G9TBEL9H235"; // Limit of 1000 daily requests

//
function RetriveData() {
    hideErrors(); // Hide all error messages, new request

    /* As long as all spaces/commas have been removed, API can handle singular location
    // Get all the user entered data
    var city = document.getElementById("userCity").value;
    var state = document.getElementById("userState").value;
    var country = document.getElementById("userCountry").value;
    */

    // Get the user-inputed location
    var location = document.getElementById("location").value;

    // Build the request, 
    var request = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        + removeSpace(location) + "?unitGroup=" + "us" + "&key=" + API_KEY + "&contentType=json";
    /* TODO: Request Building
        Different Format - Allow longitude and latitudes
        Time - Start and end date
          Date Range example: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-10-01/2020-12-31?key=YOUR_API_KEY 
        Temperature units - unitGroup=us/metric (Fahrenheit or Celcius)
    */

    // Get the parent HTML element where the data will be displayed (to show/hide)
    var weatherForecast = document.getElementById("weatherReport");

    // Using the user's location request, fetch data from the weather API
    fetch(request, {
        method: 'GET',
        headers: {
        },
    }).then(response => {
        // If the response isn't ok, throw error
        if (!response.ok) {
            throw response;
        }
        return response.json(); // parse the result as JSON

    }).then(response => {
        // response now contains parsed JSON ready for use
        processWeatherData(response); // Put the weather data into the HTML elements
        weatherForecast.style.display = "flex"; // Show the Weather Forecast

    }).catch((errorResponse) => {
        console.log(errorResponse); // The entire contents of the error
        if (errorResponse.text) {
            errorResponse.text().then(errorMessage => {
                // Log the error message to the console
                console.log(errorMessage);

                // Hide the weatherForecast, there is no valid data to show
                weatherForecast.style.display = "none";

                /* TODO: Error Handling
                 (400) Bad API Request:Invalid location parameter value.
                 https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Rexburg%2CNY?unitGroup=us&key=6X6AN44CEB6825G9TBEL9H235&contentType=json
                 
                 (401) No API key or session found. Please verify that your API key parameter is correct.
                 https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
                */

                // Figure out which error message to display
                var error;

                // If unauthorized,
                if (errorResponse.status == 401) {
                    // Show API error to the user
                    error = document.getElementById(ErrorIDs[4]);
                }
                // If bad request (invalid location, not formatted right)
                else if (errorResponse.status == 400) {
                    // Show invalidLocation error to the user
                    error = document.getElementById(ErrorIDs[3]);
                }
                else {
                    // Unexpected/not specifed error
                    error = document.getElementById(ErrorIDs[0]);
                }

                // Display the error
                error.style.display = "flex";
            })
            var errorCode = errorResponse.status;
            console.log(errorCode);
        } else {
            // There is no additional error information (Unexpected error)
            document.getElementById(ErrorIDs[0]).style.display = "flex";
        }
    });
}