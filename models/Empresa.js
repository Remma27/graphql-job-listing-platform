import mongoose from 'mongoose';

/*This file sets up a Mongoose schema and model for managing companies, including defining the structure, 
relationships, and possible statuses of the applications.*/ 

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
