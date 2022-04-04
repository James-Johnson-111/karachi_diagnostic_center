const mysql = require('mysql');

const db = mysql.createPool( 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_kdc',
        multipleStatements: true,
        supportBigNumbers: true,
        connectionLimit: 300,
        dateStrings: true
    }
);

setInterval(() => {
    console.log(`Database Open Connections ${ db._allConnections.length }`);
	console.log(`Acquiring Connections ${db._acquiringConnections.length}`);
	console.log(`Free Connections ${db._freeConnections.length}`);
	console.log(`Queue Connections ${db._connectionQueue.length}`);
}, 5000);

module.exports = db;