from PIL import Image
import sys
img = Image.open('C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/'+str(sys.argv[1])+'.jpg').convert('LA')
img.save('C:/Users/seppe/Documents/virtualHosts/sepperenty/recognitionLaravelApp/resources/images/'+str(sys.argv[2])+'.png')

print("success")