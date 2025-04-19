const Service = require('./../models/service.model');



exports.createService = async (data) => {
  const newService = new Service(data);
  
     if(newService.departureTime < Date.now()) {
            newService.isActive = false;
             const error = new Error('The service date is smaller than todays date');
                error.status = 404;
                throw error;
        }
    return await newService.save();
  } 


exports.getAllServices = async () => {
  const services = await Service.find();
  if(!services) {
    const error = new Error('no services found')
    error.status = 404
    throw error;
  }

  return services;
};


exports.getServiceById = async (id) => {
  const service = await Service.findById(id);
   if(!service) {
    const error = new Error('no services found whit that ID')
    error.status = 404
    throw error;
  }

  return service;
};


exports.deleteService = async(id) => {
  const service = await Service.findByIdAndDelete(id);
   if(!service) {
    const error = new Error('no services found whit that ID')
    error.status = 404
    throw error;
  }

  return service;
};


exports.updateService = async(id, data) => {
    const update = await Service.findByIdAndUpdate(id, data, { new : true });
    if (!update) {
      const error = new Error('no services found whit that ID')
    error.status = 404
    throw error;
    };

    return update;
}