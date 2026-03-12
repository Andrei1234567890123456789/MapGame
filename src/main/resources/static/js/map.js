// Replace with your Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFuaWFuaWEiLCJhIjoiY21tamZmOTN0MTczODJxc29hMGQ5dThlMiJ9.p1HwbokXt5p29SirSKh3_g';

//state variables
let landmarks = [];
const interactionRadius = 50;
//default coords: sofia center(serdika)
let currentLatitude = 42.6977;
let currentLongitude = 23.3219;
let map;
let playerMarker;

//route
let hasOpenRoute = false;
let currentRoute;
let currentRouteTarget;
let currentRouteStart;
const routeUpdateDistance = 10;

//UI
let sideMenu = document.getElementById('side-menu');
let sideMenuOpen = false;
let container = document.getElementById('side-menu-container');


class landmark{
    constructor(latitude, longitude, image, title, description, status, audio){
        this.latitude = latitude;
        this.longitude = longitude;
        this.icon = L.icon({
            iconUrl: image,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        this.marker = L.marker([latitude, longitude], {
            icon: this.icon
        }).addTo(map);
        this.marker.on('click', () => createRoute(this));
        this.image = image;
        this.title = title;
        this.description = description;
        this.active = false;
        this.status = status;

        const circle = L.circle([latitude, longitude], {
            radius: interactionRadius,
            color: 'red'
        }).addTo(map);

        landmarks.push(this);
        this.audio = audio; // has to be a new Audio() oject
    }
}
// Initialize the map
function showMap(){
    map = L.map('myMap').setView([currentLatitude, currentLongitude], 14);
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

document.addEventListener("DOMContentLoaded", () => {
    showMap("myMap", 0, 0, "You");
    // trackPosition();
    manageSideManu();
    loadAllLandmarks();
});

function loadAllLandmarks(){
    fetch("/getLandmarks")
    .then(res => res.json())
    .then(data => {

        data.forEach(l => {
            // (latitude, longitude, image, title, description, status, audio)
            const imageUrl = `/getLandmarks/${l.landmarkId}/image`;
            const audioObj = new Audio(`/getLandmarks/${l.landmarkId}/audio`);

            new landmark(
                l.latitude,
                l.longitude,
                imageUrl,
                l.title,
                l.description,
                l.status,
                audioObj
            );

        });

    })
    .catch(err => console.error("Failed to load landmarks:", err));
}


// Optional: simulate player movement
document.addEventListener('keydown', e => {
    // if(currentRoute){
    //     map.removeControl(currentRoute);
    //     hasOpenRoute = false;
    // }
    // let pos = playerMarker.getLatLng();
    if(e.key === 'w') currentLatitude += 0.0005;
    if(e.key === 's') currentLatitude -= 0.0005;
    if(e.key === 'd') currentLongitude += 0.0005;
    if(e.key === 'a') currentLongitude -= 0.0005;

    if(e.key == "h"){
        const l = new landmark(currentLatitude, currentLongitude + 0.001, "images/RaykoGaranow.jpg",
            "Къщата на Райко Гаранов ул. Дунав 2",
            "Един от най-красивите софийски домове пази историите за интригуващи личности и драматични събития, оставили следи върху развитието на София и цяла България. Сградата е била собственост на Райко Горанов от Тетевен, университетски преподавател и професор по латински и древногръцки, голям дарител на университетската библиотека и съхранен в спомените на своите студенти като тайнствена и елегантна личност. Снажен и сдържан в поведението си, професорът е бил на 43 години, когато неговата изящна къща е завършена. Днес сградата е обновена, така че да отразява оригиналната си красота и да бъде една от тайните находки на София. Великолепните фасади са дело на архитект Карл Хайнрих (роден в Бохемия и учил в германския град Цитау) и скулптура Андреас Грайс (виенчанин, завършил образованието си в родния град). И двамата улавят строителния дух на българските градове след Освобождението и избират да работят и творят в София в продължение на десетилетия и до края на живота си. В тази архитектурна задача двамата не пестят украса за да подчертаят прозорците и главния вход с хармонични извивки, цветя, листа и елегантни женски фигури, с които изпълват фасадите и ги правят уникални за цяла София. Уличната фасада е симетрична, докато фасадата към прилежащия двор е по-раздвижена в съответствие с идеите на сецесиона. Главният ход е разположен в изнесен напред ризалит, декориран с годината на сградата и разярена лъвска глава."
        , "free to visit", new Audio("audio/vine-boom.mp3"));
    }
    if(e.key == "r"){
        createRoute(landmarks[0]);
    }
    if(e.key == "t"){
        createMultiRoute(landmarks);
    }

    updatePlayerPosition();
});

function updatePlayerPosition() {

    // navigator.geolocation.getCurrentPosition(
    //     function(position) {

    //         const lat = position.coords.latitude;
    //         const lng = position.coords.longitude;

    //         currentLatitude = lat;
    //         currentLongitude = lng;

    //         console.log("position updated to: "+ lat + ", " + lng);

    //         if (playerMarker) {
    //             playerMarker.setLatLng([lat, lng]);
    //             map.setView([lat, lng]);
    //         }

    //     },
    //     function(error) {
    //         console.error("Error getting location:", error);
    //     },
    //     {
    //         enableHighAccuracy: true
    //     }
    // );
    checkInteractions();
    playerMarker.setLatLng([currentLatitude, currentLongitude]);
    map.setView([currentLatitude, currentLongitude]);

    if(hasOpenRoute){
        if(map.distance(L.latLng(currentLatitude, currentLongitude), currentRouteStart) >= routeUpdateDistance){
            createRoute(currentRouteTarget);
        }
        // console.log(map.distance(L.latLng(currentLatitude, currentLongitude), currentRouteStart));
    }
}

function trackPosition() {

    navigator.geolocation.watchPosition(
        function(position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            currentLatitude = lat;
            currentLongitude = lng;

            console.log("position updated to: "+ lat + ", " + lng);

            // playerMarker.setLatLng([lat, lng]);
            // map.setView([lat, lng]);
            updatePlayerPosition();

        },
        function(error) {
            console.error("Error getting location:", error);
        },
        {
            enableHighAccuracy: true
        }
    );

}

function createRoute(landmark){
    if(hasOpenRoute){
        map.removeControl(currentRoute);
        currentRouteTarget = null;
        currentRoute = null;
        hasOpenRoute = false;
    }

    console.log("creating a route");

    currentRouteTarget = landmark;
    currentRouteStart = L.latLng(currentLatitude, currentLongitude);
    currentRoute = L.Routing.control({
        waypoints: [
            currentRouteStart,
            L.latLng(currentRouteTarget.latitude, currentRouteTarget.longitude)
        ],
        router: L.Routing.mapbox(MAPBOX_TOKEN),
        lineOptions: {
            styles: [{ color: 'red', weight: 4 }]
        },

        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        show: true,
        createMarker: () => null
        
    }).addTo(map);
    hasOpenRoute = true;
}

function createMultiRoute(arr){
     //TODO;
}

function checkInteractions(){

    const playerPos = L.latLng(currentLatitude, currentLongitude);

    landmarks.forEach(obj => {

        const objPos = L.latLng(obj.latitude, obj.longitude);

        const distance = map.distance(playerPos, objPos);
        // console.log(distance);

        if(distance <= interactionRadius && !obj.active){
            showPopupMenu(obj);
            obj.active = true;
        }

        if(distance > interactionRadius){
            obj.active = false;
        }

    });

}

function manageSideManu(){
    const closeBtn = document.getElementById('side-menu-close');
    closeBtn.onclick = closeSideMenu;

}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function openSideMenu(child){
    if(sideMenuOpen){
        closeSideMenu();
    }
    sideMenuOpen = true;
    let containerShift = -100;
    sideMenu.style.left = containerShift+'%';
    container.appendChild(child);
    sideMenu.style.zIndex = 1000;
    sideMenuOpen = true;
    for(let i = 0; i < 100; i++){
        containerShift++;
        sideMenu.style.left = containerShift+'%';
        await delay(10);
    }
    sideMenu.style.left = '2.5%';

    

}

function closeSideMenu() {
    console.log("menu closed");
    sideMenu.style.zIndex = 0;
    container.innerHTML = "";
    sideMenuOpen = false;
}

function showPopupMenu(landmark) {
    landmark.audio.play();

    const content = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = landmark.title;

    const status = document.createElement("p");
    status.textContent = "Status: " + landmark.status;

    const image = document.createElement("img");
    image.src = landmark.image;
    image.style.width = "80%";
    image.style.height = "auto";

    const description = document.createElement("p");
    description.textContent = landmark.description;

    content.appendChild(title);
    content.appendChild(status); 
    content.appendChild(image);
    content.appendChild(description);

    openSideMenu(content);
}		