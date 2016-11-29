'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

//Route.on('/').render('welcome')
Route.get('/', 'BlogController.index')
Route.get('/blog/new', 'BlogController.writeNewBlog').middleware('auth')
Route.post('/blog/new', 'BlogController.saveBlog').middleware('auth')
Route.get('/blog/:id', 'BlogController.show')
Route.post('/blog/:id', 'CommentController.create').middleware('auth')
Route.get('/blog/:id/comment/:cid/delete', 'CommentController.delete').middleware('auth')
Route.get('/blog/:id/edit', 'BlogController.edit').middleware('auth')
Route.post('/blog/:id/edit', 'BlogController.doEdit').middleware('auth')
Route.get('/blog/:id/delete', 'BlogController.doDelete').middleware('auth')
Route.get('/blog', 'BlogController.search')

Route.get('/user', 'BlogController.searchUser')
Route.get('/user/:id', 'BlogController.showUser')

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')