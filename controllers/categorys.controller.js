const path = require('path');
const { readJson, writeJson } = require('../utils/fileStore');

const CATEGORYS_PATH = path.join(__dirname, '..', 'data', 'categorys.json');
const ITEMS_PATH = path.join(__dirname, '..', 'data', 'items.json');

async function getCategorys(req, res, next) {
  try {
    const categorys = await readJson(CATEGORYS_PATH);
    res.json(categorys);
  } catch (err) {
    next(err);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const categorys = await readJson(CATEGORYS_PATH);
    const id = Number(req.params.id);
    const category = categorys.find((x) => x.id === id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
}

async function getCategoryWithItems(req, res, next) {
  try {
    const categorys = await readJson(CATEGORYS_PATH);
    const items = await readJson(ITEMS_PATH);
    const id = Number(req.params.id);
    const category = categorys.find((x) => x.id === id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryItems = items.filter((item) => category.items.includes(item.id));

    res.json({
      ...category,
      items: categoryItems
    });
  } catch (err) {
    next(err);
  }
}

// Méthode POST (postman)

async function createCategory(req, res, next) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Le champ 'name' est requis" });
    }

    const categorys = await readJson(CATEGORYS_PATH);
    const newId = categorys.length > 0 ? Math.max(...categorys.map((c) => c.id)) + 1 : 1;
    const newCategory = { id: newId, name, items: [] };

    categorys.push(newCategory);
    await writeJson(CATEGORYS_PATH, categorys);

    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
}

// Méthode PUT (postman)

async function updateCategory(req, res, next) {
  try {
    const categorys = await readJson(CATEGORYS_PATH);
    const id = Number(req.params.id);
    const index = categorys.findIndex((x) => x.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Category not found" });
    }

    const { name, items } = req.body;
    if (name !== undefined) categorys[index].name = name;
    if (items !== undefined) categorys[index].items = items;

    await writeJson(CATEGORYS_PATH, categorys);

    res.json(categorys[index]);
  } catch (err) {
    next(err);
  }
}

// Méthode DELETE (postman)

async function deleteCategory(req, res, next) {
  try {
    const categorys = await readJson(CATEGORYS_PATH);
    const id = Number(req.params.id);
    const index = categorys.findIndex((x) => x.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Category not found" });
    }

    const deleted = categorys.splice(index, 1)[0];
    await writeJson(CATEGORYS_PATH, categorys);

    res.json({ message: "Catégorie supprimée", category: deleted });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCategorys, getCategoryById, getCategoryWithItems, createCategory, updateCategory, deleteCategory };
