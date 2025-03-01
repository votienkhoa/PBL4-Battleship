# 🚢 PBL4-Battleship

A real-time, two-player Battleship game developed as part of a Project-Based Learning (PBL) course. Built using the **MERN stack** (*MongoDB, Express.js, React.js, Node.js*) and **WebSocket** for real-time communication.

---

## ✨ Features

- **🎮 Real-time gameplay**: Play with a friend in real-time using WebSocket.
- **🖥️ Interactive UI**: Clean and intuitive user interface built with React.js.
- **🏆 Win/lose conditions**: The game ends when all ships of one player are sunk.
- **👥 Multiplayer support**: Two players can join and play together seamlessly.



## ⚡ Technologies Used

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


## 🚀 Live Demo
Check out the live demo of the project here:  
[![Live Demo](https://img.shields.io/badge/Live_Demo-Open-purple?style=for-the-badge)](https://kohu-battleship.onrender.com)


## 🖥️ Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/votienkhoa/PBL4-Battleship.git
2. **Navigate to the project directory**:
   ```bash
   cd PBL4-Battleship
3. **Install dependencies**
   - For the frontend:
     ```bash
     cd frontend
     npm install
   - For the backend:
       ```bash
       cd ../backend
       npm install
       ```

4. **Set up environment variables**:
   - **Backend**:
      1. Create a `.env` file in the `backend` directory.
      2. Add the following variables:
         ```env
         MONGODB_URI=your_mongodb_connection_string
         ACCESS_TOKEN_SECRET=your_jwt_secret_key
         PORT=3000
         ```
      3. Replace `your_mongodb_connection_string` with your actual MongoDB connection string.
      4. Replace `your_jwt_secret_key` with a secure secret key for JWT token generation.

   - **Frontend**:
      1. Create a `.env` file in the `frontend` directory.
      2. Add the following variable:
         ```env
         VITE_BACKEND_URL=http://localhost:3000
         ```
      3. This variable will be used to connect the frontend to the backend server.
5. **Run the project**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```
6. **Open the game**:
   - Access the game in your browser at `http://localhost:5173`.
---
## 📸 Screenshots

Here are some screenshots of the project in action:

### 1. **Home Page**
![image](https://github.com/user-attachments/assets/26993c48-9243-473e-813a-74c45fad8644)

### 2. **Login**
![image](https://github.com/user-attachments/assets/3fe48771-61a9-4be8-8e60-ca690d05fdc4)

![image](https://github.com/user-attachments/assets/69fb184f-a892-42ff-94d6-bb292ec3d53a)

### 3. **Gameplay**
![image](https://github.com/user-attachments/assets/d4a0cdba-0475-42a0-a092-1e08e90973dd)

---
## 🤝 Contributing
   1. **Fork the repository**:
   2. **Create your branch**:
      ```bash
      git checkout -b feature/AmazingFeature
      ```
   3. **Commit your changes**:
      ```bash
      git commit -m 'Add some AmazingFeature'
      ```
   4. **Push to the branch**:
      ```bash
      git push origin feature/AmazingFeature
      ```
   5. **Open a Pull Request**
## 📞 Contact

If you have any questions, suggestions, or just want to say hello, feel free to reach out:

- **👤 Author**: Vo Tien Khoa
- **🌐 GitHub**: [votienkhoa](https://github.com/votienkhoa)
- **📧 Email**: vtkhoa.itf@gmail.com
- **🔗 Project Link**: [https://github.com/votienkhoa/PBL4-Battleship](https://github.com/votienkhoa/PBL4-Battleship)
   
