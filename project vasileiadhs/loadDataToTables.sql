
LOAD DATA LOCAL INFILE '/Users/georgesalteris/Projects/eurozoneg/project vasileiadhs/dataForDefinitionTable.txt'

INTO TABLE definitions

FIELDS TERMINATED BY  ','
ENCLOSED BY  '"'
LINES TERMINATED BY '\n'

(Code,Indicator_name,Long_definition,Source);


LOAD DATA LOCAL INFILE '/Users/georgesalteris/Projects/eurozoneg/project vasileiadhs/dataForCountryTable.txt'

INTO TABLE country_infos

FIELDS TERMINATED BY  ','
ENCLOSED BY  '"'
LINES TERMINATED BY '\n'

(@ColVar1,@ColVar2,country,country_code)

SET source_id= (SELECT id FROM definitions WHERE Code = @ColVar2);


LOAD DATA LOCAL INFILE '/Users/georgesalteris/Projects/eurozoneg/project vasileiadhs/dataForYearsTable.txt'

INTO TABLE years_values

FIELDS TERMINATED BY  ','
ENCLOSED BY  '"'
LINES TERMINATED BY '\n'

(@seriesNameColumn,@seriesCodeColumn,@countryNameColumn,@countryCodeColumn,years,value)

SET source_id= (SELECT id FROM definitions WHERE Code =@seriesCodeColumn),
country_id =(SELECT id FROM country_infos WHERE source_id =years_values.source_id AND country = @countryNameColumn) ;
