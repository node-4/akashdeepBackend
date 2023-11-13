const RequestCall = require('../../model/prepaidtravelcard/requestcallback');

// CREATE a new request callback
exports.createRequestCallback = async (req, res) => {
  try {
    const newRequestCallback = new RequestCall(req.body);
    const savedRequestCallback = await newRequestCallback.save();
    return res.status(201).json(savedRequestCallback);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// READ all request callbacks
exports.getAllRequestCallbacks = async (req, res) => {
  try {
    const requestCallbacks = await RequestCall.find();
    return res.json(requestCallbacks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// READ a single request callback by ID
exports.getRequestCallbackById = async (req, res) => {
  try {
    const requestCallback = await RequestCall.findById(req.params.id);
    if (!requestCallback) {
      return res.status(404).json({ error: 'Request callback not found' });
    }
    return res.json(requestCallback);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// UPDATE a request callback by ID
exports.updateRequestCallbackById = async (req, res) => {
  try {
    const requestCallback = await RequestCall.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!requestCallback) {
      return res.status(404).json({ error: 'Request callback not found' });
    }
    return res.json(requestCallback);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// DELETE a request callback by ID
exports.deleteRequestCallbackById = async (req, res) => {
  try {
    const requestCallback = await RequestCall.findByIdAndDelete(req.params.id);
    if (!requestCallback) {
      return res.status(404).json({ error: 'Request callback not found' });
    }
    return res.json({ message: 'Request callback deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
