const Joi = require('joi');

// Schéma de validation pour les tâches
const taskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'Le titre doit contenir au moins 3 caractères.',
            'string.max': 'Le titre doit contenir au maximum 50 caractères.',
            'any.required': 'Le titre est obligatoire.'
        }),
    
    description: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'La description doit contenir au moins 3 caractères.',
            'string.max': 'La description doit contenir au maximum 100 caractères.',
            'any.required': 'La description est obligatoire.'
        }),
    
    status: Joi.string()
        .valid('À faire', 'En cours', 'Terminé')
        .required()
        .messages({
            'any.only': 'Le statut doit être "À faire", "En cours" ou "Terminé".',
            'any.required': 'Le statut est obligatoire.'
        }),
    
    createdAt: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'La date de création doit être une date valide.',
            'any.required': 'La date de création est obligatoire.'
        }),
    
    dueDate: Joi.date()
        .iso()
        .greater(Joi.ref('createdAt'))
        .required()
        .messages({
            'date.greater': 'La date d\'échéance doit être supérieure à la date de création.',
            'any.required': 'La date d\'échéance est obligatoire.'
        })
});

// Middleware de validation
const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ message: errorMessage });
    }
    
    next();
};

module.exports = { validateTask }; 