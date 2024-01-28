import fs from 'fs'
import { FastifyInstance } from 'fastify'
import Config, { INDEV } from '../data/config'
import Pgp from 'pg-promise'
import { spawn } from 'child_process'
import process from 'node:process'

// Extend the FastifyInstance interface to include the pg property
declare module 'fastify' {
  interface FastifyInstance {
    pg: any
  }
}

// Function to camelCase column names in the result set
function cameliseColumnNames1(data) {
  const tmp = data[0]
  for (let prop in tmp) {
    const camel = pgp.utils.camelize(prop)
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i]
        d[camel] = d[prop]
        delete d[prop]
      }
    }
  }

  return data
}

// Initialize pg-promise with options
const pgp = Pgp({
  capSQL: true,
  receive: ((data: any[], result: any, ctx: any) => {
    // CamelCase column names in the result set
    const camelised = cameliseColumnNames1(data)
    if (camelised && result) {
      result.rows = camelised
    }
  }) as any,
})

// pg-promise connection
export const pg = pgp(Config.db)

// Function to get or create a pg-promise instance
export const pgInstance = () => {
  if (pg) {
    return pg
  }

  return pgp(Config.db)
}

// Function to initialize Postgres connection
export const Postgres = async function (app: FastifyInstance) {
  // Check if the application is in development mode
  if (INDEV) {
    // Create a pg-promise instance and assign it to the app's pg property
    const pg = (app.pg = pgInstance())
    return
  }
}

// Export Postgres as the default export
export default Postgres
