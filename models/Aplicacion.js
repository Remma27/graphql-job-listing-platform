import mongoose from 'mongoose';

/* This file sets up a Mongoose schema and model for managing job applications, 
including defining the structure, relationships, and possible statuses of the applications.*/

const AplicacionSchema = new mongoose.Schema({
    id_aplicacion: { type: Number, required: true, unique: true },
    // Relationship with Professional
    id_profesional: { type: Number, required: true, ref: 'Profesional' },
    // Relationship with vacancy
    id_vacante: { type: Number, required: true, ref: 'Vacante' },
    fecha_aplicacion: { type: Date, required: true },
    estado: {
        type: String,
        // Definition of possible states
        enum: ['Pendiente', 'En revisión', 'Aceptada', 'Rechazada'],
        required: true
    }
});

const Aplicacion = mongoose.model('Aplicacion', AplicacionSchema);

export default Aplicacion;
