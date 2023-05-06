const modalContent = {
  hotelApp: {
    name: "Hotel App",
    description: ['This portfolio item is a mock up of a search page and server for a hotel booking app. The search page displays a list of hotels and a map with corresponding markers. Users can search for hotels by selecting a country or by navigating the map. The "server" component of the app returns an array of hotels with randomly generated coordinates based on either the selected country or current map bounds.'],
      libraries: ['React', 'Create React App', 'Redux', 'Google Maps Javascript API', 'turf', 'land polygon data', 'country polygon data'],
      githubHref: "https://github.com/mhumphri/micsportfolio",
  },
  swipeableGallery: {
    name: "Swipeable Gallery",
    description: ['This portfolio item is a carrousel-style image gallery which can be viewed either by swiping a touchscreen/trackpad or clicking chevron buttons which appear when the user hovers over the gallery. Current position and movement through the gallery are shown by a group of animated dost which are highlighted and scale up and down as the user moves from one image to the next.'],
    libraries: ['React', 'Create React App'],
    issues: ['In Safari browser (desktop version) I have not been able to prevent overscrolling from causing the browser to navigate to the previous/next page when the user swipes more at both ends of the carrousel.'],
    githubHref: "https://github.com/mhumphri/micsportfolio",
  },
  rangeSlider: {
    name: "Rangeslider",
    description: ['This portfolio item contains a set of rangeslider number inputs. In the simple case, a single handle is moved along a track to select a number from the range. Further functionality has been added by restricting the number selection to discrete intervals, adding a second handle which allows the user to select both ends of the range and adding a bar chart which can be used to show the underlying data distribution.'],
    libraries: ['React', 'Create React App'],
    githubHref: "https://github.com/mhumphri/micsportfolio",
  },


}

export default modalContent;