import mongoose from 'mongoose';

const MONGODB_URL= process.env.MONGODB_URL! || 'mongodb://localhost:27017/your_db_name';
console.log(MONGODB_URL);
if(!MONGODB_URL){
    throw new Error('MONGODB_URL must be provided');
}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose = { conn:null, promise:null }
}
export async function dbConnect(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            bufferMaxEntries: 0,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        console.log("op")
        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }
    //not working
    try{
        cached.conn = await cached.promise;
    } catch(err){
        cached.promise = null;
        throw err;
    }
    // cached.conn = await cached.promise;
    return cached.conn;
}