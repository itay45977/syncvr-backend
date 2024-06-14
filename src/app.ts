require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { onGameFinishRouter } from './routes/on-game-finish';
import { onGameStartRouter } from './routes/on-game-start';
import { pingRouter } from './routes/ping';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', onGameStartRouter);
app.use('/api', onGameFinishRouter);
app.use('/api', pingRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});