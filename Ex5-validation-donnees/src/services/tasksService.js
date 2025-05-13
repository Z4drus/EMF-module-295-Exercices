const { Task } = require('../beans/task.js');

/**
 * Classe représentant le service de gestion des tâches.
 */
class TaskService {

    #tasks;

    /**
     * Initialise une nouvelle instance de TaskService avec des tâches par défaut.
     */
    constructor() {
        this.#tasks = [];
        this.#tasks.push(new Task(1, "Création du endpoint utilisateur", "Développer un endpoint pour gérer les utilisateurs dans l'application.", "En cours", new Date(2025, 3, 1), new Date(2025, 3, 10)));
        this.#tasks.push(new Task(2, "Correction du bug d'affichage", "Corriger le problème d'affichage sur la page d'accueil.", "À faire", new Date(2025, 3, 2), new Date(2025, 3, 5)));
        this.#tasks.push(new Task(3, "Ajout de la fonctionnalité de recherche", "Implémenter une barre de recherche pour filtrer les tâches.", "En attente", new Date(2025, 3, 3), new Date(2025, 3, 15)));
        this.#tasks.push(new Task(4, "Mise à jour de la documentation technique", "Ajouter les détails des nouvelles fonctionnalités dans la documentation.", "Terminé", new Date(2025, 3, 4), new Date(2025, 3, 6)));
        this.#tasks.push(new Task(5, "Test des fonctionnalités principales", "Effectuer des tests unitaires et d'intégration pour les fonctionnalités principales.", "En cours", new Date(2025, 3, 5), new Date(2025, 3, 12)));
    }

    /**
     * Crée une nouvelle tâche et l'ajoute à la liste des tâches.
     * @param {Task} task - La tâche à ajouter.
     */
    async createTask(task) {
        let id = Math.max(...this.#tasks.map(t => t.getId())) + 1;
        if (this.#tasks.length === 0) {
            id = 1;
        }
        task.id = id;
        this.#tasks.push(task);
    }

    /**
     * Supprime une tâche de la liste des tâches.
     * @param {Task} task - La tâche à supprimer.
     * @returns {boolean} - Retourne `true` si la tâche a été trouvée et supprimée, sinon `false`.
     */
    async deleteTask(task) {
        let found = false;
        this.#tasks = this.#tasks.filter((t) => { 
            if (t.getId() !== task.getId()) {
                return true;
            }
            found = true; 
        });
        return found;
    }

    /**
     * Met à jour une tâche existante.
     * @param {Task} task - La tâche mise à jour.
     * @returns {boolean} - Retourne `true` si la tâche a été trouvée et mise à jour, sinon `false`.
     */
    async updateTask(task) {
        let found = false;
        const index = this.#tasks.findIndex(t => t.getId() === task.getId());
        if (index !== -1) {
            found = true;
            this.#tasks[index] = task;
        }
        return found;
    }

    /**
     * Récupère toutes les tâches.
     * @returns {Task[]} - Retourne la liste des tâches.
     */
    async getTasks() {
        return this.#tasks;
    }
}

module.exports = {
    TaskService
};