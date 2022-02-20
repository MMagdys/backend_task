const UrlModel = require('../models/UrlModel');


exports.findByUser = async (userId, page, limit) => {

    const offset = (page - 1) * limit;

    return await UrlModel.find({ user: userId }).skip(offset).limit(limit);
}


exports.create = async (userId, urlData) => {

    const url =  await new UrlModel({ ...urlData, user: userId });
    return await url.save(); 
}


exports.update = async (userId, urlId, urlData) => {

    const retrievedUrl = await UrlModel.findOne({ _id: urlId, user: userId });
    if(!retrievedUrl) {
        return
    }

    delete urlData.urlId
    return await UrlModel.findByIdAndUpdate(retrievedUrl._id, urlData, {new: true});
}


exports.delete = async (userId, urlId) => {

    return await UrlModel.findOneAndDelete({ _id: urlId, user: userId });
}