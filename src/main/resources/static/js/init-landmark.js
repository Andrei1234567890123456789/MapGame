let landmarks = [];

const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    // shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

class landmark{
    constructor(latitude, longitude, imageId, title, description, status, audioId){
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
        this.description = description;
        this.active = false;
        this.status = status;

        this.imageId = imageId;
        this.audioId = audioId;
        this.image = null;
        this.audio = null; // has to be a new Audio() oject

        this.marker = L.marker([latitude, longitude], {
            icon: redIcon
        }).addTo(map);

        this.marker.bindTooltip(this.title, {
            permanent: true,
            direction: 'top',
            offset: [0, -40]
        });

        this.marker.on('click', () => createRoute(this));

        landmarks.push(this);
    }
    async loadImage(){
        if (this.image) return; // already loaded

        const imageUrl = `/images/${this.imageId}`;
        this.image = imageUrl;

        // update marker icon dynamically
        this.icon = L.icon({
            iconUrl: imageUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            className: 'rounded-marker'
        });

        this.marker.setIcon(this.icon);
    }

    async loadAudio() {
        if (this.audio) return;

        this.audio = new Audio(`/audio/${this.audioId}`);
    }
}

function loadAllLandmarks() {
    fetch("/getLandmarks")
        .then(res => res.json())
        .then(data => {

            data.forEach(l => {
                new landmark(
                    l.latitude,
                    l.longitude,
                    l.imageId,
                    l.title,
                    l.description,
                    l.status,
                    l.audioId
                );
            });

        })
        .catch(err => console.error("Failed to load landmarks:", err));
}