
use project;
LOAD DATA LOCAL INFILE 'C:/Users/Antonis/Desktop/dataForDefinitionTable.txt'

INTO TABLE definitions

FIELDS TERMINATED BY  ',' 
ENCLOSED BY  '"' 
LINES TERMINATED BY '\r\n'

(Code,Indicator_name,Long_definition,Source);


LOAD DATA LOCAL INFILE 'C:/Users/Antonis/Desktop/dataForCountryTable.txt'

INTO TABLE country_infos

FIELDS TERMINATED BY  ',' 
ENCLOSED BY  '"' 
LINES TERMINATED BY '\r\n'

(@ColVar1,@ColVar2,country,country_code)

SET source_id= (SELECT id FROM definitions WHERE Code = @ColVar2);


LOAD DATA LOCAL INFILE 'C:/Users/Antonis/Desktop/dataForYearsTable.txt'

INTO TABLE years_values

FIELDS TERMINATED BY  ',' 
ENCLOSED BY  '"' 
LINES TERMINATED BY '\r\n'

(@seriesNameColumn,@seriesCodeColumn,@countryNameColumn,@countryCodeColumn,years,year_value)

SET country_id = (SELECT id FROM country_infos WHERE source_id =(SELECT id FROM definitions WHERE Code =@seriesCodeColumn) AND country = @countryNameColumn), 
source_id= (SELECT id FROM definitions WHERE Code =@seriesCodeColumn);


