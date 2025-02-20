const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET_KEY = require('../config/keys').JWT_SECRET;

// Функция для генерации JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

// Маршрут регистрации (фейковый, без базы данных)
router.post('/register', (req, res) => {
    const userId = Date.now(); // В реальном приложении используй базу данных
    const token = generateToken(userId);
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'User registered', token });
});

// Маршрут входа
router.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    const userId = Date.now(); // Здесь должна быть проверка пользователя из БД
    const token = generateToken(userId);
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'User logged in', token });
});

module.exports = router;
