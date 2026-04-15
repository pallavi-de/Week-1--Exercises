
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("sidebar").classList.toggle("active");
};


const map = L.map('map').setView([18.5204, 73.8567], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


const hospitalIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2967/2967350.png',
  iconSize: [30, 30]
});

const parkIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30]
});


const cluster = L.markerClusterGroup();


let heatPoints = [];


fetch('data/places.json')
.then(res => res.json())
.then(data => {

  data.forEach(place => {

    let icon = place.type === "hospital" ? hospitalIcon : parkIcon;

    let marker = L.marker([place.lat, place.lng], {icon})
      .bindPopup(place.name);

    marker.type = place.type;

    cluster.addLayer(marker);

    heatPoints.push([place.lat, place.lng, 0.5]);
  });

  map.addLayer(cluster);

  
  L.heatLayer(heatPoints).addTo(map);
});


document.getElementById("hospitalToggle").onchange = filterMarkers;
document.getElementById("parkToggle").onchange = filterMarkers;

function filterMarkers() {
  cluster.clearLayers();

  fetch('data/places.json')
  .then(res => res.json())
  .then(data => {

    data.forEach(place => {

      if (
        (place.type === "hospital" && hospitalToggle.checked) ||
        (place.type === "park" && parkToggle.checked)
      ) {

        let icon = place.type === "hospital" ? hospitalIcon : parkIcon;

        let marker = L.marker([place.lat, place.lng], {icon})
          .bindPopup(place.name);

        cluster.addLayer(marker);
      }
    });

  });
}


document.getElementById("searchBox").addEventListener("keypress", function(e) {

  if (e.key === "Enter") {

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.value}`)
    .then(res => res.json())
    .then(data => {

      if (data.length > 0) {
        let lat = data[0].lat;
        let lon = data[0].lon;

        map.flyTo([lat, lon], 14);
      }
    });
  }
});

let points = [];

document.getElementById("distanceBtn").onclick = () => {
  points = [];
  alert("Click 2 points on map");
};

map.on("click", function(e) {

  if (points.length < 2) {
    points.push(e.latlng);

    if (points.length === 2) {
      let dist = map.distance(points[0], points[1]) / 1000;
      alert("Distance: " + dist.toFixed(2) + " km");
    }
  }
});

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
  draw: { polygon: true },
  edit: { featureGroup: drawnItems }
});

document.getElementById("drawBtn").onclick = () => {
  map.addControl(drawControl);
};

map.on(L.Draw.Event.CREATED, function (e) {
  let layer = e.layer;
  drawnItems.addLayer(layer);

  console.log("Coordinates:", layer.getLatLngs());
});