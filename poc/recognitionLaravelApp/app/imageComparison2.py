import cv2
import numpy as np
from matplotlib import pyplot as plt
# img = cv2.imread('C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/template.png',0)
# img2 = img.copy()

# template = cv2.imread('C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/newImageGrayScale.png',0)
# w, h = template.shape[::-1]
# # All the 6 methods for comparison in a list
# methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
#             'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']
# for meth in methods:
#     img = img2.copy()
#     method = eval(meth)
#     # Apply template Matching
#     res = cv2.matchTemplate(img,template,method)
#     min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
#     # If the method is TM_SQDIFF or TM_SQDIFF_NORMED, take minimum
#     if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
#         top_left = min_loc
#     else:
#         top_left = max_loc
#     bottom_right = (top_left[0] + w, top_left[1] + h)
#     cv2.rectangle(img,top_left, bottom_right, 255, 2)
#     plt.subplot(121),plt.imshow(res,cmap = 'gray')
#     plt.title('Matching Result'), plt.xticks([]), plt.yticks([])
#     plt.subplot(122),plt.imshow(img,cmap = 'gray')
#     plt.title('Detected Point'), plt.xticks([]), plt.yticks([])
#     plt.suptitle(meth)
#     plt.show()

img = cv2.imread('C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/newImageGrayScale.png')
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
_,thresh = cv2.threshold(gray,1,255,cv2.THRESH_BINARY)

contours,hierarchy = cv2.findContours(thresh,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
cnt = contours[0]
x,y,w,h = cv2.boundingRect(cnt)

crop = img[y:y+h,x:x+w]
cv2.imwrite('C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/test.png',crop)