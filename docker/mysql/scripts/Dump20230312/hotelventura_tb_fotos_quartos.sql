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
-- Table structure for table `tb_fotos_quartos`
--

DROP TABLE IF EXISTS `tb_fotos_quartos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fotos_quartos` (
  `id_foto_quarto` int NOT NULL AUTO_INCREMENT,
  `foto` varchar(45) DEFAULT NULL,
  `fk_id_quarto` int DEFAULT NULL,
  PRIMARY KEY (`id_foto_quarto`),
  KEY `fk_id_quarto_idx` (`fk_id_quarto`),
  CONSTRAINT `fk_id_quarto` FOREIGN KEY (`fk_id_quarto`) REFERENCES `tb_quartos` (`id_quarto`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fotos_quartos`
--

LOCK TABLES `tb_fotos_quartos` WRITE;
/*!40000 ALTER TABLE `tb_fotos_quartos` DISABLE KEYS */;
INSERT INTO `tb_fotos_quartos` VALUES (7,'images/580716d633a26268caf550509.jpg',2),(8,'images/580716d633a26268caf55050a.jpg',2),(9,'images/cf5a0223dee2b885332b47601.jpg',1),(10,'images/cf5a0223dee2b885332b47602.jpg',1),(11,'images/cf5a0223dee2b885332b47604.jpg',10),(12,'images/cf5a0223dee2b885332b47605.jpg',10),(13,'images/cf5a0223dee2b885332b47607.jpg',12),(14,'images/cf5a0223dee2b885332b47608.jpg',12);
/*!40000 ALTER TABLE `tb_fotos_quartos` ENABLE KEYS */;
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
