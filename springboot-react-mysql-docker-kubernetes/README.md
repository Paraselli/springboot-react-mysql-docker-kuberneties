# 🚀 Spring Boot + React + MySQL + Docker + Kubernetes

A full-stack **cloud-native application** built using **Spring Boot (Backend), React (Frontend), MySQL (Database)** and deployed using **Docker and Kubernetes**.

This project demonstrates **end-to-end microservice architecture**, containerization, and scalable deployment.

---

## 🧩 Tech Stack

* **Backend**: Spring Boot, Spring MVC, Spring Security
* **Frontend**: React.js (Hooks, Functional Components)
* **Database**: MySQL
* **Containerization**: Docker, Docker Compose
* **Orchestration**: Kubernetes (Deployment, Services)
* **Build Tools**: Maven, npm

---

## ⚙️ Features

* ✅ Full-stack application (React + Spring Boot)
* ✅ REST APIs with authentication (JWT-based)
* ✅ MySQL integration for persistent storage
* ✅ Dockerized backend and frontend
* ✅ Kubernetes deployment (scalable)
* ✅ CI/CD ready architecture

---

## 🏗️ Architecture

* React frontend communicates with Spring Boot APIs
* Backend connects to MySQL database
* Services are containerized using Docker
* Kubernetes manages deployment and scaling

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash id="q1q8rx"
git clone https://github.com/Paraselli/springboot-react-mysql-docker-kubernetes.git
cd springboot-react-mysql-docker-kubernetes
```

---

### 2️⃣ Run using Docker

```bash id="6hyl3z"
docker-compose up -d
```

---

### 3️⃣ Access application

* Frontend: http://localhost:3000
* Backend API: http://localhost:8080

---

## ☸️ Kubernetes Deployment

Apply deployment configuration:

```bash id="u3s9pf"
kubectl apply -f deployment.yaml
```

Check pods:

```bash id="k7c6sl"
kubectl get pods
```

---

## 📡 API Example

```http id="rmz9tw"
POST /api/auth/login
```

```json id="yo0xfk"
{
  "username": "admin",
  "password": "password"
}
```

---

## 🔥 Use Cases

* Full-stack enterprise applications
* Cloud-native deployments
* Scalable backend systems
* Container-based deployments

---

## 📌 Future Enhancements

* Add API Gateway (Spring Cloud)
* Implement Kafka for async communication
* Add Redis caching
* Integrate CI/CD pipelines (Jenkins/GitHub Actions)

---

## 👨‍💻 Author

**Ram Paraselli**
🔗 linkedin.com/in/ram-paraselli
🔗 github.com/Paraselli

---

## ⭐ Star this repo if you find it useful!
