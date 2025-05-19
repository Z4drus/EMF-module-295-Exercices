/**
 * @author Philippe Galley
 * @description Fichier de démarrage de l'application
 * @version 1.0.0
 */

// Importation des modules nécessaires
import { IndexCtrl } from "./ctrl/indexCtrl.js";
import { HomeCtrl } from "./ctrl/homeCtrl.js";

/**
 * @description Fonction d'initialisation de l'application.
 */
function initIndex() {
	const app = new IndexCtrl();
	app.init(); // Appel de la méthode d'initialisation
}

/**
 * @description Fonction d'initialisation de l'application.
 */
function initHome() {
	const app = new HomeCtrl();
	app.init(); // Appel de la méthode d'initialisation
}

// Fonction pour initialiser l'application
const path = window.location.pathname;
const nomPage = path.substring(path.lastIndexOf("/") + 1);
switch (nomPage) {
	case "index.html":
		window.onload = initIndex;
		break;
	case "home.html":
		window.onload = initHome;
		break;
	default:
		console.log("Page inconnue");
}
