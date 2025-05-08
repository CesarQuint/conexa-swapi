# Conexa-Swapi

A RESTful API built with [NestJS] for managing Star Wars films. This API includes robust validation, role-based access control, and comprehensive Swagger documentation.

---

## Features

- Create, read, update, and delete Star Wars films
- Input validation using class-validator and DTOs
- Role-based access control (ADMIN & REGULAR)
- OpenAPI (Swagger) documentation
- Modular and clean architecture following DDD Principles

---

## Installation

```bash
# Clone the repository
git clone https://github.com/CesarQuint/conexa-swapi
cd conexa-swapi

# Install dependencies
npm install
```

## Running the app

### Set Up

Define a .env file
Load the data using the next command

```bash
npm run setup
```

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## Swagger API Docs

The API is fully documented with Swagger.
Visit: http://localhost:3000/api
Production https://conexa-swapi.onrender.com/api

## Test Jest

This project has tests for controller and services
To run them use this command

```bash
npm run test
```
