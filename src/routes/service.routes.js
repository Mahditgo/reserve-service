const express  = require('express');
const serviceController = require('./../controllers/service.controller');

const router = express.Router();


router
.post('/',                      serviceController.createService)
.get('/',                       serviceController.getAllServices)
.get('/:id',                    serviceController.getServiceById)
.patch('/:id',                  serviceController.updateService)
.delete('/:id',                 serviceController.deleteService)


module.exports = router;