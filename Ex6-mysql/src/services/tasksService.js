const { Task } = require('../beans/task.js');
const pool = require('../config/database');
const { format, parseISO } = require('date-fns');

/**
 * Classe représentant le service de gestion des tâches.
 */
class TaskService {

    /**
     * Initialise une nouvelle instance de TaskService.
     */
    constructor() {
        // Aucune initialisation spécifique requise
    }

    /**
     * Crée une nouvelle tâche et l'ajoute à la base de données.
     * @param {Task} task - La tâche à ajouter.
     */
    async createTask(task) {
        try {
            const createdAtFormatted = format(task.getCreatedAt(), 'yyyy-MM-dd');
            const dueDateFormatted = format(task.getDueDate(), 'yyyy-MM-dd');
            
            const [result] = await pool.execute(
                'INSERT INTO t_task (nom, description, statut, createdAt, due_date) VALUES (?, ?, ?, ?, ?)',
                [task.getTitle(), task.getDescription(), task.getStatus(), createdAtFormatted, dueDateFormatted]
            );
            
            return result.insertId;
        } catch (error) {
            console.error('Erreur lors de la création de la tâche :', error);
            throw error;
        }
    }

    /**
     * Supprime une tâche de la base de données.
     * @param {Task} task - La tâche à supprimer.
     * @returns {boolean} - Retourne `true` si la tâche a été trouvée et supprimée, sinon `false`.
     */
    async deleteTask(task) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM t_task WHERE pk_task = ?',
                [task.getId()]
            );
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
            throw error;
        }
    }

    /**
     * Met à jour une tâche existante dans la base de données.
     * @param {Task} task - La tâche mise à jour.
     * @returns {boolean} - Retourne `true` si la tâche a été trouvée et mise à jour, sinon `false`.
     */
    async updateTask(task) {
        try {
            const createdAtFormatted = format(task.getCreatedAt(), 'yyyy-MM-dd');
            const dueDateFormatted = format(task.getDueDate(), 'yyyy-MM-dd');
            
            const [result] = await pool.execute(
                'UPDATE t_task SET nom = ?, description = ?, statut = ?, createdAt = ?, due_date = ? WHERE pk_task = ?',
                [task.getTitle(), task.getDescription(), task.getStatus(), createdAtFormatted, dueDateFormatted, task.getId()]
            );
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            throw error;
        }
    }

    /**
     * Récupère toutes les tâches de la base de données.
     * @returns {Task[]} - Retourne la liste des tâches.
     */
    async getTasks() {
        try {
            const [rows] = await pool.execute('SELECT * FROM t_task');
            
            return rows.map(row => {
                const createdAt = new Date(row.createdAt);
                const dueDate = new Date(row.due_date);
                
                return new Task(
                    row.pk_task,
                    row.nom,
                    row.description,
                    row.statut,
                    createdAt,
                    dueDate
                );
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            throw error;
        }
    }
}

module.exports = {
    TaskService
};