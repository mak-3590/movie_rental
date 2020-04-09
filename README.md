# movies rental

# Tech Stack

 1. Firebase google authentication to authenticate users.
 2. React framework for serving front-end.
 3. Restify API framework.
 4. Mysql DB.

# Firebase

Https://console.Firebase.Google.Com/

Create project

Click authentication on the left section

Setup signin method 

Click google and click enable on top right

Scroll down and add domain if needed

Go to project setting in project overview

Scroll down and click on webapp and register the application

Copy firebaseconfig and update it in {project_root}/client/src/firebase.Js


# Mysql - steps to start mysql container

-> sudo docker run -p 3306:3306 --name mysql -v /var/lib/mysql:/var/lib/mysql -e mysql_root_password=password -d mysql:latest

-> sudo docker exec -it mysql mysql -uroot -p

-> Alter user 'root'@'localhost' identified by 'password';

-> Create user 'mysql'@'%' identified with mysql_native_password by 'password';

-> Grant all privileges on *.* to 'mysql'@'%' with grant option;

-> Flush privileges;

-> sudo docker container ls

{get the container id eg: 3ee4624705f0}
 
Navigate to {dir}/movie_rental/server

-> sudo docker cp movie_rental.Sql 3ee4624705f0:/movie_rental.Sql

-> sudo docker exec -I mysql mysql -uroot -ppassword mysql < movie_rental.sql


# Backend - steps to start backend container

Go to {dir}/movie_rental/server

-> sudo docker build -t movie_rental_backend .

Get ip address of mysql container

-> docker inspect {mysql_container_id} --format='{{range .Networksettings.Networks}}{{.Ipaddress}}{{end}}'
-> sudo docker inspect 3ee4624705f0 --format='{{range .Networksettings.Networks}}{{.Ipaddress}}{{end}}'

Edit .Env file present in {dir}/movie_rental/server/ folder and copy the ipaddress of the mysql container 

-> sudo docker run -d -p 8081:8081 --env-file .Env movie_rental_backend

Backend - http://localhost:8081/v1/movies



# Frontend - steps to start frontend container

Edit .Env file present in {dir}/movie_rental/client/ folder and copy the ipaddress of the host machine with port 8081

-> sudo docker build -t movie_rental_frontend .

-> sudo docker run -it -d -p 3000:3000 movie_rental_client

Access the frontend - http://localhost:3000/

Admin - http://localhost:3000/admin 






