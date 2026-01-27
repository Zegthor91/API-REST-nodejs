const path = require('path');
const { readJson } = require('../utils/fileStore');

const ITEMS_PATH = path.join(__dirname, '..', 'data', 'items.json');
const CATEGORYS_PATH = path.join(__dirname, '..', 'data', 'categorys.json');

function findCategoryForItem(categorys, itemId) {
  const category = categorys.find((cat) => cat.items.includes(itemId));
  return category ? { id: category.id, name: category.name } : null;
}

async function getItems(req, res, next) {
  try {
    const items = await readJson(ITEMS_PATH);
    const categorys = await readJson(CATEGORYS_PATH);
    const itemsWithCategory = items.map((item) => ({
      ...item,
      category: findCategoryForItem(categorys, item.id)
    }));
    res.json(itemsWithCategory);
  } catch (err) {
    next(err);
  }
}

async function getItemById(req, res, next) {
  try {
    const items = await readJson(ITEMS_PATH);
    const categorys = await readJson(CATEGORYS_PATH);
    const id = Number(req.params.id);
    const item = items.find((x) => x.id === id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({
      ...item,
      category: findCategoryForItem(categorys, item.id)
    });
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