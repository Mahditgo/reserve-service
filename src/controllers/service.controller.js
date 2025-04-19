const { serviceSchema } = require("../validators/service.validator")
const servicesService = require('./../services/services.service')

exports.createService = async ( req ,res) => {
    
    try {
        
        const validatedData = serviceSchema.parse(req.body);
        console.log(validatedData);
        
        const service = await servicesService.createService(validatedData);
        console.log(Date.now());
        
       
        res.status(201).json(service);
        
    } catch (err) {
         if (err.name === 'ZodError') {
        return res.status(400).json({
        error: 'Validation failed',
        details: err.errors
    });
    
}
    res.status(err.status || 500).json({ success: false, message: err.message });
}};


exports.getAllServices = async (req, res) => {
    try {
        const services = await servicesService.getAllServices();
        res.status(200).json(services);
        
    } catch (error) {
         res.status(err.status || 500).json({ success: false, message: err.message });
    }

};


exports.getServiceById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    try {
        const service = await servicesService.getServiceById(id);
        res.status(200).json(service);
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};


exports.deleteService = async(req, res) => {
    const { id } = req.params;

    try {
        const service = await servicesService.deleteService(id);
        res.status(200).json({
        message: "Service deleted successfully",
        data: null
        });
    } catch (error) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};


exports.updateService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await servicesService.updateService(id, req.body);
        res.status(200).json(service)
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
}

