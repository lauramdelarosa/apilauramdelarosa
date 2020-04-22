'use strict'
const Proyecto = use('App/Models/Proyecto')
const Task = use('App/Models/Tarea')
const AuthorizationService = use('App/Services/AuthorizationService')
class TaskController {

    async index({ auth, params }) {
        const user = await auth.getUser();
        const { id } = params
        const project = await Proyecto.find(id);
        AuthorizationService.verifyPermission(project, user);
        return await project.task().fetch();
    }


    async create({ auth, request, params }) {
        const user = await auth.getUser();
        const { description } = request.all();
        const { id } = params

        const project = await Proyecto.find(id);
        AuthorizationService.verifyPermission(project, user);

        const task = new Task();
        task.fill({
            description
        })
        await project.task().save(task);
        return task;
    }


    async destroy({ auth, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        AuthorizationService.verifyPermission(project, user);
        await task.delete();
        return task;
    }

    async update({ auth, params, request }) {
        const user = await auth.getUser();
        const { id } = params;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        AuthorizationService.verifyPermission(project, user);
        task.merge(request.only([
            'description',
            'completed'
        ]));
        await task.save();
        return task;
    }


}

module.exports = TaskController
