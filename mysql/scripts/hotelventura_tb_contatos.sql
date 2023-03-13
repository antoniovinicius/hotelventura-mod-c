CREATE DATABASE  IF NOT EXISTS `hotelventura` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hotelventura`;
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
-- Table structure for table `tb_contatos`
--

DROP TABLE IF EXISTS `tb_contatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_contatos` (
  `id_contato` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `mensagem` text NOT NULL,
  `data_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contato`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contatos`
--

LOCK TABLES `tb_contatos` WRITE;
/*!40000 ALTER TABLE `tb_contatos` DISABLE KEYS */;
INSERT INTO `tb_contatos` VALUES (3,'Teste','teste@teste.com','teste23134','2022-06-08 23:42:56'),(4,'Antonio','teste@teste.com.br','Opa bão?!!','2022-10-24 16:31:25'),(5,'TEste','teste@teste.com.br','Teste2','2022-12-04 15:07:53'),(7,'aaaaa2','aaaaa2@uau.com','uau','2022-12-10 19:36:48'),(8,'aaaaa2','aaaaa2@uau.com','uau','2022-12-10 19:40:37'),(9,'teste1234','ga@ga.com','ga','2022-12-10 19:41:23'),(10,'teste1644','teste1644@uol.com','teste1644','2022-12-10 19:44:51'),(11,'arg','arg@argentina.com','TEste copa','2022-12-13 19:38:31'),(12,'Adimir','admir@admir.com','OALAR','2022-12-13 19:47:18'),(13,'Huge','huge@huge.com.br','EAI ADEMIR','2022-12-13 19:49:23'),(14,'opa','agora chefge','bao','2022-12-13 19:49:37'),(15,'opa','agora chefge','bao','2022-12-13 19:50:45'),(16,'aaaaaa','aaaaaa@aaa.com.br','asddadasd','2023-01-27 19:42:00'),(17,'a','ab@ab.com','ola','2023-02-25 16:58:30'),(20,'Fulano de Tal','usuario21fulano@fulano.com.br','Testando formulário de contato','2023-02-25 17:34:25'),(21,'Fulano de Tal','fulano@fulano.com.br','Testando formulário de contato','2023-02-25 17:35:28'),(22,'Fulano de Tal','fulano@fulano.com.br','Testando formulário de contato','2023-02-25 17:36:20'),(23,'Fulano de Tal','fulano@fulano.com.br','Testando formulário de contato','2023-02-25 17:37:04'),(24,'Fulano de Tal','fulano@fulano.com.br','Testando formulário de contato','2023-02-25 17:37:22'),(25,'Fulano de Tal','fulano@fulano.com.br','Testando formulário de contato','2023-02-28 15:38:34'),(26,'Teste','teste@teste.com.br','olá','2023-03-01 19:44:42');
/*!40000 ALTER TABLE `tb_contatos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-09  9:05:48
