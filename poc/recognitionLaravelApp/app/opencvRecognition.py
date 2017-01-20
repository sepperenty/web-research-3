import MySQLdb as dbase
import sys
import cv2
import numpy as np
import sys

try:
	db = dbase.connect(host = "localhost", user="root", passwd='root', db='simpsonrecognition')
except Exception as e:
	sys.exit("we can't get in to the database")

newImage = str(sys.argv[1])

cursor = db.cursor()
cursor.execute('SELECT * FROM characters')
result = cursor.fetchall()

correctName = "Niet gevonden"
highestValue = 0;
if result:
	for z in result:
		img_bgr = cv2.imread('../resources/images/'+ z[2] +'.png')
		img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

		#template = cv2.imread('../resources/images/' + newImage + '.jpg', 0)

		seekImage = cv2.imread('../resources/images/' + newImage + '.jpg', 0)
		template = seekImage[40:130, 30:130]

		w, h = template.shape[::-1]

		res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
		
		for val in res:
			for value in val:
				#print(value)
				if(value >= highestValue):
				  	highestValue = value
				  	correctName = z[1]
print(correctName)
print(highestValue)