
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

export async function getAvatars(req: Request, res: Response) {
    const { uniqueId } = req.query;
    if (!uniqueId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { db } = await connectToDatabase();
        const avatars = await db.collection('avatars').find({ uniqueId, done: false })
        return res.json(avatars);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}