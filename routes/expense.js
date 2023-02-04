const express = require('express');

const router = express.Router();

const expController = require('../controllers/expense');

router.get('/getexpenses', expController.getexpenses);

router.post('/postexpenses', expController.postexpenses);

router.delete('/deleteexpenses', expController.deleteexpenses);


module.exports = router;
