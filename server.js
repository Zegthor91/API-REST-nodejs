// On importe Express (le framework pour créer notre API)
const express = require('express');

// On importe nos données depuis le fichier data.json
const data = require('./data.json');

// On crée notre application Express
const app = express();

// On définit le port sur lequel le serveur va écouter
const PORT = 3000;

// ============================================
// ROUTE 1 : GET /
// Retourne un message indiquant que l'API fonctionne
// ============================================
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API ! Elle fonctionne correctement." });
});

// ============================================
// ROUTE 2 : GET /api/items
// Retourne tous les éléments du fichier data.json
// ============================================
app.get('/api/items', (req, res) => {
    res.json(data);
});

// ============================================
// ROUTE 3 : GET /api/items/:id
// Retourne un élément par son id
// Si l'élément n'existe pas, retourne une erreur 404
// ============================================
app.get('/api/items/:id', (req, res) => {
    // On récupère l'id depuis l'URL et on le convertit en nombre
    const id = parseInt(req.params.id);

    // On cherche l'élément avec cet id dans nos données
    const item = data.find(element => element.id === id);

    // Si l'élément n'existe pas, on retourne une erreur 404
    if (!item) {
        return res.status(404).json({ error: "Élément non trouvé" });
    }

    // Sinon, on retourne l'élément trouvé
    res.json(item);
});

// ============================================
// ROUTE 4 : GET /api/search?q=mot
// Recherche un élément par nom
// ============================================
app.get('/api/search', (req, res) => {
    // On récupère le paramètre de recherche 'q' depuis l'URL
    const query = req.query.q;

    // Si aucun terme de recherche n'est fourni
    if (!query) {
        return res.status(400).json({ error: "Veuillez fournir un terme de recherche avec ?q=votre_recherche" });
    }

    // On filtre les éléments dont le nom contient le terme recherché
    // toLowerCase() permet de faire une recherche insensible à la casse
    const results = data.filter(element =>
        element.name.toLowerCase().includes(query.toLowerCase())
    );

    // On retourne les résultats
    res.json(results);
});

// ============================================
// On démarre le serveur
// ============================================
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
