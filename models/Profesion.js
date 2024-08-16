import mongoose from 'mongoose';
/*This file sets up a Mongoose schema and model for managing professions, including defining the 
structure and details of each profession.*/ 
const ProfesionSchema = new mongoose.Schema({
    id_profesion: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, maxlength: 255 }
});

const Profesion = mongoose.model('Profesion', ProfesionSchema);

export default Profesion;
