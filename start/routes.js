'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('login').as('login')
Route.get('profile','ProfileController.index').as('profile').middleware(['customAuth'])
Route.post('authenticate','AuthController.login').as('loginAuth')
Route.get('logout','AuthController.logout').as('logout')
Route.post('account/products','ProfileController.getAccountProducts').middleware(['customAuth']).as('products')
Route.post('txn/update/interval','ProfileController.updateTXN').middleware(['customAuth']).as('txn_update')