import User from '../models/userModel.js';
import Offer from '../models/OfferModel.js'; // Asumo que esto debería ser 'JobListingModel'
import Application from '../models/ApplicationModel.js';
import Profession from '../models/ProfessionModel.js';
import PerfilBuscador from '../models/PerfilBuscadorModel.js';
import Address from '../models/AddressModel.js';
import CompanyDetails from '../models/CompanyDetailsModel.js';
import Education from '../models/EducationModel.js';
import Experience from '../models/ExperienceModel.js';


export const resolvers = {
    Query: {
        usuarios: async () => {
            return await User.find().exec();
        },
        usuario: async (_, { id }) => {
            return await User.findById(id).exec();
        },
        profesiones: async () => {
            return await Profession.find().exec();
        },
        profesion: async (_, { id }) => {
            return await Profession.findById(id).exec();
        },
        perfilesBuscadores: async () => {
            return await PerfilBuscador.find().exec();
        },
        perfilBuscador: async (_, { id }) => {
            return await PerfilBuscador.findById(id).exec();
        },
        ofertas: async () => {
            return await Offer.find().exec();
        },
        oferta: async (_, { id }) => {
            return await Offer.findById(id).exec();
        },
        aplicaciones: async () => {
            return await Application.find().exec();
        },
        aplicacion: async (_, { id }) => {
            return await Application.findById(id).exec();
        },
    },
    Usuario: {
        address: async (usuario) => {
            return await Address.findById(usuario.addressId).exec();
        },
        companyDetails: async (usuario) => {
            return await CompanyDetails.findById(usuario.companyDetailsId).exec();
        },
    },
    PerfilBuscador: {
        user: async (perfilBuscador) => {
            return await User.findById(perfilBuscador.userId).exec();
        },
        professions: async (perfilBuscador) => {
            return await Profession.find({ _id: { $in: perfilBuscador.professionsIds } }).exec();
        },
        education: async (perfilBuscador) => {
            return await Education.find({ _id: { $in: perfilBuscador.educationIds } }).exec();
        },
        experience: async (perfilBuscador) => {
            return await Experience.find({ _id: { $in: perfilBuscador.experienceIds } }).exec();
        },
    },
    Oferta: {
        employer: async (oferta) => {
            return await User.findById(oferta.employerId).exec();
        },
        profession: async (oferta) => {
            return await Profession.findById(oferta.professionId).exec();
        },
    },
    Aplicacion: {
        jobSeeker: async (aplicacion) => {
            return await User.findById(aplicacion.jobSeekerId).exec();
        },
        jobListing: async (aplicacion) => {
            return await Offer.findById(aplicacion.jobListingId).exec();
        },
    },
    Mutation: {
        createUsuario: async (_, { input }) => {
            const newUsuario = new User(input);
            return await newUsuario.save();
        },
        updateUsuario: async (_, { id, input }) => {
            return await User.findByIdAndUpdate(id, input, { new: true }).exec();
        },
        deleteUsuario: async (_, { id }) => {
            return await User.findByIdAndDelete(id).exec();
        },
        createProfesion: async (_, { input }) => {
            const newProfesion = new Profession(input);
            return await newProfesion.save();
        },
        updateProfesion: async (_, { id, input }) => {
            return await Profession.findByIdAndUpdate(id, input, { new: true }).exec();
        },
        deleteProfesion: async (_, { id }) => {
            return await Profession.findByIdAndDelete(id).exec();
        },
        createPerfilBuscador: async (_, { input }) => {
            const newPerfilBuscador = new PerfilBuscador(input);
            return await newPerfilBuscador.save();
        },
        updatePerfilBuscador: async (_, { id, input }) => {
            return await PerfilBuscador.findByIdAndUpdate(id, input, { new: true }).exec();
        },
        deletePerfilBuscador: async (_, { id }) => {
            return await PerfilBuscador.findByIdAndDelete(id).exec();
        },
        createOferta: async (_, { input }) => {
            const newOferta = new Offer(input);
            return await newOferta.save();
        },
        updateOferta: async (_, { id, input }) => {
            return await Offer.findByIdAndUpdate(id, input, { new: true }).exec();
        },
        deleteOferta: async (_, { id }) => {
            return await Offer.findByIdAndDelete(id).exec();
        },
        createAplicacion: async (_, { input }) => {
            const newAplicacion = new Application(input);
            return await newAplicacion.save();
        },
        updateAplicacion: async (_, { id, input }) => {
            return await Application.findByIdAndUpdate(id, input, { new: true }).exec();
        },
        deleteAplicacion: async (_, { id }) => {
            return await Application.findByIdAndDelete(id).exec();
        },
    },
};

export default resolvers;
