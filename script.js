// Initialise la carte avec un système de coordonnées simple
var map = L.map('map', {
    crs: L.CRS.Simple, // Utilise un système de coordonnées simple pour les images
    maxZoom: 5
});

// URL de l'image de la carte
var imageUrl = 'CarteRouge14.jpg'; 

// Limites de l'image en pixels (614x1024)
var imageBounds = [[0, 0], [614, 1024]];

// Ajouter l'image en tant que calque
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Ajuster la vue pour correspondre à l'image
map.fitBounds(imageBounds);

//Coordonnées des polygones
var polygonesData = [
    { name: "Rue Edgar Quinet", coords: [[554, 503], [549, 499], [509, 577], [515, 581]], trouveFlag: false },
    { name: "Boulevard Raspail", coords: [[567, 568], [416, 605], [409, 613], [565, 575]], trouveFlag: false },
    { name: "Boulevard Arago", coords: [[413, 747], [407, 747], [401, 626], [404, 619]], trouveFlag: false },
    { name: "Avenue Denfert Rochereau", coords: [[497, 677], [403, 618], [408, 614], [496, 671]], trouveFlag: false },
    { name: "Avenue de l'Observatoire", coords: [[516, 677], [456, 673], [456, 670], [514, 671]], trouveFlag: false },
    { name: "Boulevard Saint-Jacques", coords: [[395, 628], [384, 627], [338, 740], [349, 740]], trouveFlag: false },
    { name: "Avenue René Coty", coords: [[377, 615], [175, 661], [177, 672], [378, 623]], trouveFlag: false },
    { name: "Rue Froidevaux", coords: [[411, 595], [399, 586], [468, 476], [473, 475]], trouveFlag: false },
    { name: "Avenue Général Leclerc", coords: [[383, 607], [259, 534], [154, 514], [157, 507], [255, 524], [385, 601]], trouveFlag: false },
    { name: "Boulevard Jourdan", coords: [[70, 789], [85, 726], [154, 515], [145, 515], [72, 741], [63, 789]], trouveFlag: false },
    { name: "Boulevard Brune", coords: [[157, 506], [258, 206], [252, 200], [148, 504]], trouveFlag: false },
    { name: "Avenue du Maine", coords: [[525, 460], [264, 530], [262, 524], [521, 453]], trouveFlag: false },
    { name: "Boulevard du Montparnasse", coords: [[521, 673], [516, 671], [605, 494], [608, 497]], trouveFlag: false },
    { name: "Boulevard de Port Royal", coords: [[518, 680], [489, 753], [484, 752], [515, 679]], trouveFlag: false },
    { name: "Avenue de la Porte de Chatillon", coords: [[174, 403], [171, 408], [138, 361], [141, 350]], trouveFlag: false },
    { name: "Avenue de la Porte d'Orléans", coords: [[118, 511], [115, 507], [87, 509], [88, 515]], trouveFlag: false },
    { name: "Rue de la Légion Étrangère", coords: [[121, 498], [117, 503], [94, 495], [96, 488]], trouveFlag: false },
    { name: "Place du 25 août 1944", coords: [[143, 505], [141, 514], [124, 511], [128, 502]], trouveFlag: false }
];



// Tableau pour stocker les polygones
var polygons = [];

// Créer des polygones pour chaque rue et les rendre interactifs
polygonesData.forEach(function(data) {
    var polygon = L.polygon(data.coords, { color: 'green', fillColor: 'green', fillOpacity: 0.5 }).addTo(map);
    polygons.push(polygon); // Ajouter le polygone au tableau

    // Initialement cacher le polygone
    polygon.setStyle({ opacity: 1, fillOpacity: 0.5 });

    // Ajouter l'événement de clic à chaque polygone
    handlePolygonClick(polygon, data.name, data);
});


// Déclarer les variables globales
var rueDemandee = "";
var feedbackShown = false;
var currentRueIndex = 0;

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialiser et mélanger la liste des rues
var rues = [
    "Rue Edgar Quinet", 
    "Boulevard Raspail", 
    "Boulevard Arago", 
    "Boulevard Saint-Jacques", 
    "Avenue Denfert Rochereau", 
    "Avenue de l'Observatoire", 
    "Avenue René Coty", 
    "Rue Froidevaux", 
    "Avenue Général Leclerc", 
    "Boulevard Jourdan", 
    "Boulevard Brune",
    "Avenue du Maine",
    "Boulevard du Montparnasse",
    "Boulevard de Port Royal",
    "Avenue de la Porte de Chatillon",
    "Avenue de la Porte d'Orléans",
    "Rue de la légion étrangère",
    "Place du 25 aout 1944"
];
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

function passerRue() {
    // Parcourir les données pour trouver la rue demandée
    polygonesData.forEach(function(data, index) {
        if (rueDemandee === data.name) {
            showPolygonTemporarily(polygons[index]); // Afficher temporairement le polygone
        }
    });

    // Passer à la prochaine question après un délai
    setTimeout(nextQuestion, 2000);
}

// Ajouter un événement de clic pour le bouton "Passe"
document.getElementById('passButton').addEventListener('click', function() {
    if (!feedbackShown) {
        passerRue(); // Appeler la fonction pour passer la rue
    }
});

function resetPolygons() {
    polygons.forEach(function(polygon) {
        polygon.setStyle({ opacity: 0, fillOpacity: 0 });
    });
}

function resetFlags() {
    polygonesData.forEach(function(data) {
        data.trouveFlag = false; // Réinitialiser tous les flags à false
    });
}


// Ajouter un événement de clic pour le bouton "Restart"
document.getElementById('restartButton').addEventListener('click', function() {
    // Réinitialiser les variables du jeu
    rueDemandee = "";
    feedbackShown = false;
    resetFlags(); // Réinitialiser les flags
    currentRueIndex = 0;

    // Réinitialiser les styles des polygones
    resetPolygons(); // Appeler la fonction pour réinitialiser les styles

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

function handlePolygonClick(polygon, rue, data) {
    polygon.on('click', function() {
        if (rueDemandee === rue && !data.trouveFlag) {
            if (!feedbackShown) {
                showFeedback("Correct", 'green');
                feedbackShown = true;
                data.trouveFlag = true; // Mettre à jour trouveFlag directement dans l'objet data
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
