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

//I will make buttons where it would select coffees