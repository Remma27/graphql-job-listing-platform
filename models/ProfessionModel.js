// models/Profession.js
import mongoose from 'mongoose';

const professionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String
});

mongoose.model('Profession', professionSchema);

export default mongoose.model('Profession');