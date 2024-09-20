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

// Tableau des rues avec noms et coordonnées
var rues = [
    { nom: "Rue Edgar Quinet", coords: [[554, 503], [549, 499], [509, 577], [515, 581]] },
    { nom: "Boulevard Raspail", coords: [[567, 568], [416, 605], [409, 613], [565, 575]] },
    { nom: "Boulevard Arago", coords: [[413, 747], [407, 747], [401, 626], [404, 619]] },
    { nom: "Avenue Denfert Rochereau", coords: [[497, 677], [403, 618], [408, 614], [496, 671]] },
    { nom: "Avenue de l'Observatoire", coords: [[516, 677], [456, 673], [456, 670], [514, 671]] },
    { nom: "Boulevard Saint Jacques", coords:   [[395, 628], [384, 627], [338, 740], [349, 740]] }
];

// Tableau pour stocker les polygones
var polygons = [];

// Fonction pour créer et ajouter des polygones à la carte
function createPolygons() {
    rues.forEach(rue => {
        var polygon = L.polygon(rue.coords, { color: 'green', fillColor: 'green', fillOpacity: 0.5 }).addTo(map);
        polygons.push(polygon);
        addClickEvent(polygon, rue.nom);
    });
}

// Fonction pour ajouter un événement de clic à chaque polygone
function addClickEvent(polygon, rueNom) {
    polygon.on('click', function() {
        if (rueDemandee === rueNom) {
            if (!feedbackShown) {
                showFeedback("Correct", 'green');
                feedbackShown = true;
                showPolygonTemporarily(polygon); // Afficher temporairement le polygone
                setTimeout(nextQuestion, 2000);
            }
        } else {
            if (!feedbackShown) {
                showFeedback("Essaie encore", 'red');
                feedbackShown = false;
            }
        }
    });
}


// Appel de la fonction pour créer les polygones
createPolygons();

// Initialement cacher les polygones
polygons.forEach(polygon => {
    polygon.setStyle({ opacity: 0, fillOpacity: 0 });
});

// Déclarer les variables globales
var rueDemandee = "";
var feedbackShown = false;
var raspailTrouve = false;
var aragoTrouve = false;
var edgarQuinetTrouve = false;
var boulevardRaspailTrouve = false;
var avenueDenfertRochereauTrouve = false;
var avenueObservatoireTrouve = false;
var boulevardSaintJacquesTrouve = false;
var currentRueIndex = 0;


// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialiser et mélanger la liste des rues
var rues = ["Rue Edgar Quinet", "Boulevard Raspail", "Boulevard Arago", "Boulevard Saint-Jacques", "Avenue Denfert Rochereau", "Avenue de l'Observatoire"];
shuffleArray(rues);

// Ajouter un événement de clic pour le bouton de démarrage
document.getElementById('startButton').addEventListener('click', function() {
    rueDemandee = rues[currentRueIndex];
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = rueDemandee;
    questionDiv.style.display = 'block'; // Rendre la question visible
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none'; // Assurer que le bouton restart est caché au début
    document.getElementById('passButton').style.display = 'inline'; // Afficher le bouton Passe
    feedbackShown = false;
});

// Ajouter un événement de clic pour le bouton "Passe"
document.getElementById('passButton').addEventListener('click', function() {
    if (!feedbackShown) {
        // Rendre le polygone de la rue demandée visible temporairement
        if (rueDemandee === "Rue Edgar Quinet") {
            showPolygonTemporarily(polygonEdgarQuinet); // Afficher temporairement le polygone
        } else if (rueDemandee === "Boulevard Raspail") {
            showPolygonTemporarily(polygonRaspail); // Afficher temporairement le polygone
        } else if (rueDemandee === "Boulevard Arago") {
            showPolygonTemporarily(polygonArago); // Afficher temporairement le polygone
        } else if (rueDemandee === "Boulevard Saint-Jacques") {
            showPolygonTemporarily(polygonSaintJacques); // Afficher temporairement le polygone
        } else if (rueDemandee === "Avenue Denfert Rochereau") {
            showPolygonTemporarily(polygonDenfertRochereau); // Afficher temporairement le polygone
        } else if (rueDemandee === "Avenue de l'Observatoire") {
            showPolygonTemporarily(polygonObservatoire); // Afficher temporairement le polygone
        }

        setTimeout(nextQuestion, 2000);
    }
});

// Ajouter un événement de clic pour le bouton "Restart"
document.getElementById('restartButton').addEventListener('click', function() {
    // Réinitialiser les variables du jeu
    rueDemandee = "";
    feedbackShown = false;
    raspailTrouve = false;
    aragoTrouve = false;
    saintJacquesTrouve = false;
    denfertRochereauTrouve = false;
    observatoireTrouve = false;
    currentRueIndex = 0;

    // Réinitialiser les styles des polygones
    polygonEdgarQuinet.setStyle({ opacity: 0, fillOpacity: 0 });
    polygonRaspail.setStyle({ opacity: 0, fillOpacity: 0 });
    polygonArago.setStyle({ opacity: 0, fillOpacity: 0 });
    polygonSaintJacques.setStyle({ opacity: 0, fillOpacity: 0 });
    polygonDenfertRochereau.setStyle({ opacity: 0, fillOpacity: 0 });
    polygonObservatoire.setStyle({ opacity: 0, fillOpacity: 0 });

    // Mélanger les rues et choisir une nouvelle question
    shuffleArray(rues);
    rueDemandee = rues[currentRueIndex];

    // Afficher la question
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = rueDemandee;
    questionDiv.style.display = 'block';

    // Afficher le bouton de démarrage et cacher le bouton Restart
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('passButton').style.display = 'inline'; // Afficher le bouton Passe
});

// Fonction pour afficher un message de feedback
function showFeedback(message, bgColor) {
    var feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.style.backgroundColor = bgColor;
    feedback.style.display = 'block';
    setTimeout(function() {
        feedback.style.display = 'none';
    }, 2000);
}

// Fonction pour afficher temporairement un polygone (3 secondes) puis le cacher à nouveau
function showPolygonTemporarily(polygon) {
    polygon.setStyle({ opacity: 1, fillOpacity: 0.5 });
    setTimeout(function() {
        polygon.setStyle({ opacity: 0, fillOpacity: 0 });
    }, 2000); // Après 3 secondes, cacher le polygone
}


// Ajouter un événement de clic pour toute la carte
map.on('click', function() {
    if (!feedbackShown && rueDemandee !== "") {
        showFeedback("Essaie encore", 'red');
    }
});

// Fonction pour passer à la prochaine question
function nextQuestion() {
    var questionDiv = document.getElementById('question');
    
    if (currentRueIndex < rues.length - 1) {
        currentRueIndex++;
        rueDemandee = rues[currentRueIndex];
        console.log("Next question: " + rueDemandee);
        questionDiv.textContent = rueDemandee;
        questionDiv.style.display = 'block';
        feedbackShown = false;
    } else {
        questionDiv.textContent = "Félicitations ! Tu as trouvé toutes les rues.";
        feedbackShown = false;

        // Afficher le bouton Restart
        document.getElementById('restartButton').style.display = 'block';
        document.getElementById('passButton').style.display = 'none'; // Cacher le bouton Passe
    }
}
