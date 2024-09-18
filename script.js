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

// Créer un polygone pour la Rue Edgar Quinet
var polygonEdgarQuinet = L.polygon(coordsEdgarQuinet, {
    color: 'red', // Couleur des bordures
    fillColor: '#f03', // Couleur de remplissage
    fillOpacity: 0.5   // Opacité du remplissage
}).addTo(map);

// Initialement cacher le polygone Edgar Quinet
polygonEdgarQuinet.setStyle({ opacity: 0, fillOpacity: 0 });

// Coordonnées du Boulevard Raspail (avec inversion des x/y et transformation)
var coordsRaspail = [
    [567, 568],
    [416, 605],
    [409, 613],
    [565, 575]
];

// Créer un polygone pour le Boulevard Raspail
var polygonRaspail = L.polygon(coordsRaspail, {
    color: 'blue', // Couleur des bordures
    fillColor: 'blue', // Couleur de remplissage
    fillOpacity: 0.5   // Opacité du remplissage
}).addTo(map);

// Initialement cacher le polygone Raspail
polygonRaspail.setStyle({ opacity: 0, fillOpacity: 0 });

// Déclarer la variable globale `rueDemandee` et `feedbackShown`
var rueDemandee = "";
var feedbackShown = false;
var raspailTrouve = false; // Indicateur pour savoir si Boulevard Raspail est trouvé

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

    // Rendre visible le polygone Edgar Quinet pour le rendre cliquable
    polygonEdgarQuinet.setStyle({ opacity: 1, fillOpacity: 0.5 });
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
    }, 2000); // 2000 millisecondes = 2 secondes
}

// Ajouter un événement de clic au polygone de la Rue Edgar Quinet
polygonEdgarQuinet.on('click', function() {
    if (rueDemandee === "Rue Edgar Quinet") {
        if (!feedbackShown) {
            showFeedback("Correct", 'green');
            feedbackShown = true; // Mettre à jour le drapeau pour éviter le message d'échec
            // Rendre visible le polygone Edgar Quinet une fois trouvé
            polygonEdgarQuinet.setStyle({ opacity: 1, fillOpacity: 0.5 });
            // Passer à la question suivante
            nextQuestion();
        }
    } else {
        if (!feedbackShown) {
            showFeedback("Essaie encore", 'red');
            feedbackShown = true; // Mettre à jour le drapeau pour éviter le message d'échec
        }
    }
});

// Ajouter un événement de clic au polygone du Boulevard Raspail
polygonRaspail.on('click', function() {
    if (rueDemandee === "Boulevard Raspail" && !raspailTrouve) {
        if (!feedbackShown) {
            showFeedback("Correct", 'green');
            feedbackShown = true; // Mettre à jour le drapeau pour éviter le message d'échec
            raspailTrouve = true; // Le Boulevard Raspail a été trouvé
            // Rendre visible le polygone Raspail une fois trouvé
            polygonRaspail.setStyle({ opacity: 1, fillOpacity: 0.5 });
        }
    } else {
        if (!feedbackShown) {
            showFeedback("Essaie encore", 'red');
            feedbackShown = true; // Mettre à jour le drapeau pour éviter le message d'échec
        }
    }
});

// Ajouter un événement de clic pour toute la carte (en cas de clic hors des polygones)
map.on('click', function() {
    if (!feedbackShown && rueDemandee !== "") {
        showFeedback("Essaie encore", 'red');
    }
});

// Fonction pour passer à la prochaine question
function nextQuestion() {
    // Passer à la question du Boulevard Raspail
    if (rueDemandee === "Rue Edgar Quinet") {
        rueDemandee = "Boulevard Raspail";
        var questionDiv = document.getElementById('question');
        questionDiv.textContent = "Place le " + rueDemandee;
        questionDiv.style.display = 'block'; // Afficher la nouvelle question

        // Laisser le polygone Edgar Quinet visible mais ne pas afficher Raspail
        polygonEdgarQuinet.setStyle({ opacity: 1, fillOpacity: 0.5 });

        // Réinitialiser le drapeau de feedbackShown
        feedbackShown = false;
    }
}
