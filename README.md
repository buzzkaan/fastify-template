# Fastify TypeScript Backend Template

This repository provides a development template for a backend using Fastify, Node.js, and TypeScript.

## Installation

Follow these steps to set up and run the template on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

# Install Dependencies:
1. **Dependencies:**
   ```bash
    yarn install
   yarn dev

## Configuration

The database connection parameters can be configured in the `data` folder. Open the `config.ts` file and modify the values according to your database settings:

```typescript
export const {
  DB_HOST = INDEV ? '127.0.0.1' : 'postgres',
  DB_PORT = 5432,
  DB_USER = 'postgres',
  DB_PASSWORD = 'postgres',
  DB_DATABASE = 'name',
  // REDIS_HOST = INDEV ? 'localhost' : 'redis',
  // REDIS_PORT = 6379,
} = process.env;
