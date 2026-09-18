import os
import base64
from PIL import Image

source_path = r'C:\Users\KISHOREKANTH\.gemini\antigravity\brain\ba2e6e17-d654-4d70-824b-57e70d727227\media__1789716861924.png'
target_dir = r'd:\Amthromax Website\public'

img = Image.open(source_path).convert('RGBA')

# 1. Crop exact content bounding box of the logo
bbox = img.getbbox()
if bbox:
    cropped = img.crop(bbox)
else:
    cropped = img

# 2. Resize to square with 100% TRANSPARENT background (no black box!)
w, h = cropped.size
max_dim = max(w, h)

# Add minimal 2% padding so logo touches edges cleanly
pad = int(max_dim * 0.02)
canvas_size = max_dim + pad * 2

# Create transparent image canvas (alpha = 0)
transparent_canvas = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))

offset_x = pad + (max_dim - w) // 2
offset_y = pad + (max_dim - h) // 2

transparent_canvas.paste(cropped, (offset_x, offset_y), cropped)

# 3. Save as favicon.png, apple-touch-icon.png, and favicon.ico
fav_png_path = os.path.join(target_dir, 'favicon.png')
fav_ico_path = os.path.join(target_dir, 'favicon.ico')
fav_apple_path = os.path.join(target_dir, 'apple-touch-icon.png')
fav_svg_path = os.path.join(target_dir, 'favicon.svg')

# Resize to standard sizes
fav_resized = transparent_canvas.resize((128, 128), Image.Resampling.LANCZOS)

fav_resized.save(fav_png_path, 'PNG')
fav_resized.save(fav_apple_path, 'PNG')
fav_resized.save(fav_ico_path, format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64), (128,128)])

# 4. Generate pure transparent SVG (no background rect!)
with open(fav_png_path, 'rb') as f:
    b64_str = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <image href="data:image/png;base64,{b64_str}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
</svg>'''

with open(fav_svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Transparent background favicon generated successfully!")
