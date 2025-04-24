# 1. Базовий образ Node (alpine-версія)
FROM node:20-alpine

# 2. Робоча папка для файлів проєкту
WORKDIR /usr/src/app

# 3. Копіюємо файли package.json та package-lock.json в образ
COPY package*.json ./

# 4. Встановлюємо залежності
RUN npm install --production

# 5. Копіюємо вихідний код
COPY . .

# 6. Повідомляємо Docker про порт 8080
EXPOSE 8080

# 7. Команда запуску сервісу
CMD ["npm", "start"]
