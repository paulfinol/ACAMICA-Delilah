CREATE SCHEMA `Delilah` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Delilah.user (
    username VARCHAR (50) NOT NULL,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL,
    mobile VARCHAR (10) NOT NULL,
    address VARCHAR (50) NOT NULL,
    passwordHash VARCHAR (10) NOT NULL,
    admin TINYINT (1) NOT NULL DEFAULT 0,
    PRIMARY KEY (username),
    UNIQUE INDEX uq_username (username ASC),
    UNIQUE INDEX uq_name (name ASC),
    UNIQUE INDEX uq_mobile (mobile ASC),
    UNIQUE INDEX uq_email (email ASC)
);

CREATE TABLE Delilah.orders (
    orderId BIGINT NOT NULL AUTO_INCREMENT,
    status VARCHAR (15) NOT NULL DEFAULT 'NUEVO',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paytype VARCHAR (15) NOT NULL,
    totalPrice FLOAT NOT NULL,
    username VARCHAR (50) NOT NULL,
    PRIMARY KEY (orderId),
    INDEX idx_order_user (username ASC),
    CONSTRAINT fk_order_user FOREIGN KEY (username) REFERENCES Delilah.user (username) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Delilah.platos (
    platoTitle VARCHAR (75) NOT NULL,
    platoPrice FLOAT (10) NOT NULL,
    PRIMARY KEY (platoTitle),
    UNIQUE INDEX uq_platoTitle (platoTitle ASC),
    INDEX idx_platoPrice (platoPrice ASC)
);

CREATE TABLE Delilah.orderplatos (
    orderId BIGINT NOT NULL,
    platoTitle VARCHAR (75) NOT NULL,
    INDEX idx_orderplatos_platos (platoTitle ASC),
    CONSTRAINT fk_orderplatos_platos FOREIGN KEY (platoTitle) REFERENCES Delilah.platos (platoTitle) ON DELETE NO ACTION ON UPDATE CASCADE,
    INDEX idx_orderplatos_order (orderId ASC),
    CONSTRAINT fk_orderplatos_order FOREIGN KEY (orderId) REFERENCES Delilah.orders (orderId) ON DELETE NO ACTION ON UPDATE CASCADE
);