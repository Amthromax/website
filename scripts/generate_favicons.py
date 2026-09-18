import base64
from PIL import Image

# 1. Load cropped favicon.png
img = Image.open('d:/Amthromax Website/public/favicon.png')

# 2. Save ICO (sizes 16x16, 32x32, 48x48, 64x64, 128x128)
img.save('d:/Amthromax Website/public/favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64), (128,128)])

# 3. Read base64 string
with open('d:/Amthromax Website/public/favicon.png', 'rb') as f:
    b64_data = base64.b64encode(f.read()).decode('utf-8')

# 4. Write new full-scale SVG
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <image href="data:image/png;base64,{b64_data}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
</svg>'''

with open('d:/Amthromax Website/public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Favicons successfully updated and generated at max scale!")
