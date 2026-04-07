

//state variables
const interactionRadius = 50;
//default coords: sofia center(serdika)


//route
let hasOpenRoute = false;
let currentRoute;
let currentRouteTarget;
let currentRouteStart;
const routeUpdateDistance = 10;


document.addEventListener("DOMContentLoaded", () => {
    showMap("myMap", 0, 0, "You");
    // trackPosition();
    manageUi();
    loadAllLandmarks();
    loadImagesInsideMapView();
});

async function loadImagesInsideMapView() {
    const bounds = map.getBounds();

    while(true){

        for(let i = 0; i < landmarks.length; i++){
            if(landmarks[i].image != null) continue;

            const landmark = landmarks[i];
            
            const point = L.latLng(landmark.latitude, landmark.longitude);

            if(bounds.contains(point) && map.getZoom() >= 15){
                landmark.loadImage();
            }
        }
        await delay(1000);
    }
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
        const l = new landmark(currentLatitude, currentLongitude + 0.001, -1,
            "Къщата на Райко Гаранов ул. Дунав 2",
            "Един от най-красивите софийски домове пази историите за интригуващи личности и драматични събития, оставили следи върху развитието на София и цяла България. Сградата е била собственост на Райко Горанов от Тетевен, университетски преподавател и професор по латински и древногръцки, голям дарител на университетската библиотека и съхранен в спомените на своите студенти като тайнствена и елегантна личност. Снажен и сдържан в поведението си, професорът е бил на 43 години, когато неговата изящна къща е завършена. Днес сградата е обновена, така че да отразява оригиналната си красота и да бъде една от тайните находки на София. Великолепните фасади са дело на архитект Карл Хайнрих (роден в Бохемия и учил в германския град Цитау) и скулптура Андреас Грайс (виенчанин, завършил образованието си в родния град). И двамата улавят строителния дух на българските градове след Освобождението и избират да работят и творят в София в продължение на десетилетия и до края на живота си. В тази архитектурна задача двамата не пестят украса за да подчертаят прозорците и главния вход с хармонични извивки, цветя, листа и елегантни женски фигури, с които изпълват фасадите и ги правят уникални за цяла София. Уличната фасада е симетрична, докато фасадата към прилежащия двор е по-раздвижена в съответствие с идеите на сецесиона. Главният ход е разположен в изнесен напред ризалит, декориран с годината на сградата и разярена лъвска глава."
        , "free to visit", -1);
        l.image = "images/RaykoGaranow.jpg";
        l.audio = new Audio("audio/vine-boom.mp3");
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
    checkInteractions();
    playerMarker.setLatLng([currentLatitude, currentLongitude]);
    map.setView([currentLatitude-viewOffset, currentLongitude], 15);

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

