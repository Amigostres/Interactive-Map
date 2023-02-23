//this will check is the browser supports Geolocation
if (navigator.geolocation) {
    //if it does then it will 
    navigator.geolocation.getCurrentPosition(showMap) //activates map using leaflet
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  

  function showMap(position) {//this will get user's x,y cordinates
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + " Longitude: " + longitude)// logs the cords so I can see it
    
      //this is the leaflet map to my location
      var map = L.map('map').setView([latitude, longitude], 13);
      var marker = L.marker([latitude, longitude]).addTo(map);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
  }

// get foursquare businesses
async function getFoursquare(business) {
  const options = {
  method: 'GET',
  headers: {
  Accept: 'application/json',
  Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
  }
  }
  let limit = 4
  let position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
  let data = await response.text()
  let parsedData = JSON.parse(data)
  
  let businesses = parsedData.results
  return businesses
  }



//search button
async function searchLocation () {
  let selectedLocation = document.getElementById(`Locations`).value // get the value of the drop down
  console.log(selectedLocation)
  
  let businesses = await getFoursquare(selectedLocation)
  console.log(businesses);
  businesses.forEach(function(business) {
    addMarker(business.latitude, business.longitude);
  });
}


function addMarker(lat, lng) { // this will add new markers to the map
  var marker = L.marker([lat, lng]).addTo(map);
}