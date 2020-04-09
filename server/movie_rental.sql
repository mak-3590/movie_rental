
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `movie_rental` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `movie_rental`;
DROP TABLE IF EXISTS `movie_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `price` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `movie_types` WRITE;
/*!40000 ALTER TABLE `movie_types` DISABLE KEYS */;
INSERT INTO `movie_types` VALUES (1,'New Releases',40),(2,'Regular Films',30),(3,'Old Films',30);
/*!40000 ALTER TABLE `movie_types` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `type` int NOT NULL DEFAULT '1',
  `rented` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`type`) REFERENCES `movie_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (2,'Harry Potter 5',1,1,1),(3,'Harry Potter 3',2,1,0),(4,'Dream Boy 1',1,1,1),(5,'Dream Boy 2',1,0,1),(6,'Harry Potter 4',2,1,0),(7,'Die-Hard 1',1,1,1),(9,'Basha',3,1,0),(10,'Padayapp',3,1,0),(11,'MIB 1',3,1,0),(12,'Aram',3,1,0),(13,'Terminator2',1,0,0),(14,'Sattire',2,1,0),(15,'OMG Kadavula',1,1,0),(16,'Chapak',1,0,0),(17,'Tanhaji',1,0,0),(18,'Test1',1,1,0),(19,'Test2',1,1,0),(20,'Test3',1,1,0),(21,'Test4',1,1,0),(22,'Test5',1,1,0),(23,'Test6',1,1,0),(24,'Test7',1,1,0),(25,'Test8',1,1,0),(26,'Test9',1,1,0),(27,'Test10',1,1,0),(28,'undefined',1,1,0),(29,'Die hard 3',1,0,0),(30,'Terminator',1,1,0),(31,'Die hard 3',1,1,0),(32,'Terminator',1,1,0),(33,'Terminator',1,1,0),(34,'Terminator',1,1,0),(35,'Terminator',1,1,0),(36,'Breathe 1',2,0,0),(37,'Breathe 2',3,1,0),(38,'Terminator',1,0,0),(39,'Terminator',1,0,0),(40,'Terminator',1,0,0),(41,'Terminator',1,0,0);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(300) NOT NULL DEFAULT '',
  `movie_id` int NOT NULL,
  `payment_type` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_type` (`payment_type`),
  KEY `user_id` (`user_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`payment_type`) REFERENCES `payment_types` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'a1234',4,1),(2,'a1234',4,1),(3,'a1234',4,1),(4,'a1234',4,1),(5,'a1234',4,1),(6,'a1234',4,1),(7,'a1234',4,1),(8,'a1234',4,1),(9,'a1234',4,1),(10,'a1234',4,1),(11,'a1234',4,1),(12,'a1234',4,1),(13,'a1234',4,1),(14,'a1234',4,1),(15,'a1234',4,1),(16,'a1234',4,1),(17,'a1234',4,1),(18,'a1234',4,1),(19,'a1234',4,1),(20,'a1234',4,1),(21,'a1234',4,1),(22,'a1234',4,1),(23,'a1234',4,1),(24,'a1234',4,1),(25,'a1234',4,1),(26,'a1234',4,1),(27,'a1234',4,1),(28,'a1234',4,1),(29,'a1234',2,2),(30,'a1234',3,1),(31,'a1234',5,2),(32,'a1234',5,1),(33,'a1234',5,1),(34,'a1234',7,1),(35,'a1234',5,1),(36,'a1234',5,1),(37,'a1234',6,2),(38,'Anf2QCA9TNhOlwryNvSNoA7n25l2',2,1),(39,'Anf2QCA9TNhOlwryNvSNoA7n25l2',12,1),(40,'Anf2QCA9TNhOlwryNvSNoA7n25l2',11,1),(41,'Anf2QCA9TNhOlwryNvSNoA7n25l2',10,1),(42,'Anf2QCA9TNhOlwryNvSNoA7n25l2',9,1),(43,'Anf2QCA9TNhOlwryNvSNoA7n25l2',14,1),(44,'Anf2QCA9TNhOlwryNvSNoA7n25l2',6,1),(45,'Anf2QCA9TNhOlwryNvSNoA7n25l2',18,1),(46,'Anf2QCA9TNhOlwryNvSNoA7n25l2',19,1),(47,'Anf2QCA9TNhOlwryNvSNoA7n25l2',20,1),(48,'Anf2QCA9TNhOlwryNvSNoA7n25l2',20,1),(49,'Anf2QCA9TNhOlwryNvSNoA7n25l2',21,1),(50,'Anf2QCA9TNhOlwryNvSNoA7n25l2',22,1),(51,'Anf2QCA9TNhOlwryNvSNoA7n25l2',23,1),(52,'Anf2QCA9TNhOlwryNvSNoA7n25l2',23,1),(53,'Anf2QCA9TNhOlwryNvSNoA7n25l2',24,1),(54,'Anf2QCA9TNhOlwryNvSNoA7n25l2',25,2),(55,'Anf2QCA9TNhOlwryNvSNoA7n25l2',26,1),(56,'Anf2QCA9TNhOlwryNvSNoA7n25l2',27,1),(57,'Anf2QCA9TNhOlwryNvSNoA7n25l2',27,1),(58,'Anf2QCA9TNhOlwryNvSNoA7n25l2',3,1),(59,'Anf2QCA9TNhOlwryNvSNoA7n25l2',28,1),(60,'Anf2QCA9TNhOlwryNvSNoA7n25l2',35,1),(61,'Anf2QCA9TNhOlwryNvSNoA7n25l2',34,1),(62,'Anf2QCA9TNhOlwryNvSNoA7n25l2',32,1),(63,'Anf2QCA9TNhOlwryNvSNoA7n25l2',33,1),(64,'Anf2QCA9TNhOlwryNvSNoA7n25l2',30,1),(65,'Anf2QCA9TNhOlwryNvSNoA7n25l2',15,1),(66,'Anf2QCA9TNhOlwryNvSNoA7n25l2',7,1),(67,'Anf2QCA9TNhOlwryNvSNoA7n25l2',31,1),(68,'Anf2QCA9TNhOlwryNvSNoA7n25l2',4,1),(69,'Anf2QCA9TNhOlwryNvSNoA7n25l2',37,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `payment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
INSERT INTO `payment_types` VALUES (1,'Cash'),(2,'Points');
/*!40000 ALTER TABLE `payment_types` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(300) NOT NULL DEFAULT '',
  `name` varchar(200) NOT NULL DEFAULT '',
  `email_id` varchar(200) NOT NULL DEFAULT '',
  `points` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('a1232','Magesh','mageshchandru35@gmail.com',0),('a1234','Magesh Kumar','mageshchandru35@gmail.com',4),('abc123','Ricky','Ricky@gmail.com',0),('abc1235657','Ricky','Ricky@gmail.com',0),('Anf2QCA9TNhOlwryNvSNoA7n25l2','Magesh Kumar','mageshchandru35@gmail.com',30),('b432','Nandini','nandiniraman16@gmail.com',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

