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


