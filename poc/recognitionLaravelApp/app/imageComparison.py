import math, operator
from PIL import Image
from functools import reduce
import sys


controlImageName = "C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/"+str(sys.argv[1])+".png"

newImage = Image.open("C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/"+str(sys.argv[2])+".png").histogram()

controlImage = Image.open(controlImageName).histogram()  

rms = math.sqrt(reduce(operator.add,
	map(lambda a,b: (a-b)**2, newImage, controlImage))/len(newImage))

print(rms)