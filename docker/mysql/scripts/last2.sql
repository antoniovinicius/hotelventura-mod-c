ALTER TABLE hotelventura.tb_quartos ADD metragem float NULL;
ALTER TABLE hotelventura.tb_quartos ADD qt_hospedes_quarto int NULL;

ALTER TABLE tb_fotos_quartos 
DROP FOREIGN KEY `fk_id_quarto`;
ALTER TABLE tb_fotos_quartos 
ADD CONSTRAINT `fk_id_quarto`
  FOREIGN KEY (`fk_id_quarto`)
  REFERENCES `tb_quartos` (`id_quarto`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;