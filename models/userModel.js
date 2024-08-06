// models/User.js
import exp from 'constants';
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
    addresId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    companyDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyDetails'
    },
});

mongoose.model('User', userSchema);

export default mongoose.model('User');