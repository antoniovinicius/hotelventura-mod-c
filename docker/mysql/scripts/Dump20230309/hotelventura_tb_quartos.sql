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
-- Table structure for table `tb_quartos`
--

DROP TABLE IF EXISTS `tb_quartos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_quartos` (
  `id_quarto` int NOT NULL AUTO_INCREMENT,
  `nome_quarto` varchar(128) NOT NULL,
  `descricao` varchar(512) NOT NULL,
  `tarifa` decimal(10,2) NOT NULL,
  `foto` varchar(256) NOT NULL,
  `data_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `metragem` float DEFAULT NULL,
  `qt_hospedes_quarto` int DEFAULT NULL,
  PRIMARY KEY (`id_quarto`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_quartos`
--

LOCK TABLES `tb_quartos` WRITE;
/*!40000 ALTER TABLE `tb_quartos` DISABLE KEYS */;
INSERT INTO `tb_quartos` VALUES (1,'QUARTO DE SOLTEIRO PADRÃO','Estes quartos de solteiro são tranquilos e confortáveis, e oferecem televisão de tela plana, linha de telefone externa e uma escrivaninha, tornando-se ideais para visitantes a negócios. Desfrute de acesso Wi-Fi gratuito, uma decoração clássica, piso em parquet e banheiro privativo.\r\n1 pessoa.\r\n1 cama de solteiro.',180.00,'images/e7ac9bc94c866260ae9fe8a01.jpg','2018-09-12 16:48:58',27.5,1),(2,'QUARTO DE CASAL PADRÃO','Desfrute de ar condicionado, cama de casal grande e acesso Wi-Fi gratuito. Estes quartos de casal são espaçosos e oferecem bastante luz natural. Oferecem uma decoração moderna e leve, com uma elegante mistura de tons chocolate e bege, piso em parquet e mobília de madeira clássica. 2 pessoas. 1 cama de casal.',250.00,'images/e7ac9bc94c866260ae9fe8a02.jpg','2018-09-12 16:48:58',31.7,2),(10,'QUARTO TRIPLO SUPERIOR','Estes quartos que foram reformados recentemente agora oferecem uma atmosfera aconchegante, com decoração moderna, um elegante piso em parquet e cores neutras. Esses quartos são completos, com acesso Wi-Fi gratuito e TV de tela plana. 3 pessoas. 1 cama de casal e 1 cama de solteiro.',300.00,'images/e7ac9bc94c866260ae9fe8a03.jpg','2022-06-20 20:52:44',42.3,3),(12,'QUARTO MASTER DELUXE','Este é o quarto mais espaçoso e luxuoso do hotel. São 80m² de estrutura moderna para você aproveitar a viagem. Os destaques são seus vários ambientes como: sala de estar, sala de TV, piscina privativa, copa & cozinha, banheiro com hidromassagem e terraço. 2 pessoas. 1 cama de casal.',500.00,'images/e7ac9bc94c866260ae9fe8a06.jpg','2022-06-21 18:11:29',40,2),(19,'Quarto teste 3','Quarto teste 3',350.00,'images/a5c096dfb252761536bd77a01.png','2023-03-07 18:27:08',35.1,3);
/*!40000 ALTER TABLE `tb_quartos` ENABLE KEYS */;
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
