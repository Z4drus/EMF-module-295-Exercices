const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route de login pour l'authentification
router.post('/login', (req, res) => {
    // Récupération des identifiants du corps de la requête
    const { username, password } = req.body;
    
    // Vérification des identifiants
    if (username === 'admin' && password === 'admin123') {
        // Génération d'un token JWT
        const token = jwt.sign(
            { username: username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        // Envoi du token au client
        res.status(200).json({ token });
    } else {
        // Si les identifiants sont incorrects, renvoyer une erreur
        res.status(401).json({ message: 'Identifiants incorrects' });
    }
});

module.exports = router; 