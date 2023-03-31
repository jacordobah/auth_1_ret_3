/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world RETO 3' }
})

Route.group(() =>{
  Route.post("/register","AuthController.register");
  Route.post("/login","AuthController.login");
}).prefix('/appfree')

Route.group(() => {
  Route.post("/perfil-register","PerfilsController.setPerfil");
  Route.post("/book-register","BooksController.store");

  Route.get("/users","AuthController.getAllUsers")
  Route.get("/books","BooksController.index");
  Route.get("/show-book/:id","BooksController.show");
  Route.get("/show-profiles","PerfilsController.getAllProfiles");

  Route.put("/user-update","AuthController.update");
  Route.put("/profile-update","PerfilsController.update");
  Route.put("/book-update","BooksController.update");

  Route.delete("/delete-user","AuthController.delete");
  Route.delete("/delete-profile","PerfilsController.delete");

}).prefix('/api').middleware('auth')
