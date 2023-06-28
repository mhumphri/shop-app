# Mic's Portfolio

Hi. This is my web development portfolio. It currently includes examples of Javascript, React, Redux, React Router CSS, JSX, Day.js, Turf (geospatial library) and Google maps Javascript API integration. Create React App has been used to handle webpack, Babel and ESLint.   

The live version of the site can be found at https://micsportfolio.com 

If you'd like to contact me, please email humphries_michael@hotmail.com  

### `Hotel app`

Hotel app is a mock up search page and server for a hotel booking app. The search page displays a list of hotels and a map with corresponding markers. Users can search hotels by entering a location or by navigating the map and select them either by clicking on a result from a list or by clicking on a map marker. Over 4000 city and country options are available which can be filtered using a text input and dropdown menu. React Router has been used to handle navigation and Redux is used to handle state management between routes.

The "server" component of the app uses a range of data (geographic, population and economic) to return an array of hotel data which includes location, prices, photos and map coordinates. Javascript promises are used to communcate between the front end and back end components.   

Libraries/fameworks used:

* React
* Redux (react-redux and redux toolkit)
* React Router
* Google Maps Javascript API
* Turf (geospatial library)

### `Datepickers`

Datepickers contains a set of responsive datepicker inputs. 3 different views are included: (1) vertical axis picker; (2) single-panel horizontal picker (best for mobile screens) and double-panel horizontal picker. Calendar data is generated internally within the component and manipulated and queried using Day.js.

Libraries/fameworks used:

* React
* Day.js

### `Widgets`

Widgets contains a set of rangeslider inputs. The simple slider is a one-handled slider which returns values 0 to 100 when moving along a track. Further functionality has been added by restricting number selection to discrete intervals, adding a second handle which allows the user to select both ends of the range and adding a bar chart which can be used to show the underlying data distribution.

Libraries/fameworks used:

* React


## Testing

The site has been tested on recent versions of: 

* Firefox, Chrome & Safari (mac desktop)
* Firefox, Chrome & Safari (iOS)
* Chrome & Edge (windows desktop)
* Firefox & Chrome (android) 
