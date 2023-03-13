ALTER TABLE hotelventura.tb_usuarios ADD hash varchar(256) NULL;
ALTER TABLE hotelventura.tb_usuarios ADD salt varchar(256) NULL;
ALTER TABLE hotelventura.tb_usuarios MODIFY COLUMN senha varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL;

