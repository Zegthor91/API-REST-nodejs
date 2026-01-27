const fs = require('fs/promises'); 

async function readJson(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    console.log('Read JSON from:', filePath);
    return JSON.parse(raw);
  } catch (err) {
    // Si fichier absent ou JSON invalide, on retourne un fallback maîtrisé
    if (fallback !== undefined) return fallback;
    throw err;
  }
}


module.exports = { readJson };