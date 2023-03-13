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
-- Table structure for table `tb_usuarios`
--

DROP TABLE IF EXISTS `tb_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `senha` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `data_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo_usuario` varchar(256) NOT NULL,
  `hash` varchar(256) DEFAULT NULL,
  `salt` varchar(256) DEFAULT NULL,
  `provider` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuarios`
--

LOCK TABLES `tb_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` VALUES (4,'antonio vin','antvinicius@gmail.com','12345','2022-06-08 22:51:10','Administrador',NULL,NULL,NULL),(5,'Admin','admin@admin.com','1234','2022-07-13 13:55:04','Administrador',NULL,NULL,NULL),(6,'Tadmin','tadmin@tadmin.com','1234','2023-02-18 14:29:15','Atendente',NULL,NULL,NULL),(7,'heheh','heheh@heheh.com.br','55555','2023-02-18 14:39:59','Usuario',NULL,NULL,NULL),(8,'Atend','atend@atend.com.br','55555','2023-02-18 14:41:17','Atendente',NULL,NULL,NULL),(9,'Antonio Vin','antoniouser@gmail.com',NULL,'2023-03-08 13:18:53','Usuario','94a4ff4bc4f55c4e63a84e02b62436f972c4e570b7d43dbf700821cc96bee8ba4967a276ff1420a8d95cfc79b18cbc95c7132f0ee4773caafe65406d','f78f7c5360337cdc41444a6f921bb71889ff03f6c78342239409b0ef8bae8cfa',NULL),(10,'Admin','admin@admin.com.br',NULL,'2023-03-08 13:21:31','Administrador','e2745bb9082a5dddb53bf98cf2d5d6aee998e055e912edc874f552afacc2f64e6653da1b6860733eb77f2e153b239cf1f77ae1022a2e947c76ee820c','7f24f33ef74ba7f687a97dc8d69a6a3f82deb1d984e0c61779e14d9efa526905',NULL),(11,'teste5','teste5@teste5.com.br',NULL,'2023-03-08 23:34:53','Usuario','bec11668b5c4684fcd659977b3c7ac935d94a65abf5569371f2b14d3056b27428f0a70edd3aa389ff8ef94566c36c4c8045a20e98361f0210048ceaa','08b318cb415b92f13b83b23065cea0136f169b1104f9976a30d0ac009cc6fe23',NULL);
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;
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
