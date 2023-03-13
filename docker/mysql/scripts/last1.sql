ALTER TABLE hotelventura.tb_usuarios MODIFY COLUMN senha varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL;

ALTER TABLE hotelventura.tb_usuarios MODIFY COLUMN tipo_usuario varchar(256) NOT NULL;


UPDATE hotelventura.tb_usuarios
	SET tipo_usuario='Administrador]'
	WHERE tipo_usuario='1';

ALTER TABLE hotelventura.tb_usuarios ADD provider varchar(256) NULL;

ALTER TABLE hotelventura.tb_usuarios MODIFY COLUMN tipo_usuario varchar(256) NOT NULL;
