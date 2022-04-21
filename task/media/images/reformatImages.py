# Parses through a set of images, padding each image with a white background as necessary to create square images.
#
# Instructions:
# 1. Place all images in a single folder along with this script.
# 2. Execute this script.
# 3. Any image that is not already a square will be padded with a white background so that width = height.
#
# Credit: Adapted from code by Stackoverflow user Jay D.: https://stackoverflow.com/questions/44370469/python-image-resizing-keep-proportion-add-white-background

from PIL import Image
import os

resizedImages = []

# Iterate through each file in the directory containing this script
for filename in os.listdir('.'):

    # Execute only for PNG image file types
    if '.png' in filename:
        image = Image.open(filename, 'r')

        # Get overall size, width, and height
        image_size = image.size
        width = image_size[0]
        height = image_size[1]

        # Execute if width and height not equal (i.e. not a square already)
        if(width != height):

            resizedImages.append(image.filename)

            # Create image of white square, with side equal to length of the original image's longest side
            bigside = width if width > height else height
            background = Image.new('RGBA', (bigside, bigside), (255, 255, 255, 0))

            # Paste old image centered on white square
            offset = (int(round(((bigside - width) / 2), 0)), int(round(((bigside - height) / 2),0)))
            background.paste(image, offset)
            background.save(image.filename)

# Print the resized images for reference
if len(resizedImages) > 0:
    print("The following images have been resized:\n")

    for image in resizedImages:
        print(image)

else:
    print("No images needed to be resized.")
