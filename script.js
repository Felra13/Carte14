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

// Coordonnées du polygone représentant la Rue Edgar Quinet (exemple)
var coordsEdgarQuinet = [
    [554, 503],  // Coordonnée 1
    [549, 499],  // Coordonnée 2
    [509, 577],  // Coordonnée 4
    [515, 581]   // Coordonnée 3
];

// Créer un polygone pour la Rue Edgar Quinet, mais le rendre invisible par défaut
var polygonEdgarQuinet = L.polygon(coordsEdgarQuinet, {
    color: 'red', // Couleur des bordures
    fillColor: '#f03', // Couleur de remplissage
    fillOpacity: 0.5   // Opacité du remplissage
}).addTo(map);

// Initialement cacher le polygone
polygonEdgarQuinet.setStyle({ opacity: 0, fillOpacity: 0 });

// Déclarer la variable globale `rueDemandee` et `feedbackShown`
var rueDemandee = "";
var feedbackShown = false;

// Ajouter un événement de clic pour le bouton de démarrage
document.getElementById('startButton').addEventListener('click', function() {
    // Définir la rue demandée
    rueDemandee = "Rue Edgar Quinet";

    // Afficher la question lorsque le bouton est cliqué
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = "Place la " + rueDemandee;
    questionDiv.style.display = 'block'; // Rendre la question visible

    // Cacher le bouton de démarrage
    document.getElementById('startButton').style.display = 'none';

    // Réinitialiser le drapeau de feedbackShown
    feedbackShown = false;
});

// Fonction pour afficher un message de feedback
function showFeedback(message, bgColor) {
    var feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.style.backgroundColor = bgColor;
    feedback.style.display = 'block';

    // Cacher le message après 2 secondes
    setTimeout(function() {
        feedback.style.display = 'none';

        // Si le message est "Correct", rendre le polygone visible et ajouter du texte
        if (message === "Correct") {
            polygonEdgarQuinet.setStyle({ opacity: 1, fillOpacity: 0.5 });
            polygonEdgarQuinet.bindTooltip("Rue Edgar Quinet", {permanent: true, direction: 'center', className: 'leaflet-tooltip'}).openTooltip();
        }
    }, 2000); // 2000 millisecondes = 2 secondes
}

// Ajouter un événement de clic au polygone de la Rue Edgar Quinet
polygonEdgarQuinet.on('click', function() {
    // Vérifier si la rue demandée correspond à la rue du polygone cliqué
    if (rueDemandee === "Rue Edgar Quinet") {
        if (!feedbackShown) {
            showFeedback("Correct", 'green');
            feedbackShown = true; // Mettre à jour le drapeau pour éviter le message d'échec
        }
    } else {
        if (!feedbackShown) {
            showFeedback("Essaie encore", 'red');
            feedbackShown = true; // Mettre à jour le drapeau pour éviter le message d'échec
        }
    }
});

// Ajouter un événement de clic pour toute la carte (en cas de clic hors du polygone)
map.on('click', function() {
    // Afficher le message d'échec seulement si un message de feedback n'a pas encore été montré
    if (!feedbackShown) {
        showFeedback("Essaie encore", 'red');
    }
});
