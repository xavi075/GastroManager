-- CREATE DATABASE GastroManager; --crear db
-- USE GastroManager; --establir-la com a predeterminada
-- SET autocommit = 0; -- per evitar que cada sentència es tracti com una transacció independent

-- crear les taules necessàries
CREATE TABLE rol ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nomRol VARCHAR(100) UNIQUE NOT NULL
);
-- cuiner, cambrer, administrador

CREATE TABLE restaurant ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nom VARCHAR(100) NOT NULL,
    adreca VARCHAR(50) NOT NULL,
    nif VARCHAR(50) UNIQUE NOT NULL 
);

CREATE TABLE usuari ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL,
    nom VARCHAR(50) NOT NULL,
    contrasenya_hash VARCHAR(64) NOT NULL,
    dataCreacioUsuari DATETIME,
    idRol INT,
    idRestaurant INT,
    FOREIGN KEY (idRol) REFERENCES rol (id),
    FOREIGN KEY (idRestaurant) REFERENCES restaurant (id)  
);


CREATE TABLE taula ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    numTaula INT NOT NULL,
    idRestaurant INT,
    FOREIGN KEY (idRestaurant) REFERENCES restaurant (id),
    UNIQUE (numTaula, idRestaurant)
);

CREATE TABLE grupPlat ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nomGrup VARCHAR(100) NOT NULL,
    idRestaurant INT,
    FOREIGN KEY (idRestaurant) REFERENCES restaurant (id),
    UNIQUE (nomGrup, idRestaurant)
);

CREATE TABLE plat ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nom VARCHAR(100) NOT NULL,
    preu DECIMAL(5,2) NOT NULL,
    idGrup INT,
    FOREIGN KEY (idGrup) REFERENCES grupPlat (id),
    UNIQUE (nom, idGrup)
);

CREATE TABLE menu ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nom VARCHAR(100) NOT NULL,
    preu DECIMAL(5,2) NOT NULL,
    idRestaurant INT,
    idGrupPrimerPlat INT,
    idGrupSegonPlat INT,
    idGrupPostres INT,
    FOREIGN KEY (idRestaurant) REFERENCES restaurant (id),
    FOREIGN KEY (idGrupPrimerPlat) REFERENCES grupPlat (id),
    FOREIGN KEY (idGrupSegonPlat) REFERENCES grupPlat (id),
    FOREIGN KEY (idGrupPostres) REFERENCES grupPlat (id)
);

CREATE TABLE comanda ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    preu DECIMAL(5,2) NOT NULL DEFAULT 0,
    pagat BOOLEAN NOT NULL DEFAULT FALSE,
    dataInici DATETIME NOT NULL,
    dataFi DATETIME,
    idTaula INT,
    FOREIGN KEY (idTaula) REFERENCES taula (id),
    CHECK (dataInici < dataFi)
);

CREATE TABLE liniaComanda ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    preuTotal DECIMAL(5,2) NOT NULL DEFAULT 0, -- Calculated with a trigger
    quantitat INT NOT NULL DEFAULT 1,
    idComanda INT,
    idPlat INT,
    FOREIGN KEY (idComanda) REFERENCES comanda (id),
    FOREIGN KEY (idPlat) REFERENCES plat (id)
);

CREATE TABLE liniaMenu ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    idComanda INT,
    idMenu INT,
    idPrimerPlat INT,
    idSegonPlat INT,
    idPostres INT,
    FOREIGN KEY (idComanda) REFERENCES comanda (id),
    FOREIGN KEY (idMenu) REFERENCES menu (id),
    FOREIGN KEY (idPrimerPlat) REFERENCES plat (id),
    FOREIGN KEY (idSegonPlat) REFERENCES plat (id),
    FOREIGN KEY (idPostres) REFERENCES plat (id)
);

-- PROCEDURES

-- Procedure per calcular el preu total d'una comanda
DELIMITER //
CREATE PROCEDURE calcularPreuTotalComanda(IN p_idComanda INT)
BEGIN
    DECLARE total DECIMAL(5,2);
    
    SET total = 0;


    -- Calcular el preu total de les línies de comanda
    IF EXISTS (SELECT 1 FROM liniaComanda WHERE idComanda = p_idComanda) THEN
        SET total = (SELECT SUM(preuTotal) FROM liniaComanda WHERE idComanda = p_idComanda);
    END IF;

    -- Sumar el preu total de les línies de menú
    IF EXISTS (SELECT 1 FROM liniaMenu WHERE idComanda = p_idComanda) THEN
	    SET total = total + 
		(
		    SELECT SUM(preu) 
		    FROM menu AS tMenu 
		        INNER JOIN liniaMenu AS tLinMenu 
		            ON tMenu.id = tLinMenu.idMenu
		    WHERE tLinMenu.idComanda = p_idComanda
		);
    END IF;
    -- Actualizar el precio total en la taula de comanda
    UPDATE comanda SET preu = total WHERE id = p_idComanda;
END;
//  
DELIMITER ;


-- TRIGGERS

