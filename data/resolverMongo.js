import Aplicacion from '../models/Aplicacion.js';
import Empresa from '../models/Empresa.js';
import Expediente from '../models/Expediente.js';
import PlazaVacante from '../models/PlazaVacante.js';
import Profesion from '../models/Profesion.js';
import Profesional from '../models/Profesional.js';
import RegistroProfesionalProfesion from '../models/RegistroProfesionalProfesion.js';
import { ApolloError } from 'apollo-server-errors';

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
    },
    Mutation: {
        addEmpresa: async (_, { id_empresa, nombre, tipo, direccion, telefono, email }) => {
            try {
                if (!id_empresa || !nombre || !tipo || !direccion || !telefono || !email) {
                    throw new ApolloError("Todos los campos son requeridos.", "FIELD_REQUIRED");
                }

                if (typeof id_empresa !== 'number' || typeof nombre !== 'string' || typeof tipo !== 'string' || typeof direccion !== 'string' || typeof telefono !== 'string' || typeof email !== 'string') {
                    throw new ApolloError("Los tipos de datos proporcionados no son válidos.", "INVALID_TYPE");
                }

                if (nombre.length > 100) {
                    throw new ApolloError("El nombre no puede tener más de 100 caracteres.", "NAME_TOO_LONG");
                }

                if (direccion.length > 255) {
                    throw new ApolloError("La dirección no puede tener más de 255 caracteres.", "ADDRESS_TOO_LONG");
                }

                const telefonoRegex = /^\d{8}$/;
                if (!telefonoRegex.test(telefono)) {
                    throw new ApolloError("El formato del teléfono no es válido. Debe tener 8 dígitos.", "INVALID_PHONE_FORMAT");
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new ApolloError("El formato del email no es válido.", "INVALID_EMAIL_FORMAT");
                }

                const empresaExistente = await Empresa.findOne({ id_empresa }).exec();
                if (empresaExistente) {
                    throw new ApolloError("Ya existe una empresa con el mismo ID.", "DUPLICATE_ID");
                }

                const emailExistente = await Empresa.findOne({ email }).exec();
                if (emailExistente) {
                    throw new ApolloError("Ya existe una empresa con el mismo email.", "DUPLICATE_EMAIL");
                }

                const nuevaEmpresa = new Empresa({ id_empresa, nombre, tipo, direccion, telefono, email });
                return await nuevaEmpresa.save();
            } catch (error) {
                console.error("Error al agregar empresa:", error);
                throw new ApolloError("Error al agregar empresa.", "INTERNAL_ERROR", { details: error.message });
            }
        },
        addProfesional: async (_, { nombre, email }) => {
            try {
                const nuevoProfesional = new Profesional({ nombre, email });
                return await nuevoProfesional.save();
            } catch (error) {
                console.error("Error al agregar profesional:", error);
                return null;
            }
        },
        addProfesion: async (_, { nombre }) => {
            try {
                const nuevaProfesion = new Profesion({ nombre });
                return await nuevaProfesion.save();
            } catch (error) {
                console.error("Error al agregar profesion:", error);
                return null;
            }
        },
        addExpediente: async (_, { id_profesional, descripcion }) => {
            try {
                const nuevoExpediente = new Expediente({ id_profesional, descripcion });
                return await nuevoExpediente.save();
            } catch (error) {
                console.error("Error al agregar expediente:", error);
                return null;
            }
        },
        addPlazaVacante: async (_, { id_empresa, puesto }) => {
            try {
                const nuevaPlazaVacante = new PlazaVacante({ id_empresa, puesto });
                return await nuevaPlazaVacante.save();
            } catch (error) {
                console.error("Error al agregar plaza vacante:", error);
                return null;
            }
        },
        addAplicacion: async (_, { id_profesional, id_vacante, fecha }) => {
            try {
                const nuevaAplicacion = new Aplicacion({ id_profesional, id_vacante, fecha });
                return await nuevaAplicacion.save();
            } catch (error) {
                console.error("Error al agregar aplicacion:", error);
                return null;
            }
        },
        addRegistroProfesionalProfesion: async (_, { id_profesional, id_profesion }) => {
            try {
                const nuevoRegistro = new RegistroProfesionalProfesion({ id_profesional, id_profesion });
                return await nuevoRegistro.save();
            } catch (error) {
                console.error("Error al agregar registro:", error);
                return null;
            }
        }
    }
};

export default resolvers;
