const express = require('express');
const { getCategorys, getCategoryById, getCategoryWithItems, createCategory, updateCategory, deleteCategory } = require('../controllers/categorys.controller');

const router = express.Router();

// /api/categorys
router.get("/", getCategorys);
router.get("/:id", getCategoryById);
router.get("/:id/items", getCategoryWithItems);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
