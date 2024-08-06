import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    canton: String,
    details: String,
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
