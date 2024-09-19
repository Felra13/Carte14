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

// Coordonnées des polygones
var coordsEdgarQuinet = [
    [554, 503], [549, 499], [509, 577], [515, 581]
];
var coordsRaspail = [
    [567, 568], [416, 605], [409, 613], [565, 575]
];
var coordsArago = [
    [413, 747], [407, 747], [401, 626], [404, 619]
];

// Créer des polygones pour chaque rue
var polygonEdgarQuinet = L.polygon(coordsEdgarQuinet, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 }).addTo(map);
var polygonRaspail = L.polygon(coordsRaspail, { color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }).addTo(map);
var polygonArago = L.polygon(coordsArago, { color: 'green', fillColor: 'green', fillOpacity: 0.5 }).addTo(map);

// Initialement cacher les polygones
polygonEdgarQuinet.setStyle({ opacity: 0, fillOpacity: 0 });
polygonRaspail.setStyle({ opacity: 0, fillOpacity: 0 });
polygonArago.setStyle({ opacity: 0, fillOpacity: 0 });

// Déclarer les variables globales
var rueDemandee = "";
var feedbackShown = false;
var raspailTrouve = false;
var aragoTrouve = false;
var currentRueIndex = 0;

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialiser et mélanger la liste des rues
var rues = ["Rue Edgar Quinet", "Boulevard Raspail", "Boulevard Arago"];
shuffleArray(rues);

// Ajouter un événement de clic pour le bouton de démarrage
document.getElementById('startButton').addEventListener('click', function() {
    rueDemandee = rues[currentRueIndex];
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = "Place la " + rueDemandee;
    questionDiv.style.display = 'block'; // Rendre la question visible
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none'; // Assurer que le bouton restart est caché au début
    document.getElementById('passButton').style.display = 'inline'; // Afficher le bouton Passe
    feedbackShown = false;
});

// Ajouter un événement de clic pour le bouton "Passe"
document.getElementById('passButton').addEventListener('click', function() {
    if (!feedbackShown) {
        // Rendre le polygone de la rue demandée visible
        if (rueDemandee === "Rue Edgar Quinet") {
            polygonEdgarQuinet.setStyle({ opacity: 1, fillOpacity: 0.5 });
        } else if (rueDemandee === "Boulevard Raspail") {
            polygonRaspail.setStyle({ opacity: 1, fillOpacity: 0.5 });
        } else if (rueDemandee === "Boulevard Arago") {
            polygonArago.setStyle({ opacity: 1, fillOpacity: 0.5 });
        }
        
        showFeedback("Essaie encore", 'red');
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
    currentRueIndex = 0;

    // Réinitialiser les styles des polygones
    polygonEdgarQuinet.setStyle({ opacity: 0, fillOpacity: 0 });
    polygonRaspail.setStyle({ opacity: 0, fillOpacity: 0 });
    polygonArago.setStyle({ opacity: 0, fillOpacity: 0 });

    // Mélanger les rues et choisir une nouvelle question
    shuffleArray(rues);
    rueDemandee = rues[currentRueIndex];

    // Afficher la question
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = "Place la " + rueDemandee;
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

polygonEdgarQuinet.on('click', function() {
    if (rueDemandee === "Rue Edgar Quinet") {
        if (!feedbackShown) {
            showFeedback("Correct", 'green');
            feedbackShown = true;
            polygonEdgarQuinet.setStyle({ opacity: 1, fillOpacity: 0.5 });
            setTimeout(nextQuestion, 2000);
        }
    } else {
        showFeedback("Essaie encore", 'red'); // Toujours permettre le feedback d'erreur
        feedbackShown = false; // Réinitialiser feedbackShown pour permettre de cliquer de nouveau
    }
});

polygonRaspail.on('click', function() {
    if (rueDemandee === "Boulevard Raspail" && !raspailTrouve) {
        if (!feedbackShown) {
            showFeedback("Correct", 'green');
            feedbackShown = true;
            raspailTrouve = true;
            polygonRaspail.setStyle({ opacity: 1, fillOpacity: 0.5 });
            setTimeout(nextQuestion, 2000);
        }
    } else {
        showFeedback("Essaie encore", 'red');
        feedbackShown = false; // Réinitialiser pour permettre une nouvelle tentative
    }
});

polygonArago.on('click', function() {
    if (rueDemandee === "Boulevard Arago" && !aragoTrouve) {
        if (!feedbackShown) {
            showFeedback("Correct", 'green');
            feedbackShown = true;
            aragoTrouve = true;
            polygonArago.setStyle({ opacity: 1, fillOpacity: 0.5 });
            setTimeout(nextQuestion, 2000);
        }
    } else {
        showFeedback("Essaie encore", 'red');
        feedbackShown = false; // Réinitialiser pour permettre une nouvelle tentative
    }
});


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
        questionDiv.textContent = "Place le " + rueDemandee;
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
