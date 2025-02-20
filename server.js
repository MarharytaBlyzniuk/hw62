const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const themeRouter = require('./routes/theme');

const app = express();
const PORT = 3000;

// Подключаем middleware для парсинга JSON и cookies
app.use(express.json());
app.use(cookieParser());

// Указываем шаблонизатор (используем EJS)
app.set('view engine', 'ejs');

// Указываем путь к шаблонам
app.set('views', path.join(__dirname, 'views'));

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    const theme = req.cookies.theme || 'light'; // По умолчанию 'light'
    res.render('index', { title: 'Главная', theme });
});

// Подключаем маршруты
app.use('/auth', authRouter);
app.use('/theme', themeRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
