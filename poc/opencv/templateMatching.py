import MySQLdb
import cv2
import numpy as np

i = 1



img_bgr = cv2.imread('frame2.jpg')
img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

template = cv2.imread('image2.png', 0)

w, h = template.shape[::-1]

res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
threshhold = 0.7
loc = np.where(res >= threshhold)
def inPicture():
	istrue = 0
	for pt in zip(*loc[::-1]):
		cv2.rectangle(img_bgr, pt, (pt[0]+w, pt[1]+h), (0, 255,255), 2)
		istrue = 1
	return istrue

print(inPicture())

cv2.imshow('detected', img_bgr)
cv2.imshow('img_gray', img_gray)
cv2.waitKey(0)
cv2.destroyAllWindows()