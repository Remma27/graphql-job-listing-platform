import Aplicacion from '../models/Aplicacion.js';
import Empresa from '../models/Empresa.js';
import Expediente from '../models/Expediente.js';
import PlazaVacante from '../models/PlazaVacante.js';
import Profesion from '../models/Profesion.js';
import Profesional from '../models/Profesional.js';
import RegistroProfesionalProfesion from '../models/RegistroProfesionalProfesion.js';
import { ApolloError } from 'apollo-server-errors';

/*This file is used to define the resolvers for a GraphQL API. Resolvers are functions that implement the 
logic for handling queries and mutations defined in the GraphQL schema.

Query Resolvers: They handle requests to retrieve data from the server. Each query resolver corresponds to a 
field in the Query type and is responsible for fetching and returning data from sources such as databases 
or other data stores.

Mutation Resolvers: They manage requests to modify data on the server. Each mutation resolver 
corresponds to a field in the Mutation type and performs operations like adding, updating, or 
deleting records. They also return information about the success or failure of these operations, 
along with any relevant updated data or messages.*/

export const resolvers = {
  Query: {
    empresas: async () => {
      try {
        return await Empresa.find().exec() || [];
      } catch (error) {
        console.error("Error al obtener empresas:", error);
        throw new ApolloError('Error interno al obtener empresas.', 'INTERNAL_SERVER_ERROR');
      }
    },
    empresa: async (_, { id_empresa }) => {
      try {
        const empresa = await Empresa.findOne({ id_empresa }).exec();
        if (!empresa) {
          // Lanzar un error si no se encuentra la empresa
          throw new ApolloError(`La empresa con ID ${id_empresa} no existe.`, 'NOT_FOUND');
        }
        return empresa;
      } catch (error) {
        console.error("ID no existente:", error);
        throw new ApolloError('ID no existente.', 'INTERNAL_SERVER_ERROR');
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
        const profesional = await Profesional.findOne({ id_profesional }).exec();
        if (!profesional) {
          // Lanzar un error si no se encuentra el profesional
          throw new ApolloError(`El profesional con ID ${id_profesional} no existe.`, 'PROFESIONAL_NOT_FOUND');
        }
        return profesional;
      } catch (error) {
        console.error("ID no existente:", error);
        throw new ApolloError('ID no existente.');
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
        const profesion = await Profesion.findOne({ id_profesion }).exec();
        if (!profesion) {
          // Lanzar un error si no se encuentra la profesión
          throw new ApolloError(`La profesión con ID ${id_profesion} no existe.`, 'PROFESION_NOT_FOUND');
        }
        return profesion;
      } catch (error) {
        console.error("Error al obtener profesión:", error);
        throw new ApolloError('ID no existente.');
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
        const expediente = await Expediente.findOne({ id_expediente }).exec();
        if (!expediente) {
          // Lanzar un error si no se encuentra el expediente
          throw new ApolloError(`El expediente con ID ${id_expediente} no existe.`, 'EXPEDIENTE_NOT_FOUND');
        }
        return expediente;
      } catch (error) {
        console.error("Error al obtener expediente:", error);
        throw new ApolloError('ID no existente');
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
        const plazaVacante = await PlazaVacante.findOne({ id_vacante }).exec();
        if (!plazaVacante) {
          // Lanzar un error si no se encuentra la plaza vacante
          throw new ApolloError(`La plaza vacante con ID ${id_vacante} no existe.`, 'PLAZA_VACANTE_NOT_FOUND');
        }
        return plazaVacante;
      } catch (error) {
        console.error("Error al obtener plaza vacante:", error);
        throw new ApolloError('ID no existente.', 'INTERNAL_SERVER_ERROR');
      }
    }
    ,
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
        const aplicacion = await Aplicacion.findOne({ id_aplicacion }).exec();
        if (!aplicacion) {
          // Lanzar un error si no se encuentra la aplicación
          throw new ApolloError(`La aplicación con ID ${id_aplicacion} no existe.`, 'APLICACION_NOT_FOUND');
        }
        return aplicacion;
      } catch (error) {
        console.error("Error al obtener aplicación:", error);
        throw new ApolloError('ID no existente.');
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
        const registro = await RegistroProfesionalProfesion.findOne({ id_registro_profesional_profesion }).exec();
        if (!registro) {
          // Lanzar un error si no se encuentra el registro
          throw new ApolloError(`El registro con ID ${id_registro_profesional_profesion} no existe.`, 'REGISTRO_NOT_FOUND');
        }
        return registro;
      } catch (error) {
        console.error("Error al obtener registro:", error);
        throw new ApolloError('ID no existente.');
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
          .lean()
          .exec();

        if (!profesionales.length) {
          throw new ApolloError(`No se encontraron profesionales para el área: ${area}.`, 'NO_PROFESSIONALS_FOUND');
        }

        return profesionales.map(profesional => ({
          id_profesional: parseInt(profesional._id.toString(), 10), // Asegúrate de que sea un entero
          nombre: profesional.nombre || "Nombre no disponible",
          cedula: profesional.cedula || null,
          apellido: profesional.apellido || null,
          direccion: profesional.direccion || null,
          telefono: profesional.telefono || null,
          email: profesional.email || null,
          fecha_nacimiento: profesional.fecha_nacimiento ? new Date(profesional.fecha_nacimiento).toISOString() : null,
          genero: profesional.genero || null,
          areas: profesional.areas || []
        }));
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
    //Cantidad de profesionales registrados por género
    cantidadProfesionalesPorGenero: async () => {
      try {
        // Contar la cantidad de profesionales por género
        const profesionalesPorGenero = await Profesional.aggregate([
          { $group: { _id: "$genero", cantidad: { $sum: 1 } } },
          { $project: { _id: 0, genero: "$_id", cantidad: 1 } }
        ]).exec();

        return profesionalesPorGenero;
      } catch (error) {
        console.error("Error al obtener cantidad de profesionales por género:", error);
        throw new ApolloError('Error al obtener cantidad de profesionales por género.', 'INTERNAL_ERROR');
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
    updateEmpresa: async (parent, { id_empresa, nombre, tipo, direccion, telefono, email }) => {
      try {
        // Validación de campos requeridos
        if (!id_empresa) {
          throw new ApolloError("El campo id_empresa es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la empresa
        const empresaExistente = await Empresa.findOne({ id_empresa }).exec();
        if (!empresaExistente) {
          throw new ApolloError("La empresa con el ID proporcionado no existe.", "EMPRESA_NOT_FOUND");
        }

        // Validación de datos proporcionados (si se proporcionan)
        const updateData = {};

        if (nombre) {
          if (typeof nombre !== 'string' || nombre.length > 255) {
            throw new ApolloError("El nombre debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_NAME");
          }
          updateData.nombre = nombre;
        }

        if (tipo) {
          const tiposValidos = ['Fisica', 'Juridica'];
          if (!tiposValidos.includes(tipo)) {
            throw new ApolloError("El tipo debe ser 'Fisica' o 'Juridica'.", "INVALID_TIPO");
          }
          updateData.tipo = tipo;
        }

        if (direccion) {
          if (typeof direccion !== 'string' || direccion.length > 255) {
            throw new ApolloError("La dirección debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_DIRECCION");
          }
          updateData.direccion = direccion;
        }

        if (telefono) {
          if (typeof telefono !== 'string' || telefono.length > 20) {
            throw new ApolloError("El teléfono debe ser una cadena de texto con máximo 20 caracteres.", "INVALID_TELEFONO");
          }
          updateData.telefono = telefono;
        }

        if (email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 255) {
            throw new ApolloError("El email debe ser una cadena de texto válida y con máximo 255 caracteres.", "INVALID_EMAIL");
          }
          updateData.email = email;
        }

        // Actualización de la empresa
        const empresaActualizada = await Empresa.findOneAndUpdate({ id_empresa }, updateData, { new: true });

        if (!empresaActualizada) {
          throw new ApolloError("Error al actualizar la empresa.", "UPDATE_FAILED");
        }

        // Respuesta con datos actualizados y mensaje
        return {
          empresa: empresaActualizada,
          mensaje: "Empresa actualizada correctamente."
        };

      } catch (error) {
        console.error("Error al actualizar la empresa:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    deleteEmpresa: async (parent, { id_empresa }) => {
      try {
        // Validación de campo requerido
        if (!id_empresa) {
          throw new ApolloError("El campo id_empresa es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la empresa
        const empresaExistente = await Empresa.findOne({ id_empresa }).exec();
        if (!empresaExistente) {
          throw new ApolloError("La empresa con el ID proporcionado no existe.", "EMPRESA_NOT_FOUND");
        }

        // Eliminar la empresa
        const empresaEliminada = await Empresa.findOneAndDelete({ id_empresa });

        if (!empresaEliminada) {
          throw new ApolloError("Error al eliminar la empresa.", "DELETE_FAILED");
        }

        // Respuesta con la empresa eliminada y el mensaje
        return {
          empresa: empresaEliminada,
          message: "Empresa eliminada correctamente."
        };

      } catch (error) {
        console.error("Error al eliminar la empresa:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    addProfesional: async (_, { id_profesional, cedula, nombre, apellido, direccion, telefono, email, fecha_nacimiento, genero }) => {
      try {
        // Validaciones
        if (!id_profesional || !cedula || !nombre || !apellido || !direccion || !telefono || !email || !fecha_nacimiento || !genero) {
          throw new ApolloError("Todos los campos son requeridos.", "FIELD_REQUIRED");
        }

        // Validación de tipo de datos
        if (typeof id_profesional !== 'number' || typeof cedula !== 'string' || typeof nombre !== 'string' || typeof apellido !== 'string' || typeof direccion !== 'string' || typeof telefono !== 'string' || typeof email !== 'string' || typeof fecha_nacimiento !== 'string' || typeof genero !== 'string') {
          throw new ApolloError("Tipos de datos no válidos.", "INVALID_TYPE");
        }

        // Validación de longitud
        if (nombre.length > 100) {
          throw new ApolloError("El nombre no puede tener más de 100 caracteres.", "NAME_TOO_LONG");
        }

        if (apellido.length > 100) {
          throw new ApolloError("El apellido no puede tener más de 100 caracteres.", "APELLIDO_TOO_LONG");
        }

        if (direccion.length > 255) {
          throw new ApolloError("La dirección no puede tener más de 255 caracteres.", "DIRECCION_TOO_LONG");
        }

        // Validación de cédula
        if (cedula.length < 7 || cedula.length > 15) {
          throw new ApolloError("La cédula debe tener entre 7 y 15 caracteres.", "CEDULA_LENGTH");
        }

        // Validación de formato de teléfono
        const telefonoRegex = /^\d{8}$/;
        if (!telefonoRegex.test(telefono)) {
          throw new ApolloError("El formato del teléfono no es válido. Debe tener 8 dígitos.", "INVALID_PHONE_FORMAT");
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new ApolloError("El formato del email no es válido.", "INVALID_EMAIL_FORMAT");
        }

        // Validación de formato de fecha
        // Validación de formato de fecha
        const fecha = new Date(fecha_nacimiento);
        if (isNaN(fecha.getTime()) || fecha_nacimiento !== fecha.toISOString().split('T')[0]) {
          throw new ApolloError("El formato de la fecha de nacimiento no es válido. Debe ser una fecha completa en formato YYYY-MM-DD.", "INVALID_DATE_FORMAT");
        }

        // Validación de género
        const validGeneros = ["masculino", "femenino", "otro"];
        if (!validGeneros.includes(genero.toLowerCase())) {
          throw new ApolloError("El género no es válido. Debe ser masculino, femenino u otro.", "INVALID_GENDER");
        }

        // Validación de existencia en la base de datos
        const idExistente = await Profesional.findOne({ id_profesional }).exec();
        if (idExistente) {
          throw new ApolloError("Ya existe un profesional con el mismo ID.", "DUPLICATE_ID");
        }

        const emailExistente = await Profesional.findOne({ email }).exec();
        if (emailExistente) {
          throw new ApolloError("Ya existe un profesional con el mismo email.", "DUPLICATE_EMAIL");
        }

        // Crear y guardar nuevo profesional
        const nuevoProfesional = new Profesional({ id_profesional, cedula, nombre, apellido, direccion, telefono, email, fecha_nacimiento, genero });
        await nuevoProfesional.save();

        return nuevoProfesional;
      } catch (error) {
        console.error("Error al agregar profesional:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    updateProfesional: async (parent, { id_profesional, cedula, nombre, apellido, direccion, telefono, email, fecha_nacimiento, genero }) => {
      try {
        // Validación de campo requerido
        if (!id_profesional) {
          throw new ApolloError("El campo id_profesional es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia del profesional
        const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
        if (!profesionalExistente) {
          throw new ApolloError("El profesional con el ID proporcionado no existe.", "PROFESIONAL_NOT_FOUND");
        }

        // Validación de datos proporcionados (si se proporcionan)
        const updateData = {};

        if (cedula) {
          if (typeof cedula !== 'string' || cedula.length > 20) {
            throw new ApolloError("La cédula debe ser una cadena de texto con máximo 20 caracteres.", "INVALID_CEDULA");
          }
          updateData.cedula = cedula;
        }

        if (nombre) {
          if (typeof nombre !== 'string' || nombre.length > 255) {
            throw new ApolloError("El nombre debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_NOMBRE");
          }
          updateData.nombre = nombre;
        }

        if (apellido) {
          if (typeof apellido !== 'string' || apellido.length > 255) {
            throw new ApolloError("El apellido debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_APELLIDO");
          }
          updateData.apellido = apellido;
        }

        if (direccion) {
          if (typeof direccion !== 'string' || direccion.length > 255) {
            throw new ApolloError("La dirección debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_DIRECCION");
          }
          updateData.direccion = direccion;
        }

        if (telefono) {
          if (typeof telefono !== 'string' || telefono.length > 255) {
            throw new ApolloError("El teléfono debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_TELEFONO");
          }
          updateData.telefono = telefono;
        }

        if (email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 255) {
            throw new ApolloError("El email debe ser una cadena de texto válida y con máximo 255 caracteres.", "INVALID_EMAIL");
          }
          updateData.email = email;
        }

        if (fecha_nacimiento) {
          const fechaNacimiento = new Date(fecha_nacimiento);
          if (isNaN(fechaNacimiento.getTime())) {
            throw new ApolloError("La fecha de nacimiento debe ser una fecha válida.", "INVALID_FECHA_NACIMIENTO");
          }
          updateData.fecha_nacimiento = fechaNacimiento;
        }

        if (genero) {
          if (typeof genero !== 'string') {
            throw new ApolloError("El género debe ser una cadena de texto.", "INVALID_GENERO");
          }
          updateData.genero = genero;
        }

        // Actualización del profesional
        const profesionalActualizado = await Profesional.findOneAndUpdate({ id_profesional }, updateData, { new: true });

        if (!profesionalActualizado) {
          throw new ApolloError("Error al actualizar el profesional.", "UPDATE_FAILED");
        }

        // Respuesta con el profesional actualizado y el mensaje
        return {
          profesional: profesionalActualizado,
          message: "Profesional actualizado correctamente."
        };

      } catch (error) {
        console.error("Error al actualizar el profesional:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    deleteProfesional: async (parent, { id_profesional }) => {
      try {
        // Validación de campo requerido
        if (!id_profesional) {
          throw new ApolloError("El campo id_profesional es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia del profesional
        const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
        if (!profesionalExistente) {
          throw new ApolloError("El profesional con el ID proporcionado no existe.", "PROFESIONAL_NOT_FOUND");
        }

        // Eliminar el profesional
        const profesionalEliminado = await Profesional.findOneAndDelete({ id_profesional });

        if (!profesionalEliminado) {
          throw new ApolloError("Error al eliminar el profesional.", "DELETE_FAILED");
        }

        // Respuesta con el profesional eliminado y el mensaje
        return {
          profesional: profesionalEliminado,
          message: "Profesional eliminado correctamente."
        };

      } catch (error) {
        console.error("Error al eliminar el profesional:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    addProfesion: async (_, { id_profesion, nombre }) => {
      try {
        // Validaciones
        if (!id_profesion || !nombre) {
          throw new ApolloError("Todos los campos son requeridos.", "FIELD_REQUIRED");
        }

        // Validación de tipo de datos
        if (typeof id_profesion !== 'number' || typeof nombre !== 'string') {
          throw new ApolloError("Tipos de datos no válidos.", "INVALID_TYPE");
        }

        // Validación de longitud del nombre
        if (nombre.length > 100) {
          throw new ApolloError("El nombre no puede tener más de 100 caracteres.", "NAME_TOO_LONG");
        }

        // Validación de existencia en la base de datos
        const idExistente = await Profesion.findOne({ id_profesion }).exec();
        if (idExistente) {
          throw new ApolloError("Ya existe una profesión con el mismo ID.", "DUPLICATE_ID");
        }

        const nombreExistente = await Profesion.findOne({ nombre }).exec();
        if (nombreExistente) {
          throw new ApolloError("Ya existe una profesión con el mismo nombre.", "DUPLICATE_NAME");
        }

        // Crear y guardar nueva profesión
        const nuevaProfesion = new Profesion({ id_profesion, nombre });
        await nuevaProfesion.save();

        return nuevaProfesion;
      } catch (error) {
        console.error("Error al agregar profesión:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    updateProfesion: async (parent, { id_profesion, nombre }) => {
      try {
        // Validación de campo requerido
        if (!id_profesion) {
          throw new ApolloError("El campo id_profesion es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la profesión
        const profesionExistente = await Profesion.findOne({ id_profesion }).exec();
        if (!profesionExistente) {
          throw new ApolloError("La profesión con el ID proporcionado no existe.", "PROFESION_NOT_FOUND");
        }

        // Validación de datos proporcionados (si se proporcionan)
        const updateData = {};

        if (nombre) {
          if (typeof nombre !== 'string' || nombre.length > 255) {
            throw new ApolloError("El nombre debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_NOMBRE");
          }
          updateData.nombre = nombre;
        }

        // Actualización de la profesión
        const profesionActualizada = await Profesion.findOneAndUpdate({ id_profesion }, updateData, { new: true });

        if (!profesionActualizada) {
          throw new ApolloError("Error al actualizar la profesión.", "UPDATE_FAILED");
        }

        // Respuesta con la profesión actualizada y el mensaje
        return {
          profesion: profesionActualizada,
          message: "Profesión actualizada correctamente."
        };

      } catch (error) {
        console.error("Error al actualizar la profesión:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    deleteProfesion: async (parent, { id_profesion }) => {
      try {
        // Validación de campo requerido
        if (!id_profesion) {
          throw new ApolloError("El campo id_profesion es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la profesión
        const profesionExistente = await Profesion.findOne({ id_profesion }).exec();
        if (!profesionExistente) {
          throw new ApolloError("La profesión con el ID proporcionado no existe.", "PROFESION_NOT_FOUND");
        }

        // Eliminar la profesión
        const profesionEliminada = await Profesion.findOneAndDelete({ id_profesion });

        if (!profesionEliminada) {
          throw new ApolloError("Error al eliminar la profesión.", "DELETE_FAILED");
        }

        // Respuesta con el mensaje de éxito
        return {
          message: "Profesión eliminada correctamente."
        };

      } catch (error) {
        console.error("Error al eliminar la profesión:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    addExpediente: async (_, { id_expediente, id_profesional, titulos, experiencia_laboral }) => {
      try {
        // Validaciones
        if (!id_expediente || !id_profesional || !Array.isArray(titulos) || !Array.isArray(experiencia_laboral)) {
          throw new ApolloError("Todos los campos son requeridos.", "FIELD_REQUIRED");
        }

        if (typeof id_expediente !== 'number' || typeof id_profesional !== 'number') {
          throw new ApolloError("Los campos id_expediente e id_profesional deben ser números.", "INVALID_TYPE");
        }

        // Verificación de longitud
        titulos.forEach(titulo => {
          if (typeof titulo !== 'string' || titulo.length > 255) {
            throw new ApolloError("Cada título debe ser una cadena de texto con un máximo de 255 caracteres.", "TITLE_TOO_LONG");
          }
        });

        experiencia_laboral.forEach(experiencia => {
          if (typeof experiencia !== 'string' || experiencia.length > 255) {
            throw new ApolloError("Cada experiencia laboral debe ser una cadena de texto con un máximo de 255 caracteres.", "EXPERIENCE_TOO_LONG");
          }
        });

        // Verificación de existencia del profesional
        const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
        if (!profesionalExistente) {
          throw new ApolloError("El profesional con el ID especificado no existe.", "PROFESIONAL_NOT_FOUND");
        }

        // Verificación de existencia del expediente
        const expedienteExistente = await Expediente.findOne({ id_expediente }).exec();
        if (expedienteExistente) {
          throw new ApolloError("Ya existe un expediente con el mismo ID.", "DUPLICATE_ID");
        }

        // Crear y guardar nuevo expediente
        const nuevoExpediente = new Expediente({
          id_expediente,
          id_profesional,
          titulos,
          experiencia_laboral
        });
        await nuevoExpediente.save();

        return nuevoExpediente;
      } catch (error) {
        console.error("Error al agregar expediente:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    updateExpediente: async (parent, { id_expediente, id_profesional, titulos, experiencia_laboral }) => {
      try {
        // Validación de campo requerido
        if (!id_expediente) {
          throw new ApolloError("El campo id_expediente es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia del expediente
        const expedienteExistente = await Expediente.findOne({ id_expediente }).exec();
        if (!expedienteExistente) {
          throw new ApolloError("El expediente con el ID proporcionado no existe.", "EXPEDIENTE_NOT_FOUND");
        }

        // Validación de existencia del profesional si se proporciona
        if (id_profesional) {
          const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
          if (!profesionalExistente) {
            throw new ApolloError("El profesional asociado no existe.", "PROFESIONAL_NOT_FOUND");
          }
        }

        // Actualización de los datos del expediente
        const updateData = {};

        if (id_profesional) {
          updateData.id_profesional = id_profesional;
        }

        if (titulos) {
          updateData.titulos = titulos;
        }

        if (experiencia_laboral) {
          updateData.experiencia_laboral = experiencia_laboral;
        }

        const expedienteActualizado = await Expediente.findOneAndUpdate(
          { id_expediente },
          updateData,
          { new: true }
        );

        if (!expedienteActualizado) {
          throw new ApolloError("Error al actualizar el expediente.", "UPDATE_FAILED");
        }

        return {
          mensaje: "Expediente actualizado correctamente.",
          expediente: expedienteActualizado
        };

      } catch (error) {
        console.error("Error al actualizar el expediente:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    deleteExpediente: async (parent, { id_expediente }) => {
      try {
        // Validación de campo requerido
        if (!id_expediente) {
          throw new ApolloError("El campo id_expediente es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia del expediente
        const expedienteExistente = await Expediente.findOne({ id_expediente }).exec();
        if (!expedienteExistente) {
          throw new ApolloError("El expediente con el ID proporcionado no existe.", "EXPEDIENTE_NOT_FOUND");
        }

        // Eliminar el expediente
        const expedienteEliminado = await Expediente.findOneAndDelete({ id_expediente });

        if (!expedienteEliminado) {
          throw new ApolloError("Error al eliminar el expediente.", "DELETE_FAILED");
        }

        return {
          mensaje: "Expediente eliminado correctamente.",
          expediente: expedienteEliminado
        };

      } catch (error) {
        console.error("Error al eliminar el expediente:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    addPlazaVacante: async (_, { id_vacante, id_empresa, titulo_puesto, descripcion, fecha_publicacion, estado }) => {
      try {
        // Validaciones
        if (!id_vacante || !id_empresa || !titulo_puesto || !descripcion || !fecha_publicacion || !estado) {
          throw new ApolloError("Todos los campos son requeridos.", "FIELD_REQUIRED");
        }

        if (typeof id_vacante !== 'number' || typeof id_empresa !== 'number') {
          throw new ApolloError("Los campos id_vacante e id_empresa deben ser números.", "INVALID_TYPE");
        }

        if (typeof titulo_puesto !== 'string' || titulo_puesto.trim() === '') {
          throw new ApolloError("El título del puesto debe ser una cadena de texto no vacía.", "INVALID_TITLE");
        }

        if (titulo_puesto.length > 255) {
          throw new ApolloError("El título del puesto debe tener un máximo de 255 caracteres.", "TITLE_TOO_LONG");
        }

        if (typeof descripcion !== 'string' || descripcion.trim() === '') {
          throw new ApolloError("La descripción debe ser una cadena de texto no vacía.", "INVALID_DESCRIPTION");
        }

        if (typeof estado !== 'string' || !['Abierta', 'Cerrada'].includes(estado)) {
          throw new ApolloError("El estado debe ser 'Abierta' o 'Cerrada'.", "INVALID_STATUS");
        }


        // Validación de formato de fecha
        const fecha = new Date(fecha_publicacion);
        if (isNaN(fecha.getTime()) || fecha_publicacion !== fecha.toISOString().split('T')[0]) {
          throw new ApolloError("El formato de la fecha de publicación no es válido. Debe ser una fecha completa en formato YYYY-MM-DD.", "INVALID_DATE_FORMAT");
        }


        // Verificación de existencia de la empresa
        const empresaExistente = await Empresa.findOne({ id_empresa }).exec();
        if (!empresaExistente) {
          throw new ApolloError("La empresa con el ID especificado no existe.", "EMPRESA_NOT_FOUND");
        }

        // Verificación de existencia de la plaza vacante
        const plazaVacanteExistente = await PlazaVacante.findOne({ id_vacante }).exec();
        if (plazaVacanteExistente) {
          throw new ApolloError("Ya existe una plaza vacante con el mismo ID.", "DUPLICATE_ID");
        }

        // Crear y guardar nueva plaza vacante
        const nuevaPlazaVacante = new PlazaVacante({
          id_vacante,
          id_empresa,
          titulo_puesto,
          descripcion,
          fecha_publicacion: fecha,
          estado
        });
        await nuevaPlazaVacante.save();

        return nuevaPlazaVacante;
      } catch (error) {
        console.error("Error al agregar plaza vacante:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    updatePlazaVacante: async (parent, { id_vacante, id_empresa, titulo_puesto, descripcion, fecha_publicacion, estado }) => {
      try {
        // Validación de campo requerido
        if (!id_vacante) {
          throw new ApolloError("El campo id_vacante es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la vacante
        const plazaVacanteExistente = await PlazaVacante.findOne({ id_vacante }).exec();
        if (!plazaVacanteExistente) {
          throw new ApolloError("La plaza vacante con el ID proporcionado no existe.", "PLAZA_VACANTE_NOT_FOUND");
        }

        // Validación de formato de fecha
        if (fecha_publicacion) {
          const fecha = new Date(fecha_publicacion);
          if (isNaN(fecha.getTime()) || fecha_publicacion !== fecha.toISOString().split('T')[0]) {
            throw new ApolloError("El formato de la fecha de publicación no es válido. Debe ser una fecha completa en formato YYYY-MM-DD.", "INVALID_DATE_FORMAT");
          }
        }

        // Validación de datos proporcionados (si se proporcionan)
        const updateData = {};

        if (id_empresa) {
          const empresaExistente = await Empresa.findOne({ id_empresa }).exec();
          if (!empresaExistente) {
            throw new ApolloError("La empresa con el ID proporcionado no existe.", "EMPRESA_NOT_FOUND");
          }
          updateData.id_empresa = id_empresa;
        }

        if (titulo_puesto) {
          if (typeof titulo_puesto !== 'string' || titulo_puesto.length > 255) {
            throw new ApolloError("El título del puesto debe ser una cadena de texto con máximo 255 caracteres.", "INVALID_TITULO_PUESTO");
          }
          updateData.titulo_puesto = titulo_puesto;
        }

        if (descripcion) {
          if (typeof descripcion !== 'string') {
            throw new ApolloError("La descripción debe ser una cadena de texto.", "INVALID_DESCRIPCION");
          }
          updateData.descripcion = descripcion;
        }

        if (fecha_publicacion) {
          updateData.fecha_publicacion = new Date(fecha_publicacion);
        }

        if (estado) {
          const estadosValidos = ['Abierta', 'Cerrada'];
          if (!estadosValidos.includes(estado)) {
            throw new ApolloError("El estado debe ser 'Abierta' o 'Cerrada'.", "INVALID_ESTADO");
          }
          updateData.estado = estado;
        }

        // Actualización de la vacante
        const plazaVacanteActualizada = await PlazaVacante.findOneAndUpdate({ id_vacante }, updateData, { new: true });

        if (!plazaVacanteActualizada) {
          throw new ApolloError("Error al actualizar la plaza vacante.", "UPDATE_FAILED");
        }

        return {
          mensaje: "Plaza vacante actualizada correctamente.",
          plazaVacante: plazaVacanteActualizada
        };

      } catch (error) {
        console.error("Error al actualizar la plaza vacante:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    deletePlazaVacante: async (parent, { id_vacante }) => {
      try {
        // Validación de campo requerido
        if (!id_vacante) {
          throw new ApolloError("El campo id_vacante es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la vacante
        const plazaVacanteExistente = await PlazaVacante.findOne({ id_vacante }).exec();
        if (!plazaVacanteExistente) {
          throw new ApolloError("La plaza vacante con el ID proporcionado no existe.", "PLAZA_VACANTE_NOT_FOUND");
        }

        // Eliminar la plaza vacante
        const plazaVacanteEliminada = await PlazaVacante.findOneAndDelete({ id_vacante });

        if (!plazaVacanteEliminada) {
          throw new ApolloError("Error al eliminar la plaza vacante.", "DELETE_FAILED");
        }

        return {
          mensaje: "Plaza vacante eliminada correctamente."
        };

      } catch (error) {
        console.error("Error al eliminar la plaza vacante:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    addAplicacion: async (_, { id_aplicacion, id_profesional, id_vacante, fecha_aplicacion, estado }) => {
      try {
        // Validaciones
        if (!id_aplicacion || !id_profesional || !id_vacante || !fecha_aplicacion || !estado) {
          throw new ApolloError("Todos los campos son requeridos.", "FIELD_REQUIRED");
        }

        // Validación de tipo de datos
        if (typeof id_aplicacion !== 'number' || typeof id_profesional !== 'number' || typeof id_vacante !== 'number' || typeof fecha_aplicacion !== 'string' || typeof estado !== 'string') {
          throw new ApolloError("Tipos de datos no válidos.", "INVALID_TYPE");
        }

        // Validación de formato de fecha
        const fecha = new Date(fecha_aplicacion);
        if (isNaN(fecha.getTime()) || fecha_aplicacion !== fecha.toISOString().split('T')[0]) {
          throw new ApolloError("El formato de la fecha de aplicación no es válido. Debe ser una fecha completa en formato YYYY-MM-DD.", "INVALID_DATE_FORMAT");
        }

        // Validación de estado
        const validEstados = ["Pendiente", "En revisión", "Aceptada", "Rechazada"];
        if (!validEstados.includes(estado)) {
          throw new ApolloError("El estado no es válido. Debe ser 'Pendiente', 'En revisión', 'Aceptada' o 'Rechazada'.", "INVALID_STATUS");
        }

        // Validación de existencia en la base de datos
        const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
        if (!profesionalExistente) {
          throw new ApolloError("El profesional no existe.", "PROFESIONAL_NOT_FOUND");
        }

        const vacanteExistente = await PlazaVacante.findOne({ id_vacante }).exec();
        if (!vacanteExistente) {
          throw new ApolloError("La vacante no existe.", "VACANTE_NOT_FOUND");
        }

        // Crear y guardar nueva aplicación
        const nuevaAplicacion = new Aplicacion({ id_aplicacion, id_profesional, id_vacante, fecha_aplicacion, estado });
        await nuevaAplicacion.save();

        return nuevaAplicacion;
      } catch (error) {
        console.error("Error al agregar aplicación:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    updateAplicacion: async (parent, { id_aplicacion, id_profesional, id_vacante, fecha_aplicacion, estado }) => {
      try {
        // Validación de campo requerido
        if (!id_aplicacion) {
          throw new ApolloError("El campo id_aplicacion es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la aplicación
        const aplicacionExistente = await Aplicacion.findOne({ id_aplicacion }).exec();
        if (!aplicacionExistente) {
          throw new ApolloError("La aplicación con el ID proporcionado no existe.", "APLICACION_NOT_FOUND");
        }

        // Validación de datos proporcionados (si se proporcionan)
        const updateData = {};

        if (id_profesional) {
          const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
          if (!profesionalExistente) {
            throw new ApolloError("El profesional asociado no existe.", "PROFESIONAL_NOT_FOUND");
          }
          updateData.id_profesional = id_profesional;
        }

        if (id_vacante) {
          const vacanteExistente = await PlazaVacante.findOne({ id_vacante }).exec();
          if (!vacanteExistente) {
            throw new ApolloError("La vacante asociada no existe.", "VACANTE_NOT_FOUND");
          }
          updateData.id_vacante = id_vacante;
        }

        if (fecha_aplicacion) {
          // Validación de formato de fecha
          const fecha = new Date(fecha_aplicacion);
          if (isNaN(fecha.getTime()) || fecha_aplicacion !== fecha.toISOString().split('T')[0]) {
            throw new ApolloError("El formato de la fecha de aplicación no es válido. Debe ser una fecha completa en formato YYYY-MM-DD.", "INVALID_DATE_FORMAT");
          }
          updateData.fecha_aplicacion = fecha_aplicacion;
        }

        if (estado) {
          const estadosValidos = ['Pendiente', 'En revisión', 'Aceptada', 'Rechazada'];
          if (!estadosValidos.includes(estado)) {
            throw new ApolloError("El estado debe ser uno de los valores permitidos: 'Pendiente', 'En revisión', 'Aceptada', 'Rechazada'.", "INVALID_ESTADO");
          }
          updateData.estado = estado;
        }

        // Actualización de la aplicación
        const aplicacionActualizada = await Aplicacion.findOneAndUpdate({ id_aplicacion }, updateData, { new: true });

        if (!aplicacionActualizada) {
          throw new ApolloError("Error al actualizar la aplicación.", "UPDATE_FAILED");
        }

        return {
          mensaje: "Aplicación actualizada correctamente.",
          aplicacion: aplicacionActualizada
        };

      } catch (error) {
        console.error("Error al actualizar la aplicación:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    deleteAplicacion: async (parent, { id_aplicacion }) => {
      try {
        // Validación de campo requerido
        if (!id_aplicacion) {
          throw new ApolloError("El campo id_aplicacion es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia de la aplicación
        const aplicacionExistente = await Aplicacion.findOne({ id_aplicacion }).exec();
        if (!aplicacionExistente) {
          throw new ApolloError("La aplicación con el ID proporcionado no existe.", "APLICACION_NOT_FOUND");
        }

        // Eliminar la aplicación
        const aplicacionEliminada = await Aplicacion.findOneAndDelete({ id_aplicacion });

        if (!aplicacionEliminada) {
          throw new ApolloError("Error al eliminar la aplicación.", "DELETE_FAILED");
        }

        return {
          mensaje: "Aplicación eliminada correctamente.",
          aplicacion: aplicacionEliminada
        };

      } catch (error) {
        console.error("Error al eliminar la aplicación:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    addRegistroProfesionalProfesion: async (_, { id_registro_profesional_profesion, id_profesional, id_profesion }) => {
      try {
        // Validación de campos requeridos
        if (!id_registro_profesional_profesion || !id_profesional || !id_profesion) {
          throw new ApolloError("Todos los campos son requeridos.", "FIELD_REQUIRED");
        }

        // Validación de tipos de datos
        if (typeof id_registro_profesional_profesion !== 'number' || typeof id_profesional !== 'number' || typeof id_profesion !== 'number') {
          throw new ApolloError("Tipos de datos no válidos.", "INVALID_TYPE");
        }

        // Validación de existencia en la base de datos
        const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
        if (!profesionalExistente) {
          throw new ApolloError("El profesional no existe.", "PROFESIONAL_NOT_FOUND");
        }

        const profesionExistente = await Profesion.findOne({ id_profesion }).exec();
        if (!profesionExistente) {
          throw new ApolloError("La profesión no existe.", "PROFESION_NOT_FOUND");
        }

        // Crear y guardar nuevo registro
        const nuevoRegistro = new RegistroProfesionalProfesion({ id_registro_profesional_profesion, id_profesional, id_profesion });
        await nuevoRegistro.save();

        return nuevoRegistro;
      } catch (error) {
        console.error("Error al agregar registro:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    },
    updateRegistroProfesionalProfesion: async (parent, { id_registro_profesional_profesion, id_profesional, id_profesion }) => {
      try {
        // Validación de campo requerido
        if (!id_registro_profesional_profesion) {
          throw new ApolloError("El campo id_registro_profesional_profesion es requerido.", "FIELD_REQUIRED");
        }

        // Validación de existencia del registro
        const registroExistente = await RegistroProfesionalProfesion.findOne({ id_registro_profesional_profesion }).exec();
        if (!registroExistente) {
          throw new ApolloError("El registro profesional-profesión con el ID proporcionado no existe.", "REGISTRO_NOT_FOUND");
        }

        // Validar existencia del profesional si se proporciona
        if (id_profesional) {
          const profesionalExistente = await Profesional.findOne({ id_profesional }).exec();
          if (!profesionalExistente) {
            throw new ApolloError("El profesional con el ID proporcionado no existe.", "PROFESIONAL_NOT_FOUND");
          }
        }

        // Validar existencia de la profesión si se proporciona
        if (id_profesion) {
          const profesionExistente = await Profesion.findOne({ id_profesion }).exec();
          if (!profesionExistente) {
            throw new ApolloError("La profesión con el ID proporcionado no existe.", "PROFESION_NOT_FOUND");
          }
        }

        // Actualización del registro
        const actualizarDatos = {};
        if (id_profesional) actualizarDatos.id_profesional = id_profesional;
        if (id_profesion) actualizarDatos.id_profesion = id_profesion;

        const registroActualizado = await RegistroProfesionalProfesion.findOneAndUpdate(
          { id_registro_profesional_profesion },
          actualizarDatos,
          { new: true } // Devuelve el documento actualizado
        ).exec();

        if (!registroActualizado) {
          throw new ApolloError("Error al actualizar el registro profesional-profesión.", "UPDATE_FAILED");
        }

        return {
          mensaje: "Registro profesional-profesión actualizado correctamente.",
          registroProfesionalProfesion: registroActualizado
        };

      } catch (error) {
        console.error("Error al actualizar el registro profesional-profesión:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    }
    ,
    deleteRegistroProfesionalProfesion: async (parent, { id_registro_profesional_profesion }) => {
      try {
        // Validación de campo requerido
        if (!id_registro_profesional_profesion) {
          throw new ApolloError("El campo id_registro_profesional_profesion es requerido.", "FIELD_REQUIRED");
        }

        // Validar existencia del registro
        const registroExistente = await RegistroProfesionalProfesion.findOne({ id_registro_profesional_profesion }).exec();
        if (!registroExistente) {
          throw new ApolloError("El registro profesional-profesión con el ID proporcionado no existe.", "REGISTRO_NOT_FOUND");
        }

        // Eliminar el registro
        const registroEliminado = await RegistroProfesionalProfesion.findOneAndDelete({ id_registro_profesional_profesion }).exec();

        if (!registroEliminado) {
          throw new ApolloError("Error al eliminar el registro profesional-profesión.", "DELETE_FAILED");
        }

        return {
          mensaje: "Registro profesional-profesión eliminado correctamente.",
          registroProfesionalProfesion: registroEliminado
        };

      } catch (error) {
        console.error("Error al eliminar el registro profesional-profesión:", error);
        if (error instanceof ApolloError) {
          throw error;
        } else {
          throw new ApolloError("Error interno del servidor.", "INTERNAL_ERROR", { details: error.message });
        }
      }
    }

  }
};

export default resolvers;
