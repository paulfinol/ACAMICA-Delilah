# Delilah Restaurant API

Delilah is an API to connect with food delivery service, it lets you create an order and set up a cart with dishes from a restaurant.
it offers the following end points:
  * user signin (admin and regular) (/signin)
  * all operations allowed for regular users like create user or add dish to menu (/user)
  * all operation allowed for admin to create menu (/mgmtplatos)
  * all operation allowed for admin to create order (/mgmtOrder)
 * all operation allowed for admin to create users (/mgmtUser)

## Installation

* use the index.js file in the routes folder shows all the root endpoints
 * each file shows specific folder for the task chosen.

## File Structure

* app folder: all the sequelize models mapped to databse
* controller folder:all tasks performed by each endpoint
* database folder : the connection to the datadase using sequlize
* public folder: 
 * authentication fucntions used to check admin user, passwords and token
 * keys to database and master key for JWT
* routes folder: all endpoints and index router
* SQL folder: queries for database creation


## Usage
1.
 * install database with db.sql file in the SQL folder.
 * create your first user with endpoint ./user/signup.
 * Change manually the admin property for this user in the database.
 * start adding dishes to the menu using endpoint ./mgmtplatos/add.
 * regular user can sign up using endpoint ./user/signup.
 * admin and regular user can sign in using endopoint /signin.
2.
 * regular user can check own user data using endpoint ./user/search/#username.
 * regular user can check dishes in the menu using endpoint ./user/search.
 * regular user can make an order using endpoint ./user/addOrder.
3.
 * admin user can add, update, search and remove dishes in the menu with endpoint /mgmtplatos.
 * admin user can add, update, search and remove orders with endpoint /mgmtOrder.
 * admin user can add, update, search and remove users with endpoint /mgmtUser.

 * read documentation file for more information

## Condiciones para aprobar

  1 Poder registrar un nuevo usuario.
  * POST --- 127.0.0.1:3000/user/signup
  * body--- {"username":"username3","name":"name3","email":"email3@gmail.com","mobile":"1234567893","address":"address3","passwordHash":"a3SDsdf47"}
  
  2  Un usuario debe poder listar todos los productos disponibles.
  * GET --- 127.0.0.1:3000/user/search
  
  3 Un usuario debe poder generar un nuevo pedido al Restaurante con un listado de platos que desea.
  * POST --- 127.0.0.1:3000/user/addOrder
  * body--- {"platosData":{"platoTitle1": "cazon","platoTitle2": "platano"},"orderData":{"totalPrice": 4564, "payType": "efectivo"}}
  
  4 El usuario con roles de administrador debe poder actualizar el estado del pedido.
  * PATCH ---127.0.0.1:3000/mgmtOrder/updtOrder/14
  * body --- {"status": "PREPARANDO"}
  
  5 Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).
  * POST --- 127.0.0.1:3000/mgmtplatos/add
  * body --- {"platoTitle":"pizza","platoPrice":"345435"}
  * PATCH --- 127.0.0.1:3000/mgmtPlatos/update/pizza
  * bpdy --- {"platoPrice": "234"}
  GET --- 127.0.0.1:3000/mgmtplatos/search
  DELETE --- 127.0.0.1:3000/mgmtPlatos/rmv/pizza
  
  6 Un usuario sin roles de administrador no debe poder crear, editar o eliminar un producto, ni editar o eliminar un pedido.Tampoco debe poder acceder a informaciones de otros usuarios.
  * despues de loguearse se puede hacer el cambio manual en la base de datos para ser admin o usando endpoint update user ya que por defecto el usuario no es admin (admin:0)
  * POST 127.0.0.1:3000/signin/
  * body --- {"username": "username3","passwordHash": "a3SDsdf47"}
  * response --- {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lMyIsImlhdCI6MTU5MzY1MTczMn0.pdsIo2xLy-0l_dlres5PiAOMLccf_QwEShAVT92_hpE"}
  
  * PATCH --- 127.0.0.1:3000/mgmtUser/update/username7
  * boyd --- {"admin": "1"}
  
