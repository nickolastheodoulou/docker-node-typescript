import path =require('path')
import express, { Request, Response } from 'express'
import { getGrossDomesticProductGdp, getGrossDomesticProductGdpByQuarter, createUser, updateUser, deleteUser } from './db/queries'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT: number = 5000;
const publicDirectoryPath: string = path.join(__dirname, '../public')

app.use(bodyParser());
app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.options('*', cors());
app.use(express.static(publicDirectoryPath))

app.get('/getGrossDomesticProductGdp', getGrossDomesticProductGdp)
app.get('/getGrossDomesticProductGdpByQuarter/:quarter', getGrossDomesticProductGdpByQuarter)
app.post('/user', createUser)
app.put('/user/:id', updateUser)
app.delete('/user/:id', deleteUser)

app.get('*', (req:Request, res:Response) => {
    res.send('My 404');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})