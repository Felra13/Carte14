// Initialise la carte avec un système de coordonnées simple
var map = L.map('map', {
    crs: L.CRS.Simple, // Utilise un système de coordonnées simple pour les images
    maxZoom: 5
});

// URL de l'image de la carte
var imageUrl = 'CarteRouge14.jpg'; // Assure-toi que le nom et l'extension sont corrects

// Limites de l'image en pixels (614x1024)
var imageBounds = [[0, 0], [614, 1024]];

// Ajouter l'image en tant que calque
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Ajuster la vue pour correspondre à l'image
map.fitBounds(imageBounds);

var coords = [
    [554, 503],  // Coordonnée 1
    [515, 581],  // Coordonnée 3
    [549, 499], // Coordonnée 2
    [509,577]  // Coordonnée 4
];

// Créer un polygone à partir de ces coordonnées
var polygon = L.polygon(coords, {
    color: 'blue', // Couleur des bordures
    fillColor: '#f03', // Couleur de remplissage
    fillOpacity: 0.5   // Opacité du remplissage
}).addTo(map);

// Ajouter un événement de clic au polygone
polygon.on('click', function() {
    alert("Tu as cliqué sur le polygone !");
});
