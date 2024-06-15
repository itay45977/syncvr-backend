import { Router } from 'express';
import { setAvatar, getAvatars } from '../controllers/avatars';

const avatarsRouter: Router = Router();

avatarsRouter.put('/avatars', setAvatar);
avatarsRouter.get('/avatars', getAvatars);

export { avatarsRouter };