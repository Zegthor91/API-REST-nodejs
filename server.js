const express = require('express');
const itemsRoutes = require('./routes/items.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "TEST de l'api : elle fonctionne correctement." });
});

// Utilisation des routes modulaires
app.use('/api/items', itemsRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
