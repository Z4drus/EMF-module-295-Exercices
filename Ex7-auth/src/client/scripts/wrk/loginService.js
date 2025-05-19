/**
 * @author Philippe Galley
 * @description Service de gestion de la connexion des utilisateurs
 * @version 1.0.0
 */

import { API_URL } from "../../config/config.js";

export class LoginService {
	constructor() {}

	/**
	 * @description Fonction de connexion à l'application
	 * @param {string} username Nom d'utilisateur
	 * @param {string} password Mot de passe
	 */
	async login(username, password) {
		try {
			// Envoi de la requête de connexion à l'API
			const response = await fetch(`${API_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});
			// Vérification de la réponse
			if (!response.ok) {
				throw new Error("Erreur de connexion");
			}
			// Récupération des données de la réponse
			const data = await response.json();
			// Vérification de la présence du token
			if (!data.token) {
				throw new Error("Token manquant dans la réponse");
			}
			// Stockage du token dans le stockage local
			sessionStorage.setItem("token", data.token);
			// Message de succès
			return "Authentification réussie";
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			// Propagation de l'erreur pour la gestion ultérieure
			throw error;
		}
	}
}
