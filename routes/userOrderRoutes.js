const express = require("express");
const router = express.Router();
const {
  getOrderById,
  getOrderByUser,
  addOrder,
  updateOrder,
} = require("../controller/userOrderController");

//add a order
router.post("/add", addOrder);

router.post("/update", updateOrder);

//get a order by id
router.get("/:id", getOrderById);

//get all order by a user
router.get("/", getOrderByUser);

module.exports = router;
