# 🚀 Spring Boot React MySQL Docker Kubernetes

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge\&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=for-the-badge\&logo=springboot)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge\&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge\&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge\&logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestrated-326CE5?style=for-the-badge\&logo=kubernetes)

### ⚡ Full-stack cloud-native application with Spring Boot, React, MySQL, Docker & Kubernetes

</div>

---

## 📌 Overview

This project is a **portfolio-ready full-stack cloud-native application** built to demonstrate modern software engineering and deployment practices using:

* **Spring Boot** for backend REST APIs
* **React.js** for frontend UI
* **MySQL** for relational data storage
* **Docker** for containerization
* **Kubernetes** for orchestration & deployment

It showcases how to build, connect, containerize, and deploy a modern full-stack application using industry-standard cloud-native tools.

---

## 🏗️ Architecture

```text id="n6o6x1"
     +------------------+
     |   React Frontend |
     +--------+---------+
              |
              v
     +------------------+
     | Spring Boot API  |
     +--------+---------+
              |
              v
     +------------------+
     |   MySQL Database |
     +------------------+

 Docker → Containerization
 Kubernetes → Deployment & Scaling
```

---

## ✨ Features

* ✅ Full-stack architecture
* ✅ Spring Boot REST APIs
* ✅ React frontend integration
* ✅ MySQL database connectivity
* ✅ Dockerized services
* ✅ Kubernetes deployment
* ✅ Portfolio-ready cloud-native project

---

## 🛠️ Tech Stack

| Technology  | Purpose             |
| ----------- | ------------------- |
| Java 17     | Backend language    |
| Spring Boot | Backend framework   |
| React.js    | Frontend UI         |
| Axios       | API communication   |
| MySQL       | Relational database |
| Docker      | Containerization    |
| Kubernetes  | Orchestration       |

---

## 📂 Project Structure

```bash id="3p7u4k"
springboot-react-mysql-docker-kubernetes/
├── backend/
├── frontend/
├── docker/
├── kubernetes/
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash id="1v4v4h"
git clone https://github.com/Paraselli/springboot-react-mysql-docker-kubernetes.git
cd springboot-react-mysql-docker-kubernetes
```

---

### 2️⃣ Run Backend

```bash id="j9e2lp"
cd backend
mvn spring-boot:run
```

Backend runs on:

```bash id="r1qv4h"
http://localhost:8080
```

---

### 3️⃣ Run Frontend

```bash id="8r4lzm"
cd frontend
npm install
npm start
```

Frontend runs on:

```bash id="r9h2pm"
http://localhost:3000
```

---

## 🐳 Docker Setup

### Build Images

```bash id="1w3k9d"
docker build -t backend ./backend
docker build -t frontend ./frontend
```

### Run Containers

```bash id="1f3t7m"
docker-compose up
```

---

## ☸️ Kubernetes Deployment

### Apply Kubernetes Configs

```bash id="8r1l2m"
kubectl apply -f kubernetes/
```

This deploys:

* Frontend
* Backend
* MySQL

with scalable container orchestration.

---

## 🔄 Application Flow

1. User accesses React UI
2. React sends API request to Spring Boot
3. Spring Boot processes request
4. MySQL stores and retrieves data
5. Docker packages services
6. Kubernetes manages deployment & scaling

---

## 🎯 Why This Project Matters

This project demonstrates real-world **full-stack + DevOps engineering**:

* Full-stack application design
* Frontend + backend integration
* Relational database connectivity
* Docker containerization
* Kubernetes orchestration
* Cloud-native deployment practices

Perfect for:

* Full-stack portfolio
* Resume project
* Backend + frontend interviews
* DevOps discussions

---

## 🚀 Future Improvements

* Add JWT Authentication
* Add CI/CD pipeline
* Deploy to AWS / Azure
* Add monitoring (Prometheus + Grafana)
* Add API Gateway & Ingress

---

## 👨‍💻 Author

---

### Ram Paraselli

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge\&logo=linkedin)](https://www.linkedin.com/in/ram-paraselli/)

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge\&logo=github)](https://github.com/Paraselli)

---

## ⭐ Support

If this project helped you, consider giving it a **star** ⭐ on GitHub.
