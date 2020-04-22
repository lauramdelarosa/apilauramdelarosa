'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(()=>{
  Route.post('user/register','UserController.store')
  Route.post('user/login','UserController.login')
  //rutas de proyectos
  Route.get('proyectos','ProyectoController.index').middleware('auth');
  Route.post('proyectos','ProyectoController.create').middleware('auth');
  Route.delete('proyectos/:id','ProyectoController.destroy').middleware('auth');
  Route.patch('proyectos/:id','ProyectoController.update').middleware('auth');
  //rutas de tareas
  Route.get('proyectos/:id/task','TaskController.index').middleware('auth');
  Route.post('proyectos/:id/task','TaskController.create').middleware('auth');
  Route.delete('task/:id','TaskController.destroy').middleware('auth');
  Route.patch('task/:id','TaskController.update').middleware('auth');

}).prefix('api/v1/')
