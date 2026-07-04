# 🚀 Week 3 – Spring REST using Spring Boot 3

This repository contains the hands-on exercises completed as part of the **Cognizant Deep Skilling Program – Week 3**. The exercises introduce Spring Boot, Spring Core, XML-based bean configuration, RESTful web services, logging, and JWT authentication.

---

## 📚 Hands-on Exercises

### 1️⃣ Create a Spring Web Project using Maven
- Created a Spring Boot project using **Spring Initializr**
- Configured Maven build
- Explored project structure
- Added Spring Boot logging
- Executed the application successfully

---

### 2️⃣ Spring Core – Load SimpleDateFormat from Spring Configuration XML
- Created XML-based Spring configuration
- Defined `SimpleDateFormat` as a Spring Bean
- Loaded beans using `ApplicationContext`
- Parsed and displayed dates
- Demonstrated Spring IoC and Dependency Injection

---

### 3️⃣ Hello World RESTful Web Service
- Developed the first REST API using Spring Boot
- Implemented `HelloController`
- Used `@RestController`
- Tested APIs using Browser and Postman
- Added request logging

**Endpoint**

```
GET /hello
```

**Response**

```
Hello World!!
```

---

### 4️⃣ REST – Country Web Service
- Created a Country model
- Loaded Country bean from Spring XML
- Returned Country object as JSON
- Learned automatic JSON serialization using Jackson

**Endpoint**

```
GET /country
```

**Response**

```json
{
    "code": "IN",
    "name": "India"
}
```

---

### 5️⃣ REST – Get Country Based on Country Code
- Used Path Variables
- Created a Service Layer
- Loaded list of countries from XML
- Implemented case-insensitive country search
- Returned country details dynamically

**Endpoint**

```
GET /country/{code}
```

Example

```
GET /country/in
```

Response

```json
{
    "code": "IN",
    "name": "India"
}
```

---

### 6️⃣ JWT Authentication Service *(Upcoming / To be implemented)*
- Generate JWT Token
- Secure REST APIs
- Authentication using Spring Boot

---

## 🛠 Technologies Used

- Java 17
- Spring Boot 3.5.16
- Spring Web
- Spring Core
- Spring IoC
- XML Bean Configuration
- Maven
- SLF4J Logging
- Embedded Tomcat
- Jackson JSON

---

## 📂 Repository Structure

```
Week-3
└── Spring REST using Spring Boot 3
    ├── 1. spring-rest-handson
    │   ├── Create a Spring Web Project using Maven
    │   ├── Spring Core – Load SimpleDateFormat from Spring Configuration XML
    │   ├── Hello World RESTful Web Service
    │   ├── REST – Country Web Service
    │   ├── REST – Get Country Based on Country Code
    │   └── JWT Authentication Service
```

---

## 🎯 Learning Outcomes

- Spring Boot Fundamentals
- Spring Initializr
- Maven Project Structure
- Spring IoC Container
- Bean Configuration using XML
- Dependency Injection
- REST API Development
- Spring MVC Annotations
- Path Variables
- JSON Serialization
- Logging with SLF4J
- Testing APIs using Browser and Postman

---

## ▶️ Running the Project

Clone the repository

```bash
git clone https://github.com/Yadhukrishna07/cognizant-deep-skilling.git
```

Navigate to the required hands-on project

```bash
cd Week-3
```

Run using Maven

```bash
mvn spring-boot:run
```

Or run `SpringLearnApplication.java` directly from IntelliJ IDEA.

---

## 👨‍💻 Developed By

**Yadhu Krishna U S**

Backend Developer | Java | Spring Boot | Full Stack Developer

---

## 📖 Program

**Cognizant Deep Skilling Program**

**Week 3 – Spring REST using Spring Boot 3**