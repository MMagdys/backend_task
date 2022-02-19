const UserModel = require('../models/UserModel');


exports.save = async (userData) => {

    const createdUser = await UserModel.register(new UserModel({ email: userData.email }), userData.password);
    if(!createdUser) {
        return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(createdUser._id, {
        name: userData.name
    });
    if(!updatedUser) {
        return;
    }

    return updatedUser;
}


exports.findOne = async (filter) => {

    return await UserModel.findOne(filter);
}


exports.findById = async (id) => {

    return await UserModel.findById(id);
}
