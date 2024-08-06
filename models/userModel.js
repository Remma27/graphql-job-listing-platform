import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    UserID: {
        type: Number,
        required: true,
        unique: true
    },
    CompanyDetailsID: {
        type: Number,
        required: true
    },
    AddressID: {
        type: Number,
        required: true
    },
    cedula: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
});

mongoose.model('User', userSchema);

export default mongoose.model('User');