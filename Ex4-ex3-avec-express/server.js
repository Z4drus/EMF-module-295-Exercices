const http = require('node:http');
let users = require('./users');

// Create a REST server to handle users
const server = http.createServer((req, res) => {
    // Log each incoming request
    console.log(`Requête entrante : ${req.method} ${req.url}`);
    
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // OPTIONS
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        console.log('Requête OPTIONS traitée avec succès');
        return;
    }

    // READ users - GET
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        console.log('Requête GET traitée avec succès');
    }
    
    // ADD user - POST
    else if (req.method === 'POST') {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const newUser = JSON.parse(body);
                
                // Generate new ID (max ID + 1)
                const maxId = Math.max(...users.map(user => user.id), 0);
                newUser.id = maxId + 1;
                
                // Add new user
                users.push(newUser);
                
                // Return created status
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
                console.log('Requête POST traitée avec succès');
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Format JSON invalide' }));
                console.log('Échec de la requête POST : Format JSON invalide');
            }
        });
    }
    
    // UPDATE user - PUT
    else if (req.method === 'PUT') {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const updatedUser = JSON.parse(body);
                
                // Find user index
                const userIndex = users.findIndex(user => user.id === updatedUser.id);
                
                // Check if user exists
                if (userIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Utilisateur non trouvé' }));
                    console.log('Échec de la requête PUT : Utilisateur non trouvé');
                    return;
                }
                
                // Update user
                users[userIndex].nom = updatedUser.nom;
                
                // Return success
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users[userIndex]));
                console.log('Requête PUT traitée avec succès');
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Format JSON invalide' }));
                console.log('Échec de la requête PUT : Format JSON invalide');
            }
        });
    }
    
    // DEL user - DELETE
    else if (req.method === 'DELETE') {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const { id } = JSON.parse(body);
                
                // Check if user exists
                const userExists = users.some(user => user.id === id);
                
                if (!userExists) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Utilisateur non trouvé' }));
                    console.log('Échec de la requête DELETE : Utilisateur non trouvé');
                    return;
                }
                
                // Filter out the user to delete and get the user's name
                const userToDelete = users.find(user => user.id === id);
                users = users.filter(user => user.id !== id);
                
                // Return success with user's id and name
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Utilisateur ${userToDelete.nom} avec l'id ${id} supprimé` }));
                console.log('Requête DELETE traitée avec succès');
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Format JSON invalide' }));
                console.log('Échec de la requête DELETE : Format JSON invalide');
            }
        });
    }
    
    // Handle unsupported methods
    else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Méthode non supportée' }));
        console.log('Échec de la requête : Méthode non supportée');
    }
});

server.listen(8000, () => {
    console.log('\x1b[33mServeur démarré sur http://localhost:8000\x1b[0m');
});


// Fonctions utilitaires
function serverStatus(res, statusCode, contentType) {
    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
    }
}
