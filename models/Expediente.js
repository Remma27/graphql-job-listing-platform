import mongoose from 'mongoose';
/*
This file sets up a Mongoose schema and model for managing professional records, including 
defining the structure, relationships, and details of professional titles and work experience.
 */
const ExpedienteSchema = new mongoose.Schema({
    id_expediente: { type: Number, required: true, unique: true },
    id_profesional: { type: Number, required: true, ref: 'Profesional' }, // Relación con Profesional
    titulos: { type: [String] }, // Varios titulos o ninguno
    experiencia_laboral: { type: [String] } //Varias experiencias laborales o ninguna
});

const Expediente = mongoose.model('Expediente', ExpedienteSchema);

export default Expediente;
