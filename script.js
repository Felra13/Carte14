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

// Coordonnées du polygone représentant la Rue Edgar Quinet
var coordsEdgarQuinet = [
    [554, 503],  // Coordonnée 1
    [549, 499],  // Coordonnée 2
    [509, 577],  // Coordonnée 4
    [515, 581]   // Coordonnée 3
];

// Coordonnées du polygone représentant le Boulevard Raspail
var coordsBoulevardRaspail = [
    [567, 568],  // Coordonnée 1
    [565, 575],  // Coordonnée 2
    [416, 605],  // Coordonnée 3
    [409, 613]   // Coordonnée 4
];

// Créer le polygone pour la Rue Edgar Quinet mais le rendre invisible par défaut
var polygonEdgarQuinet = L.polygon(coordsEdgarQuinet, {
    color: 'red', // Couleur des bordures
    fillColor: '#f03', // Couleur de remplissage
    fillOpacity: 0.5   // Opacité du remplissage
}).addTo(map);
polygonEdgarQuinet.setStyle({ opacity: 0, fillOpacity: 0 });

// Créer le polygone pour le Boulevard Raspail mais le rendre invisible par défaut
var polygonBoulevardRaspail = L.polygon(coordsBoulevardRaspail, {
    color: 'blue', // Couleur des bordures
    fillColor: '#03f', // Couleur de remplissage
    fillOpacity: 0.5   // Opacité du remplissage
}).addTo(map);
polygonBoulevardRaspail.setStyle({ opacity: 0, fillOpacity: 0 });

// Déclarer les variables globales `rueDemandee` et `feedbackShown`
var rueDemandee = "";
var feedbackShown = false;
var currentRue = 0; // Variable pour gérer les étapes de jeu

// Liste des rues à trouver
var rues = [
    { nom: "Rue Edgar Quinet", polygone: polygonEdgarQuinet },
    { nom: "Boulevard Raspail", polygone: polygonBoulevardRaspail }
];

// Ajouter un événement de clic pour le bouton de démarrage
document.getElementById('startButton').addEventListener('click', function() {
    // Définir la première rue demandée
    rueDemandee = rues[currentRue].nom;

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

        // Si le message est "Correct", rendre le polygone visible et passer à la rue suivante
        if (message === "Correct") {
            rues[currentRue].polygone.setStyle({ opacity: 1, fillOpacity: 0.5 });

            // Passer à la rue suivante après avoir trouvé la rue actuelle
            currentRue++;
            if (currentRue < rues.length) {
                rueDemandee = rues[currentRue].nom;
                var questionDiv = document.getElementById('question');
                questionDiv.textContent = "Place le " + rueDemandee;
            } else {
                // Si toutes les rues sont trouvées, cacher la question
                document.getElementById('question').style.display = 'none';
            }
        }
    }, 2000); // 2000 millisecondes = 2 secondes
}

// Ajouter un événement de clic pour chaque polygone
rues.forEach(function(rue) {
    rue.polygone.on('click', function() {
        if (rueDemandee === rue.nom) {
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
});

// Ajouter un événement de clic pour toute la carte (en cas de clic hors du polygone)
map.on('click', function() {
    if (!feedbackShown) {
        showFeedback("Essaie encore", 'red');
    }
});
