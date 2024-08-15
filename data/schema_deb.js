export const typeDefs = `#graphql
scalar Date

#The file defines the structures of the data used in your GraphQL API. 
#This includes entity types (such as Company, Professional, Vacancy, etc.) 
#that represent the data in your system, as well as how responses for mutations 
#and queries are structured. Response types (like UpdateCompanyResponse, DeleteCompanyResponse, etc.) 
#specify what data will be returned and in what format, enabling clear and structured communication 
#between the client and server.

  type Empresa {
    id_empresa: Int!
    nombre: String!
    tipo: String!
    direccion: String!
    telefono: String!
    email: String!
    
  }
  type UpdateEmpresaResponse {
    empresa: Empresa
    mensaje: String
  } 

  type DeleteEmpresaResponse {
    empresa: Empresa
    message: String
  }

    type Profesional {
    id_profesional: Int
    cedula: String
    nombre: String
    apellido: String
    direccion: String
    telefono: String
    email: String
    fecha_nacimiento: String  # Cambiado a String
    genero: String
    areas: [String!]
  }

  type UpdateProfesionalResponse {
    profesional: Profesional
    message: String
  }

  type DeleteProfesionalResponse {
    profesional: Profesional
    message: String
  }

  type Profesion {
    id_profesion: Int!
    nombre: String!
  }

  type UpdateProfesionResponse {
    profesion: Profesion
    message: String
  }
  type DeleteProfesionResponse {
    message: String
  }

  type Expediente {
    id_expediente: Int!
    profesional: Profesional
    titulos: [String]
    experiencia_laboral: [String]
  }

  type UpdateExpedienteResponse {
    mensaje: String!
    expediente: Expediente
  }

type DeleteResponse {
    mensaje: String!
    expediente: Expediente
  } 

  type PlazaVacante {
    id_vacante: Int!
    empresa: Empresa!
    titulo_puesto: String!
    descripcion: String!
    fecha_publicacion: Date!
    estado: String!
  }
  type UpdatePlazaVacanteResponse {
    mensaje: String!
    plazaVacante: PlazaVacante
  }

  type DeletePlazaVacanteResponse {
    mensaje: String!
  }

  type Aplicacion {
    id_aplicacion: Int!
    profesional: Profesional
    vacante: PlazaVacante
    fecha_aplicacion: Date!
    estado: String!
  }

  type AplicacionResponse {
    mensaje: String
    aplicacion: Aplicacion
  }
  type DeleteAplicacionResponse {
    mensaje: String
    aplicacion: Aplicacion
  }

  type RegistroProfesionalProfesion {
    id_registro_profesional_profesion: Int!
    profesional: Profesional
    profesion: Profesion
  }
  type UpdateRegistroProfesionalProfesionResponse {
    mensaje: String
    registroProfesionalProfesion: RegistroProfesionalProfesion
  }

  type DeleteRegistroProfesionalProfesionResponse {
    mensaje: String!
    registroProfesionalProfesion: RegistroProfesionalProfesion
  }

  type PlazaVacanteInfo {
    cedula: String!
    nombre: String!
    puestos_ofertados: [String!]!
  }

  type ProfesionalInfo {
    cedula: String!
    nombre: String!
    profesiones: [String!]!
  }

  type GeneroCantidad {
    genero: String!
    cantidad: Int!
  }



#This file defines the schema for a GraphQL API. It specifies the types of data that can be queried or 
#mutated in the API, including: Queries: To retrieve data about entities like companies, professionals, 
#job vacancies, and more. It includes various fields for fetching lists or specific items based on their IDs.

#Mutations: To modify data in the system, such as adding, updating, or deleting entities like companies, 
#professionals, job vacancies, and applications. It also defines the structure of the responses for these 
#operations, including any relevant messages or updated data.

#Overall, this file serves as a blueprint for the GraphQL API, defining how clients can interact with the 
#data and what information will be available in responses.

type AreaStats {
    area: String!
    cantidad: Int!
    porcentaje: Float!
}

  type Query {
    empresas: [Empresa]
    empresa(id_empresa: Int!): Empresa

    profesionales: [Profesional]
    profesional(id_profesional: Int!): Profesional

    profesiones: [Profesion]
    profesion(id_profesion: Int!): Profesion

    expedientes: [Expediente]
    expediente(id_expediente: Int!): Expediente

    #Impresión de inventario de plazas o puestos vacantes.
    plazasVacantes: [PlazaVacante]
    plazaVacante(id_vacante: Int!): PlazaVacante

    aplicaciones: [Aplicacion]
    aplicacion(id_aplicacion: Int!): Aplicacion

    registros: [RegistroProfesionalProfesion]
    registro(id_registro_profesional_profesion: Int!): RegistroProfesionalProfesion

    #Impresión general del empleador con la siguiente información: Cédula, nombre, puestos ofertados.
    getPlazaVacantePorProfesional(id_profesional: Int!): PlazaVacanteInfo

    #Imprimir información específica de un profesional (recibido como parámetro), cédula, nombre, profesiones.
    getProfesionalInfo(id_profesional: Int!): ProfesionalInfo

    #Cantidad de profesionales registrados por género
    cantidadProfesionalesPorGenero: [GeneroCantidad!]!

    #Nombre de todos los profesionales postulantes para una determinada área, el usuario selecciona el área
    profesionalesPorArea(area: String!): [Profesional!]! 

    #Cantidad y porcentaje de profesionales registradas por área.
    cantidadYPorcentajePorArea: [AreaStats!]!
  }
    
  
  type Mutation {
        addEmpresa(id_empresa: Int!, nombre: String!, tipo: String!, direccion: String!, telefono: String!, email: String!): Empresa
        updateEmpresa(id_empresa: Int!,nombre: String,tipo: String,direccion: String,telefono: String,email: String): UpdateEmpresaResponse
        deleteEmpresa(id_empresa: Int!): DeleteEmpresaResponse
        addProfesional(id_profesional: Int, cedula: String! ,nombre: String!,apellido: String!,direccion: String!,telefono: String!,email: String!,fecha_nacimiento: Date! , genero: String!): Profesional
        updateProfesional(id_profesional: Int!cedula: String,nombre: String,apellido: String,direccion: String,telefono: String,email: String,fecha_nacimiento: Date,genero: String): UpdateProfesionalResponse
        deleteProfesional(id_profesional: Int!): DeleteProfesionalResponse
        addProfesion(id_profesion: Int!,nombre: String!): Profesion
        updateProfesion(id_profesion: Int!, nombre: String): UpdateProfesionResponse
        deleteProfesion(id_profesion: Int!): DeleteProfesionResponse        
        addExpediente(id_expediente: Int!,id_profesional: Int!, titulos: [String!], experiencia_laboral: [String!]): Expediente
        updateExpediente(id_expediente: Int!, id_profesional: Int!,titulos: [String], experiencia_laboral: [String]): UpdateExpedienteResponse
        deleteExpediente(id_expediente: Int!): DeleteResponse        
        addPlazaVacante(id_vacante: Int!,id_empresa: Int!, titulo_puesto: String!,descripcion: String!, fecha_publicacion: Date!, estado: String!): PlazaVacante
        updatePlazaVacante(id_vacante: Int!,id_empresa: Int, titulo_puesto: String, descripcion: String,fecha_publicacion: Date, estado: String): UpdatePlazaVacanteResponse
        deletePlazaVacante(id_vacante: Int!): DeletePlazaVacanteResponse!        
        addAplicacion(id_aplicacion: Int!,id_profesional: Int!, id_vacante: Int!, fecha_aplicacion: String!, estado: String!): Aplicacion
        updateAplicacion(id_aplicacion: Int!,id_profesional: Int,id_vacante: Int,fecha_aplicacion: Date,estado: String): AplicacionResponse
        deleteAplicacion(id_aplicacion: Int!): DeleteAplicacionResponse
        addRegistroProfesionalProfesion(id_registro_profesional_profesion: Int!,id_profesional: Int!, id_profesion: Int!): RegistroProfesionalProfesion
        updateRegistroProfesionalProfesion(id_registro_profesional_profesion: Int!,id_profesional: Int,id_profesion: Int): UpdateRegistroProfesionalProfesionResponse
        deleteRegistroProfesionalProfesion(id_registro_profesional_profesion: Int!): DeleteRegistroProfesionalProfesionResponse!
        }
`;