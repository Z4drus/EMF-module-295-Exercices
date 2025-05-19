-- Création de la base de données
CREATE DATABASE IF NOT EXISTS db_championnat;
USE db_championnat;

-- Table des équipes
CREATE TABLE t_equipe (
    pk_equipe INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    PRIMARY KEY (pk_equipe)
);

-- Table des utilisateurs
CREATE TABLE t_utilisateur (
    pk_utilisateur INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (pk_utilisateur)
);

-- Table des joueurs
CREATE TABLE t_joueur (
    pk_joueur INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    numero INT,
    fk_equipe INT,
    PRIMARY KEY (pk_joueur),
    FOREIGN KEY (fk_equipe) REFERENCES t_equipe(pk_equipe) ON DELETE CASCADE
);
