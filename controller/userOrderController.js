const Order = require("../models/Order");
const { handleProductQuantity } = require("../config/others");
const { sendEmail } = require("../config/auth");

const addOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.email}`,
      subject: "Order Placed",
      html: `<h2>Hello ${req.body.email}</h2>
      <p>Your Order has been successfully placed in <strong>Quint Essentials</strong></p>

        <a href=${process.env.STORE_URL}/order/${order._id} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">View Order</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at <a href='mailto:quintessentialsmailer@gmail.com'>quintessentialsmailer@gmail.com</a></p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Quint Essentials Team</strong>
             `,
    };

    const message = "Please check your email for Order Confirmation!";
    sendEmail(body, res, message);
    handleProductQuantity(order.cart);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.body._id);
    if (order) {
      order.payment = req.body.payment;
      await order.save();
      res.send(order);
    }
  } catch (err) {
    res.status(404).send({
      message: "Your order is not valid!",
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getOrderByUser,
  updateOrder,
};
