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

const Profession = mongoose.model.Profession || mongoose.model('Profession', professionSchema);

export default Profession;