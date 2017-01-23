import cv2
import numpy as np
from matplotlib import pyplot as plt


img = cv2.imread('C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/image1.png', cv2.IMREAD_GRAYSCALE	)
# cv2.imshow("image", img);
# cv2.waitKey(0)
# cv2.destroyAllWindows
#cv2.imwrite("name", img);

cap = cv2.VideoCapture(0)
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640,480))
while True:
 	ret, frame = cap.read()

 	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
 	out.write(frame)

 	cv2.imshow("frame", frame)

 	cv2.imshow("gray", gray)

 	if cv2.waitKey(1) & 0xFF == ord("q"):
 		break

cap.release()
out.release()
cv2.destroyAllWindows