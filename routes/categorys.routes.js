const express = require('express');
const { getCategorys, getCategoryById, getCategoryWithItems } = require('../controllers/categorys.controller');

const router = express.Router();

// /api/categorys
router.get("/", getCategorys);
router.get("/:id", getCategoryById);
router.get("/:id/items", getCategoryWithItems);

module.exports = router;
