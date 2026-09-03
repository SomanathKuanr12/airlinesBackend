-- MySQL dump 10.13  Distrib 5.7.43, for Win64 (x86_64)
--
-- Host: localhost    Database: indian_airlines
-- ------------------------------------------------------
-- Server version	5.7.43-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airpot_details`
--

DROP TABLE IF EXISTS `airpot_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airpot_details` (
  `short_name` varchar(10) NOT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `country` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`short_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airpot_details`
--

LOCK TABLES `airpot_details` WRITE;
/*!40000 ALTER TABLE `airpot_details` DISABLE KEYS */;
INSERT INTO `airpot_details` VALUES ('BOM','Chhatrapati Shivaji Maharaj International Airport','Mumbai','Maharashtra','India'),('CAI','Cairo International Airport','Cairo','Cairo Governorate','Egypt'),('CDG','Charles de Gaulle Airport','Paris','Île-de-France','France'),('DEL','Indira Gandhi International Airport','New Delhi','Delhi','India'),('DXB','Dubai International Airport','Dubai','Dubai','UAE'),('EZE','Ministro Pistarini International Airport','Buenos Aires','Buenos Aires','Argentina'),('FRA','Frankfurt am Main Airport','Frankfurt','Hesse','Germany'),('GRU','São Paulo–Guarulhos International Airport','São Paulo','São Paulo','Brazil'),('HKG','Hong Kong International Airport','Hong Kong','Hong Kong','China'),('JFK','John F. Kennedy International Airport','New York','New York','USA'),('JNB','O. R. Tambo International Airport','Johannesburg','Gauteng','South Africa'),('LAX','Los Angeles International Airport','Los Angeles','California','USA'),('LHR','London Heathrow Airport','London','England','United Kingdom'),('MAA','Chennai International Airport','Chennai','Tamil Nadu','India'),('MEL','Melbourne Airport','Melbourne','Victoria','Australia'),('NRT','Narita International Airport','Tokyo','Tokyo Prefecture','Japan'),('ORD','O\'Hare International Airport','Chicago','Illinois','USA'),('SYD','Sydney Kingsford Smith Airport','Sydney','New South Wales','Australia'),('YVR','Vancouver International Airport','Vancouver','British Columbia','Canada'),('YYZ','Toronto Pearson International Airport','Toronto','Ontario','Canada');
/*!40000 ALTER TABLE `airpot_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_details`
--

DROP TABLE IF EXISTS `booking_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_details` (
  `pnr_no` varchar(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `flight_id` int(11) DEFAULT NULL,
  `flight_no` varchar(20) DEFAULT NULL,
  `source` varchar(60) DEFAULT NULL,
  `destination` varchar(60) DEFAULT NULL,
  `journey_date` date DEFAULT NULL,
  `fare` decimal(10,0) DEFAULT NULL,
  `payment_status` varchar(40) DEFAULT NULL,
  `booking_by` varchar(60) DEFAULT NULL,
  `booking_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `journey_status` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`pnr_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_details`
--

