// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    userType: {
        type: String,
        enum: ['jobSeeker', 'employer'],
        required: true
    },
    gender: String,
    address: {
        canton: {
            type: String,
            enum: ['Puntarenas', 'Esparza', 'Monte de Oro']
        },
        details: String
    },
    companyDetails: {
        companyName: String,
        companyType: String
    }
});

const User = mongoose.model.User || mongoose.model('User', userSchema);

export default User;