import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import pg from 'pg';
import http from 'http';

import repoApi from './repo';

const port = 4000;

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded( { extended: true } ));
app.use(cors());

app.use(morgan('dev'));

app.use('/api/title', repoApi);

const server = http.createServer(app);

server.listen( port, () => console.info(`Server running on port: ${ port }`));

// let connection_string = 'pg://readonly_user:turner@aws-us-east-1-portal.27.dblayer.com:25183/titles';

// let client = new pg.Client(connection_string);

// client.connect( (err, db, done) => {
// 	if(err) console.error(err);
// 	console.log('Database connection established');
// });

process.on('unhandledRejection', er => {
	console.error(er);
})