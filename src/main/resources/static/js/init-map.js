// Replace with your Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFuaWFuaWEiLCJhIjoiY21tamZmOTN0MTczODJxc29hMGQ5dThlMiJ9.p1HwbokXt5p29SirSKh3_g';

let currentLatitude = 42.6977;
let currentLongitude = 23.3219;
let map;
let playerMarker;

// Initialize the map
function showMap(){
    map = L.map('myMap').setView([currentLatitude, currentLongitude], 15);
    // Add Mapbox tiles
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        tileSize: 512,
        zoomOffset: -1,
        id: 'mapbox/streets-v11', // Change style if you want
        accessToken: MAPBOX_TOKEN
    }).addTo(map);

    // Add player marker
    playerMarker = L.marker([currentLatitude, currentLongitude]).addTo(map);
}
