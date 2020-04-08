var expect  = require('chai').expect;
//var supertest = require('supertest');
let server = require('../index');
let chaiHttp = require('chai-http');
let chai = require('chai');
let should = chai.should();
chai.use(chaiHttp);

describe('/POST Movie', () => {
      it('it should POST a movie', (done) => {
        chai.request(server)
            .post('/v1/movies')
            .type('form')
            .set('content-type', 'application/json')	
            .send({name: 'Terminator', type: '1', rented: '0'})
            .end((err, res) => {
            	if (err) {
                    done(err);
                } else {
                    done();
                }
            });
      });
});

describe('/GET Movie', () => {
      it('it should GET a specific movie', (done) => {
        chai.request(server)
            .get('/v1/movie/13')
            .end((err, res) => {

                const respBody = res.body;
            	  expect(respBody.data).to.be.an('array');
        		  expect(respBody.data[0]).to.have.keys(['id', 'name', 'type', 'rented', 'deleted']);
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
});

describe('/PUT Movie', () => {
      it('it should UPDATE a movie', (done) => {
        chai.request(server)
            .put('/v1/movie/13')
            .type('form')
            .set('content-type', 'application/json')
            .send({name: 'Terminator2', type: 1, rented: 0, id: 13})
            .end((err, res) => {
            	if (err) {
                    done(err);
                    console.log(error)
                } else {
                    done();
                }
            });
      });
});

describe('/GET User Orders', () => {
      it('it should GET a specific users Order History', (done) => {
        chai.request(server)
            .get('/v1/user/Anf2QCA9TNhOlwryNvSNoA7n25l2/orders')
            .end((err, res) => {

            	  const respBody = res.body;
            	  expect(respBody).to.be.an('array');
        		  expect(respBody[0]).to.have.keys(['uname', 'email_id', 'order_id', 'payment_type', 'movie_id', 'name', 'type', 'movie_type', 'payment_name']);
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
});

describe('/GET Users', () => {
      it('it should GET all users', (done) => {
        chai.request(server)
            .get('/v1/users')
            .end((err, res) => {

            	  expect(res.statusCode).to.equal(200);
            	  const respBody = res.body;
            	  expect(respBody).to.be.an('array');
        		  expect(respBody[0]).to.have.keys(['id', 'name', 'email_id', 'points']);
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
});


describe('/POST Users', () => {
      it('it should POST a User', (done) => {
        chai.request(server)
            .post('/v1/users')
            .type('form')
            .set('content-type', 'application/json')	
            .send({id:"abc1235657", name: 'Ricky', email_id: 'Ricky@gmail.com', points: 0})
            .end((err, res) => {
            	if (err) {
                    done(err);
                    console.log(error)
                } else {
                	done();
                }
            });
      });
});



