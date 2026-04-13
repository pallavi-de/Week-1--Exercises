
const collegeLat = 17.253173;
const collegeLng = 74.175590;

const map = L.map('map').setView([collegeLat, collegeLng], 17);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);


const satelliteLayer = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
);


L.control.layers({
  "Street": map._layers[Object.keys(map._layers)[0]],
  "Satellite": satelliteLayer
}).addTo(map);


const gateIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30]
});

const canteenIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
  iconSize: [30, 30]
});

const libraryIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
  iconSize: [30, 30]
});

const parkingIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconSize: [30, 30]
});

const officeIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  iconSize: [30, 30]
});


L.marker([collegeLat, collegeLng])
  .addTo(map)
  .bindPopup("<b>Yashwantrao Mohite Institute of Management</b><br>Karad")
  .openPopup();



L.marker([17.253300, 74.175700], { icon: gateIcon })
  .addTo(map)
  .bindPopup("<b>Main Gate</b>");

L.marker([17.253100, 74.175500], { icon: canteenIcon })
  .addTo(map)
  .bindPopup("<b>Canteen</b>");


L.marker([17.253250, 74.175650], { icon: libraryIcon })
  .addTo(map)
  .bindPopup("<b>Library</b>");


L.marker([17.253050, 74.175750], { icon: parkingIcon })
  .addTo(map)
  .bindPopup("<b>Parking</b>");

L.marker([17.253200, 74.175600], { icon: officeIcon })
  .addTo(map)
  .bindPopup("<b>Admin Office</b>");