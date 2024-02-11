// Writing requests for the weather API
// https://www.visualcrossing.com/resources/blog/five-easy-weather-api-calls-to-get-the-weather-data-you-need/

const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Process the json weather data, updating the respective HTML elements
function displayData(response) {
    var days = response.days;

    // Get the starting DOW
    // TODO: Assumes data starts with user's current date
    var today = new Date();
    var currentDOW = today.getDay();

    // Get the location from the response
    var weatherLocation = document.getElementById("weatherLocation");
    weatherLocation.innerHTML = "Weather for " + response.resolvedAddress;

    // For each day in the HTML, (Only 7, but requests 15)
    // TODO: Generate HTML sections based on number of days in response
    var day_elements = document.getElementsByClassName("day");
    for (let i = 0; i < day_elements.length; i++) {
        // Insert the retrieved datetime into the day's time/date
        var date = day_elements[i].querySelector(".day__info").querySelector(".day__info__date");
        date.innerHTML = days[i].datetime;

        // Put the current day of the week TODO: Calculate starting dow from the response's first day's date/each date separately
        var dow = day_elements[i].querySelector(".day__info").querySelector(".day__info__dow");
        dow.innerHTML = DOW[currentDOW];
        currentDOW = (currentDOW + 1) % 7; // Move to next dow, ensuring value stays between 0 - 6

        // Insert the retrieved tempmax into the day's high temp
        var highTemp = day_elements[i].querySelector(".day__temps").querySelector(".temp--high").querySelector(".temp--high__value");
        highTemp.innerHTML = days[i].tempmax;

        // Insert the retrieved tempmin into the day's low temp
        var lowTemp = day_elements[i].querySelector(".day__temps").querySelector(".temp--low").querySelector(".temp--low__value");
        lowTemp.innerHTML = days[i].tempmin;
    }
}

// The ids for the HTML elements representing error messages
const ErrorIDs = ["unexpectedError", "connectionError", "custom", "invalidLocation", "API"];

// Hide all HTML elements with the specified error IDs
function hideErrors() {
    for (let i = 0; i < ErrorIDs.length; i++) {
        var error = document.getElementById(ErrorIDs[i]);
        error.style.display = "none";
    }
}

function hideWeatherReport() {
    document.getElementById("weatherReport").style.display = "none";
    document.getElementById("weatherLocation").style.display = "none";
}

// Format a string for use in a URL
function removeSpaces(string) {
    // Any spaces must be replaced with % 20, commas with % 2C
    string.replace(/\s+/g, "%20");
    string.replace(',', "%2C");
    return string;
}

const API_KEY = "6X6AN44CEB6825G9TBEL9H235"; // Limit of 1000 daily requests

// Retrieve weather data related to the user's entered location
function fetchData() {
    hideErrors(); // Hide all error messages, a new request

    // Get the user entered location
    var location = document.getElementById("location").value;

    // Build the request, 
    var request = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        + removeSpaces(location) + "?unitGroup=" + "us" + "&key=" + API_KEY + "&contentType=json";
    /* TODO: Building more types of requests
        Different Formats - Allow longitude and latitudes
        Time - Start and end date
          Date Range example: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-10-01/2020-12-31?key=YOUR_API_KEY 
        Temperature units - unitGroup=us/metric (Fahrenheit or Celcius) (would also need to be reflected on the page)
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
    }).then(response => { // response now contains parsed JSON ready for use
        console.log(response);
        weatherForecast.style.display = "flex"; // Show the Weather Forecast
        document.getElementById("weatherLocation").style.display = "flex"; // Show the weather title (TODO: Rearrange HTML)
        displayData(response); // Put the weather data into the HTML elements

    }).catch((errorResponse) => {
        console.log(errorResponse); // The entire contents of the error
        if (errorResponse.text) {
            errorResponse.text().then(errorMessage => {
                // Log the error message to the console
                console.log(errorMessage);

                // Hide the weatherForecast, there is no valid data to show
                hideWeatherReport();

                /* TODO: More Error Handling
                 (400) Bad API Request:Invalid location parameter value.
                 Example request: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Rexburg%2CNY?unitGroup=us&key=6X6AN44CEB6825G9TBEL9H235&contentType=json
                 
                 (401) No API key or session found. Please verify that your API key parameter is correct.
                 Example request: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
                */

                // Figure out which error message to display
                var error;
                var statusCode = errorResponse.status;

                switch (statusCode) {
                    case 400: // If bad request (invalid location, not formatted right)
                        // Show invalidLocation error to the user
                        error = document.getElementById(ErrorIDs[3]);
                        break;
                    case 401: // If unauthorized,
                        // Not accessible, Show API error to the user
                        error = document.getElementById(ErrorIDs[4]);
                        break;
                    // A connection-based error
                    case 408:
                    case 500:
                    case 502:
                    case 504:
                        // Specify type of error to the user
                        // TODO: Could do this for all
                        error = document.getElementById(ErrorIDs[2]);
                        error.innerText = errorResponse.text;
                        break;
                    default:
                        // Unexpected/not specifed error
                        console.log("Unhandled " + errorResponse.status);
                        error = document.getElementById(ErrorIDs[0]);
                }

                // Display the specified error
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