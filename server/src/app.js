// npm packages
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

// our packages
import {logger} from './util';
import {auth as authConfig} from '../config';
import setupAuthRoutes from './auth';
import setupUserRoutes from './user';
import setupSportRoutes from './sport';
import setupSportSessionRoutes from './sportSession';
import setupExerciseRoutes from './exercise';
import setupRoutineRoutes from './routine';
import setupDiet from './diet';
import setupImages from './images';

// init app
const app = express();

// setup static files service
app.use('/static', express.static('public'));

// setup logging
app.use(morgan('combined', {stream: logger.stream}));

// setup CORS
app.use(cors());

// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// add cookie parsing
app.use(cookieParser());

// add session support
app.use(session({
  secret: authConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
}));

// add passport.js
app.use(passport.initialize());
app.use(passport.session());

// test method
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// setup authentication routes
setupAuthRoutes(app);
setupUserRoutes(app);

// setup sport and sport session routes
setupSportRoutes(app);
setupSportSessionRoutes(app);

// setup exercise and routine routes
setupExerciseRoutes(app);
setupRoutineRoutes(app);

// setup diet
setupDiet(app);

setupImages(app);

// catch all unhandled errors
app.use((err, req, res, next) => {
  logger.error('unhandled application error: ', err);
  res.status(500).send(err);
});

// export app
export default app;
