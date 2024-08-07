export const typeDefs = `#graphql
scalar Date

  type Empresa {
    id_empresa: Int!
    nombre: String!
    tipo: String!
    direccion: String!
    telefono: String!
    email: String!
  }

  type Profesional {
    id_profesional: Int!
    cedula: String!
    nombre: String!
    apellido: String!
    direccion: String!
    telefono: String!
    email: String!
    fecha_nacimiento: Date!
  }

  type Profesion {
    id_profesion: Int!
    nombre: String!
  }

  type RegistroProfesionalProfesion {
    id_registro_profesional_profesion: Int!
    profesional: Profesional
    profesion: Profesion
  }

  type Expediente {
    id_expediente: Int!
    profesional: Profesional
    titulos: [String]
    experiencia_laboral: [String]
  }

  type PlazaVacante {
    id_vacante: Int!
    empresa: Empresa
    titulo_puesto: String!
    descripcion: String!
    fecha_publicacion: Date!
    estado: String!
  }

  type Aplicacion {
    id_aplicacion: Int!
    profesional: Profesional
    vacante: PlazaVacante
    fecha_aplicacion: Date!
    estado: String!
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


  type Query {
    empresas: [Empresa]
    empresa(id_empresa: Int!): Empresa

    profesionales: [Profesional]
    profesional(id_profesional: Int!): Profesional

    profesiones: [Profesion]
    profesion(id_profesion: Int!): Profesion

    expedientes: [Expediente]
    expediente(id_expediente: Int!): Expediente

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
  }
  
  type Mutation {
        addEmpresa(id_empresa: Int!, nombre: String!, tipo: String!, direccion: String!, telefono: String!, email: String!): Empresa
        addProfesional(nombre: String!, email: String!): Profesional
        addProfesion(nombre: String!): Profesion
        addExpediente(id_profesional: Int!, descripcion: String!): Expediente
        addPlazaVacante(id_empresa: Int!, puesto: String!): PlazaVacante
        addAplicacion(id_profesional: Int!, id_vacante: Int!, fecha: String!): Aplicacion
        addRegistroProfesionalProfesion(id_profesional: Int!, id_profesion: Int!): RegistroProfesionalProfesion
  }
`;