import { ObjectId } from 'mongodb';
import mongoClient from '../mongodb';

const collection = mongoClient.db().collection('auth');

export default {
    getLogin: async (email) => {
        try {
            const result = await collection.findOne({ email });
            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when getting login data!');
        }
    },
    editUser: async (data) => {
        try {
            const account = await collection.findOne();
            const result = await collection.updateOne(
                { _id: new ObjectId(account._id) },
                { $set: data });

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when editing login data!');
        }
    },
}
