
import { Request, Response } from 'express';
import { connectToDatabase } from '../lib/database';

export async function setAvatar(req: Request, res: Response) {
    const { uniqueId, email, avatarType} = req.body;
    if (!uniqueId || !email || !avatarType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { db } = await connectToDatabase();
        await db.collection('avatars').insertOne({ uniqueId, done: false, email , avatarType});
        return res.json({ message: 'Avatar set'});
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getOtherAvatar(req: Request, res: Response) {
    const { uniqueId, email } = req.query;
    if (!uniqueId || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { db } = await connectToDatabase();
        const avatar = await db.collection('avatars').findOne({
            uniqueId,
            email: { $ne: email },
            done: false
        });
        return res.json(avatar);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}