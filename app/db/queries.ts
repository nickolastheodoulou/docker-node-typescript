import { Request, Response } from 'express'
import dayjs from 'dayjs'
import { Pool } from 'pg'

interface ResultType {
  rows: String[];
}

interface RequestType {
  params: {
    quarter: string,
    id: string
  },
  body: {
    username: string
  }
}

const postgresSetupParameters = {
  user: 'postgres',
  host: 'host.docker.internal',
  database: 'nick_db',
  password: 'newpass123',
  port: 5432,
}

const pool = new Pool(postgresSetupParameters)

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('SELECT NOW()', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })

const getGrossDomesticProductGdp = async(request: RequestType, response: Response) => {
  try{
    const sqlQuery: string = 'select * from reference.gross_domestic_product_gdp'
    const results: ResultType = await pool.query(sqlQuery)
    response.status(200).json(results.rows)
  }
  catch{
    error => {
      throw error
    }
  }
}

const getGrossDomesticProductGdpByQuarter = async(request: RequestType, response: Response) => {
  try{
    const quarter: string = request.params.quarter
    const sqlQuery: string = `SELECT * FROM reference.gross_domestic_product_gdp WHERE quarter = '${quarter}'`
    const results: ResultType = await pool.query(sqlQuery)
    response.status(200).json(results.rows)
  }
  catch{
    error => {
      throw error
    }
  }
}

const createUser = async(request: RequestType, response: Response) => {
  try{
    const { username } = request.body
    const sqlQuery: string = `INSERT INTO reference.user (username, created_date) VALUES ('${username}', '${dayjs().format('YYYY-MM-DD HH:mm:ss')}')`
    await pool.query(sqlQuery)
    response.status(201).send(`User added with username: ${username}`)
  }
  catch{
    error => {
      console.log(error)
      throw error
    }
  }
}

const updateUser = async(request: RequestType, response: Response) => {
  try{
    const id = parseInt(request.params.id)
    const { username } = request.body

    const sqlQuery: string = `UPDATE reference.user SET username ='${username}' WHERE id = ${id}`
    await pool.query(sqlQuery)
    response.status(200).send(`User modified with ID: ${id}`)
  }
  catch{
    error => {
      console.log(error)
      throw error
    }
  }
}

const deleteUser = async(request: RequestType, response: Response) => {
  try{
    const id = parseInt(request.params.id)
    const sqlQuery: string = `DELETE FROM reference.user WHERE id = ${id}`
    await pool.query(sqlQuery)
    response.status(200).send(`User deleted with ID: ${id}`)
  }
  catch{
    error => {
      console.log(error)
      throw error
    }
  }
}

export {
  getGrossDomesticProductGdp,
  getGrossDomesticProductGdpByQuarter,
  createUser,
  updateUser,
  deleteUser,
}