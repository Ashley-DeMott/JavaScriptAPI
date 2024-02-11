# JavaScriptAPI
## Overview
A project that displays data from a weather API on a page using JavaScript. The user can enter any location, and Visual Crossing's weather API will return the forecasted weather for the next few days. The webpage only displays the next 7 days of data, but could be adjusted to show more days and user-specified time periods.

My goal was to learn how to use JavaScript and APIs for developing websites. This taught me a lot about functions, and how HTML elements can be found by their class name or id. I also learned how fetch statements can be chained together with many then and catch statements.

[Software Demo Video - TBD]()

## Development Environment
- Visual Studio Code for editing HTML, CSS, and JS files
- CMD terminal to install npm packages

## Useful Websites
- [Amazon AWS - What is an API?](https://aws.amazon.com/what-is/api/)
- [W3 Schools - JavaScript](https://www.w3schools.com/js/default.asp)
- [VisualCrossing Weather Documentation](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)

## Future Work
- Dynamically create/delete HTML elements based on the number of days returned in the query response (currenlty gets 15 days, shows 7)
- Allow the user to specify the time period they want to look at
- Allow user to choose what data they see (temperature, wind, air pressure, etc) (see [Visual Crossing - Adding/Removing query elements](https://www.visualcrossing.com/resources/documentation/weather-data/adding-and-removing-elements-from-your-weather-query/) to make more specific queries)
- Create a graph with Chart.js to show changes in high and low temperatures over the time period (see [Chart.js - Multi Axis Line Chart](https://www.chartjs.org/docs/latest/samples/line/multi-axis.html))
