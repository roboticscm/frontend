import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { post as postLesson } from './routes/index_api';
import { get as getLessons } from './routes/course/details/lesson_api';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

const { Model } = require('objection');
const knex = require('knex');
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const db = knex(config);
Model.knex(db);
const { Lesson } = require('./models/Lesson');
Lesson.query().then((res) => {
	// console.log(res);
});

Lesson.query().patch({
	content: 'test content222333xxxx',

}).findById('2411813163231085616').
	then((res) => {
		console.log(res);
	});



app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.get("/get-lessons", getLessons);
app.post("/lesson", postLesson);

app
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		cookieParser(),
    (req, res, next) => {
      const token = req.cookies['my-jwt']
      const profile = token ? jwt.decode(token) : false

      return sapper.middleware({
        session: () => {
          return {
            authenticated: !!profile,
            profile
          }
        }
      })(req, res, next)
    })
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
