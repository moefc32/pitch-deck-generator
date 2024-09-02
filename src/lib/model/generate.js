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
    createData: async ({ topic, detail, language }) => {
        try {
            const timestamp = Date.now();
            const generate = await gemini({ topic, detail, language });
            const data = {
                topic,
                detail,
                language,
                created_at: timestamp,
                result: generate,
            }

            const result = await collection.insertOne(data);

            return {
                _id: result.insertedId,
                ...data
            };
        } catch (e) {
            console.error(e);
            throw new Error('Error when creating data!');
        }
    },
}
