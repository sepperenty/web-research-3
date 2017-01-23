import MySQLdb as dbase
import sys
import cv2
import numpy as np
import sys

correctName = "Niet gevonden"
highestValue = 0;


img_bgr = cv2.imread("images/image2.png")
img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

seekImage = cv2.imread('images/image2.png', 0)
template = seekImage[20:180, 20:130]


height, width = template.shape[:2]
#resize = cv2.resize(template,(2*width, 2*height), interpolation = cv2.INTER_CUBIC)
		
		#template = cv2.imread('bart.jpg', 0)

w, h = template.shape[::-1]

res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
		

threshhold = 0.7
loc = np.where(res >= threshhold)
found = 0
for pt in zip(*loc[::-1]):
	cv2.rectangle(img_bgr, pt, (pt[0]+w, pt[1]+h), (0, 255,255), 2)
	
		

cv2.imshow("result", img_bgr)
cv2.imshow("orig", template)
print(correctName)
print(highestValue)
cv2.waitKey(0)
cv2.destroyAllWindows()
