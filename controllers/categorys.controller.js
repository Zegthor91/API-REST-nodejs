const path = require('path');
const { readJson } = require('../utils/fileStore');

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

module.exports = { getCategorys, getCategoryById, getCategoryWithItems };
