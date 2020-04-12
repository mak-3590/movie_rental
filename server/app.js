const express = require("express");
const path = require("path");
const mysql      = require('mysql');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');
const HttpStatus = require('http-status-codes');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB
  });

connection.connect();



const server = express();
const port = process.env.PORT || "8081";

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(bodyParser.json());
server.use(cors());

server.set('base', '/v1');

server.options('*', cors())

server.use("/docs", swaggerUi.serve);
server.get("/docs", swaggerUi.setup(swaggerDocument));

/* Movies */
server.post('/movies',addMoviesHandler);
server.get('/movies',getMoviesHandler);
server.get('/movie/:id',getMovieHandler);
server.put('/movie/:id',updateMovieHandler);
server.delete('/movie/:id',deleteMovieHandler);
/* Movies */

/* Users */
server.post('/users',addUsersHandler);
server.get('/users',getUsersHandler);
server.get('/user/:id',getUserHandler);
/* Users */

/* Orders */
server.post('/orders',addOrderHandler);
server.get('/user/:id/orders',getUserOrdersHandler);
/* Orders */

function getUserOrdersHandler(req, res, next) {
	
	const id = req.params.id;
	const query = "SELECT u.name AS uname,u.email_id, o.id AS order_id,o.payment_type, m.id AS movie_id,m.name,m.type,mt.name AS movie_type,pt.name AS payment_name FROM users u INNER JOIN orders o on o.user_id = u.id INNER JOIN payment_types pt on o.payment_type = pt.id INNER JOIN movies m on m.id = o.movie_id INNER JOIN movie_types mt on m.type = mt.id WHERE u.id = '"+id+"' ORDER BY o.id DESC";
	
	try {
		connection.query(query, function (error, results, fields) {
		  if (error) throw error;
		  res.send(results)
		});
	}catch(err){
	    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
	}

}



function asynqQuery(query, params) {
    return new Promise((resolve, reject) =>{
        connection.query(query, params, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
    });

}

async function addOrderHandler(req, res, next) {

	
	const user_id = req.body.user_id;
	const movie_id = req.body.movie_id;
	const payment_type = req.body.payment_type;
	const points = req.body.points;
	
	
	try {

	// Add orders to order table

	const orderQuery = "INSERT INTO orders (user_id, movie_id, payment_type) VALUES ('"+user_id+"','"+movie_id+"','"+payment_type+"')";
	const order = await asynqQuery(orderQuery);
	
	// Once the order is placed change the availability (rented = 1)

	const updateAvailQuery = "UPDATE movies SET rented=1 WHERE id="+movie_id;
	const movies = await asynqQuery(updateAvailQuery);

	// Once the order is placed update the points for the user

	const updatePointsQuery = 'UPDATE users SET points="'+points+'" WHERE id="'+user_id+'"';
	const pointsData = await asynqQuery(updatePointsQuery);

	res.send({status: HttpStatus.OK, orderId: order.insertId });

	}catch(err){
	    return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
	}

}

async function addUsersHandler(req, res, next) {

	const id = req.body.id;
	const name = req.body.name;
	const email_id = req.body.email_id;
	
	try {

	const results = await asynqQuery("SELECT * FROM users WHERE id='"+id+"'");

	if(results.length === 0){
		const query = "INSERT INTO users (id, name, email_id) VALUES ('"+id+"','"+name+"','"+email_id+"')";
		connection.query(query, function (error, results, fields) {
			  if (error) throw error;
			  res.send({status: HttpStatus.OK, inserted:1, message: "Created a user."});
		});

	}else{
  
    res.send({status: HttpStatus.OK, inserted: 0, message: "User already exists"});
	}

	}catch(err){
		    return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err, message: err.message }); // 500
	}
}


function getUsersHandler(req, res, next) {

	const query = "SELECT * FROM users";
	try {
		connection.query(query, function (error, results, fields) {
		  if (error) throw error;
		  res.send(results)
		});
	}catch(err){
	    return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err, message: err.message }); // 500
	}

}

function getUserHandler(req, res, next) {
	
  const id = req.params.id;

	try {

	connection.query('SELECT * FROM users WHERE id="'+id+'"', function (error, results, fields) {
      if (error) throw error;
		  res.send(results)
		});
	}catch(err){
	    return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err, message: err.message }); // 500
	}


}



function addMoviesHandler(req, res, next) {

  
	const name = req.body.name;
	const type = parseInt(req.body.type);

	const query = "INSERT INTO movies (name, type, rented, deleted) VALUES ('"+name+"','"+type+"',0, 0 )";
	try {
		connection.query(query, function (error, results, fields) {
			  if (error) throw error;
			  res.send({status:HttpStatus.OK})
		});
	}catch(err){
	    return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err, message: err.message }); // 500
	}

}

function updateMovieHandler(req, res, next) {

	const name = req.body.name;
  const type = parseInt(req.body.type);
	const id = parseInt(req.params.id);

	const query = "UPDATE movies SET name='"+name+"', type='"+type+"' WHERE id="+id;

	try {
		connection.query(query, function (error, results, fields) {
			  if (error) throw error;
			  res.send({ status: HttpStatus.OK, message: "Movie updated successfully"});
		});
	}catch(err){
	    return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err, message: err.message }); // 500
	}

}


function getMoviesHandler(req, res, next) {

	let query = "SELECT movies.name AS movie_name,movies.id,movies.type,movies.rented,movie_types.name AS mtype_name,movie_types.price FROM movies INNER JOIN movie_types ON movies.type = movie_types.id WHERE movies.deleted=0 ORDER BY movies.id DESC";

	if(req.query.rented){
		query = "SELECT movies.name AS movie_name,movies.id,movies.type,movies.rented,movie_types.name AS mtype_name,movie_types.price FROM movies INNER JOIN movie_types ON movies.type = movie_types.id WHERE movies.deleted=0 AND movies.rented="+req.query.rented+" ORDER BY movies.id DESC";
	}

	try {
	connection.query(query, function (error, results, fields) {
		  if (error) throw error;
		  res.send({ status: HttpStatus.OK, data: results});
		});
	}catch(err){
	    return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err, message: err.message }); // 500
	}
}

function getMovieHandler(req, res, next) {

	const id = req.params.id;
	try {
		connection.query('SELECT * FROM movies WHERE id='+id, function (error, results, fields) {
			  if (error) throw error;
			  res.send({ status: HttpStatus.OK, data: results})
		});
	}catch(err){
		return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message });
	}

}

function deleteMovieHandler(req, res, next) {

	const id = req.params.id;
	try {
		connection.query('UPDATE movies SET deleted=1 WHERE id='+id, function (error, results, fields) {
			  if (error) throw error;
			  res.send({ status: HttpStatus.OK, data: results, message: "Movie deleted successfully"})
		});

	}catch(err){
		return res.send({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err, message: err.message });
	}

}




server.listen(port, () => {
console.log(`Listening to requests on http://localhost:${port}`);
});