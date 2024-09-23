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
// Tableau des polygones classés par niveaux de difficulté
var polygonesData = [
    { name: "Rue Edgar Quinet", coords: [[568,467], [549, 499], [509, 577], [515, 581],[574,471]], trouveFlag: false, niveau: 'facile', quartier : 'Montparnasse' },
    { name: "Boulevard Raspail", coords: [[567, 568], [416, 605], [409, 613], [565, 575]], trouveFlag: false, niveau: 'facile', quartier : 'Montparnasse' },
    { name: "Boulevard Arago", coords: [[413, 747], [407, 747], [401, 626], [404, 619]], trouveFlag: false, niveau: 'facile',  quartier : 'Montparnasse' },
    { name: "Avenue Denfert Rochereau", coords: [[497, 677], [403, 618], [408, 614], [496, 671]], trouveFlag: false, niveau: 'facile',  quartier : 'Montparnasse' },
    { name: "Avenue de l'Observatoire", coords: [[516, 677], [456, 673], [456, 670], [514, 671]], trouveFlag: false, niveau: 'facile',  quartier : 'Montparnasse' },
    { name: "Boulevard Saint-Jacques", coords: [[395, 628], [384, 627], [338, 740], [349, 740]], trouveFlag: false, niveau: 'facile', quartier : ['Montparnasse','Montsouris']},
    { name: "Avenue René Coty", coords: [[377, 615], [175, 661], [177, 672], [378, 623]], trouveFlag: false, niveau: 'facile', quartier : ['Montrouge','Montsouris'] },
    { name: "Rue Froidevaux", coords: [[411, 595], [474,476], [468, 476], [426,557], [398,587]], trouveFlag: false, niveau: 'facile', quartier : 'Montparnasse' },
    { name: "Avenue Général Leclerc", coords: [[383, 607], [259, 534], [154, 514], [157, 507], [255, 524], [385, 601]], trouveFlag: false, niveau: 'facile', quartier : 'Montrouge' },
    { name: "Boulevard Jourdan", coords: [[70, 789], [85, 726], [154, 515], [145, 515], [72, 741], [63, 789]], trouveFlag: false, niveau: 'facile', quartier : ['Montrouge','Montsouris'] },
    { name: "Boulevard Brune", coords: [[157, 506], [258, 206], [252, 200], [148, 504]], trouveFlag: false, niveau: 'facile', quartier : ['Plaisance','Montrouge'] },
    { name: "Avenue du Maine", coords: [[525, 460], [264, 530], [262, 524], [521, 453]], trouveFlag: false, niveau: 'facile', quartier : ['Plaisance','Montrouge','Montparnasse'] },
    { name: "Boulevard du Montparnasse", coords: [[521, 673], [516, 671], [605, 494], [608, 497]], trouveFlag: false, niveau: 'facile',  quartier : 'Montparnasse' },
    { name: "Boulevard de Port Royal", coords: [[518, 680], [489, 753], [484, 752], [515, 679]], trouveFlag: false, niveau: 'facile', quartier : 'Montparnasse' },
    { name: "Avenue de la Porte de Chatillon", coords: [[174, 403], [171, 408], [138, 361], [141, 350]], trouveFlag: false, niveau: 'facile',  quartier : ['Montrouge','Plaisance'] },
    { name: "Avenue de la Porte d'Orléans", coords: [[118, 511], [115, 507], [87, 509], [88, 515]], trouveFlag: false, niveau: 'facile', quartier : 'Montrouge' },
    { name: "Rue de la Légion Étrangère", coords: [[121, 498], [117, 503], [94, 495], [96, 488]], trouveFlag: false, niveau: 'facile', quartier : 'Montrouge' },
    { name: "Place du 25 août 1944", coords: [[143, 505], [141, 514], [124, 511], [128, 502]], trouveFlag: false, niveau: 'facile', quartier : 'Montrouge' },
    { name: "Avenue Reille", coords: [[223,745],[184, 721], [163, 592], [159, 592], [181, 721],[220,748]], trouveFlag: false, niveau: 'intermediaire', quartier : 'Montsouris' },
    { name: "Rue Gazan", coords: [[180, 721], [80, 745], [79, 748], [181, 725]], trouveFlag: false, niveau: 'intermediaire', quartier : 'Montsouris' },
    { name: "Rue Delambre", coords: [[571, 562], [557, 502], [554, 504], [568, 567]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montparnasse' },
    { name: "Rue du Faubourg Saint-Jacques", coords: [[500, 716], [380, 666], [378, 671], [498, 720]], trouveFlag: false, niveau: 'facile', quartier: 'Montparnasse' },
    { name: "Rue de la Tombe Issoire", coords: [[369, 662], [310, 637], [297, 632], [264, 616], [237, 607], [182, 592], [134, 581], [131, 586], [159, 591], [171, 592], [211, 602], [251, 615], [260, 618], [296, 636], [309, 640], [368, 667]], trouveFlag: false, niveau: 'facile', quartier: ['Montparnasse', 'Montsouris'] },
    { name: "Rue de la Santé", coords: [[486, 752], [412, 747], [371, 740], [350, 739], [337, 740], [277, 744], [228, 746], [224, 750], [278, 749], [336, 744], [350, 743], [375, 745], [412, 750], [485, 755]], trouveFlag: false, niveau: 'intermediaire', quartier : 'Montparnasse' },
    { name: "Rue Amiral Mouchez", coords: [[228, 746], [157, 744], [139, 748], [108, 762], [90, 778], [72, 788], [73, 792], [94, 779], [112, 764], [141, 750], [162, 747], [224, 750]], trouveFlag: false, niveau: 'intermediaire', quartier : 'Montsouris' },
    { name: "Rue d'Alésia", coords: [[228, 747], [256, 614], [257, 533], [260, 524], [318, 417], [346, 341], [373, 292], [370, 289], [342, 340], [314, 417], [255, 523], [252, 613], [223,746], [228, 747]], trouveFlag: false, niveau: 'facile', quartier : ['Plaisance', 'Montsouris', 'Montrouge'] },
    { name: "Rue des Plantes", coords: [[355, 499], [287, 465], [192, 404], [191, 409], [288, 470], [350, 501]], trouveFlag: false, niveau: 'intermediaire', quartier : 'Plaisance' },
    { name: "Rue Raymond Losserand", coords: [[455, 473], [344, 336], [256, 214], [254, 218], [343, 343], [450, 475]], trouveFlag: false, niveau: 'facile', quartier: 'Plaisance' },
    { name: "Rue Jean Zay", coords: [[476, 467], [473, 430], [468, 411], [463, 412], [469, 434], [470, 469]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Rue de l'Ouest", coords: [[470, 460], [438,412], [387, 352], [356, 323], [353, 327], [384, 356], [470, 465]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Rue Vercingétorix", coords: [[427, 359], [364, 300], [334, 264], [271, 217], [259, 210], [256, 215], [286, 234], [329, 266], [362, 305], [424, 363]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Rue Alain", coords: [[468, 396], [468, 384], [441, 357],[428,359], [427,362], [438, 362], [463, 385], [464, 396]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Rue Didot", coords: [[400, 453], [388, 450], [320, 418], [221, 322], [219, 326], [317, 422], [390, 455], [398, 456]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Rue Edouard Jacques", coords: [[403, 456], [436, 458], [435, 453], [401, 453]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Rue du Chateau", coords: [[456, 409], [437, 418], [417, 438], [376, 494], [371, 495], [418, 430], [436, 414], [456, 405]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Place des 5 Martyrs du Lycée Bouffon", coords: [[473, 402], [493, 389], [489, 386], [470, 397]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Rue Julia Bartet", coords: [[240, 197], [219, 172], [186, 165], [180, 169], [200, 175], [235, 200]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Avenue de la Porte de Vanves", coords: [[247, 213], [235, 206], [192, 197], [194, 192], [241, 200], [244, 206]], trouveFlag: false, niveau: 'facile', quartier: 'Plaisance' },
    { name: "Avenue George Lafenestre", coords: [[212, 314], [169, 265], [167, 269], [209, 318]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Plaisance' },
    { name: "Avenue Jean Moulin", coords: [[254, 523], [187, 422], [184, 426], [250, 524]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Avenue de la Porte de Montrouge", coords: [[159, 472], [107, 445], [109, 453], [157, 477]], trouveFlag: false, niveau: 'facile', quartier: 'Montrouge' },
    { name: "Rue Friant", coords: [[236, 501], [231, 501], [169, 475], [167, 480], [232, 504], [228, 504]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Rue Emile Faguet", coords: [[125, 577], [105, 572], [103, 578], [123, 583]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Avenue Paul Appell", coords: [[126, 512], [104, 578], [99, 576], [120, 510]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Rue Nansouty", coords: [[172, 664], [115, 640], [113, 644], [172, 670]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montsouris' },
    { name: "Rue Gassenti", coords: [[436, 538], [365, 504], [360, 505], [434, 542]], trouveFlag: false, niveau: 'intermediaire', quartier: ['Plaisance', 'Montparnasse', 'Montrouge'] },
    { name: "Rue de la Gaité", coords: [[550, 494], [500, 467], [495, 470], [548, 499]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montparnasse' },
    { name: "Avenue André Rivoire & Avenue David Weill", coords: [[105, 637], [53, 618], [50, 622], [103, 641]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montsouris' },
    { name: "Avenue Ernest Reyer", coords: [[130, 501], [166, 401], [163, 398], [126, 499]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Rue du Montparnasse", coords: [[593, 518], [559, 500], [557, 502], [591, 521]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montparnasse' },
    { name: "Rue d'Odessa", coords: [[561, 501], [600, 493], [595, 490], [559, 498]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montparnasse' },
    { name: "Rue Boissonade", coords: [[530, 644], [479, 596], [475, 597], [528, 648]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Huyguens", coords: [[561, 569], [536, 542], [534, 545], [557, 571]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Campagne Premiere", coords: [[537, 626], [502, 591], [498, 592], [536, 631]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Cassini", coords: [[474, 661], [455, 697], [452, 695], [471, 660]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Mechain", coords: [[435, 693], [425, 747], [421, 747], [432, 693]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Jean Dolent", coords: [[374, 741], [371, 740], [392, 676], [395, 677]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Leclerc", coords: [[395, 672], [387, 652], [385, 656], [393, 671]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue du Maine", coords: [[541, 491], [542, 456], [539, 457], [539, 491]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Vandamme", coords: [[520, 480], [516, 463], [513, 463], [517, 478]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Poinsot", coords: [[542, 479], [560, 481], [561, 478], [542, 476]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Jolivet", coords: [[542, 489], [542, 485], [552, 479], [554, 481]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Leopold Robert", coords: [[555, 592], [543, 580], [539, 581], [553, 595]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Square Delambre", coords: [[561, 533], [538, 538], [539, 541], [562, 536]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Victor Schoelcher", coords: [[458, 594], [421, 575], [420, 578], [454, 597]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montparnasse' },
    { name: "Rue Victor Considérant", coords: [[428, 583], [417, 601], [415, 598], [425, 581]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Lalande", coords: [[419, 564], [402, 555], [404, 552], [421, 561]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Boulard", coords: [[412, 570], [380, 553], [337, 530], [335, 533], [370, 551], [411, 573]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montparnasse, Montrouge' },
    { name: "Rue Daguerre", coords: [[442, 483], [414, 533], [378, 596], [375, 595], [412, 531], [439, 483]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montparnasse, Montrouge, Plaisance' },
    { name: "Rue Roger", coords: [[439, 532], [420, 521], [418, 524], [438, 535]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Deparcieux", coords: [[444, 523], [426, 512], [424, 515], [443, 526]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Fermat", coords: [[450, 512], [433, 500], [431, 503], [448, 515]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Cels", coords: [[459, 483], [443, 507], [441, 505], [457, 481]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Auguste Mie", coords: [[465, 483], [462, 487], [457, 480], [461, 478]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue de Grancey", coords: [[392, 586], [386, 582], [384, 586], [391, 589]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Messier", coords: [[404, 696], [389, 694], [388, 697], [405, 699]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Emile Richard", coords: [[508, 575], [441, 540], [439, 543], [507, 577]], trouveFlag: false, niveau: 'difficile', quartier: 'Montparnasse' },
    { name: "Rue Dareau", coords: [[348, 713], [303, 639], [301, 640], [347, 716]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montsouris'},
    { name: "Rue Cabanis", coords: [[311, 740], [312, 677], [310, 677], [308, 741]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montsouris'},
    { name: "Rue Brousseau", coords: [[320, 674], [252, 672], [242, 674], [242, 677], [257, 674], [322, 677]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    { name: "Rue du Couëdic", coords: [[309, 630], [306, 562], [303, 562], [307, 631]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge'},
    { name: "Rue Lebouis", coords: [[459, 451], [445, 460], [443, 458], [458, 449]], trouveFlag: false, niveau: 'difficile', quartier: 'Plaisance'},
    {name: "Rue Emile Dubois", coords: [[350, 658], [337, 695], [334, 691], [347, 657]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    {name: "Passage Dareau", coords: [[326, 648], [319, 665], [317, 662], [323, 646]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    {name: "Rue du Saint-Gothard", coords: [[307, 651], [288, 661], [247, 660], [247, 656], [287, 657], [305, 649]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    {name: "Avenue de la Sibelle", coords: [[232, 701], [198, 697], [182, 697], [182, 701], [216, 702], [232, 705]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    {name: "Rue Ferrus", coords: [[339, 735], [311, 729], [310, 733], [339, 738]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montsouris'},
    { name: "Rue Bruller", coords: [[263, 649], [263, 657], [260, 657], [260, 650]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris' },
    { name: "Rue de l'Aude", coords: [[235, 610], [227, 643], [227, 652], [223, 653], [224, 643], [231, 608]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris' },
    {name: "Rue Saint-Yves", coords: [[214, 604], [206, 655], [203, 654], [209, 602]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    {name: "Rue des Artistes", coords: [[239, 646], [205, 641], [206, 644], [239, 649]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    { name: "Rue Liard", coords: [[111, 759], [108, 743], [104, 743], [108, 761]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris' },
    { name: "Rue Ruoli", coords: [[91, 763], [91, 747], [88, 747], [89, 764]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris' },
    {name: "Rue d'Arcueil", coords: [[106, 761], [77, 764], [76, 767], [91, 767], [104, 764]], trouveFlag: false, niveau: 'difficile', quartier: 'Montsouris'},
    { name: "Rue Hallé", coords: [[322, 626], [319, 596], [308, 591], [281, 591], [269, 593], [269, 596], [280, 595], [308, 593], [317, 598], [318, 628]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Rue d'Alembert", coords: [[317, 618], [282, 619], [282, 622], [318, 621]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Rémy Dumoncel", coords: [[296, 556], [299, 633], [296, 634], [293, 555]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Sophie Germain", coords: [[330, 577], [320, 596], [317, 594], [328, 575]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Bezout", coords: [[278, 546], [280, 578], [281, 624], [278, 623], [275, 543]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Montbrun", coords: [[293, 573], [279, 576], [258, 578], [258, 581], [280, 579], [294, 576]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue du Commendeur", coords: [[276, 564], [267, 570], [266, 600], [273, 609], [278, 610], [278, 606], [273, 604], [269, 599], [269, 572], [273, 568], [276, 568]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Sarrette", coords: [[251, 611], [251, 605], [190, 519], [187, 519], [248, 607], [248, 611]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Rue du Père Corentin", coords: [[235, 603], [163, 533], [152, 526], [150, 529], [166, 540], [233, 605]], trouveFlag: false, niveau: 'intermediaire', quartier: 'Montrouge' },
    { name: "Rue Paul Fort", coords: [[162, 588], [162, 579], [172, 546], [170, 543], [159, 579], [159, 588]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Beaunier", coords: [[171, 589], [181, 556], [185, 519], [183, 518], [179, 553], [168, 589]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Henri Regnault", coords: [[179, 592], [189, 562], [186, 560], [176, 591]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Prisse d'Avennes", coords: [[190, 559], [204, 545], [202, 542], [188, 557]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Lacaze", coords: [[188, 594], [197, 571], [195, 569], [185, 593]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Mary-Davy", coords: [[205, 575], [217, 563], [215, 560], [203, 573]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue du Douanier Rousseau", coords: [[214, 600], [217, 590], [214, 588], [211, 600]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Marie Rose", coords: [[219, 588], [227, 579], [226, 576], [217, 585]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Couche", coords: [[243, 593], [253, 583], [253, 579], [241, 591]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue du Loing", coords: [[232, 581], [253, 572], [253, 568], [231, 577]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue du Lunain", coords: [[226, 570], [253, 566], [253, 563], [224, 568]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue du Marguerin", coords: [[253, 563], [253, 559], [236, 551], [234, 555]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Adolphe Faucillon", coords: [[235, 555], [224, 568], [222, 565], [233, 552]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Leneveux", coords: [[235, 551], [231, 534], [229, 537], [233, 552]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Alphonse Daudet", coords: [[234, 527], [219, 558], [217, 555], [231, 526]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue de Coulmiers", coords: [[181, 511], [201, 451], [199, 448], [178, 510]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Poirier de Nançay", coords: [[171, 509], [179, 483], [176, 482], [168, 508]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },
    { name: "Rue Morère", coords: [[178, 478], [193, 440], [191, 436], [176, 477]], trouveFlag: false, niveau: 'difficile', quartier: 'Montrouge' },

];

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
    "Rue de la Légion Étrangère", 
    "Place du 25 août 1944",
    "Avenue Reille",
    "Rue Gazan",
    "Rue du Faubourg Saint-Jacques",
    "Rue de la Tombe Issoire",
    "Rue de la Santé",
    "Rue de l'Amiral Mouchez",
    "Rue d'Alésia",
    "Rue des Plantes",
    "Rue Raymond Losserand",
    "Rue Jean Zay",
    "Rue de l'Ouest",
    "Rue Vercingétorix",
    "Rue Alain",
    "Rue Didot",
    "Rue Edouard Jacques",
    "Rue du Chateau",
    "Place des 5 Martyrs du Lycée Bouffon",
    "Rue Julia Bartet",
    "Avenue de la Porte de Vanves",
    "Avenue George Lafenestre",
    "Avenue Jean Moulin",
    "Avenue de la Porte de Montrouge",
    "Rue Friant",
    "Rue Emile Faguet",
    "Avenue Paul Appell",
    "Rue Nansouty",
    "Rue Gassenti",
    "Rue de la Gaité",
    "Avenue André Rivoire & Avenue David Weill",
    "Avenue Ernest Reyer",
    "Rue du Montparnasse",
    "Rue d'Odessa",
    "Rue Boissonade",
    "Rue Huyguens",
    "Rue Campagne Premiere",
    "Rue Cassini",
    "Rue Mechain",
    "Rue Jean Dolent",
    "Rue Leclerc",
    "Rue du Maine",
    "Rue Vandamme",
    "Rue Poinsot",
    "Rue Jolivet",
    "Rue Leopold Robert",
    "Square Delambre",
    "Rue Victor Schoelcher",
    "Rue Victor Considérant",
    "Rue Lalande",
    "Rue Boulard",
    "Rue Daguerre",
    "Rue Roger",
    "Rue Deparcieux",
    "Rue Fermat",
    "Rue Cels",
    "Rue Auguste Mie",
    "Rue de Grancey",
    "Rue Messier",
    "Rue Emile Richard",
    "Rue Dareau",
    "Rue Cabanis",
    "Rue Brousseau",
    "Rue du Couëdic",
    "Rue Lebouis",
    "Rue Emile Dubois",
    "Passage Dareau",
    "Rue du Saint-Gothard",
    "Avenue de la Sibelle",
    "Rue Ferrus",
    "Rue Bruller",
    "Rue de l'Aude",
    "Rue Saint-Yves",
    "Rue des Artistes",
    "Rue Liard",
    "Rue Ruoli",
    "Rue d'Arcueil",
    "Rue Hallé", "Rue d'Alembert", "Rue Rémy Dumoncel", "Rue Sophie Germain", "Rue Bezout", "Rue Montbrun", "Rue du Commendeur",
    "Rue Sarrette", "Rue du Père Corentin", "Rue Paul Fort", "Rue Beaunier", "Rue Henri Regnault", "Rue Prisse d'Avennes", "Rue Lacaze", "Rue Mary-Davy", "Rue du Douanier Rousseau", "Rue Marie Rose",
    "Rue Couche", "Rue du Loing", "Rue du Lunain", "Rue du Marguerin", "Rue Adolphe Faucillon",
];

shuffleArray(rues);

// Variables pour stocker les rues en fonction des niveaux
var ruesFaciles = polygonesData.filter(polygon => polygon.niveau === 'facile').map(polygon => polygon.name);
var ruesIntermediaires = polygonesData.filter(polygon => polygon.niveau === 'intermediaire').map(polygon => polygon.name);
var ruesDifficiles = polygonesData.filter(polygon => polygon.niveau === 'difficile').map(polygon => polygon.name);
var toutesRues = polygonesData.map(polygon => polygon.name); // Liste avec toutes les rues

// Variables globales pour le jeu
var niveauSelectionne = ""; // Stockera le niveau sélectionné


// Coordonnées des quartiers 
quartierMontparnasse = L.polygon([
    [609, 496], [551, 450], [441, 479], [376, 599], 
    [392, 609], [340, 739], [485, 753]
], {
    color: 'none',
    fillColor: 'gray',
    fillOpacity: 0
}).addTo(map);

quartierPlaisance = L.polygon([
    [522, 451], [537, 424], [388, 303], [217, 173], 
    [199, 168], [136, 355], [180, 414], [187, 404], 
    [288, 468], [414, 529], [440, 482], [518, 460]
], {
    color: 'none',
    fillColor: 'gray',
    fillOpacity: 0
}).addTo(map);

quartierPetitMontrouge = L.polygon([
    [614 - 203, 531], [614 - 240, 600], [614 - 223, 611], [614 - 245, 664],
    [614 - 313, 637], [614 - 360, 615], [614 - 481, 585], [614 - 549, 567],
    [614 - 477, 355], [614 - 433, 416], [614 - 425, 407], [614 - 327, 468]
], {
    color: 'none',
    fillColor: 'gray',
    fillOpacity: 0
}).addTo(map);

quartierParcDeMontsouris = L.polygon([
    [614 - 245, 666], [614 - 276, 741], [614 - 338, 748], [614 - 457, 746],
    [614 - 503, 760], [614 - 546, 789], [614 - 610, 778], [614 - 602, 662],
    [614 - 567, 621], [614 - 549, 569], [614 - 447, 591], [614 - 362, 614]
], {
    color: 'none',
    fillColor: 'gray',
    fillOpacity: 0
}).addTo(map);

function resetQuartiers() {
    quartierMontparnasse.setStyle({ color: 'none',  fillColor: 'gray',fillOpacity: 0.7 });  // Bordure grise par défaut
    quartierPlaisance.setStyle({ color: 'none', fillColor: 'gray', fillOpacity: 0.7 });
    quartierPetitMontrouge.setStyle({ color: 'none', fillColor: 'gray', fillOpacity: 0.7});
    quartierParcDeMontsouris.setStyle({ color: 'none', fillColor: 'gray',fillOpacity: 0.7 });
}

//resetQuartiers()

function resetQuartiers2() {
    quartierMontparnasse.setStyle({ color: 'none',  fillColor: 'gray',fillOpacity: 0 });  //Transparent
    quartierPlaisance.setStyle({ color: 'none', fillColor: 'gray', fillOpacity: 0 });
    quartierPetitMontrouge.setStyle({ color: 'none', fillColor: 'gray', fillOpacity: 0 });
    quartierParcDeMontsouris.setStyle({ color: 'none', fillColor: 'gray',fillOpacity: 0 });
}

function resetQuartiers3() {
    document.getElementById('quartierMontparnasseButton').style.display = 'block';
    document.getElementById('quartierPlaisanceButton').style.display = 'block';
    document.getElementById('quartierPetitMontrougeButton').style.display = 'block';
    document.getElementById('quartierParcDeMontsourisButton').style.display = 'block';
    document.getElementById('quartierNiveauContainer').style.display = 'none'; // Cacher les niveaux par quartier
}

function afficherNiveauxQuartier(quartier) {

    quartier.setStyle({ color: 'black', fillColor: 'none', fillOpacity: 0 });
    document.getElementById('quartierNiveauContainer').style.display = 'block';
    document.getElementById('quartierContainer').style.display = 'none'; // Cacher les quartiers
    document.getElementById('quartierNiveauFacileButton').style.display = 'block';
    document.getElementById('quartierNiveauIntermediaireButton').style.display = 'block';
    document.getElementById('quartierNiveauDifficileButton').style.display = 'block';
    document.getElementById('quartierToutesCategoriesButton').style.display = 'block';

}


// Gestion de l'affichage des boutons de niveau après le clic sur "Commencer le jeu"
document.getElementById('startButton').addEventListener('click', function() {
    // Afficher les boutons de niveau
    document.getElementById('menuButton').style.display = 'inline'
    document.getElementById('niveauFacileButton').style.display = 'block';
    document.getElementById('niveauIntermediaireButton').style.display = 'block';
    document.getElementById('niveauDifficileButton').style.display = 'block';
    document.getElementById('touteCategoriesButton').style.display = 'block';
    
    // Cacher le bouton "Commencer le jeu"
    this.style.display = 'none';
});


document.getElementById('menuButton').addEventListener('click', function() {
        // Assurez-vous de cacher d'autres éléments si nécessaire
        document.getElementById('quartierContainer').style.display = 'none';
        document.getElementById('quartierNiveauContainer').style.display = 'none';
        document.getElementById('niveauCompletContainer').style.display = 'none';
        
        // Afficher le menu principal
        var niveauContainer = document.getElementById('niveauContainer');
        niveauContainer.style.display = 'block'; // Assurez-vous qu'il est affiché
    
        // Réinitialiser d'autres éléments si nécessaire
        resetQuartiers2();
        resetQuartiers3();
        
        // Cacher la zone de question
        var questionDiv = document.getElementById('question');
        questionDiv.style.display = 'none';
});

// Ajouter l'événement de clic pour le bouton "Mode complet"
document.getElementById('modeCompletButton').addEventListener('click', function() {
    // Affiche les boutons des niveaux du mode complet
    document.getElementById('niveauCompletContainer').style.display = 'block';
    document.getElementById('quartierContainer').style.display = 'none';  // Cacher les quartiers si visible
    document.getElementById('quartierNiveauContainer').style.display = 'none';
    document.getElementById('modeQuartierButton').style.display = 'inline'
    
});

// Ajouter l'événement de clic pour le bouton "Mode par quartier"
document.getElementById('modeQuartierButton').addEventListener('click', function() {
    // Affiche les boutons des quartiers
    document.getElementById('quartierContainer').style.display = 'block';
    document.getElementById('niveauCompletContainer').style.display = 'none';  // Cacher les niveaux du mode complet
    document.getElementById('quartierNiveauContainer').style.display = 'none';
    document.getElementById('modeCompletButton').style.display = 'inline'
    
});

// Ajouter l'événement de clic pour chaque quartier
document.getElementById('quartierMontparnasseButton').addEventListener('click', function() {
    resetQuartiers();  // tous les quartiers sont grisés
    afficherNiveauxQuartier(quartierMontparnasse);
    quartierSelectionne = 'Montparnasse';
    document.getElementById('quartierPlaisanceButton').style.display = 'none';
    document.getElementById('quartierPetitMontrougeButton').style.display = 'none';
    document.getElementById('quartierParcDeMontsourisButton').style.display = 'none';
    this.style.display = 'none'
});

document.getElementById('quartierPlaisanceButton').addEventListener('click', function() {
    resetQuartiers();  // tous les quartiers sont grisés
    afficherNiveauxQuartier(quartierPlaisance);
    quartierSelectionne = 'Plaisance';
    document.getElementById('quartierMontparnasseButton').style.display = 'none';
    document.getElementById('quartierPetitMontrougeButton').style.display = 'none';
    document.getElementById('quartierParcDeMontsourisButton').style.display = 'none';
    this.style.display = 'none';
});

document.getElementById('quartierPetitMontrougeButton').addEventListener('click', function() {
    resetQuartiers();  // tous les quartiers sont grisés
    afficherNiveauxQuartier(quartierPetitMontrouge);
    quartierSelectionne = 'Montrouge';
    document.getElementById('quartierPlaisanceButton').style.display = 'none';
    document.getElementById('quartierMontparnasseButton').style.display = 'none';
    document.getElementById('quartierParcDeMontsourisButton').style.display = 'none';
    this.style.display = 'none'
});

document.getElementById('quartierParcDeMontsourisButton').addEventListener('click', function() {
    resetQuartiers();  // tous les quartiers sont grisés
    afficherNiveauxQuartier(quartierParcDeMontsouris);
    quartierSelectionne = 'Montsouris';
    document.getElementById('quartierPlaisanceButton').style.display = 'none';
    document.getElementById('quartierPetitMontrougeButton').style.display = 'none';
    document.getElementById('quartierMontparnasseButton').style.display = 'none';
    this.style.display = 'none'
});

// Ajouter des événements de clic pour les niveaux par quartier
document.getElementById('quartierNiveauFacileButton').addEventListener('click', function() {
    // Filtrer les rues en fonction du niveau et du quartier sélectionné
    var ruesFacilesEtQuartier = polygonesData.filter(polygon => 
        polygon.niveau === 'facile' && 
        (Array.isArray(polygon.quartier) ? polygon.quartier.includes(quartierSelectionne) : polygon.quartier === quartierSelectionne)
    ).map(polygon => polygon.name);

    rues = ruesFacilesEtQuartier; // Mettre à jour les rues avec les résultats filtrés
    resetJeu(); // Commencer le jeu avec les rues filtrées
});

document.getElementById('quartierNiveauIntermediaireButton').addEventListener('click', function() {
    var ruesIntermediairesEtQuartier = polygonesData.filter(polygon => 
        polygon.niveau === 'intermediaire' && 
        (Array.isArray(polygon.quartier) ? polygon.quartier.includes(quartierSelectionne) : polygon.quartier === quartierSelectionne)
    ).map(polygon => polygon.name);

    rues = ruesIntermediairesEtQuartier; // Mettre à jour les rues avec les résultats filtrés
    resetJeu(); // Commencer le jeu avec les rues filtrées
});

document.getElementById('quartierNiveauDifficileButton').addEventListener('click', function() {
    var ruesDifficilesEtQuartier = polygonesData.filter(polygon => 
        polygon.niveau === 'difficile' && 
        (Array.isArray(polygon.quartier) ? polygon.quartier.includes(quartierSelectionne) : polygon.quartier === quartierSelectionne)
    ).map(polygon => polygon.name);

    rues = ruesDifficilesEtQuartier; // Mettre à jour les rues avec les résultats filtrés
    resetJeu(); // Commencer le jeu avec les rues filtrées
});
document.getElementById('quartierToutesCategoriesButton').addEventListener('click', function() {
    var ruesToutesEtQuartier = polygonesData.filter(polygon => 
        (Array.isArray(polygon.quartier) ? polygon.quartier.includes(quartierSelectionne) : polygon.quartier === quartierSelectionne)
    ).map(polygon => polygon.name);

    rues = ruesToutesEtQuartier; // Mettre à jour les rues avec les résultats filtrés
    resetJeu(); // Commencer le jeu avec les rues filtrées
});

// Ajouter les événements de clic pour les boutons de niveau
document.getElementById('niveauFacileButton').addEventListener('click', function() {
    niveauSelectionne = 'facile';
    rues = ruesFaciles; // Met à jour la liste des rues à poser en fonction du niveau facile
    resetJeu(); // Réinitialise et commence le jeu avec les rues faciles
});

document.getElementById('niveauIntermediaireButton').addEventListener('click', function() {
    niveauSelectionne = 'intermediaire';
    rues = ruesIntermediaires; // Met à jour la liste des rues à poser en fonction du niveau intermédiaire
    resetJeu(); // Réinitialise et commence le jeu avec les rues intermédiaires
});

document.getElementById('niveauDifficileButton').addEventListener('click', function() {
    niveauSelectionne = 'difficile';
    rues = ruesDifficiles; // Met à jour la liste des rues à poser en fonction du niveau difficile
    resetJeu(); // Réinitialise et commence le jeu avec les rues difficiles
});

document.getElementById('touteCategoriesButton').addEventListener('click', function() {
    niveauSelectionne = 'toutes';
    rues = toutesRues; // Met à jour la liste des rues avec toutes les catégories
    resetJeu(); // Réinitialise et commence le jeu avec toutes les rues
});




// Fonction pour réinitialiser le jeu et poser la première question
function resetJeu() {
    shuffleArray(rues); // Mélangez les rues à chaque réinitialisation
    rueDemandee = rues[0]; // Choisir la première rue après mélange
    currentRueIndex = 0;
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = rueDemandee;
    questionDiv.style.display = 'block';
    feedbackShown = false;
    // Cacher les boutons de niveaux car le jeu commence
    document.getElementById('niveauContainer').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('passButton').style.display = 'inline';
}



// Tableau pour stocker les polygones
var polygons = [];

// Créer des polygones pour chaque rue et les rendre interactifs
polygonesData.forEach(function(data) {
    // Définir la couleur en fonction du niveau
    var couleur = 'green'; // Niveau facile par défaut
    if (data.niveau === 'intermediaire') {
        couleur = 'orange';
    } else if (data.niveau === 'difficile') {
        couleur = '#8B0000';
    }
    
    var polygon = L.polygon(data.coords, { color: couleur, fillColor: couleur, fillOpacity: 0.5 }).addTo(map);
    polygons.push(polygon); // Ajouter le polygone au tableau

    // Initialement cacher le polygone
    polygon.setStyle({ opacity: 0, fillOpacity: 0 });

    // Ajouter l'événement de clic à chaque polygone
    handlePolygonClick(polygon, data.name, data);
});




// Déclarer les variables globales
var rueDemandee = "";
var feedbackShown = false;
var currentRueIndex = 0;



// Ajouter un événement de clic pour le bouton de démarrage
document.getElementById('startButton').addEventListener('click', function() {
    rueDemandee = rues[currentRueIndex];
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = rueDemandee;
    questionDiv.style.display = 'none'; // La question n'est pas visible
    document.getElementById('niveauContainer').style.display = 'block';
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
    resetQuartiers2();
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
