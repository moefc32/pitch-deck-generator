import { ObjectId } from 'mongodb';
import mongoClient from '../mongodb';
import gemini from './gemini';

const collection = mongoClient.db().collection('generated');

export default {
    getAllData: async () => {
        try {
            const result = await collection.find().toArray();
            result.forEach(item => delete item.result);

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when getting all data!');
        }
    },
    getData: async (id) => {
        try {
            const result = await collection.findOne({ _id: new ObjectId(id) });

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when getting data!');
        }
    },
    createData: async (topic) => {
        try {
            const timestamp = Date.now();
            const generate = await gemini(topic);

            const result = await collection.insertOne({
                topic,
                created_at: timestamp,
                result: generate,
            });

            return {
                _id: result.insertedId,
                topic,
                created_at: timestamp,
                result: generate,
            };
        } catch (e) {
            console.error(e);
            throw new Error('Error when creating data!');
        }
    },
}
