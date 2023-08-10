const express = require('express');
const router = express.Router();
const requestCallbackController = require('../../controller/prepaidtravelcard/requestcallback');

// CREATE a new request callback
router.post('/request-callback', requestCallbackController.createRequestCallback);

// READ all request callbacks
router.get('/request-callbacks', requestCallbackController.getAllRequestCallbacks);

// READ a single request callback by ID
router.get('/request-callbacks/:id', requestCallbackController.getRequestCallbackById);

// UPDATE a request callback by ID
router.put('/request-callbacks/:id', requestCallbackController.updateRequestCallbackById);

// DELETE a request callback by ID
router.delete('/request-callbacks/:id', requestCallbackController.deleteRequestCallbackById);

module.exports = router;
