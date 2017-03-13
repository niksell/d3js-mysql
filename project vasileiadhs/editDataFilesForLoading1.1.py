
readFile = open("36fcadac-d77a-4291-8ff3-07fba3014e8c_Definition and Source.txt","r")
writeFile = open("dataForDefinitionTable.txt","w")

i = 0

readFile.readline()
countries = {}
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

	fields = line.split('\t')

	countries[fields[2]] = fields[3]




for country in countries.keys():

	editLine = ""

	country = country.replace('"',' ')
	countryCode = countries[country].replace('"',' ')

	editLine += '"' + country.strip() + '"' + "," + '"' + countryCode.strip() + '"'

	writeFile.write(editLine+'\n')




readFile.close()
writeFile.close()




readFile = open("36fcadac-d77a-4291-8ff3-07fba3014e8c_Data.txt","r")
writeFile = open("dataForYearsTable.txt","w")

i = 0

columns = readFile.readline().split('\t')
decades = {}
halfDecades = {}

dec = 1
halfDec = 1

result = int(columns[4].split()[0]) + 4
halfDecade = columns[4].split()[0][-2:] + "-" + str(result)[-2:]

decade = int(columns[4].split()[0]) 

for year in range(4,len(columns)):

	if halfDec > 5:

		halfDec = 1
		result = int(columns[year].split()[0]) + 4
		halfDecade = columns[year].split()[0][-2:] + "-" + str(result)[-2:]

	if dec > 10:

		dec = 1
		decade = int(columns[year].split()[0])
<<<<<<< HEAD

=======
		
>>>>>>> 103b7bbd8424fefe57252f7333458adb635b6204
	halfDecades[columns[year].split()[0].strip()] = halfDecade
	decades[columns[year].split()[0].strip()] = decade

	halfDec += 1
	dec += 1

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
		editLine1 = editLine + '"' + year.strip() + '"' + "," + '"' + fields[j].strip() + '"' + "," + '"' + str(halfDecades[year.strip()]).strip() + '"' + "," + '"' + str(decades[year.strip()]).strip() + '"'

		writeFile.write(editLine1+'\n')




readFile.close()
writeFile.close()
