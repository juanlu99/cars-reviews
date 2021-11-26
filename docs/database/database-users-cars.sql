-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema reviews_cars
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema reviews_cars
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reviews_cars` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `reviews_cars` ;
-- -----------------------------------------------------
-- Table `reviews_cars`.`cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`cars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(100) NOT NULL,
  `model` VARCHAR(255) NOT NULL,
  `year` INT NOT NULL,
  `engine` ENUM('Diésel', 'Gasolina', 'Híbrido', 'Eléctrico') NULL DEFAULT 'Gasolina',
  `cv` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `reviews_cars`.`carImages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`carImages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `principal` TINYINT NULL DEFAULT '0',
  `idCar` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idCar`)
    REFERENCES `reviews_cars`.`cars` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `reviews_cars`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `role` ENUM('admin', 'reader') NULL DEFAULT 'reader',
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `verificationCode` VARCHAR(64) NULL DEFAULT NULL,
  `verifiedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `reviews_cars`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews_cars`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `idCar` INT NOT NULL,
  `comment` VARCHAR(255) NOT NULL,
  `rating` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idUser` (`idUser` ASC) VISIBLE,
  INDEX `idCar` (`idCar` ASC) VISIBLE,
  FOREIGN KEY (`idUser`)
    REFERENCES `reviews_cars`.`users` (`id`)
    ON DELETE CASCADE,
  FOREIGN KEY (`idCar`)
    REFERENCES `reviews_cars`.`cars` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`,`name`,`email`,`password`,`role`,`image`,`createdAt`,`updatedAt`,`verificationCode`,`verifiedAt`) VALUES (1,'Admin','admin@hackaboss.com','$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC','admin',NULL,'2021-04-22 01:11:14',NULL,'88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860','2021-04-22 01:11:14');

INSERT INTO `cars` VALUES 
(1,'Ford','Mondeo',2019,'Gasolina',60,'2021-11-25 01:42:20',NULL),
(2,'Opel','Astra',2011,'Diésel',125,'2021-11-25 01:43:01',NULL),
(3,'Ford','Ka',1999,'Diésel',60,'2021-11-25 01:43:18',NULL),
(4,'Audi','A1',2019,'Gasolina',90,'2021-11-25 01:43:35',NULL),
(5,'Audi','A3',2020,'Gasolina',140,'2021-11-25 01:43:45',NULL),
(6,'Volkswagen','Golf',2018,'Gasolina',140,'2021-11-25 01:44:10',NULL),
(7,'Fiat','Panda',1986,'Gasolina',60,'2021-11-25 01:45:58',NULL),
(8,'Volvo','S40',2016,'Diésel',140,'2021-11-25 01:46:29',NULL),
(9,'Peugeot','206',2010,'Diésel',90,'2021-11-25 01:46:52',NULL),
(10,'Seat','León',2012,'Gasolina',90,'2021-11-25 01:47:37',NULL),
(11,'Renault','Clio',2009,'Gasolina',70,'2021-11-25 01:48:02',NULL),
(12,'Renault','Megane',2017,'Gasolina',100,'2021-11-25 01:48:13',NULL),
(13,'Opel','Corsa',1998,'Diésel',70,'2021-11-25 01:48:53',NULL),
(14,'Audi','Q5',2018,'Gasolina',180,'2021-11-25 01:49:12',NULL);
