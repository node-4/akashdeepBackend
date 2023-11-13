const bookthisorderModel = require('../../model/bookthisorder/bookthisorder');

// Function to convert forex amount to INR amount
const convertToINR = (currency, amount) => {
  // You can use an API or other external services to get the latest forex rate.
  // For simplicity, let's assume 1 USD = 75 INR
  const forexRates = {
    USD: 75,
    EUR: 88,
    GBP: 102,
    // Add more currencies as required
  }

  const forexRate = forexRates[currency] || 1;
  const INR_Amount = amount * forexRate;
  return INR_Amount;
};

// Controller function to handle currency exchange requests
exports.bookThisOrder = async (req, res) => {
  try {
    const { selectcity, selectcurrency, forexAmount } = req.body;
    const INR_Amount = convertToINR(selectcurrency, forexAmount);
    const total = INR_Amount * 1.05; // Add a 5% service fee
    const order = new bookthisorderModel({
      selectcity,
      selectcurrency,
      forexAmount,
      INR_Amount,
      total,
    });
    const savedOrder = await order.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




// Controller function to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await bookthisorderModel.find({});
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await bookthisorderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update an order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await bookthisorderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete an order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await bookthisorderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
