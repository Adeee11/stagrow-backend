// import { Request, Response } from 'express';
// // import { db } from '../database';
// import request from 'superagent';

// export const getAllUser = (req: Request, res: Response) => {
//   try {
//     db.query('SELECT * FROM customers', function (err: Error, result: Response, fields: any) {
//       if (err) throw err;
//       res.send(result);
//     });
//   } catch (error) {
//     res.send(error.message);
//   }
// };
// export const getUserByEmail = (req: Request, res: Response) => {
//   const { email } = req.params;
//   try {
//     db.query("SELECT * FROM customers WHERE email = '" + email + "'", function (err: Error, result: Response) {
//       if (err) throw err;
//       res.send(result);
//     });
//   } catch (error) {}
// };
// export const deleteUserById = (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const sql = "DELETE FROM customers WHERE id = '" + id + "'";
//     db.query(sql, function (err: Error, result: any) {
//       if (err) throw err;
//       res.send('Number of records deleted: ' + result.affectedRows);
//     });
//   } catch (error) {}
// };

// interface updatedData {
//   id: string;
//   paymentStatus: string;
//   orderStatus: string;
// }
// export const updateUserData = (data: updatedData) => {
//   const sql =
//     "UPDATE customers SET paymentStatus='"+data.paymentStatus+"',orderStatus ='" +data.orderStatus+"' WHERE id = '" +data.id+"'";
//   db.query(sql, function (err: Error, result: any) {
//     if (err) throw err;
//     console.log(result.affectedRows + ' record(s) updated');
//   });
// };

// interface productData {
//   id: string;
//   name: string;
//   email: string;
//   postal_code: string;
//   country: string;
//   orderType: string;
//   orderValue: string;
//   orderPrice: string;
//   orderStatus: string;
//   created: string;
//   paymentStatus: string;
// }
// export const insertUserData = (data: productData) => {
//   const insert =
//     "INSERT INTO customers (id, name ,email, country,postal_code,orderType,orderValue, orderPrice, orderStatus,created,paymentStatus) VALUES ('" +
//     data.id +
//     "','" +
//     data.name +
//     "', '" +
//     data.email +
//     "','" +
//     data.country +
//     "', '" +
//     data.postal_code +
//     "','" +
//     data.orderType +
//     "', '" +
//     data.orderValue +
//     "','" +
//     data.orderPrice +
//     "','" +
//     data.orderStatus +
//     "', '" +
//     data.created +
//     "', '" +
//     data.paymentStatus +
//     "')";
//   db.query(insert, function (err: Error, result: Response) {
//     if (err) throw err;
//     console.log('1 record inserted');
//   });
// };
