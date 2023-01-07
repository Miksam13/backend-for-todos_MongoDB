import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import routerItems from './routes/items.js';
import routerAuth from './routes/auth.js';
import { connect } from 'mongoose';

const PORT = 3000;

const app = express();

const URL =
  'mongodb+srv://miksam:002256@cluster0.gc80j5h.mongodb.net/todobox?retryWrites=true&w=majority';

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/todobox',
    }),
    secret: 'todopass',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.static('static'));
app.use('/api/v1', routerItems, routerAuth);

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

async function serverStart() {
  try {
    await connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log(`Connected to DB`);
      app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
      });
    });
  } catch (e) {
    console.log(`Connection crashed with error: ${e}`);
  }
}

serverStart();
