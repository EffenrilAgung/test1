const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const URI = 'mongodb://127.0.0.1:27017';
const nameDb = 'auth-blog';
let database;

const connectToDatabase = async () => {
  try {
    const client = await mongoClient.connect(URI);
    database = client.db(nameDb);
    console.log(`Database Terhubung ${nameDb}`);
  } catch (error) {
    console.error(`Database gagal terhubung ${error}`);
  }
};

const getDb = () => {
  if (!database) {
    console.log('Anda belum terkoneksi ke database');
  }
  return database;
};

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
