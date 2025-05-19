/**
 * @author Philippe Galley
 * @description Contrôleur de la page d'accueil.
 * @version 1.0.0
 */

// Importation des modules nécessaires
import { LoginService } from "../wrk/loginService.js"; // Importation du service de connexion

/**
 * @class IndexCtrl
 * @description Classe de contrôle pour la page d'accueil.
 */
export class IndexCtrl {
	#loginService; // Service de connexion

	/**
	 * @constructor Constructeur de la classe IndexCtrl.
	 */
	constructor() {
		this.#loginService = new LoginService(); // Initialisation du service de connexion
	}

	/**
	 * @description Méthode d'initialisation de la classe IndexCtrl.
	 */
	init() {
		// Code d'initialisation ici
		console.log("IndexCtrl initialisé");

		let loginForm = document.querySelector("#loginForm");
		loginForm.addEventListener("submit", (event) => {
			// Empêche le rechargement de la page
			event.preventDefault();
			this.handleLogin(event);
		});

		// Met le focus sur le champ username
		document.querySelector("#username").focus();
	}

	/**
	 * Gestion de la soumission du formulaire de connexion.
	 * @description Méthode pour gérer la soumission du formulaire de connexion.
	 * @param {*} event Gestion de l'événement de soumission du formulaire de connexion
	 */
	async handleLogin(event) {
		// Code de gestion de la connexion ici
		console.log("Formulaire de connexion soumis", event.target);
		let formData = new FormData(event.target);
		let data = Object.fromEntries(formData.entries());
		console.log("Données du formulaire : ", data);

		let authentification = await this.#loginService
			.login(data.username, data.password)
			.then((message) => {
				window.location.href = "home.html";
			})
			.catch((error) => {
				// Affiche l'erreur en cas d'échec
				alert("Erreur de connexion", error);
			});
	}
}
