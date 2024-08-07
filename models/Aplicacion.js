import mongoose from 'mongoose';

const AplicacionSchema = new mongoose.Schema({
    id_aplicacion: { type: Number, required: true, unique: true },
    id_profesional: { type: Number, required: true, ref: 'Profesional' }, //Relacion con Profesional
    id_vacante: { type: Number, required: true, ref: 'Vacante' }, //Relacion con vacante
    fecha_aplicacion: { type: Date, required: true },
    estado: {
        type: String,
        enum: ['Pendiente', 'En revisión', 'Aceptada', 'Rechazada'], // Definición de estados posibles
        required: true
    }
});

const Aplicacion = mongoose.model('Aplicacion', AplicacionSchema);

export default Aplicacion;
