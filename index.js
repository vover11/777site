import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';


// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/3dmodels', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Определение модели пользователя
const User = mongoose.model('User', {
  username: String,
  email: String,
});


// Загрузка переменных из файла .env
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));

// Включаем CORS
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

app.get('/api/users', async (req, res) => {
  try {
    // Извлечение данных из MongoDB
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});