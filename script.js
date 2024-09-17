var map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 5
});

// URL de l'image
var imageUrl = 'CarteRouge14.jpg'; // Remplace par le nom exact de ton fichier
var imageBounds = [[0, 0], [1024, 614]]; // Ajuste ces valeurs en fonction des dimensions de l'image

L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.fitBounds(imageBounds);
