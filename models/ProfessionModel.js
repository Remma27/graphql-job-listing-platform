// models/Profession.js
import mongoose from 'mongoose';

const professionSchema = new mongoose.Schema({
    ProfesionID: { type: Number, required: true },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: { type: String, required: false }
});

mongoose.model('Profession', professionSchema);

export default mongoose.model('Profession');