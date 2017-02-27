CREATE TABLE `project`.`years_values` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `source_id` INT NOT NULL,
  `country_id` INT NOT NULL,
  `years` VARCHAR(45) NOT NULL,
  `year_value` DOUBLE NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `source_id_foreign_idx` (`source_id` ASC),
  INDEX `country_id_idx` (`country_id` ASC),
  CONSTRAINT `source_id_foreign`
    FOREIGN KEY (`source_id`)
    REFERENCES `project`.`definitions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `country_id`
    FOREIGN KEY (`country_id`)
    REFERENCES `project`.`country_infos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
