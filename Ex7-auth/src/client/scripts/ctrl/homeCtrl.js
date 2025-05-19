/**
 * @author Philippe Galley
 * @description Contrôleur de la page d'accueil
 * @version 1.0.0
 */

// Importation des modules nécessaires
import { DataService } from "../wrk/dataService.js"; // Importation du service de données

/**
 * @class HomeCtrl
 * @description Classe de contrôle pour la page d'accueil.
 */
export class HomeCtrl {
	// Service de données
	#dataService; // Déclaration d'une variable privée pour le service de données

	/**
	 * @description Constructeur de la classe HomeCtrl.
	 */
	constructor() {
		this.#dataService = new DataService(); // Initialisation du service de données
		this.init(); // Appel de la méthode d'initialisation
	}

	/**
	 * @description Méthode d'initialisation de la classe HomeCtrl.
	 */
	init() {
		// Code d'initialisation ici
		console.log("HomeCtrl initialisé");
		this.loadData(); // Chargement des données à l'initialisation

		let btnLogout = document.querySelector("#btnLogout");
		btnLogout.addEventListener("click", (e) => {
			e.preventDefault(); // Empêche le comportement par défaut du bouton
			this.#logout(); // Appel de la méthode de déconnexion
		});
	}

	/**
	 * @description Méthode pour charger les données de l'API.
	 */
	async loadData() {
		try {
			let data = await this.#dataService.getData(); // Appel de la méthode pour charger les données
			this.displayData(data); // Appel de la méthode pour afficher les données
		} catch (error) {
			console.error("Erreur lors du chargement des données : ", error); // Gestion des erreurs
			window.location.href = "index.html"; // Redirection vers une page d'erreur
		}
	}

	/**
	 * @description Méthode pour afficher les données dans le DOM.
	 * @param {Array} data - Les données à afficher.
	 */
	displayData(data) {
		// Exemple d'affichage dans un élément HTML
		let dataContainer = document.querySelector("#cities-list"); // Sélection de l'élément conteneur
		dataContainer.innerHTML = ""; // Réinitialisation du contenu de l'élément conteneur

		data.forEach((item) => {
			let cityItem = document.createElement("tr"); // Création d'un élément de liste
			let cityName = document.createElement("td"); // Création d'une cellule pour le nom de la ville
			let cityPopulation = document.createElement("td"); // Création d'une cellule pour la population de la ville
			cityName.textContent = item.nom; // Ajout du nom de la ville
			cityPopulation.textContent = item.population; // Ajout de la population de la ville
			cityItem.appendChild(cityName); // Ajout de la cellule du nom à l'élément de liste
			cityItem.appendChild(cityPopulation); // Ajout de la cellule de la population à l'élément de liste
			dataContainer.appendChild(cityItem); // Ajout de l'élément de liste au conteneur
			console.log("Données affichées : ", item); // Affichage des données dans la console
		});
	}

	/**
	 * @description Méthode pour gérer la déconnexion de l'utilisateur.
	 */
	#logout() {
		sessionStorage.clear(); // Effacement de la session
		window.location.href = "index.html"; // Redirection vers une page d'erreur
	}
}
