const mysql = require('mysql');
require('dotenv').config();

// export const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASS,
// });

// export const getDatabase = () => {
//   db.connect(function (err: Error) {
//     if (err) throw err;
//     console.log('Connected!');
//   });
//   db.query('USE mydb', function (err: Error, result: Response) {
//     if (err) throw err;
//     console.log('Database Selected');
//   });

//   const sql =
//     'CREATE TABLE IF NOT EXISTS customers (id VARCHAR(255), name VARCHAR(255), email VARCHAR(255), country VARCHAR(255),postal_code VARCHAR(255), orderType VARCHAR(255), orderPrice VARCHAR(255), orderStatus VARCHAR(255),orderValue VARCHAR(255), created VARCHAR(255), paymentStatus VARCHAR(255))';
//   db.query(sql, function (err: Error, result: Response) {
//     if (err) throw err;
//     console.log('Table created');
//   });

//   // const sqls = "DROP TABLE customers";
//   // db.query(sqls, function (err:any, result:any) {
//   //   if (err) throw err;
//   //   console.log("Table deleted");
//   // });
// };