LOCK TABLES `booking_details` WRITE;
/*!40000 ALTER TABLE `booking_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight_details`
--

DROP TABLE IF EXISTS `flight_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flight_details` (
  `flight_id` int(11) NOT NULL AUTO_INCREMENT,
  `flight_no` varchar(20) DEFAULT NULL,
  `source` varchar(60) DEFAULT NULL,
  `destination` varchar(60) DEFAULT NULL,
  `journey_date` date DEFAULT NULL,
  `departure_time` time DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `b_class_total_seat` decimal(10,0) DEFAULT NULL,
  `b_class_booked_seat` decimal(10,0) DEFAULT NULL,
  `b_class_fare` decimal(10,0) DEFAULT NULL,
  `e_class_total_seat` decimal(10,0) DEFAULT NULL,
  `e_class_booked_seat` decimal(10,0) DEFAULT NULL,
  `e_class_fare` decimal(10,0) DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flight_status` varchar(60) DEFAULT 'ACTIVE',
  `canceled_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`flight_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight_details`
--

LOCK TABLES `flight_details` WRITE;
/*!40000 ALTER TABLE `flight_details` DISABLE KEYS */;
INSERT INTO `flight_details` VALUES (1,'AI504','MAA','BBI','2027-06-22','22:40:00','11:30:00',40,0,7650,120,0,5600,'soman@ai.com',NULL,'2026-08-16 13:53:07','ACTIVE',NULL),(2,'AI604','MAA','BBI','2027-07-22','20:40:00','21:30:00',40,0,7650,120,0,6300,'soman@ai.com','soman@ai.com','2026-08-16 14:28:41','CANCELED','soman@ai.com');
/*!40000 ALTER TABLE `flight_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight_revenue_details`
--

DROP TABLE IF EXISTS `flight_revenue_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flight_revenue_details` (
  `flight_id` int(11) NOT NULL AUTO_INCREMENT,
  `journey_date` date DEFAULT NULL,
  `flight_no` varchar(60) DEFAULT NULL,
  `total_booking` decimal(10,0) DEFAULT NULL,
  `total_revenue` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`flight_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight_revenue_details`
--

LOCK TABLES `flight_revenue_details` WRITE;
/*!40000 ALTER TABLE `flight_revenue_details` DISABLE KEYS */;
INSERT INTO `flight_revenue_details` VALUES (1,'2027-07-01','AI101',120,850000),(2,'2027-07-02','AI102',95,670000),(3,'2027-07-03','AI103',110,780000),(4,'2027-07-04','AI104',130,920000),(5,'2027-07-05','AI105',80,560000),(6,'2027-07-06','AI106',140,990000),(7,'2027-07-07','AI107',100,710000),(8,'2027-07-08','AI108',115,830000),(9,'2027-07-01','AI101',120,850000),(10,'2027-07-02','AI101',95,670000),(11,'2027-07-03','AI101',110,780000),(12,'2027-07-04','AI104',130,920000),(13,'2027-07-07','AI107',100,710000),(14,'2027-07-09','AI107',115,830000);
/*!40000 ALTER TABLE `flight_revenue_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passenger_details`
--

DROP TABLE IF EXISTS `passenger_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passenger_details` (
  `pnr_no` varchar(20) NOT NULL,
  `passenger1_class` varchar(60) DEFAULT NULL,
  `passenger1_name` varchar(60) DEFAULT NULL,
  `passenger1_dob` date DEFAULT NULL,
  `passenger1_seat_no` varchar(10) DEFAULT NULL,
  `passenger1_status` varchar(60) DEFAULT NULL,
  `passenger2_class` varchar(20) DEFAULT NULL,
  `passenger2_name` varchar(60) DEFAULT NULL,
  `passenger2_dob` date DEFAULT NULL,
  `passenger2_seat_no` varchar(10) DEFAULT NULL,
  `passenger2_status` varchar(60) DEFAULT NULL,
  `passenger3_class` varchar(20) DEFAULT NULL,
  `passenger3_name` varchar(60) DEFAULT NULL,
  `passenger3_dob` date DEFAULT NULL,
  `passenger3_seat_no` varchar(10) DEFAULT NULL,
  `passenger3_status` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`pnr_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passenger_details`
--

LOCK TABLES `passenger_details` WRITE;
/*!40000 ALTER TABLE `passenger_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `passenger_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recent_actions`
--

DROP TABLE IF EXISTS `recent_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recent_actions` (
  `action_id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `action_url` varchar(255) DEFAULT NULL,
  `performed_by` varchar(60) DEFAULT NULL,
  `performed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recent_actions`
--

LOCK TABLES `recent_actions` WRITE;
/*!40000 ALTER TABLE `recent_actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `recent_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue_details`
--

DROP TABLE IF EXISTS `revenue_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revenue_details` (
  `revenue_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `total_booking` decimal(10,0) DEFAULT NULL,
  `total_revenue` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`revenue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue_details`
--

LOCK TABLES `revenue_details` WRITE;
/*!40000 ALTER TABLE `revenue_details` DISABLE KEYS */;
INSERT INTO `revenue_details` VALUES (1,'2027-07-01',25,15000),(2,'2027-07-02',30,18000),(3,'2027-07-03',20,12000),(4,'2027-07-04',40,25000),(5,'2027-07-05',15,9000),(6,'2027-07-06',35,21000),(7,'2027-07-01',25,15000),(8,'2027-07-02',30,18000),(9,'2027-07-03',20,12000),(10,'2027-07-04',40,25000),(11,'2027-07-05',15,9000),(12,'2027-07-06',35,21000),(13,'2027-07-07',28,17000),(14,'2027-07-08',22,13500);
/*!40000 ALTER TABLE `revenue_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_admin_details`
--

DROP TABLE IF EXISTS `user_admin_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_admin_details` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone_no` varchar(60) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `role` varchar(60) DEFAULT 'User',
  `status` varchar(60) DEFAULT 'Active',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_admin_details`
--

LOCK TABLES `user_admin_details` WRITE;
/*!40000 ALTER TABLE `user_admin_details` DISABLE KEYS */;
INSERT INTO `user_admin_details` VALUES (1,'Somanath','soman@gmail.com','423523500','$2b$10$bwJp4RXI3WpH8AEeD9PiIuzaTybUqdtXU8e/2qegCQZsOQ3EuU4wW','USER','Active'),(2,'Babuni','soman@ai.com','42352352567','$2b$10$nxgIskCPUeazHTfD0TTpeeMa4j5IRl3Fx7HMvP9iWjf55UvMOKueO','ADMIN','Active');
/*!40000 ALTER TABLE `user_admin_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-03 10:23:23
