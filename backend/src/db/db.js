import mongoose from 'mongoose'
import { getTimestamp } from '../utils/utils.js'
import 'dotenv/config'

export const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`[DATABASE] ${getTimestamp()} : MongoDB Connected Successfully`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}