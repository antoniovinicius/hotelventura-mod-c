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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuarios`
--

LOCK TABLES `tb_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` VALUES (4,'antonio vin','antvinicius@gmail.com','12345','2022-06-08 22:51:10','Administrador',NULL,NULL,NULL),(5,'Admin','admin@admin.com','1234','2022-07-13 13:55:04','Administrador',NULL,NULL,NULL),(6,'Tadmin','tadmin@tadmin.com','1234','2023-02-18 14:29:15','Atendente',NULL,NULL,NULL),(7,'heheh','heheh@heheh.com.br','55555','2023-02-18 14:39:59','Usuario',NULL,NULL,NULL),(8,'Atend','atend@atend.com.br','55555','2023-02-18 14:41:17','Atendente',NULL,NULL,NULL),(9,'Antonio Vin','antoniouser@gmail.com',NULL,'2023-03-08 13:18:53','Usuario','94a4ff4bc4f55c4e63a84e02b62436f972c4e570b7d43dbf700821cc96bee8ba4967a276ff1420a8d95cfc79b18cbc95c7132f0ee4773caafe65406d','f78f7c5360337cdc41444a6f921bb71889ff03f6c78342239409b0ef8bae8cfa',NULL),(10,'Admin','admin@admin.com.br',NULL,'2023-03-08 13:21:31','Administrador','e2745bb9082a5dddb53bf98cf2d5d6aee998e055e912edc874f552afacc2f64e6653da1b6860733eb77f2e153b239cf1f77ae1022a2e947c76ee820c','7f24f33ef74ba7f687a97dc8d69a6a3f82deb1d984e0c61779e14d9efa526905',NULL),(11,'teste5','teste5@teste5.com.br',NULL,'2023-03-08 23:34:53','Usuario','bec11668b5c4684fcd659977b3c7ac935d94a65abf5569371f2b14d3056b27428f0a70edd3aa389ff8ef94566c36c4c8045a20e98361f0210048ceaa','08b318cb415b92f13b83b23065cea0136f169b1104f9976a30d0ac009cc6fe23',NULL),(12,'Antonio','incantonio9@gmail.com',NULL,'2023-03-11 17:13:37','Usuario',NULL,NULL,'GOOGLE'),(13,'aaaa','aaaa',NULL,'2023-03-12 13:49:41','Usuario','532afda94e4377d4bb3d1b76cfa844e32e4187093c38b88128f3e507ee18b2748b6ee59d642d91ee9cf391c9fbbd53b2b95ccc4d12eb90bc6e4db21e','7fa103001e2cd0223e36c8d8a06b2d83f50c5f640bd0ee0198fd0714af2f076d',NULL),(14,'Teste ok','testeok@teste.com.br',NULL,'2023-03-12 14:53:05','Usuario','7ce227e14274a73592fb45686175e3ff69aff5d9da92d1bbad8bc40a501649c3276cf6a036ebc62ab50df1928828b294471933b2f27d0c75261f10c3','23106e9744c41d760d8861416f010fb4223d0bf25097bb967273b581be6abe24',NULL),(15,'aaaa','aaa@aaa.com.br',NULL,'2023-03-12 15:03:38','Usuario','356827fd29f6b47fa9620718b8643c3e26b2681edf830a85da8192ec320ae2963e661dae9a3b7fc78f677b0b53fd76784e9a3fe307da6bc666d955de','48f1f0b227bab9829540c5d37e90fda50a8d61d2c2ecf095acbdf0852434bdb1',NULL),(16,'Atendente','atendente@atendente.com.br',NULL,'2023-03-12 20:27:02','Atendente','d655146fef2bd5a849e5db02cbe9f576c8c139d22b2d9a15faa85ee23736c12848364c4271a6e0a1397222b2fc4965673aaf75125094071b1f20ed02','5082030fae1cb4df2d63f5edad4b7e78d7518a6d3f53f5f08f6e166b141921e1',NULL);
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

-- Dump completed on 2023-03-12 17:49:33
