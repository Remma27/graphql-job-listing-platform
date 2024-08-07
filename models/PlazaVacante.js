import mongoose from 'mongoose';

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
