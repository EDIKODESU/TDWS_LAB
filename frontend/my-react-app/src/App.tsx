import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Імпортуємо стилі з окремого файлу

interface User {
  id: number;
  name: string;
}


function App() {
  const [name, setName] = useState(''); // Стан для введеного імені
  const [users, setUsers] = useState<User[]>([]); // Стан для списку імен з БД

  const fetchUsers = async () => {
    try {
      // const response = await axios.get('http://localhost:8080/users');
      const response = await axios.get('/api/users');
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (err) {
      console.error('Помилка при завантаженні користувачів:', err);
    }
  };

  useEffect(() => {
    fetchUsers(); // Викликаємо один раз при завантаженні компонента
  }, []);

  // Обробка надсилання форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await axios.post('http://localhost:8080/user', { name });
      await axios.post('/api/user', { name });
      setName('');
      fetchUsers(); // Після відправки оновлюємо список
    } catch (err) {
      console.error('Помилка при збереженні імені:', err);
    }
  };

  return (
    <div className="container">
      <div className="form-block">
        <h2>Додати ім'я</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Введіть ім'я"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Надіслати</button>
        </form>
      </div>

      <div className="list-block">
        <h2>Список імен</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
