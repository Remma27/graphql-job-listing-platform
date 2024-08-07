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
        //Impresión de inventario de plazas o puestos vacantes.
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
        },

        //Impresión general del empleador con la siguiente información: Cédula, nombre, puestos ofertados.
        getPlazaVacantePorProfesional: async (_, { id_profesional }) => {
            try {
                // Buscar todas las aplicaciones del profesional
                const aplicaciones = await Aplicacion.find({ id_profesional }).exec();

                if (!aplicaciones.length) {
                    throw new ApolloError('No se encontraron aplicaciones para el profesional.', 'NO_APPLICATIONS_FOUND');
                }

                // Obtener el profesional
                const profesional = await Profesional.findOne({ id_profesional }).exec();

                if (!profesional) {
                    throw new ApolloError('Profesional no encontrado.', 'PROFESSIONAL_NOT_FOUND');
                }

                // Obtener los IDs de las vacantes
                const vacanteIds = aplicaciones.map(aplicacion => aplicacion.id_vacante);

                // Buscar las vacantes correspondientes
                const vacantes = await PlazaVacante.find({ id_vacante: { $in: vacanteIds } }).exec();

                if (!vacantes.length) {
                    throw new ApolloError('No se encontraron vacantes para las aplicaciones del profesional.', 'NO_VACANCIES_FOUND');
                }

                // Mapear los puestos ofertados
                const puestos_ofertados = vacantes.map(vacante => vacante.titulo_puesto);

                return {
                    cedula: profesional.cedula,
                    nombre: profesional.nombre,
                    puestos_ofertados
                };
            } catch (error) {
                console.error("Error al buscar plaza vacante por profesional:", error);

                if (error instanceof ApolloError) {
                    // Re-lanzar errores de Apollo sin modificarlos
                    throw error;
                } else {
                    // Para errores no manejados, lanzar un error genérico
                    throw new ApolloError(
                        'Error interno al buscar plaza vacante por profesional.',
                        'INTERNAL_SERVER_ERROR',
                        { originalError: error.message }
                    );
                }
            }
        },
        //Nombre de todos los profesionales postulantes para una determinada área, el usuario selecciona el área
        profesionalesPorArea: async (_, { area }) => {
            try {
                if (!area || area.trim() === '') {
                    throw new ApolloError('El área proporcionada no es válida.', 'INVALID_AREA');
                }

                const profesionales = await Profesional.find({ areas: area })
                    .select('nombre') // Solo selecciona el campo nombre
                    .lean()
                    .exec();

                if (!profesionales.length) {
                    throw new ApolloError(`No se encontraron profesionales para el área: ${area}.`, 'NO_PROFESSIONALS_FOUND');
                }

                return profesionales.map(profesional => {
                    if (profesional.nombre === null || profesional.nombre === undefined) {
                        console.warn(`El profesional con ID ${profesional.id_profesional} tiene un nombre nulo.`);
                        // Puedes optar por devolver un valor por defecto si es necesario
                        return { nombre: "Nombre no disponible" };
                    }
                    return { nombre: profesional.nombre };
                });
            } catch (error) {
                console.error("Error al buscar profesionales por área:", error);

                if (error instanceof ApolloError) {
                    throw error;
                } else {
                    throw new ApolloError(
                        'Error interno al buscar profesionales por área.',
                        'INTERNAL_SERVER_ERROR',
                        { originalError: error.message }
                    );
                }
            }
        },
        //Cantidad y porcentaje de profesionales registradas por área.
        cantidadYPorcentajePorArea: async () => {
            try {
                // Contar el total de profesionales
                const totalProfesionales = await Profesional.countDocuments().exec();

                if (totalProfesionales === 0) {
                    return []; // Si no hay profesionales, retorna un array vacío
                }

                // Contar los profesionales por área
                const profesionalesPorArea = await Profesional.aggregate([
                    { $unwind: "$areas" },
                    { $group: { _id: "$areas", cantidad: { $sum: 1 } } }
                ]).exec();

                // Calcular el porcentaje y formatear la respuesta
                const result = profesionalesPorArea.map(areaStat => {
                    const porcentaje = (areaStat.cantidad / totalProfesionales) * 100;
                    return {
                        area: areaStat._id,
                        cantidad: areaStat.cantidad,
                        porcentaje: parseFloat(porcentaje.toFixed(2)) // Limita a dos decimales
                    };
                });

                return result;
            } catch (error) {
                console.error("Error al calcular cantidad y porcentaje por área:", error);
                throw new ApolloError(
                    'Error interno al calcular cantidad y porcentaje por área.',
                    'INTERNAL_SERVER_ERROR',
                    { originalError: error.message }
                );
            }
        },
        //Imprimir información específica de un profesional (recibido como parámetro), cédula, nombre, profesiones.
        getProfesionalInfo: async (_, { id_profesional }) => {
            try {
                // 1. Buscar todos los registros de profesiones para el profesional
                const registros = await RegistroProfesionalProfesion.find({ id_profesional }).exec();

                if (!registros.length) {
                    throw new ApolloError('No se encontraron registros para el profesional.', 'NO_RECORDS_FOUND');
                }

                // 2. Obtener los IDs de las profesiones
                const ids_profesion = registros.map(registro => registro.id_profesion);

                // 3. Obtener nombres de las profesiones
                const profesiones = await Profesion.find({ id_profesion: { $in: ids_profesion } }).exec();

                if (!profesiones.length) {
                    throw new ApolloError('No se encontraron profesiones asociadas al profesional.', 'NO_PROFESSIONS_FOUND');
                }

                const nombres_profesiones = profesiones.map(profesion => profesion.nombre);

                // 4. Obtener datos del profesional
                const profesional = await Profesional.findOne({ id_profesional }).exec();

                if (!profesional) {
                    throw new ApolloError('Profesional no encontrado.', 'PROFESSIONAL_NOT_FOUND');
                }

                return {
                    cedula: profesional.cedula,
                    nombre: profesional.nombre,
                    profesiones: nombres_profesiones
                };
            } catch (error) {
                console.error("Error al buscar información del profesional:", error);
                if (error instanceof ApolloError) {
                    // Re-lanzar errores de Apollo sin modificarlos
                    throw error;
                } else {
                    // Para errores no manejados, lanzar un error genérico
                    throw new ApolloError(
                        'Error interno al buscar información del profesional.',
                        'INTERNAL_SERVER_ERROR',
                        { originalError: error.message }
                    );
                }
            }
        },
        //Cantidad de profesionales registrados por género
        cantidadProfesionalesPorGenero: async () => {
            try {
                const generoCantidad = await Profesional.aggregate([
                    { $group: { _id: "$genero", cantidad: { $sum: 1 } } }
                ]).exec();

                return generoCantidad.map(genero => {
                    return {
                        genero: genero._id,
                        cantidad: genero.cantidad
                    };
                });
            } catch (error) {
                console.error("Error al obtener cantidad de profesionales por género:", error);
                throw new ApolloError(
                    'Error interno al obtener cantidad de profesionales por género.',
                    'INTERNAL_SERVER_ERROR',
                    { originalError: error.message }
                );
            }
        }
    },
    //Impresión de inventario de plazas o puestos vacantes.
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
