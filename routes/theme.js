const express = require('express');
const router = express.Router();

// Сохранение темы пользователя в cookies
router.get('/set/:theme', (req, res) => {
    const theme = req.params.theme; // Получаем тему из параметров
    if (!theme) return res.status(400).json({ error: 'Theme is required' });

    res.cookie('theme', theme, { httpOnly: true });
    res.redirect('/'); // Перенаправление на главную страницу
});

// Получение текущей темы из cookies
router.get('/get', (req, res) => {
    const theme = req.cookies.theme || 'light'; // По умолчанию 'light'
    res.json({ theme });
});

module.exports = router;
