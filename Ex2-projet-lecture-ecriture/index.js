// Import des modules nécessaires
const readline = require('readline');
const fs = require('fs');

// Création de l'interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Bienvenue ! Entrez du texte (tapez "exit" pour quitter) :');

// Création du flux d'écriture vers le fichier input.txt
const writeStream = fs.createWriteStream('input.txt');

// Écoute des entrées utilisateur
rl.on('line', (input) => {
  // Si l'utilisateur saisit "exit", on termine le programme
  if (input === 'exit') {
    console.log('Fin du programme. Vos entrées ont été sauvegardées dans input.txt');
    rl.close();
    return;
  }
  
  // Écrire l'entrée dans le fichier avec un retour à la ligne
  writeStream.write(input + '\n');
  
  // Afficher ce qui a été saisi
  console.log(`Vous avez saisi: ${input}`);
});

// Gestion de la fermeture de l'interface
rl.on('close', () => {
  writeStream.end();
  process.exit(0);
}); 