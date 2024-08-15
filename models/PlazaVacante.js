import mongoose from 'mongoose';
/*This file sets up a Mongoose schema and model for managing job vacancies, 
including defining the structure, relationships, and possible statuses of the vacancies.*/ 
const PlazaVacanteSchema = new mongoose.Schema({
    id_vacante: { type: Number, required: true, unique: true },
    id_empresa: { type: Number, required: true, ref: 'Empresa' }, //Relacion con Empresa
    titulo_puesto: { type: String, required: true, maxlenght: 255 },
    descripcion: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    estado: { type: String, require: true, enum: ['Abierta', 'Cerrada'] }
});

const PlazaVacante = mongoose.model('PlazaVacante', PlazaVacanteSchema);

export default PlazaVacante;
