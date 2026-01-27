const path = require('path');
const { readJson } = require('../utils/fileStore');

const ITEMS_PATH = path.join(__dirname, '..', 'data', 'items.json');

async function getItems(req, res, next) {
  try {
    const items = await readJson(ITEMS_PATH);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function getItemById(req, res, next) {
  try {
    const items = await readJson(ITEMS_PATH);
    const id = Number(req.params.id);
    const item = items.find((x) => x.id === id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
}



async function searchItemByName(req, res, next) {
  try {
    const items = await readJson(ITEMS_PATH);
    const q = (req.query.q || "").toString().toLowerCase();
  const results = items.filter((x) =>
      x.name.toLowerCase().includes(q)
    );

    res.json({ q, count: results.length, results });
  } catch (err) {
    next(err);
  }
}



module.exports = { getItems, getItemById, searchItemByName };