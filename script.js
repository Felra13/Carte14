// script.js
var map = L.map('map', {
    crs: L.CRS.Simple, // Utilise un système de coordonnées simple pour les images
    maxZoom: 5
});

// URL de l'image
var imageUrl = 'CarteRouge14.jpg'; // Assure-toi d'utiliser le nom et l'extension corrects

// Définir les limites de l'image en pixels
var imageBounds = [[0, 0], [614, 1024]]; // Ajuste ces valeurs selon les dimensions de l'image (614x1024)

// Ajouter l'image en tant que calque
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Ajuster la vue pour correspondre à l'image
map.fitBounds(imageBounds);

