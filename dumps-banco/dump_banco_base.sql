CREATE DATABASE  IF NOT EXISTS `dresscode` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dresscode`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: dresscode
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `AgendamentoID` int NOT NULL AUTO_INCREMENT,
  `DataHora` datetime NOT NULL,
  `EstilistaID` int NOT NULL,
  `AtelieID` int NOT NULL,
  `Status` enum('ativo','cancelado','finalizado') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`AgendamentoID`),
  KEY `Agendamento_fk2` (`EstilistaID`),
  KEY `Agendamento_fk3` (`AtelieID`),
  CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`EstilistaID`) REFERENCES `estilista` (`EstilistaID`),
  CONSTRAINT `agendamento_ibfk_3` FOREIGN KEY (`AtelieID`) REFERENCES `atelie` (`AtelieID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atelie`
--

DROP TABLE IF EXISTS `atelie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atelie` (
  `AtelieID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL DEFAULT '255',
  `UsuarioID` int NOT NULL,
  `VerificacaoDocumentos` varchar(255) NOT NULL,
  PRIMARY KEY (`AtelieID`),
  KEY `Atelie_fk2` (`UsuarioID`),
  CONSTRAINT `Atelie_fk2` FOREIGN KEY (`UsuarioID`) REFERENCES `usuario` (`UsuarioID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atelie`
--

LOCK TABLES `atelie` WRITE;
/*!40000 ALTER TABLE `atelie` DISABLE KEYS */;
INSERT INTO `atelie` VALUES (5,'Ateliê Linha & Forma',41,'Pendente');
/*!40000 ALTER TABLE `atelie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao` (
  `AvaliacaoID` int NOT NULL DEFAULT '0',
  `EstilistaID` int DEFAULT NULL,
  `AtelieID` int DEFAULT NULL,
  `Pontuacao` int DEFAULT NULL,
  `Comentario` text,
  PRIMARY KEY (`AvaliacaoID`),
  KEY `Avaliacao_fk1` (`EstilistaID`),
  KEY `Avaliacao_fk2` (`AtelieID`),
  CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`EstilistaID`) REFERENCES `estilista` (`EstilistaID`),
  CONSTRAINT `avaliacao_ibfk_3` FOREIGN KEY (`AtelieID`) REFERENCES `atelie` (`AtelieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversa`
--

DROP TABLE IF EXISTS `conversa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversa` (
  `ConversaID` int NOT NULL DEFAULT '0',
  `IniciadorID` int NOT NULL,
  `ParticipanteID` int NOT NULL,
  PRIMARY KEY (`ConversaID`),
  KEY `Conversa_fk1` (`IniciadorID`),
  KEY `Conversa_fk2` (`ParticipanteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversa`
--

LOCK TABLES `conversa` WRITE;
/*!40000 ALTER TABLE `conversa` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estilista`
--

DROP TABLE IF EXISTS `estilista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estilista` (
  `EstilistaID` int NOT NULL AUTO_INCREMENT,
  `UsuarioID` int NOT NULL,
  `VerificacaoDocumentos` varchar(255) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  PRIMARY KEY (`EstilistaID`),
  KEY `Estilista_fk1` (`UsuarioID`),
  CONSTRAINT `Estilista_fk1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuario` (`UsuarioID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estilista`
--

LOCK TABLES `estilista` WRITE;
/*!40000 ALTER TABLE `estilista` DISABLE KEYS */;
INSERT INTO `estilista` VALUES (17,40,'Pendente','Helena Duarte');
/*!40000 ALTER TABLE `estilista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensagem`
--

DROP TABLE IF EXISTS `mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensagem` (
  `MensagemID` int NOT NULL AUTO_INCREMENT,
  `ConversaID` int NOT NULL,
  `Conteudo` text NOT NULL,
  `DataHora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NotificacaoID` blob NOT NULL,
  `UsuarioID` int NOT NULL,
  PRIMARY KEY (`MensagemID`),
  KEY `Mensagem_fk1` (`ConversaID`),
  CONSTRAINT `mensagem_fk1` FOREIGN KEY (`ConversaID`) REFERENCES `conversa` (`ConversaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagem`
--

LOCK TABLES `mensagem` WRITE;
/*!40000 ALTER TABLE `mensagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil` (
  `PerfilID` int NOT NULL AUTO_INCREMENT,
  `UsuarioID` int NOT NULL,
  `Biografia` text,
  `FotoPerfil` varchar(255) DEFAULT '255',
  PRIMARY KEY (`PerfilID`),
  UNIQUE KEY `UsuarioID` (`UsuarioID`),
  KEY `Perfil_fk1` (`UsuarioID`),
  CONSTRAINT `Perfil_fk1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuario` (`UsuarioID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (23,40,NULL,'255'),(24,41,NULL,'255');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portifolio`
--

DROP TABLE IF EXISTS `portifolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portifolio` (
  `PortifolioID` int NOT NULL AUTO_INCREMENT,
  `EstilistaID` int DEFAULT NULL,
  `AtelieID` int DEFAULT NULL,
  `Descricao_portifolio` text,
  `Tempo_experiencia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PortifolioID`),
  UNIQUE KEY `PortifolioID` (`PortifolioID`),
  KEY `FK_portifolio_estilista` (`EstilistaID`),
  KEY `FK_portifolio_atelie` (`AtelieID`),
  CONSTRAINT `FK_portifolio_atelie` FOREIGN KEY (`AtelieID`) REFERENCES `atelie` (`AtelieID`),
  CONSTRAINT `FK_portifolio_estilista` FOREIGN KEY (`EstilistaID`) REFERENCES `estilista` (`EstilistaID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portifolio`
--

LOCK TABLES `portifolio` WRITE;
/*!40000 ALTER TABLE `portifolio` DISABLE KEYS */;
INSERT INTO `portifolio` VALUES (27,17,NULL,NULL,NULL),(28,NULL,5,NULL,NULL);
/*!40000 ALTER TABLE `portifolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `UsuarioID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL DEFAULT '255',
  `CPF_CNPJ` varchar(255) NOT NULL DEFAULT '14',
  `Email` varchar(255) NOT NULL DEFAULT '255',
  `Telefone` varchar(255) DEFAULT '20',
  `Senha` varchar(255) NOT NULL DEFAULT '255',
  `Tipo` enum('Atelie','Estilista') NOT NULL,
  PRIMARY KEY (`UsuarioID`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (40,'Helena Duarte','111.111.111-11','estilista.teste@dresscode.local','(11) 98888-1111','$2b$10$DtkmAE0jZq0Q9jfMjpYlcuolxAopyGCIiNa4Fw9wKJezOoGVazhsq','Estilista'),(41,'Ateliê Linha & Forma','22.222.222/0001-22','atelie.teste@dresscode.local','(11) 97777-2222','$2b$10$iyqWXpxs5sTPFdVyYDwas.DU3.cjlk74iYQXECZHg8vnx9Lj/d20K','Atelie');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-11  2:04:50
