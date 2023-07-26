import dotenv from 'dotenv';

dotenv.config();

const MongoURI = process.env.MONGOURI;

export default { MongoURI };
