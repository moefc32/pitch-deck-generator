import {
    VITE_MONGO_USER,
    VITE_MONGO_PASS,
    VITE_MONGO_HOST,
    VITE_MONGO_PORT,
    VITE_MONGO_DB
} from '$env/static/private'
import { MongoClient } from 'mongodb';

const mongoURL = (VITE_MONGO_USER && VITE_MONGO_PASS)
    ? `mongodb://${VITE_MONGO_USER}:${VITE_MONGO_PASS}@${VITE_MONGO_HOST}:${VITE_MONGO_PORT}/${VITE_MONGO_DB}`
    : `mongodb://${VITE_MONGO_HOST}:${VITE_MONGO_PORT}/${VITE_MONGO_DB}`;

export default new MongoClient(mongoURL);
