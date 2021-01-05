const Mysql = require("mysql");

const pool = Mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "test",
    // debug: true,
    dateStrings: true
});

module.exports = (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
            console.log('connected as id ' + connection.threadId);
			if (err) {
				reject(err);
			} else {
				// sql = "select * from _mysql_session_store;"
				connection.query(sql, values, (error, rows) => {
					if (error) {
						reject(error);
					} else {
						resolve(rows);
					}
					connection.release();
				})
			}
		})
	})
}

/*
    connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
        if (error) throw error;
        // ...
    });
*/