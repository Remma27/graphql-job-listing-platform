import mongoose from 'mongoose';

/*This file sets up a Mongoose schema and model for managing professional-to-profession registrations, 
including defining the structure and relationships between professionals and professions.*/ 

const RegistroProfesionalProfesionSchema = new mongoose.Schema({
    id_registro_profesional_profesion: { type: Number, required: true, unique: true },
    id_profesional: { type: Number, required: true, ref: 'Profesional' }, //Relacion con Profesional
    id_profesion: { type: Number, required: true, ref: 'Profesion' } //Relacion con Profesion
});

const RegistroProfesionalProfesion = mongoose.model('RegistroProfesionalProfesion', RegistroProfesionalProfesionSchema);

export default RegistroProfesionalProfesion;
