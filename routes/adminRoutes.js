const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  assignOrder,
  deliverOrder,
} = require('../controller/adminController');
const { passwordVerificationLimit } = require('../config/others');

//register a staff
router.post('/register', registerAdmin);

//login a admin
router.post('/login', loginAdmin);

//forget-password
router.put('/forget-password', passwordVerificationLimit, forgetPassword);

//reset-password
router.put('/reset-password', resetPassword);

//add a staff
router.post('/add', addStaff);

//get all staff
router.get('/', getAllStaff);

//get a staff
router.post('/:id', getStaffById);

//update a staff
router.patch('/:id', updateStaff);

//assign order
router.patch('/assign/:id', assignOrder);

router.patch('/deliver/:id', deliverOrder);

//delete a staff
router.delete('/:id', deleteStaff);

module.exports = router;
