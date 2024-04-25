-- CREATE DATABASE GastroManager; --crear db
-- USE integracioSistemes; --establir-la com a predeterminada
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
    nif VARCHAR(50) NOT NULL 
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
    FOREIGN KEY (idRestaurant) REFERENCES restaurant (id)
);

CREATE TABLE grupPlat ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nomGrup VARCHAR(100) NOT NULL,
    idRestaurant INT,
    FOREIGN KEY (idRestaurant) REFERENCES restaurant (id)
);

CREATE TABLE plat ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nom VARCHAR(100) NOT NULL,
    preu DECIMAL(5,2) NOT NULL,
    idGrup INT,
    FOREIGN KEY (idGrup) REFERENCES grupPlat (id)
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
    FOREIGN KEY (idTaula) REFERENCES taula (id)
);

CREATE TABLE liniaComanda ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    preuTotal DECIMAL(5,2) NOT NULL,
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
