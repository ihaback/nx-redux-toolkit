import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import routes from './app/routes';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

const CLIENT_BUILD_PATH = path.join(__dirname, '../frontend');

const app = express();
app.disable('x-powered-by');
app.use(express.static(CLIENT_BUILD_PATH));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.NX_SITE_LOCAL],
    credentials: true,
  })
);

app.use('/user', routes.user);
app.use('/customer', routes.customer);

app.get('*', (request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);

mongoose.connect(
  process.env.NX_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);

    console.log('Connected to mongoDB');
  }
);
