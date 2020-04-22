'use strict'
const Proyecto = use('App/Models/Proyecto')
const AuthorizationService= use('App/Services/AuthorizationService')

class ProyectoController {
    async index({ auth }) {
        const user = await auth.getUser();
        return await user.proyectos().fetch();
    }

    async create({ auth, request }) {
        const user = await auth.getUser();
        const { name } = request.all();
        const project = new Proyecto();
        project.fill({
            name
        })
        await user.proyectos().save(project);
        return project;
    }

    async destroy({ auth, response, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Proyecto.find(id);
        AuthorizationService.verifyPermission(project, user);
        await project.delete();
        return project;
    }

    async update({ auth, params, request }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Proyecto.find(id);
        AuthorizationService.verifyPermission(project, user);
        project.merge(request.only('name'));
        await project.save();
        return project;
    }
}

module.exports = ProyectoController
