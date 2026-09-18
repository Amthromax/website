import os
import base64
from PIL import Image, ImageDraw

source_path = r'C:\Users\KISHOREKANTH\.gemini\antigravity\brain\ba2e6e17-d654-4d70-824b-57e70d727227\media__1789716861924.png'
target_dir = r'd:\Amthromax Website\public'

img = Image.open(source_path).convert('RGBA')

# 1. Crop exact content bounding box
bbox = img.getbbox()
if bbox:
    cropped = img.crop(bbox)
else:
    cropped = img

# 2. Resize cropped icon to fit nicely inside a 128x128 badge with 8px padding
badge_size = 128
target_icon_size = 112 # max size inside 128px badge

w, h = cropped.size
scale = target_icon_size / max(w, h)
new_w = int(w * scale)
new_h = int(h * scale)

icon_resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)

# Create high-contrast dark obsidian square badge for maximum visibility on all tabs
badge = Image.new('RGBA', (badge_size, badge_size), (10, 11, 14, 255))

# Optional: Draw rounded corners or sleek border
offset_x = (badge_size - new_w) // 2
offset_y = (badge_size - new_h) // 2

# Paste the custom 3D white asterisk logo directly into the center
badge.paste(icon_resized, (offset_x, offset_y), icon_resized)

# Save high-res favicons
fav_png_path = os.path.join(target_dir, 'favicon.png')
fav_ico_path = os.path.join(target_dir, 'favicon.ico')
fav_apple_path = os.path.join(target_dir, 'apple-touch-icon.png')
fav_svg_path = os.path.join(target_dir, 'favicon.svg')

badge.save(fav_png_path, 'PNG')
badge.save(fav_apple_path, 'PNG')
badge.save(fav_ico_path, format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64), (128,128)])

# Also create transparent full-bleed version for vector SVG
transparent_icon = Image.new('RGBA', (badge_size, badge_size), (0, 0, 0, 0))
transparent_icon.paste(icon_resized, (offset_x, offset_y), icon_resized)

# Save SVG using dark badge for high contrast
with open(fav_png_path, 'rb') as f:
    b64_str = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="20" fill="#0a0b0e"/>
  <image href="data:image/png;base64,{b64_str}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
</svg>'''

with open(fav_svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Custom 3D Asterisk Favicon Badge generated successfully at maximum size and contrast!")
