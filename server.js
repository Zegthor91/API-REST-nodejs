const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const getData = () => {
    const filePath = path.join(__dirname, 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
};

app.get('/', (req, res) => {
    res.json({ message: "TEST de l'api : elle fonctionne correctement." });
});

app.get('/api/items', (req, res) => {
    const data = getData();
    res.json(data);
});

app.get('/api/items/:id', (req, res) => {
    const data = getData();
    const id = parseInt(req.params.id);
    const item = data.find(element => element.id === id);

    if (!item) {
        return res.status(404).json({ error: "Élément non trouvé" });
    }

    res.json(item);
});

app.get('/api/search', (req, res) => {
    const data = getData();
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: "Veuillez fournir un terme de recherche avec ?q=votre_recherche" });
    }

    const results = data.filter(element =>
        element.name.toLowerCase().includes(query.toLowerCase())
    );

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
