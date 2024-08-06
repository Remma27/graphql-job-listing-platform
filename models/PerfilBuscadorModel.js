import mongoose from 'mongoose';

const perfilBuscadorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professionsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profession' }],
    educationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
    experienceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    resume: { type: String, required: false },
    dateCreated: { type: Date, default: Date.now },
});

mongoose.model('PerfilBuscador', perfilBuscadorSchema);

export default mongoose.model('PerfilBuscador');