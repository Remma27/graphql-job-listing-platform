import mongoose from 'mongoose';

const RegistroProfesionalProfesionSchema = new mongoose.Schema({
    id_registro_profesional_profesion: { type: Number, required: true, unique: true },
    id_profesional: { type: Number, required: true, ref: 'Profesional' }, //Relacion con Profesional
    id_profesion: { type: Number, required: true, ref: 'Profesion' } //Relacion con Profesion
});

const RegistroProfesionalProfesion = mongoose.model('RegistroProfesionalProfesion', RegistroProfesionalProfesionSchema);

export default RegistroProfesionalProfesion;
