const path = require('path');
const { readJson, writeJson } = require('../utils/fileStore');

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

// Méthode POST (postman)

async function createItem(req, res, next) {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "Les champs 'name' et 'price' sont requis" });
    }

    const items = await readJson(ITEMS_PATH);
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = { id: newId, name, price: Number(price) };

    items.push(newItem);
    await writeJson(ITEMS_PATH, items);

    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
}

// Méthode PUT (postman)

async function updateItem(req, res, next) {
  try {
    const items = await readJson(ITEMS_PATH);
    const id = Number(req.params.id);
    const index = items.findIndex((x) => x.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const { name, price } = req.body;
    if (name !== undefined) items[index].name = name;
    if (price !== undefined) items[index].price = Number(price);

    await writeJson(ITEMS_PATH, items);

    res.json(items[index]);
  } catch (err) {
    next(err);
  }
}

// Méthode DELETE (postman)

async function deleteItem(req, res, next) {
  try {
    const items = await readJson(ITEMS_PATH);
    const id = Number(req.params.id);
    const index = items.findIndex((x) => x.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const deleted = items.splice(index, 1)[0];
    await writeJson(ITEMS_PATH, items);

    res.json({ message: "Item supprimé", item: deleted });
  } catch (err) {
    next(err);
  }
}

module.exports = { getItems, getItemById, searchItemByName, createItem, updateItem, deleteItem };