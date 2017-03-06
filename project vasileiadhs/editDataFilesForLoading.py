
readFile = open("36fcadac-d77a-4291-8ff3-07fba3014e8c_Definition and Source.txt","r")
writeFile = open("dataForDefinitionTable.txt","w")

i = 0

readFile.readline()

for line in readFile:

	editLine = ""
	fields = line.split('\t')
	
	for j in range(len(fields)):
		
		fields[j] = fields[j].replace('"',' ')
		
		if j == (len(fields) - 1):
			
			editLine += '"' + fields[j].strip() + '"'
			
		else:
		
			editLine += '"' + fields[j].strip() + '"' + ","
			
	writeFile.write(editLine+'\n')



			
readFile.close()
writeFile.close()


readFile = open("36fcadac-d77a-4291-8ff3-07fba3014e8c_Data.txt","r")
writeFile = open("dataForCountryTable.txt","w")

i = 0

readFile.readline()

for line in readFile:

	if len(line.strip()) == 0 :
		break

	editLine = ""
	fields = line.split('\t')
	
	for j in range(4):
		fields[j] = fields[j].replace('"',' ')
		if j == 3:
			
			editLine += '"' + fields[j].strip() + '"'
			
		else:
		
			editLine += '"' + fields[j].strip() + '"' + ","
			
	writeFile.write(editLine+'\n')



			
readFile.close()
writeFile.close()









readFile = open("36fcadac-d77a-4291-8ff3-07fba3014e8c_Data.txt","r")
writeFile = open("dataForYearsTable.txt","w")

i = 0

columns = readFile.readline().split('\t')

for line in readFile:

	if len(line.strip()) == 0 :
		break

	editLine = ""
	fields = line.split('\t')
	
	for j in range(4):
		
		fields[j] = fields[j].replace('"',' ')
		editLine += '"' + fields[j].strip() + '"' + ","
		
	for j in range(4,len(fields)):
	
		fields[j] = fields[j].replace('"',' ')
		columns[j] = columns[j].replace('"',' ')
		year = columns[j].split()[0]
		editLine1 = ""
		
		fields[j] = fields[j].replace('..',str(0))
		editLine1 = editLine + '"' + year.strip() + '"' + "," + '"' + fields[j].strip() + '"'
			
		writeFile.write(editLine1+'\n')



			
readFile.close()
writeFile.close()