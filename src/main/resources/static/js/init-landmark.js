let landmarks = [];

class landmark{
    constructor(latitude, longitude, image, title, description, status, audio){
        this.latitude = latitude;
        this.longitude = longitude;
        this.icon = L.icon({
            iconUrl: image,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            className: 'rounded-marker'
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

        // const circle = L.circle([latitude, longitude], {
        //     radius: interactionRadius,
        //     color: 'red'
        // }).addTo(map);

        landmarks.push(this);
        this.audio = audio; // has to be a new Audio() oject
    }
}


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