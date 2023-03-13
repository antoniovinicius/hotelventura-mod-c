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
-- Table structure for table `tb_reservas`
--

DROP TABLE IF EXISTS `tb_reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `qt_hospedes` int NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `data_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_id_quarto` int DEFAULT NULL,
  `status_reserva` varchar(64) DEFAULT NULL,
  `qt_diarias` int DEFAULT NULL,
  `vlr_tot_reserva` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `fk_id_quartos_idx` (`fk_id_quarto`),
  CONSTRAINT `fk_id_quartos` FOREIGN KEY (`fk_id_quarto`) REFERENCES `tb_quartos` (`id_quarto`)
) ENGINE=InnoDB AUTO_INCREMENT=568 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_reservas`
--

LOCK TABLES `tb_reservas` WRITE;
/*!40000 ALTER TABLE `tb_reservas` DISABLE KEYS */;
INSERT INTO `tb_reservas` VALUES (511,'Teste','teste@teste.com.br',4,'2022-07-07','2022-07-21','2022-07-06 22:37:43',NULL,NULL,NULL,NULL),(512,'Teste','teste@teste.com.br',2,'2022-07-08','2022-07-21','2022-07-06 22:42:43',NULL,NULL,NULL,NULL),(524,'Aaaa','aaa@aaa.com.br',2,'2022-11-30','2022-11-30','2022-11-26 22:00:14',12,'Aguardando aprovação',NULL,NULL),(525,'abcv','abcv@sada',2,'2022-11-29','2022-12-01','2022-11-26 22:19:09',1,'Aguardando aprovação',NULL,NULL),(526,'teste','abc123@abc123.com.br',3,'2022-11-22','2022-11-28','2022-11-26 22:22:59',1,'Aguardando aprovação',NULL,NULL),(527,'teste','abc123@abc123.com.br',3,'2022-11-22','2022-11-28','2022-11-26 22:23:35',1,'Aguardando aprovação',NULL,NULL),(529,'Teste10','teste10@teste10.com',2,'2022-12-21','2022-12-30','2022-12-10 12:38:49',2,'Reserva aceita',NULL,NULL),(530,'Argentino','arg@arg.com.br',2,'2022-12-20','2022-12-22','2022-12-13 20:20:58',10,'Aguardando aprovação',NULL,NULL),(531,'cabeçao','cabecao@cabecao.com.br',2,'2022-12-20','2022-12-21','2022-12-13 20:27:23',1,'Aguardando aprovação',NULL,NULL),(532,'abc','abc@efg.com.br',5,'2022-12-22','2022-12-28','2022-12-14 13:23:25',1,'Aguardando aprovação',NULL,NULL),(534,'teste','teste@teste',2,'2022-12-28','2022-12-20','2022-12-19 21:28:47',1,'Aguardando aprovação',NULL,NULL),(535,'globalDias','globalDias@globalDias.com.br',2,'2022-12-20','2022-12-30','2022-12-19 21:36:56',12,'Aguardando aprovação',NULL,NULL),(536,'abvc','abvc@abvc.com.br',1,'2022-12-19','2022-12-28','2022-12-19 22:10:19',1,'Aguardando aprovação',NULL,NULL),(537,'yrd','yrd@yrd.com.br',2,'2022-12-19','2022-12-21','2022-12-19 22:12:39',1,'Reserva aceita',NULL,NULL),(538,'vadc','vadc@vadc.com.br',1,'2022-12-19','2022-12-21','2022-12-19 22:25:01',1,'Aguardando aprovação',NULL,NULL),(539,'asdnove','asdnove@asd.com.br',2,'2022-12-19','2022-12-28','2022-12-20 00:56:16',1,'Aguardando aprovação',9,NULL),(540,'asdonze','asdonze@asd.com.br',2,'2022-12-19','2022-12-30','2022-12-20 01:06:39',2,'Aguardando aprovação',11,NULL),(541,'Toninhos DEF','def@asd.com.br',1,'2022-12-19','2022-12-28','2022-12-20 01:09:58',12,'Aguardando aprovação',9,0.00),(542,'Toninhos DEF2','def2@asd.com.br',2,'2022-12-19','2022-12-27','2022-12-20 01:13:16',10,'Aguardando aprovação',8,0.00),(543,'Toninhos DEF2','def2@asd.com.br',2,'2022-12-19','2022-12-27','2022-12-20 01:14:30',10,'Aguardando aprovação',8,0.00),(544,'Toninhos DEF3','def3@asd.com.br',2,'2022-12-19','2022-12-27','2022-12-20 01:15:01',10,'Aguardando aprovação',8,0.00),(545,'Toninhos DEF5','def5@asd.com.br',2,'2022-12-19','2022-12-27','2022-12-20 01:18:55',10,'Aguardando aprovação',8,0.00),(546,'Toninhos DEF7','def7@asd.com.br',2,'2022-12-19','2022-12-27','2022-12-20 01:20:01',10,'Aguardando aprovação',8,0.00),(547,'Toninhos DEF8','def8@asd.com.br',2,'2022-12-19','2022-12-27','2022-12-20 01:21:24',10,'Aguardando aprovação',8,0.00),(548,'Toninhos DEF10','def10@asd.com.br',2,'2022-12-19','2022-12-27','2022-12-20 01:22:34',10,'Aguardando aprovação',8,0.00),(549,'Toninhos DEF11','def11@asd.com.br',1,'2022-12-19','2022-12-26','2022-12-20 01:23:12',2,'Aguardando aprovação',7,0.00),(550,'tste5','tste5@tste5.com.br',2,'2022-12-21','2022-12-23','2022-12-22 01:08:10',2,'Aguardando aprovação',2,0.00),(551,'tste6','tste6@tste5.com.br',2,'2022-12-21','2022-12-24','2022-12-22 01:09:26',1,'Aguardando aprovação',3,540.00),(552,'brima','brima@brima.com.br',2,'2022-12-21','2022-12-26','2022-12-22 01:10:16',12,'Aguardando aprovação',5,900.00),(553,'tste10','tste10@tste10.com.br',3,'2022-12-21','2022-12-27','2022-12-22 01:17:03',10,'Aguardando aprovação',6,0.00),(554,'tste11','tste11@tste11.com.br',2,'2022-12-20','2022-12-26','2022-12-22 01:17:40',2,'Aguardando aprovação',6,1800.00),(555,'Kiko','kiko@kiko.com.br',2,'2022-12-27','2022-12-30','2022-12-27 00:21:23',10,'Aguardando aprovação',3,0.00),(556,'kiku','kiku@kiku.com.br',2,'2022-12-26','2022-12-30','2022-12-27 00:22:04',2,'Aguardando aprovação',4,0.00),(557,'afvaew','afvaew@afvaew.com.br',2,'2022-12-26','2022-12-29','2022-12-27 00:27:53',1,'Aguardando aprovação',3,NULL),(558,'t123','t123@t123.com.br',1,'2022-12-27','2022-12-30','2022-12-27 23:28:27',1,'Aguardando aprovação',3,1080.00),(559,'teste3252','teste3252@teste3251.com.br',2,'2022-12-27','2022-12-30','2022-12-27 23:58:08',10,'Aguardando aprovação',3,360.00),(560,'teste56','teste56@gmail.com',1,'2022-12-30','2023-01-04','2022-12-28 00:36:30',1,'Aguardando aprovação',5,1500.00),(562,'geijijae','geijijae@geijijae.com.br',2,'2023-01-27','2023-01-31','2023-01-27 19:42:20',2,'Aguardando aprovação',4,1000.00),(563,'Teste0102','teste0102@teste.com.br',2,'2023-02-08','2023-02-10','2023-02-01 23:32:55',1,'Reserva aceita',2,360.00),(564,'test30','test30@test30.com.br',2,'2023-02-03','2023-02-07','2023-02-03 12:47:59',1,'Reserva aceita',4,720.00),(565,'defora','defora@defora.com.br',3,'2023-02-06','2023-02-14','2023-02-03 13:07:06',2,'Aguardando aprovação',8,2000.00),(566,'abda2','abda2@abda2.com.br',2,'2023-02-14','2023-02-16','2023-02-06 22:02:20',10,'Aguardando aprovação',2,600.00),(567,'teste33','teste33@teste33.com.br',3,'2023-02-07','2023-02-10','2023-02-06 22:53:30',12,'Aguardando aprovação',3,1500.00);
/*!40000 ALTER TABLE `tb_reservas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-06 21:01:03
