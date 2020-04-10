# Video Rental Store

## Tech Stack

 1. Firebase google authentication to authenticate users.
 2. React framework for serving front-end.
 3. Restify NodeJSframework.
 4. Mysql DB.

## Firebase

https://console.firebase.google.com/

- Create project
- Click authentication on the left section
- Setup signin method 
- Click google and click enable on top right
- Scroll down and add domain if needed
- Go to project setting in project overview
- Scroll down and click on webapp and register the application
- Copy firebaseconfig and update it in {project_root}/client/src/firebase.js


## Starting the project

- Install docker
- Install docker-compose tool https://docs.docker.com/compose/install/
- Make sure "movie_rental/client/.env" has the backend(API server host)
- sudo docker-compose up -d
- sudo docker ps -a (Make sure 3 containers are running)
 Go to "movie_rental/server/" and execute 
- sudo docker cp movie_rental.sql mysql:/movie_rental.sql
- sudo docker exec -i mysql mysql -uroot -ppassword mysql < movie_rental.sql

## Accessing Backend (API)

http://localhost:8081/v1/movies

## Accessing Frontend

- http://localhost:3000/
- http://localhost:3000/admin (Admin Panel)






