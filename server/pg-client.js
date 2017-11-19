import pg from 'pg';

let connection_string = 'pg://readonly_user:turner@aws-us-east-1-portal.27.dblayer.com:25183/titles';

let pgClient = new pg.Client(connection_string);

pgClient.connect( (err, db, done) => {
	if(err) console.error(err);
	console.log('Database connection established');
});

export default pgClient;