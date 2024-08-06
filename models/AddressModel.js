import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    AddressID: { type: Number, required: true },
    canton: { type: String, required: true },
    details: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
