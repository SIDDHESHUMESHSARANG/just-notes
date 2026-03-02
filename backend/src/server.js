import express from "express"
import 'dotenv/config'
import { connectToDB } from "../db/db.js"
import Routes from '../routes/notesRoutes.js'
import CORS from 'cors'
import { getTimestamp } from "../utils/utils.js"
import dns from 'dns';
dns.setServers(["8.8.8.8", "1.1.1.1"]); 


const app = express()
app.set("trust proxy", true);
const port = process.env.PORT || 3001

const CORSConfig = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(CORS(CORSConfig))

app.use(express.json())

app.use("/api/v1/notes", Routes)

connectToDB() 

app.listen(port,() => {
    console.log(`[SYSTEM] ${getTimestamp()} : Server spinned up`)
    console.log(
      `[SYSTEM] ${getTimestamp()} : ` + `http://localhost:${port}/api/v1/notes`,
    );
})


