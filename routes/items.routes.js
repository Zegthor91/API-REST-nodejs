const express = require('express');
const { getItems, getItemById, searchItemByName, createItem } = require('../controllers/items.controller');

const router = express.Router();

// /api/items
router.get("/", getItems);
router.get("/search", searchItemByName);  // IMPORTANT: doit être avant /:id
router.get("/:id", getItemById);
router.post("/", createItem);

module.exports = router;
