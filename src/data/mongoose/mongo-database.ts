import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDataBase {

    static async connect({ mongoUrl, dbName }: Options) {
        try {
            await mongoose.connect(mongoUrl, {
                dbName
            });
            console.log('Connected to MongoDB')

        } catch (error) {
            console.log('Error connecting to MongoDB')
            throw error
        }
    }
}