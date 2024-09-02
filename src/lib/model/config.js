import { ObjectId } from 'mongodb';
import mongoClient from '../mongodb';

const collection = mongoClient.db().collection('config');

export default {
    getConfig: async () => {
        try {
            const result = await collection.findOne();
            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when getting config data!');
        }
    },
    editConfig: async (data) => {
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(account._id) },
                { $set: data });

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when editing config data!');
        }
    },
}
