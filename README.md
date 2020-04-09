# MOVIES RENTAL

# FIREBASE

I HAVE USED FIREBASE FOR AUTHENTICATION. 

https://console.firebase.google.com/

CREATE PROJECT

CLICK AUTHENTICATION ON THE LEFT SECTION

SETUP SIGNIN METHOD 

CLICK GOOGLE AND CLICK ENABLE ON TOP RIGHT

SCROLL DOWN AND ADD DOMAIN IF NEEDED

GO TO PROJECT SETTING IN PROJECT OVERVIEW

SCROLL DOWN AND CLICK ON WEBAPP AND REGISTER THE APPLICATION

COPY firebaseConfig AND UPDATE IT IN {PROJECT_ROOT}/client/src/Firebase.js


# MYSQL - STEPS TO START MYSQL CONTAINER

sudo docker run -p 3306:3306 --name mysql -v /var/lib/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -d mysql:latest

sudo docker exec -it mysql mysql -uroot -p

ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';

CREATE USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

sudo docker container ls

{GET THE CONTAINER ID eg: 3ee4624705f0}
 
NAVIGATE TO {DIR}/movie_rental/server

sudo docker cp movie_rental.sql 3ee4624705f0:/movie_rental.sql

sudo docker exec -i mysql mysql -uroot -ppassword mysql < movie_rental.sql


# BACKEND - STEPS TO START BACKEND CONTAINER

{DIR}/movie_rental/server

sudo docker build -t movie_rental_backend .

GET IP ADDRESS OF MYSQL CONTAINER

docker inspect {MYSQL_CONTAINER_ID} --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
sudo docker inspect 3ee4624705f0 --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'

EDIT .env FILE PRESENT IN {DIR}/movie_rental/server/ folder AND COPY THE IPADDRESS OF THE MYSQL CONTAINER 

sudo docker run -d -p 8081:8081 --env-file .env movie_rental_backend



# FRONTEND - STEPS TO START FRONTEND CONTAINER

EDIT .env FILE PRESENT IN {DIR}/movie_rental/client/ folder AND COPY THE IPADDRESS OF THE HOST MACHINE WITH PORT 8081

sudo docker build -t movie_rental_frontend .

sudo docker run -it -d -p 3000:3000 movie_rental_client

ACCESS THE FRONTEND - http://{IPADDRESS OR LOCALHOST}:3000/

ADMIN - http://{IPADDRESS OR LOCALHOST}:3000/admin [ Movies can added, deleted and edited ]






