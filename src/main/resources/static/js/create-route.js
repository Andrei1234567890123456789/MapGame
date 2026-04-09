
let lastPointIndex = -1;
let routeName = null;
let description = '';
let points = [];

//UI
let sideMenu = document.getElementById('side-menu');
let content = document.createElement("div");

let sideMenuOpen = false;
let container = document.getElementById('side-menu-container');

class Point{
    constructor(latitude, longitude, landmark){
        this.latitude = latitude;
        this.longitude = longitude;
        this.directions = '';
        if(landmark != null){
            this.hasLandmark = true;
            this.landmark = landmark;
        }else{
            this.hasLandmark = false;
            this.landmark = null;
        }        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showMap("myMap", 0, 0, "You");
    manageSideMenu();
    loadAllLandmarks();

    map.on("mousemove", function (e) {
    const { lat, lng } = e.latlng;

    // Update text
    coordBox.innerHTML = `
        Lat: ${lat.toFixed(5)}<br>
        Lng: ${lng.toFixed(5)}
    `;

    // Move with cursor
    coordBox.style.left = e.originalEvent.pageX + "px";
    coordBox.style.top = e.originalEvent.pageY + "px";
});

map.on("click", function (e) {
    const { lat, lng } = e.latlng;

    addPoint(lat, lng);
});

map.on("mouseout", () => {
    coordBox.style.display = "none";
});

map.on("mouseover", () => {
    coordBox.style.display = "block";
});
});


const coordBox = document.getElementById("coord-box");



function addPoint(lat, lng) {
    console.log("mouse clicked on: "+lat + " " + lng);

    let p = new Point(lat, lng, null);

    const dot = L.circleMarker([lat, lng], {
        radius: 5,            // size
        color: "black",       // border color
    }).addTo(map);

    if(lastPointIndex >= 0){
        const lastLat = points[lastPointIndex].latitude;
        const lastLng = points[lastPointIndex].longitude;

        const line = L.polyline([
            [lastLat, lastLng],
            [lat, lng]
        ], {
            color: "blue",     // line color
            weight: 4,         // thickness
            opacity: 0.9,      // transparency
            dashArray: "5, 10" // dashed line
        }).addTo(map);
    }
    points.push(p);
    addPointToMenu(p);
    lastPointIndex++;
}
async function createRoute(landmark) {
    //very ugly redirection, cuz its easier to redefine the onclick function
    addLandmarkPoint(landmark);
}

async function addLandmarkPoint(landmark) {
    if(landmark.image == null) await landmark.loadImage();
    const lat = landmark.latitude;
    const lng = landmark.longitude;

    console.log("mouse clicked on landmark: " + landmark.title + " " +lat + " " + lng);

    let p = new Point(lat, lng, landmark);

    if(lastPointIndex >= 0){
        const lastLat = points[lastPointIndex].latitude;
        const lastLng = points[lastPointIndex].longitude;

        const line = L.polyline([
            [lastLat, lastLng],
            [lat, lng]
        ], {
            color: "blue",     // line color
            weight: 4,         // thickness
            opacity: 0.9,      // transparency
            dashArray: "5, 10" // dashed line
        }).addTo(map);
    }
    points.push(p);
    addPointToMenu(p);
    lastPointIndex++;
}

function saveRoute(){
    if(routeName == null){
        alert("The route must have a name.");
        return;
    }
    if(points.length <= 1){
        alert("The route must go trough at least 2 points. Left click on a landmark or a blank space to create a point.");
        return;
    }
    // alert("Запазването на пътя в базата данни още не е готово.")

    const cleanPoints = points.map(p => ({
        latitude: p.latitude,
        longitude: p.longitude,
        directions: p.directions || '',
        landmarkId: p.landmark ? p.landmark.landmarkId : null
    }));
    console.log("creating route...");
    console.log(JSON.stringify({
            name: routeName,
            description: description,
            points: cleanPoints
        }));

    fetch('/routes/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: routeName,
            description: description,
            points: cleanPoints
        })
    });
    alert("Route Saved");
    location.reload();
}

