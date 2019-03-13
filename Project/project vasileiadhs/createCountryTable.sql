CREATE TABLE `project`.`country_infos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `source_id` INT NOT NULL,
  `country` TEXT NOT NULL,
  `country_code` TEXT NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `source_id_idx` (`source_id` ASC),
  CONSTRAINT `source_id`
    FOREIGN KEY (`source_id`)
    REFERENCES `project`.`definitions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
