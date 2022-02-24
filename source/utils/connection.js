const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'learnbetter',
	password: 'learnbetter',
	database: 'learnbetter',
	port: 3306,
});

connection.connect(function (error) {
	if (error) {
		throw error;
	} else {
		console.log('Connected to database');
		connection.end();
	}
});

return connection;