-- Trigger per verificar que només existeixi un usuari administrador per restaurant
DELIMITER //
CREATE TRIGGER verificarUnicUsuariAdministrador
BEFORE INSERT ON usuari
FOR EACH ROW
BEGIN
    DECLARE numAdmins INT;
    SET numAdmins = (SELECT COUNT(*) FROM usuari WHERE idRol = 1 AND idRestaurant = NEW.idRestaurant);
    IF numAdmins > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ja existeix un usuari administrador al restaurant';
    END IF;
END //
DELIMITER ;

-- Trigger per calcular el preu total de la linia de comanda abans d'un insert
DELIMITER //
CREATE TRIGGER calcularPreuTotalLiniaComanda_BeforeInsert
BEFORE INSERT ON liniaComanda
FOR EACH ROW
BEGIN
    SET NEW.preuTotal = NEW.quantitat * (SELECT preu FROM plat WHERE id = NEW.idPlat);
END;
//
DELIMITER ;

-- Trigger per calcular el preu total de la linia de comanda abans d'un update
DELIMITER //
CREATE TRIGGER calcularPreuTotalLiniaComanda_BeforeUpdate
BEFORE UPDATE ON liniaComanda
FOR EACH ROW
BEGIN
    SET NEW.preuTotal = NEW.quantitat * (SELECT preu FROM plat WHERE id = NEW.idPlat);
END;
//
DELIMITER ;

-- Trigger per calcular el preu total de la comanda tenint en compte les linies de comanda i les de menu despres d'insert a linia comanda
DELIMITER //
CREATE TRIGGER calcularPreuTotalComanda_AfterInsertLiniaComanda
AFTER INSERT ON liniaComanda
FOR EACH ROW
BEGIN
    CALL calcularPreuTotalComanda(NEW.idComanda);
END;
//
DELIMITER ;

-- Trigger per calcular el preu total de la comanda tenint en compte les linies de comanda i les de menu despres d'update a linia comanda
DELIMITER //
CREATE TRIGGER calcularPreuTotalComanda_AfterUpdateLiniaComanda
AFTER UPDATE ON liniaComanda
FOR EACH ROW
BEGIN
    CALL calcularPreuTotalComanda(NEW.idComanda);
END;
//
DELIMITER ;

-- Trigger per calcular el preu total de la comanda tenint en compte les linies de comanda i les de menu despres d'eliminar a linia comanda
DELIMITER //
CREATE TRIGGER calcularPreuTotalComanda_AfterDeleteLiniaComanda
AFTER DELETE ON liniaComanda
FOR EACH ROW
BEGIN
    CALL calcularPreuTotalComanda(OLD.idComanda);
END;
//
DELIMITER ;

-- Trigger per calcular el preu total de la comanda tenint en compte les linies de comanda i les de menu despres d'insert a linia menu
DELIMITER //
CREATE TRIGGER calcularPreuTotalComanda_AfterInsertLiniaMenu
AFTER INSERT ON liniaMenu
FOR EACH ROW
BEGIN
    CALL calcularPreuTotalComanda(NEW.idComanda);
END;
//
DELIMITER ;


-- Trigger per calcular el preu total de la comanda tenint en compte les linies de comanda i les de menu despres d'eliminar a linia menu
DELIMITER //
CREATE TRIGGER calcularPreuTotalComanda_AfterDeleteLiniaMenu
AFTER DELETE ON liniaMenu
FOR EACH ROW
BEGIN
    CALL calcularPreuTotalComanda(OLD.idComanda);
END;
//
DELIMITER ;

-- Trigger per comprovar que els plats de la linia de menu corresponent al grup de plats del menu
DELIMITER //
CREATE TRIGGER comprovarPlatsMenu
BEFORE INSERT ON liniaMenu
FOR EACH ROW
BEGIN
    DECLARE grupPrimerPlatMenu INT;
    DECLARE grupSegonPlatMenu INT;
    DECLARE grupPostresMenu INT;
    DECLARE grupPrimerPlat INT;
    DECLARE grupSegonPlat INT;
    DECLARE grupPostres INT;

    SET grupPrimerPlatMenu = (SELECT idGrupPrimerPlat FROM menu WHERE id = NEW.idMenu);
    SET grupSegonPlatMenu = (SELECT idGrupSegonPlat FROM menu WHERE id = NEW.idMenu);
    SET grupPostresMenu = (SELECT idGrupPostres FROM menu WHERE id = NEW.idMenu);

    SET grupPrimerPlat = (SELECT idGrup FROM plat WHERE id = NEW.idPrimerPlat);
    SET grupSegonPlat = (SELECT idGrup FROM plat WHERE id = NEW.idSegonPlat);
    SET grupPostres = (SELECT idGrup FROM plat WHERE id = NEW.idPostres);

    IF (grupPrimerPlatMenu <> grupPrimerPlat) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El grup de plat del primer plat no coincideix amb el grup del primer plat del menu';
    END IF;

    IF (grupSegonPlatMenu <> grupSegonPlat) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El grup de plat del segon plat no coincideix amb el grup del segon plat del menu';
    END IF;

    IF (grupPostresMenu <> grupPostres) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El grup de plat de les postres no coincideix amb el grup de les postres del menu';
    END IF;
END;
//
DELIMITER ;




