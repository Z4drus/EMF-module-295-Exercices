/**
 * @author Philippe Galley
 * @description Service de gestion des données de l'application
 * @version 1.0.0
 */

// Importation des modules nécessaires
import { API_URL } from "../../config/config.js";

/**
 * @class DataService
 * @description Classe de service pour la gestion des données de l'application.
 */
export class DataService {
	/**
	 * @description Constructeur de la classe DataService.
	 */
	constructor() {}

	/**
	 * @description Méthode pour récupérer les données de l'API.
	 * @returns {Promise<Array>} - Une promesse qui résout les données récupérées de l'API.
	 */
	async getData() {
		try {
			// Envoi de la requête à l'API
			const response = await fetch(`${API_URL}/villes`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			});
			// Vérification de la réponse
			if (!response.ok) {
				throw new Error("Erreur lors de la récupération des données");
			}
			// Récupération des données de la réponse
			const data = await response.json();
			return data; // Retourne les données récupérées
		} catch (error) {
			console.error("Erreur lors de la récupération des données :", error);
			throw error; // Propagation de l'erreur pour la gestion ultérieure
		}
	}
}