function manageSideMenu(){
    const nameInputForm = document.createElement("form");
    const nameInputlabel = document.createElement("label");
    const nameInput = document.createElement("input");
    const nameInputButton = document.createElement("button");

    nameInputlabel.textContent = "Route Name:";
    nameInputlabel.htmlFor = "userInput";
    nameInput.type = "text";
    nameInput.id = "userInput";
    nameInputButton.type = "submit";
    nameInputButton.textContent = "Save";
    nameInputButton.className = "create-button";

    const descriptionInputForm = document.createElement("form");
    const descriptionInputlabel = document.createElement("label");
    const descriptionInput = document.createElement("textarea");
    const descriptionInputButton = document.createElement("button");

    descriptionInputlabel.textContent = "Route Description:";
    descriptionInputlabel.htmlFor = "userInput";
    descriptionInput.type = "text";
    descriptionInput.id = "userInput";
    descriptionInput.rows = '5';
    descriptionInputButton.type = "submit";
    descriptionInputButton.textContent = "Save";
    descriptionInputButton.className = "create-button";

    nameInputForm.appendChild(nameInputlabel);
    nameInputForm.appendChild(nameInput);
    nameInputForm.appendChild(nameInputButton);

    descriptionInputForm.appendChild(descriptionInputlabel);
    descriptionInputForm.appendChild(descriptionInput);
    descriptionInputForm.appendChild(descriptionInputButton);

    nameInputForm.addEventListener("submit", function(event){
        event.preventDefault();

        routeName = nameInput.value;
        nameInputlabel.textContent = "Route Name:" + routeName;
    });

    descriptionInputForm.addEventListener("submit", function(event){
        event.preventDefault();

        description = descriptionInput.value;
        descriptionInputlabel.textContent = "Route Description:" + description;
    });
    content.appendChild(nameInputForm);
    content.appendChild(descriptionInputForm);
    sideMenu.appendChild(content);
    openSideMenu(content);

}
function addPointToMenu(point){
    if(lastPointIndex < 0){
        const createBtn = document.createElement("button");
        createBtn.textContent = "Create Route"
        createBtn.className = "create-button";
        createBtn.onclick = saveRoute;
        content.appendChild(createBtn);
    }

    const pointHTML = createPointHTML(point);
    content.appendChild(pointHTML);
}

function createPointHTML(point){
    const pointContainer = document.createElement("div");
        pointContainer.className = "point-container";

        const coords = document.createElement("p");
        coords.textContent = point.latitude + ", " + point.longitude;

        if(point.landmark != null){
                const image = document.createElement("img");
                image.src = point.landmark.image;
                image.style.width = "10%";
                image.style.height = "auto";

                const title = document.createElement("p");
                title.textContent = point.landmark.title;

                pointContainer.appendChild(image);
                pointContainer.appendChild(title);
        }

        const directionsInputForm = document.createElement("form");
        const directionsInputlabel = document.createElement("label");
        const directionsInput = document.createElement("input");
        const directionsInputButton = document.createElement("button");

        directionsInputlabel.textContent = "Directions:";
        directionsInputlabel.htmlFor = "userInput";
        directionsInput.type = "text";
        directionsInput.id = "userInput";
        directionsInputButton.type = "submit";
        directionsInputButton.textContent = "Save";
        directionsInputButton.className = "create-button";

        directionsInputForm.appendChild(directionsInputlabel);
        directionsInputForm.appendChild(directionsInput);
        directionsInputForm.appendChild(directionsInputButton);

        directionsInputForm.addEventListener("submit", function(event){
            event.preventDefault();

            point.directions = directionsInput.value;
            directionsInputlabel.textContent = "Directions:" + point.directions;
        });
        pointContainer.appendChild(coords);
        pointContainer.appendChild(directionsInputForm);

    return pointContainer;
}

async function openSideMenu(child){
   sideMenuOpen = true;

 

    container.appendChild(child);
    sideMenu.style.zIndex = 1000;
    sideMenuOpen = true;
}