const express = require('express');
const router = express.Router();

const { TaskService } = require('../services/tasksService');
const { Task } = require('../beans/task.js');
const { validateTask } = require('../middlewares/taskValidation');

const taskService = new TaskService();

router.post('/task', validateTask, async (req, res) => {
    try {
        const { title, description, status, createdAt, dueDate } = req.body;
        // Convertir les chaînes de dates ISO en objets Date
        const createdAtDate = new Date(createdAt);
        const dueDateDate = new Date(dueDate);
        
        const newTask = new Task(null, title, description, status, createdAtDate, dueDateDate);
        const insertId = await taskService.createTask(newTask);
        res.status(201).json({ 
            message: 'Tâche créée avec succès.', 
            task: { id: insertId, title, description } 
        });
    }
    catch (error) {
        console.error('Erreur lors de la création de la tâche :', error);
        res.status(500).json({ message: 'Erreur lors de la création de la tâche.' });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
    }
});

router.delete('/task/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const taskToDelete = new Task(taskId);
        if (await taskService.deleteTask(taskToDelete)) {
            return res.status(200).json({ message: `La tâche ${taskId} a été supprimée avec succès.` });
        } else {
            return res.status(404).json({ message: `La tâche ${taskId} n'a pas été trouvée.` });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche.' });
    }
});

router.put('/task/:id', validateTask, async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const { title, description, status, createdAt, dueDate } = req.body;
        // Convertir les chaînes de dates ISO en objets Date
        const createdAtDate = new Date(createdAt);
        const dueDateDate = new Date(dueDate);
        
        const updatedTask = new Task(taskId, title, description, status, createdAtDate, dueDateDate);
        if(await taskService.updateTask(updatedTask)) {
            return res.status(200).json({ message: `La tâche ${taskId} a été mise à jour avec succès.` });
        } else {
            return res.status(404).json({ message: `La tâche ${taskId} n'a pas été trouvée.` });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.' });
    }
});

module.exports = router;