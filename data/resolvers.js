import db from "./_db.js";

const resolvers = {
    Query: {
        usuarios: () => db.usuarios,
        usuario: (_, { id }) => db.usuarios.find((usuario) => usuario.id === id),
        profesiones: () => db.profesiones,
        profesion: (_, { id }) => db.profesiones.find((profesion) => profesion.id === id),
        perfilesBuscadores: () => db.perfilesBuscadores,
        perfilBuscador: (_, { id }) => db.perfilesBuscadores.find((perfilBuscador) => perfilBuscador.id === id),
        ofertas: () => db.ofertas,
        oferta: (_, { id }) => db.ofertas.find((oferta) => oferta.id === id),
        aplicaciones: () => db.aplicaciones,
        aplicacion: (_, { id }) => db.aplicaciones.find((aplicacion) => aplicacion.id === id),
    },
    Usuario: {
        address: (usuario) => db.addresses.find((address) => address.id === usuario.addressId),
        companyDetails: (usuario) => db.companyDetails.find((companyDetails) => companyDetails.id === usuario.companyDetailsId),
    },
    PerfilBuscador: {
        user: (perfilBuscador) => db.usuarios.find((usuario) => usuario.id === perfilBuscador.userId),
        professions: (perfilBuscador) => db.professions.filter((profesion) => perfilBuscador.professionsIds.includes(profesion.id)),
        education: (perfilBuscador) => db.educations.filter((education) => perfilBuscador.educationIds.includes(education.id)),
        experience: (perfilBuscador) => db.experiences.filter((experience) => perfilBuscador.experienceIds.includes(experience.id)),
    },
    Oferta: {
        employer: (oferta) => db.usuarios.find((usuario) => usuario.id === oferta.employerId),
        profession: (oferta) => db.professions.find((profesion) => profesion.id === oferta.professionId),
    },
    Aplicacion: {
        jobSeeker: (aplicacion) => db.usuarios.find((usuario) => usuario.id === aplicacion.jobSeekerId),
        jobListing: (aplicacion) => db.ofertas.find((oferta) => oferta.id === aplicacion.jobListingId),
    },
    Mutation: {
        createUsuario: (_, { input }) => {
            const newUsuario = {
                id: String(db.usuarios.length + 1),
                ...input,
            };
            db.usuarios.push(newUsuario);
            return newUsuario;
        },
        updateUsuario: (_, { id, input }) => {
            const usuario = db.usuarios.find((usuario) => usuario.id === id);
            if (!usuario) {
                throw new Error("Usuario not found");
            }
            Object.assign(usuario, input);
            return usuario;
        },
        deleteUsuario: (_, { id }) => {
            const index = db.usuarios.findIndex((usuario) => usuario.id === id);
            if (index === -1) {
                throw new Error("Usuario not found");
            }
            const [usuario] = db.usuarios.splice(index, 1);
            return usuario;
        },
        createProfesion: (_, { input }) => {
            const newProfesion = {
                id: String(db.professions.length + 1),
                ...input,
            };
            db.professions.push(newProfesion);
            return newProfesion;
        },
        updateProfesion: (_, { id, input }) => {
            const profesion = db.professions.find((profesion) => profesion.id === id);
            if (!profesion) {
                throw new Error("Profesion not found");
            }
            Object.assign(profesion, input);
            return profesion;
        },
        deleteProfesion: (_, { id }) => {
            const index = db.professions.findIndex((profesion) => profesion.id === id);
            if (index === -1) {
                throw new Error("Profesion not found");
            }
            const [profesion] = db.professions.splice(index, 1);
            return profesion;
        },
        createPerfilBuscador: (_, { input }) => {
            const newPerfilBuscador = {
                id: String(db.perfilesBuscadores.length + 1),
                ...input,
            };
            db.perfilesBuscadores.push(newPerfilBuscador);
            return newPerfilBuscador;
        },
        updatePerfilBuscador: (_, { id, input }) => {
            const perfilBuscador = db.perfilesBuscadores.find((perfilBuscador) => perfilBuscador.id === id);
            if (!perfilBuscador) {
                throw new Error("PerfilBuscador not found");
            }
            Object.assign(perfilBuscador, input);
            return perfilBuscador;
        },
        deletePerfilBuscador: (_, { id }) => {
            const index = db.perfilesBuscadores.findIndex((perfilBuscador) => perfilBuscador.id === id);
            if (index === -1) {
                throw new Error("PerfilBuscador not found");
            }
            const [perfilBuscador] = db.perfilesBuscadores.splice(index, 1);
            return perfilBuscador;
        },
        createOferta: (_, { input }) => {
            const newOferta = {
                id: String(db.ofertas.length + 1),
                ...input,
            };
            db.ofertas.push(newOferta);
            return newOferta;
        },
        updateOferta: (_, { id, input }) => {
            const oferta = db.ofertas.find((oferta) => oferta.id === id);
            if (!oferta) {
                throw new Error("Oferta not found");
            }
            Object.assign(oferta, input);
            return oferta;
        },
        deleteOferta: (_, { id }) => {
            const index = db.ofertas.findIndex((oferta) => oferta.id === id);
            if (index === -1) {
                throw new Error("Oferta not found");
            }
            const [oferta] = db.ofertas.splice(index, 1);
            return oferta;
        },
        createAplicacion: (_, { input }) => {
            const newAplicacion = {
                id: String(db.aplicaciones.length + 1),
                ...input,
            };
            db.aplicaciones.push(newAplicacion);
            return newAplicacion;
        },
        updateAplicacion: (_, { id, input }) => {
            const aplicacion = db.aplicaciones.find((aplicacion) => aplicacion.id === id);
            if (!aplicacion) {
                throw new Error("Aplicacion not found");
            }
            Object.assign(aplicacion, input);
            return aplicacion;
        },
        deleteAplicacion: (_, { id }) => {
            const index = db.aplicaciones.findIndex((aplicacion) => aplicacion.id === id);
            if (index === -1) {
                throw new Error("Aplicacion not found");
            }
            const [aplicacion] = db.aplicaciones.splice(index, 1);
            return aplicacion;
        },
    },
};