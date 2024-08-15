import mongoose from 'mongoose';
/*
This file sets up a Mongoose schema and model for managing professional records, including 
defining the structure, relationships, and details of professional titles and work experience.
 */
const ExpedienteSchema = new mongoose.Schema({
    id_expediente: { type: Number, required: true, unique: true },
    // Relationship with Professional
    id_profesional: { type: Number, required: true, ref: 'Profesional' },
    // Multiple titles or none
    titulos: { type: [String] },
    // Multiple work experiences or none
    experiencia_laboral: { type: [String] }
});

const Expediente = mongoose.model('Expediente', ExpedienteSchema);

export default Expediente;
