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
//polygonEdgarQuinet.setStyle({ opacity: 0, fillOpacity: 0 });

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

var coordsArago = [
    [413, 747],
    [407, 747],
    [401, 626],
    [404, 619]
];

// Créer un polygone pour le Boulevard Arago
var polygonArago = L.polygon(coordsArago, {
    color: 'green', // Couleur des bordures (choisis une autre couleur pour le différencier)
    fillColor: 'green', // Couleur de remplissage
    fillOpacity: 0.5   // Opacité du remplissage
}).addTo(map);

// Initialement cacher le polygone Arago
polygonArago.setStyle({ opacity: 0, fillOpacity: 0 });



// Déclarer la variable globale `rueDemandee` et `feedbackShown`
var rueDemandee = "";
var feedbackShown = false;
var raspailTrouve = false; 
var aragoTrouve = false; // Indicateur pour savoir si Boulevard Arago est trouvé


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
            
            // Ajouter un délai avant de passer à la question suivante
            setTimeout(function() {
                nextQuestion(); // Passer à la question suivante après 2 secondes
            }, 2000);
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

// Ajouter un événement de clic au polygone du Boulevard Arago
polygonArago.on('click', function() {
    if (rueDemandee === "Boulevard Arago" && !aragoTrouve) {
        if (!feedbackShown) {
            showFeedback("Correct", 'green');
            feedbackShown = true; // Mettre à jour le drapeau pour éviter le message d'échec
            aragoTrouve = true; // Le Boulevard Arago a été trouvé
            // Rendre visible le polygone Arago une fois trouvé
            polygonArago.setStyle({ opacity: 1, fillOpacity: 0.5 });
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
    if (rueDemandee === "Rue Edgar Quinet") {
        rueDemandee = "Boulevard Raspail";
        var questionDiv = document.getElementById('question');
        questionDiv.textContent = "Place le " + rueDemandee;
        questionDiv.style.display = 'block';
        
        polygonEdgarQuinet.setStyle({ opacity: 1, fillOpacity: 0.5 });
        feedbackShown = false;
    } else if (rueDemandee === "Boulevard Raspail") {
        rueDemandee = "Boulevard Arago";
        var questionDiv = document.getElementById('question');
        questionDiv.textContent = "Place le " + rueDemandee;
        questionDiv.style.display = 'block';
        
        polygonRaspail.setStyle({ opacity: 1, fillOpacity: 0.5 });
        feedbackShown = false;
    }
}
