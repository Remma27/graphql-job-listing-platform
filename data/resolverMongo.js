import Aplicacion from '../models/Aplicacion.js';
import Empresa from '../models/Empresa.js';
import Expediente from '../models/Expediente.js';
import PlazaVacante from '../models/PlazaVacante.js';
import Profesion from '../models/Profesion.js';
import Profesional from '../models/Profesional.js';
import RegistroProfesionalProfesion from '../models/RegistroProfesionalProfesion.js';

export const resolvers = {
    Query: {
        empresas: async () => {
            try {
                return await Empresa.find().exec() || [];
            } catch (error) {
                console.error("Error al obtener empresas:", error);
                return [];
            }
        },
        empresa: async (_, { id_empresa }) => {
            try {
                return await Empresa.findOne({ id_empresa }).exec() || null;
            } catch (error) {
                console.error("Error al obtener empresa:", error);
                return null;
            }
        },
        profesionales: async () => {
            try {
                return await Profesional.find().exec() || [];
            } catch (error) {
                console.error("Error al obtener profesionales:", error);
                return [];
            }
        },
        profesional: async (_, { id_profesional }) => {
            try {
                return await Profesional.findOne({ id_profesional }).exec() || null;
            } catch (error) {
                console.error("Error al obtener profesional:", error);
                return null;
            }
        },
        profesiones: async () => {
            try {
                return await Profesion.find().exec() || [];
            } catch (error) {
                console.error("Error al obtener profesiones:", error);
                return [];
            }
        },
        profesion: async (_, { id_profesion }) => {
            try {
                return await Profesion.findOne({ id_profesion }).exec() || null;
            } catch (error) {
                console.error("Error al obtener profesion:", error);
                return null;
            }
        },
        expedientes: async () => {
            try {
                return await Expediente.find().exec() || [];
            } catch (error) {
                console.error("Error al obtener expedientes:", error);
                return [];
            }
        },
        expediente: async (_, { id_expediente }) => {
            try {
                return await Expediente.findOne({ id_expediente }).exec() || null;
            } catch (error) {
                console.error("Error al obtener expediente:", error);
                return null;
            }
        },
        plazasVacantes: async () => {
            try {
                return await PlazaVacante.find().exec() || [];
            } catch (error) {
                console.error("Error al obtener plazas vacantes:", error);
                return [];
            }
        },
        plazaVacante: async (_, { id_vacante }) => {
            try {
                return await PlazaVacante.findOne({ id_vacante }).exec() || null;
            } catch (error) {
                console.error("Error al obtener plaza vacante:", error);
                return null;
            }
        },
        aplicaciones: async () => {
            try {
                return await Aplicacion.find().exec() || [];
            } catch (error) {
                console.error("Error al obtener aplicaciones:", error);
                return [];
            }
        },
        aplicacion: async (_, { id_aplicacion }) => {
            try {
                return await Aplicacion.findOne({ id_aplicacion }).exec() || null;
            } catch (error) {
                console.error("Error al obtener aplicacion:", error);
                return null;
            }
        },
        registros: async () => {
            try {
                return await RegistroProfesionalProfesion.find().exec() || [];
            } catch (error) {
                console.error("Error al obtener registros:", error);
                return [];
            }
        },
        registro: async (_, { id_registro_profesional_profesion }) => {
            try {
                return await RegistroProfesionalProfesion.findOne({ id_registro_profesional_profesion }).exec() || null;
            } catch (error) {
                console.error("Error al obtener registro:", error);
                return null;
            }
        }
    },
    RegistroProfesionalProfesion: {
        profesional: async (registro) => {
            try {
                return await Profesional.findOne({ id_profesional: registro.id_profesional }).exec() || null;
            } catch (error) {
                console.error("Error al obtener profesional en RegistroProfesionalProfesion:", error);
                return null;
            }
        },
        profesion: async (registro) => {
            try {
                return await Profesion.findOne({ id_profesion: registro.id_profesion }).exec() || null;
            } catch (error) {
                console.error("Error al obtener profesion en RegistroProfesionalProfesion:", error);
                return null;
            }
        }
    },
    Expediente: {
        profesional: async (expediente) => {
            try {
                return await Profesional.findOne({ id_profesional: expediente.id_profesional }).exec() || null;
            } catch (error) {
                console.error("Error al obtener profesional en Expediente:", error);
                return null;
            }
        }
    },
    PlazaVacante: {
        empresa: async (vacante) => {
            try {
                return await Empresa.findOne({ id_empresa: vacante.id_empresa }).exec() || null;
            } catch (error) {
                console.error("Error al obtener empresa en PlazaVacante:", error);
                return null;
            }
        }
    },
    Aplicacion: {
        profesional: async (aplicacion) => {
            try {
                return await Profesional.findOne({ id_profesional: aplicacion.id_profesional }).exec() || null;
            } catch (error) {
                console.error("Error al obtener profesional en Aplicacion:", error);
                return null;
            }
        },
        vacante: async (aplicacion) => {
            try {
                return await PlazaVacante.findOne({ id_vacante: aplicacion.id_vacante }).exec() || null;
            } catch (error) {
                console.error("Error al obtener vacante en Aplicacion:", error);
                return null;
            }
        }
    }
};

export default resolvers;
