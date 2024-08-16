/*This is a document with the structure of the mutations and queries to test in Apollo.*/

query {
  empresas {
    id_empresa
    nombre
    tipo
    direccion
    telefono
    email
  }
}
query {
  empresa(id_empresa: 1) {
    id_empresa
    nombre
    tipo
    direccion
    telefono
    email
  }
}
query {
  profesionales {
    id_profesional
    cedula
    nombre
    apellido
    direccion
    telefono
    email
    fecha_nacimiento
    genero
  }
}
query {
  profesional(id_profesional: 1) {
    id_profesional
    cedula
    nombre
    apellido
    direccion
    telefono
    email
    fecha_nacimiento
    genero
  }
}
query {
  profesiones {
    id_profesion
    nombre
  }
}
query {
  profesion(id_profesion: 1) {
    id_profesion
    nombre
  }
}
query {
  expedientes {
    id_expediente
    profesional {
      id_profesional
      nombre
    }
    titulos
    experiencia_laboral
  }
}
query {
  expediente(id_expediente: 1) {
    id_expediente
    profesional {
      id_profesional
      nombre
    }
    titulos
    experiencia_laboral
  }
}
query {
  plazasVacantes {
    id_vacante
    empresa {
      id_empresa
      nombre
    }
    titulo_puesto
    descripcion
    fecha_publicacion
    estado
  }
}
query {
  plazaVacante(id_vacante: 12) {
    id_vacante
    empresa {
      id_empresa
      nombre
    }
    titulo_puesto
    descripcion
    fecha_publicacion
    estado
  }
}
query {
  plazasVacantes {
    id_vacante
    titulo_puesto
    descripcion
    fecha_publicacion
    estado
    empresa {
      id_empresa
      nombre
      tipo
    }
  }
}
query {
  plazaVacante(id_vacante: 9) {
    id_vacante
    titulo_puesto
    descripcion
    fecha_publicacion
    estado
    empresa {
      id_empresa
      nombre
      tipo
    }
  }
}
query {
  aplicaciones {
    id_aplicacion
    profesional {
      id_profesional
      nombre
    }
    vacante {
      id_vacante
      titulo_puesto
    }
    fecha_aplicacion
    estado
  }
}
query {
  aplicacion(id_aplicacion: 3) {
    id_aplicacion
    profesional {
      id_profesional
      nombre
    }
    vacante {
      id_vacante
      titulo_puesto
    }
    fecha_aplicacion
    estado
  }
}
query {
  registros {
    id_registro_profesional_profesion
    profesional {
      id_profesional
      nombre
    }
    profesion {
      id_profesion
      nombre
    }
  }
}
query {
  registro(id_registro_profesional_profesion: 4) {
    id_registro_profesional_profesion
    profesional {
      id_profesional
      nombre
    }
    profesion {
      id_profesion
      nombre
    }
  }
}
mutation {
  addEmpresa(
    id_empresa: 33,
    nombre: "TechCorp",
    tipo: "Fisica",
    direccion: "123 Tech Lane",
    telefono: "12345678",
    email: "contact@techcorp.com"
  ) {
    id_empresa
    nombre
    tipo
    direccion
    telefono
    email
  }
}
mutation {
  updateEmpresa(
    id_empresa: 5
    nombre: "Nuevo Nombre de Empresa"
    tipo: "Fisica"
    direccion: "Nueva Dirección"
    telefono: "87654321"
    email: "nuevoemail@empresa.com"
  ) {
    empresa {
      id_empresa
      nombre
      tipo
      direccion
      telefono
      email
    }
    mensaje
  }
}
mutation {
  deleteEmpresa(id_empresa: 7) {
    empresa {
      id_empresa
      nombre
      tipo
      direccion
      telefono
      email
    }
    message
  }
}
mutation {
  addProfesional(
    id_profesional: 1,
    cedula: "12345678",
    nombre: "Juan",
    apellido: "Pérez",
    direccion: "Calle Falsa 123",
    telefono: "12345678",
    email: "juan.perez@example.com",
    fecha_nacimiento: "2001-02-02",
    genero: "masculino"
  ) {
    id_profesional
    cedula
    nombre
    apellido
    direccion
    telefono
    email
    fecha_nacimiento
    genero
  }
}
mutation {
  updateProfesional(
    id_profesional: 2
    nombre: "Nuevo Nombre"
    apellido: "Nuevo Apellido"
    direccion: "Nueva Dirección"
    telefono: "Nuevo Teléfono"
    email: "nuevoemail@profesional.com"
    fecha_nacimiento: "1990-01-01"
    genero: "Masculino"
  ) {
    profesional {
      id_profesional
      cedula
      nombre
      apellido
      direccion
      telefono
      email
      fecha_nacimiento
      genero
    }
    message
  }
}
mutation {
  deleteProfesional(id_profesional: 7) {
    profesional {
      id_profesional
      cedula
      nombre
      apellido
      direccion
      telefono
      email
      fecha_nacimiento
      genero
    }
    message
  }
}
mutation {
  addProfesion(
    id_profesion: 1,
    nombre: "Ingeniería de Software"
  ) {
    id_profesion
    nombre
  }
}
mutation {
  updateProfesion(id_profesion: 1, nombre: "Nuevo Nombre de Profesión") {
    profesion {
      id_profesion
      nombre
    }
    message
  }
}
mutation {
  deleteProfesion(id_profesion: 1) {
    message
  }
}
mutation {
  addExpediente(
    id_expediente: 27,
    id_profesional: 5,
    titulos: ["Título de Ingeniero en Sistemas", "Máster en Ciberseguridad"],
    experiencia_laboral: ["Desarrollador de Software en XYZ", "Consultor de Seguridad en ABC"]
  ) {
    id_expediente
    profesional {
      id_profesional
      nombre
    }
    titulos
    experiencia_laboral
  }
}
mutation {
  updateExpediente(
    id_expediente: 1,  
    id_profesional: 3,  
    titulos: ["Nuevo Título"],  
    experiencia_laboral: ["TI"]  
  ) {
    
    expediente {
      id_expediente
      profesional {
        id_profesional

      }
      titulos
      experiencia_laboral
    }
    mensaje
  }
}
mutation {
  deleteExpediente(id_expediente: 2) {
    expediente {
      id_expediente
      profesional {
        id_profesional
      }
      titulos
      experiencia_laboral
    }
    mensaje
  }
}
mutation {
  addPlazaVacante(
    id_vacante: 29,
    id_empresa: 5,
    titulo_puesto: "Desarrollador Full Stack",
    descripcion: "Responsable del desarrollo y mantenimiento de aplicaciones web.",
    fecha_publicacion: "2020-08-20",
    estado: "Abierta"
  ) {
    id_vacante
    empresa {
      id_empresa
      nombre
    }
    titulo_puesto
    descripcion
    fecha_publicacion
    estado
  }
}
mutation {
  updatePlazaVacante(
    id_vacante: 1
    id_empresa: 2   
    titulo_puesto: "Nuevo Título del Puesto"
    descripcion: "Nueva Descripción del Puesto"
    fecha_publicacion: "2024-08-15" 
    estado: "Abierta"
  ) {
    
    plazaVacante {
      id_vacante
      empresa {
        id_empresa
        nombre
      }
      titulo_puesto
      descripcion
      fecha_publicacion
      estado
    }
    mensaje
  }
}
mutation {
  deletePlazaVacante(id_vacante: 2) {
    mensaje
  }
}
mutation {
  addAplicacion(
    id_aplicacion: 24,
    id_profesional: 5,
    id_vacante: 35,
    fecha_aplicacion: "2024-08-07",
    estado: "Pendiente"
  ) {
    id_aplicacion
    profesional {
      id_profesional
    }
    vacante {
      id_vacante
    }
    fecha_aplicacion
    estado
  }
}
mutation {
  updateAplicacion(
    id_aplicacion: 1,
    id_profesional: 12,       
    id_vacante: 4,          
    fecha_aplicacion: "2024-08-01", 
    estado: "Aceptada"        
  ) {
    aplicacion {
      id_aplicacion
      profesional {
        id_profesional
        nombre
      }
      vacante {
        id_vacante
        titulo_puesto
      }
      fecha_aplicacion
      estado
    }
    mensaje
  }
}
mutation {
  deleteAplicacion(id_aplicacion: 2) {
    aplicacion {
      id_aplicacion
      profesional {
        id_profesional
        nombre
      }
      vacante {
        id_vacante
        titulo_puesto
      }
      fecha_aplicacion
      estado
    }
    mensaje
  }
}
mutation {
  addRegistroProfesionalProfesion(
    id_registro_profesional_profesion: 24,
    id_profesional: 1,
    id_profesion: 2
  ) {
    id_registro_profesional_profesion
    profesional {
      id_profesional
      nombre
      apellido
    }
    profesion {
      id_profesion
      nombre
    }
  }
}
mutation {
  updateRegistroProfesionalProfesion(
    id_registro_profesional_profesion: 1
    id_profesional: 12
    id_profesion: 4
  ) {
    registroProfesionalProfesion {
      id_registro_profesional_profesion
      profesional {
        id_profesional
        nombre
      }
      profesion {
        id_profesion
        nombre
      }
          
    }
    mensaje
  }
}
mutation {
  deleteRegistroProfesionalProfesion(
    id_registro_profesional_profesion: 2
  ) {
   
    registroProfesionalProfesion {
      id_registro_profesional_profesion
      profesional {
        id_profesional
        nombre
      }
      profesion {
        id_profesion
        nombre
      }
    }
     mensaje
  }
}


