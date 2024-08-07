import mongoose from 'mongoose';

const ProfesionSchema = new mongoose.Schema({
    id_profesion: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, maxlength: 255 }
});

const Profesion = mongoose.model('Profesion', ProfesionSchema);

export default Profesion;
