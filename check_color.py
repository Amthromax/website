import os
import glob
from PIL import Image, ImageStat

for p in glob.glob("public/*.png"):
    try:
        if "favicon" in p or "icon" in p: continue
        img = Image.open(p).convert('HSV')
        stat = ImageStat.Stat(img)
        file_size = os.path.getsize(p)
        print(f"{p}: saturation = {stat.mean[1]:.2f}, size = {file_size}")
    except Exception as e:
        print(p, e)
