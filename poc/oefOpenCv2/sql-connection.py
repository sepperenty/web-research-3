import MySQLdb as dbase
import sys
import cv2
import numpy as np

try:
	db = dbase.connect(host = "localhost", user="root", passwd='root', db='simpsonrecognition')
except Exception as e:
	sys.exit("we can't get in to the database")

cursor = db.cursor()
cursor.execute('SELECT * FROM characters')
result = cursor.fetchall()

correctName = "Niet gevonden"
highestValue = 0;
if result:
	for z in result:
		img_bgr = cv2.imread('images/'+ z[2] +'.png')
		img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

		template = cv2.imread('NmFkMThmNGExODY3OGVlMDVkOTY2MWU2OGJmZmZkYTg.jpg', 0)

		w, h = template.shape[::-1]

		res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
		threshhold = 0  
		loc = np.where(res >= threshhold)
		if(res >= threshhold):
			if(highestValue < res):
				highestValue = res
				correctName = z[1]
print(correctName + "    " + str(highestValue))