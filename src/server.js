import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { get as getIndex } from './routes/index_api';
import { get as getLessons } from './routes/course/details/lesson_api';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.get("/get-lessons", getLessons);

app
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
