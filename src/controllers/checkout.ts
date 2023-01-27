import axios from 'axios';
import { Request, Response } from 'express';
import { api } from '../wrapperApi';
// import { insertUserData, updateUserData } from '../user';

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SK);

export const getTest = async (req: Request, res: Response) => {
  try {
    res.send('ok');
  } catch (error) {
    res.send(error);
  }
};
export const getCheckout = async (req: Request, res: Response) => {
  const { number, exp_month, exp_year, cvc, name, email, postal_code, country, amount, orderType, orderValue } =
    req.body;

  try {
    let customerId;
    const customers = await stripe.customers.list({
      email: `${email}`,
    });

    if (customers.data.length === 0) {
      const customer = await stripe.customers.create({
        name,
        email,
        description: 'Stagro',
        address: {
          postal_code,
          country,
        },
      });
      customerId = customer.id;
    } else {
      customerId = customers.data[0].id;
    }

    insertUserData({
      id: customerId,
      name,
      email,
      postal_code,
      country,
      orderType,
      orderValue,
      orderPrice: amount,
      orderStatus: 'pending',
      created: new Date().toString(),
      paymentStatus: 'pending',
    });
    const configServices = {
      method: 'post',
      url: `${api}&action=services`,
    };
    const configBalance = {
      method: 'post',
      url: `${api}&action=balance`,
    };
    const services = await axios(configServices);
    if (!services.data) {
      updateUserData({
        id: customerId,
        paymentStatus: 'pending',
        orderStatus: 'order not created',
      });
      res.status(200).json({ err: 'Something went wrong!' });
    } else {
      const balance = await axios(configBalance);
      if (Number(balance.data.balance) === 0) {
        updateUserData({
          id: customerId,
          paymentStatus: 'pending',
          orderStatus: 'order not created',
        });
        res.status(200).json({ err: 'Insufficient Balance!' });
      } else {
        const paymentMethod = await stripe.paymentMethods.create({
          type: 'card',
          card: {
            number,
            exp_month,
            exp_year,
            cvc,
          },
        });

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: 'inr',
          payment_method_types: ['card'],
          payment_method: paymentMethod.id,
          customer: customerId,
        });
        const intent = await stripe.paymentIntents.confirm(paymentIntent.id, {
          payment_method: `${paymentMethod.id}`,
        });

        if (intent.status === 'succeeded') {
          updateUserData({
            id: customerId,
            paymentStatus: 'completed',
            orderStatus: 'pending',
          });
          res.send('done');
        }
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};
