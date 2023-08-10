const express = require('express');
const router = express.Router();
const bookthisorderController = require('../../controller/bookthisorder/bookthisorder');

// Route to handle currency exchange requests
router.post('/bookthisorder', bookthisorderController.bookThisOrder);


// Route to get all orders
router.get('/', bookthisorderController.getAllOrders);

// Route to get a single order by ID
router.get('/:id', bookthisorderController.getOrderById);

// Route to update an order by ID
router.patch('/:id', bookthisorderController.updateOrderById);

// Route to delete an order by ID
router.delete('/:id', bookthisorderController.deleteOrderById);


module.exports = router;
