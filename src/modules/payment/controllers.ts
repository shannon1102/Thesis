import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import depositService from "../deposit//services";
import { Deposit } from "../../entities/deposit/deposit";

const stripe = require('stripe')(process.env.STRIPE_SK)
const createPayment = async (req: Request, res: Response) => {
  let { productId , price, customerName,
    customerEmail, customerPhone,
    customerAddress,
    paymentMethod,
    status,
    comment
  } = req.body;
  let userId = req.user.id;
  const newDeposit = new Deposit();
  newDeposit.userId = userId;

  newDeposit.productId =productId;
  newDeposit.price=price;
  newDeposit.customerAddress =customerAddress;
  newDeposit.customerEmail =customerEmail;
  newDeposit.customerName =customerName;
  newDeposit.customerPhone= customerPhone;
  newDeposit.paymentMethod ="Card";
  newDeposit.status ="Success"
  console.log("Aloooooo",newDeposit)
  await depositService.createDeposit(newDeposit);
  

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          // price:'price_1MfoxxAbg9lH9IyvhkeZboNK',
          price_data: {
            currency: 'usd',
            unit_amount: 2000,
            product_data: {
              name: 'T-shirt',
              description: 'Comfortable cotton t-shirt',
              images: [`${process.env.MEDIA_URL}/2`],
            },
          },
          quantity: 1,

        }
      ],
      custom_fields: [
        {
          key: 'customerName',
          label: { type: 'custom', custom: 'Customer name' },
          type: 'text',
        },
        {
          key: 'customerAddress',
          label: { type: 'custom', custom: 'Customer address' },
          type: 'text',
        },
       
      ]
      ,

      success_url: `${process.env.CLIENT_URL}/checkout`,
      cancel_url: `${process.env.CLIENT_URL}/product/${productId}`,
    })
    console.log("sesson", session);
 

    res.status(200).json({
      status: "success",
      result: session,
    });
    //

  } catch (e) {
    res.status(500).json({ error: e })
  }


};

// const getPayments = async (req: Request, res: Response) => {
//   const { limit, offset, userId } = req.query;
//   const currentUserId: number = req.user?.id;
//   if (!currentUserId) {
//     throw new CustomError(codes.NOT_FOUND);
//   }
//   const data = await paymentService.getPaymentsByUserId(currentUserId, {
//     limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
//     offset: Number(offset) || 0,
//   });
//   res.status(200).json({
//     status: "success",
//     result: data.payments,
//     total: data.total,
//   });
// };

export default { createPayment };
