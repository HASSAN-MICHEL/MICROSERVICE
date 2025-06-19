-- Table des rôles (secrétariat, dépense, comptabilité, etc.)
CREATE TABLE roles (
    id_role SERIAL PRIMARY KEY,
    nom_role VARCHAR(50) UNIQUE NOT NULL
);

-- Table des utilisateurs
CREATE TABLE utilisateurs (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    id_role INTEGER REFERENCES roles(id_role),
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des natures de dossier
CREATE TABLE natures_dossier (
    id_nature SERIAL PRIMARY KEY,
    nom_nature VARCHAR(100) UNIQUE NOT NULL
);

-- Table des types de dossier
CREATE TABLE types_dossier (
    id_type SERIAL PRIMARY KEY,
    nom_type VARCHAR(100) UNIQUE NOT NULL
);

-- Table des dossiers
CREATE TABLE dossiers (
    id_dossier SERIAL PRIMARY KEY,
    nom_dossier VARCHAR(200) NOT NULL,
    nom_proprietaire VARCHAR(200) NOT NULL,
    date_depot DATE DEFAULT CURRENT_DATE,
    id_nature INTEGER REFERENCES natures_dossier(id_nature),
    id_type INTEGER REFERENCES types_dossier(id_type),
    statut VARCHAR(50) DEFAULT 'en cours',
    etape_actuelle VARCHAR(50) DEFAULT 'Secrétariat'
);
-- Table des étapes de traitement d’un dossier
CREATE TABLE etapes_dossier (
    id_etape SERIAL PRIMARY KEY,
    id_dossier INTEGER REFERENCES dossiers(id_dossier) ON DELETE CASCADE,
    etape VARCHAR(100) NOT NULL, -- Secrétariat, Dépense, Comptabilité, etc.
    id_utilisateur INTEGER REFERENCES utilisateurs(id_utilisateur),
    date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    decision VARCHAR(50), -- Validé, Rejeté, Transféré, etc.
    commentaire TEXT
);
