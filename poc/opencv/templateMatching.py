import MySQLdb as dbase
import sys
import cv2
import numpy as np
import sys

# i = 1



# img_bgr = cv2.imread('frame2.jpg')
# img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

# seekImage = cv2.imread('marge.png', 0)

# template = seekImage[40:130, 30:130]

# template = cv2.imread('image1.png', 0)


# w, h = template.shape[::-1]

# res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
# threshhold = 0.7

# loc = np.where(res >= threshhold)
# def inPicture():
# 	istrue = 0
# 	for pt in zip(*loc[::-1]):
# 		cv2.rectangle(img_bgr, pt, (pt[0]+w, pt[1]+h), (0, 255,255), 2)
# 		istrue = 1
# 	return res

# print(inPicture())

# cv2.imshow('detected', img_bgr)
# #cv2.imshow('img_gray', img_gray)
# cv2.imshow('seekimage', seekImage);
# cv2.imshow('template', template);
# cv2.waitKey(0)
# cv2.destroyAllWindows()

try:
	db = dbase.connect(host = "localhost", user="root", passwd='root', db='simpsonrecognition')
except Exception as e:
	sys.exit("we can't get in to the database")

#newImage = str(sys.argv[1])

cursor = db.cursor()
cursor.execute('SELECT * FROM characters')
result = cursor.fetchall()

correctName = "Niet gevonden"
highestValue = 0;
if result:
	for z in result:
		img_bgr = cv2.imread("images/" + z[2] +'.png')
		img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

		seekImage = cv2.imread('marge.png', 0)
		template = seekImage[40:130, 30:130]
		
		# template = cv2.imread('marge.png', 0)

		w, h = template.shape[::-1]

		res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
		
		for val in res:
			for value in val:
				#print(value)
				if(value >= highestValue):
				  	highestValue = value
				  	correctName = z[1]
		threshhold = 0.7
		loc = np.where(res >= threshhold)
		found = 0
		for pt in zip(*loc[::-1]):
			cv2.rectangle(img_bgr, pt, (pt[0]+w, pt[1]+h), (0, 255,255), 2)
			found = 1
		if(found):
			cv2.imshow("location", img_bgr)


print(correctName)
print(highestValue)
cv2.waitKey(0)
cv2.destroyAllWindows()
