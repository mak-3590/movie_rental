const restify = require('restify');
const mysql      = require('mysql');
const HttpStatus = require('http-status-codes');
const corsMiddleware = require('restify-cors-middleware')
const dotenv = require('dotenv').config()

const ver = "v1";

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB
});
 
connection.connect();

 
const server = restify.createServer({
  name: 'Movie Rental App',
  version: '1.0.0'
});
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ["*"],
  allowHeaders: ['Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization']
})


server.pre(cors.preflight)
server.use(cors.actual)


/*server.use(restify.CORS({          // defaults to false
methods: ['GET','PUT','DELETE','POST','OPTIONS']
}));*/

server.opts('/\.*/', corsHandler, optionsRoute);

server.post('/'+ver+'/movies',addMoviesHandler);
server.get('/'+ver+'/movies',getMoviesHandler);
server.get('/'+ver+'/movie/:id',getMovieHandler);
server.put('/'+ver+'/movie/:id',updateMovieHandler);
server.del('/'+ver+'/movie/:id',deleteMovieHandler);


server.post('/'+ver+'/users',addUsersHandler);
server.get('/'+ver+'/users',getUsersHandler);
server.get('/'+ver+'/user/:id',getUserHandler);

server.post('/'+ver+'/orders',addOrderHandler);
server.get('/'+ver+'/user/:id/orders',getUserOrdersHandler);


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

	
	const user_id = req.params.user_id;
	const movie_id = req.params.movie_id;
	const payment_type = req.params.payment_type;
	const points = req.params.points;
	
	
	try {

	// Add orders to order table

	const orderQuery = "INSERT INTO orders (user_id, movie_id, payment_type) VALUES ('"+user_id+"','"+movie_id+"','"+payment_type+"')";
	const order = await asynqQuery(orderQuery);
	
	// Once the order is placed change the availability (rented = 1)

	const updateAvailQuery = "UPDATE movies SET rented=1 WHERE id="+movie_id;
	const movies = await asynqQuery(updateAvailQuery);

	// Once the order is placed update the points for the user

	const updatePointsQuery = 'UPDATE users SET points="'+points+'" WHERE id="'+user_id+'"';
	const points = await asynqQuery(updatePointsQuery);

	res.send({status:200, orderId: order.insertId });

	}catch(err){
	    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
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
			  res.send({'status':200,data:results,inserted:1});
		});
		

	}else{
	
		res.send({'status':200,data:results,inserted:0});
	
	}

	}catch(err){
	
		    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
	
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
	    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
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
	    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
	}


}



function addMoviesHandler(req, res, next) {

	const name = req.body.name;
	const type = parseInt(req.body.type);
	const rented = parseInt(req.body.rented);

	const query = "INSERT INTO movies (name, type, rented, deleted) VALUES ('"+name+"','"+type+"','"+rented+"', 0 )";
	try {
		connection.query(query, function (error, results, fields) {
			  if (error) throw error;
			  res.send(results)
		});
	}catch(err){
	    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
	}

}

function updateMovieHandler(req, res, next) {

	const name = req.body.name;
	const type = parseInt(req.body.type);
	const id = req.body.id;

	const query = "UPDATE movies SET name='"+name+"', type='"+type+"' WHERE id="+id;

	try {
		connection.query(query, function (error, results, fields) {
			  if (error) throw error;
			  res.send(results)
		});
	}catch(err){
	    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
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
		  res.send({'status':HttpStatus.OK, 'data':results});
		});
	}catch(err){
	    return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message }); // 500
	}
}

function getMovieHandler(req, res, next) {

	const id = req.params.id;
	try {
		connection.query('SELECT * FROM movies WHERE id='+id, function (error, results, fields) {
			  if (error) throw error;
			  res.send({'status':HttpStatus.OK, 'data':results})
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
			  res.send({'status':HttpStatus.OK, 'data':results})
		});

	}catch(err){
		return res.send({ 'status':HttpStatus.INTERNAL_SERVER_ERROR,error: err, message: err.message });
	}

}

function corsHandler(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    return next();
}

function optionsRoute(req, res, next) {
    res.send(200);
    return next();
}

 
server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});


module.exports = server