-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: hotelventura
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_log_reservas`
--

DROP TABLE IF EXISTS `tb_log_reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_log_reservas` (
  `id_log_reserva` int NOT NULL AUTO_INCREMENT,
  `texto_log` varchar(200) NOT NULL,
  `data_registro` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_log_reserva`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_log_reservas`
--

LOCK TABLES `tb_log_reservas` WRITE;
/*!40000 ALTER TABLE `tb_log_reservas` DISABLE KEYS */;
INSERT INTO `tb_log_reservas` VALUES (21,'Reserva de id 574 alterada pelo usuário de nome Admin, id 10','2023-03-08 16:17:50'),(22,'Reserva de id 574 alterada pelo usuário de nome Adminde id 10','2023-03-08 16:18:22'),(23,'Reserva de id 574 alterada pelo usuário de nome Admin de id 10','2023-03-08 16:18:45'),(24,'Reserva de id 582 alterada pelo usuário de nome Teste ok de id 14','2023-03-12 17:57:56'),(25,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 19:45:15'),(26,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 19:46:49'),(27,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 19:48:30'),(28,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 19:49:36'),(29,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 19:50:29'),(30,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 19:56:32'),(31,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 19:58:56'),(32,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:02:33'),(33,'Reserva de id 576 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:03:37'),(34,'Reserva de id 576 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:04:01'),(35,'Reserva de id 576 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:04:35'),(36,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:04:58'),(37,'Reserva de id 576 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:06:33'),(38,'Reserva de id 579 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:07:45'),(39,'Reserva de id 577 alterada pelo usuário de nome Antonio Vin de id 9','2023-03-12 20:08:00');
/*!40000 ALTER TABLE `tb_log_reservas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-12 17:49:33
