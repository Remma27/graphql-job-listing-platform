import mongoose from 'mongoose';

const EmpresaSchema = new mongoose.Schema({
    id_empresa: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, maxlength: 255 },
    tipo: { type: String, required: true, enum: ['Fisica', 'Juridica'] },
    direccion: { type: String, required: true, maxlength: 255 },
    telefono: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true, maxlength: 255 }
});

const Empresa = mongoose.model('Empresa', EmpresaSchema);

export default Empresa;
