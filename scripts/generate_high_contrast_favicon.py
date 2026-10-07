import os
from PIL import Image

def build_favicons():
    workspace = r"d:\Amthromax Website"
    src_path = os.path.join(workspace, "public", "amthromax_white_logo.png")
    
    if not os.path.exists(src_path):
        raise FileNotFoundError(f"Source logo not found at {src_path}")
        
    img = Image.open(src_path).convert("RGBA")
    
    # Get bounding box of the symbol mark
    bbox = img.getbbox()
    symbol = img.crop(bbox)
    sym_w, sym_h = symbol.size
    
    # Make symbol pure bright white (255, 255, 255) with exact alpha preserved
    r, g, b, a = symbol.split()
    white_channel = Image.new("L", symbol.size, 255)
    pure_symbol = Image.merge("RGBA", (white_channel, white_channel, white_channel, a))
    
    def render_canvas(size, padding_ratio=0.12, bg_rgb=(0, 0, 0)):
        # Solid black background with alpha=255
        canvas = Image.new("RGBA", (size, size), bg_rgb + (255,))
        
        # Calculate available dimension for symbol
        max_dim = int(size * (1.0 - 2.0 * padding_ratio))
        
        # Maintain aspect ratio
        scale = min(max_dim / sym_w, max_dim / sym_h)
        new_w = max(1, int(sym_w * scale))
        new_h = max(1, int(sym_h * scale))
        
        # High quality resize
        resized_symbol = pure_symbol.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center in square canvas
        offset_x = (size - new_w) // 2
        offset_y = (size - new_h) // 2
        
        canvas.paste(resized_symbol, (offset_x, offset_y), resized_symbol)
        return canvas

    # Generate images
    icon_512 = render_canvas(512, padding_ratio=0.14)
    icon_180 = render_canvas(180, padding_ratio=0.14)
    icon_64  = render_canvas(64,  padding_ratio=0.12)
    icon_48  = render_canvas(48,  padding_ratio=0.12)
    icon_32  = render_canvas(32,  padding_ratio=0.10)
    icon_16  = render_canvas(16,  padding_ratio=0.08)
    
    # Target files to write
    outputs = {
        os.path.join(workspace, "public", "icon.png"): icon_512,
        os.path.join(workspace, "public", "icon-512.png"): icon_512,
        os.path.join(workspace, "public", "favicon.png"): icon_64,
        os.path.join(workspace, "public", "apple-touch-icon.png"): icon_180,
        os.path.join(workspace, "public", "icon-192.png"): render_canvas(192, padding_ratio=0.14),
    }
    
    for path, image in outputs.items():
        image.save(path, format="PNG")
        print(f"Saved: {path} ({image.size[0]}x{image.size[1]})")

    # Also save ICO for favicon.ico compatibility
    ico_path = os.path.join(workspace, "public", "favicon.ico")
    icon_32.save(ico_path, format="ICO", sizes=[(32, 32), (16, 16)])
    print(f"Saved: {ico_path}")

    # Inspect 16x16 and 32x32 pixel values to verify symbol legibility
    print("\nVisual verification at 16x16:")
    pixels_16 = list(icon_16.getdata())
    white_count_16 = sum(1 for p in pixels_16 if p[0] > 200 and p[1] > 200 and p[2] > 200)
    print(f"16x16 canvas total pixels: 256, white symbol pixels: {white_count_16} ({white_count_16/256*100:.1f}%)")

    print("\nVisual verification at 32x32:")
    pixels_32 = list(icon_32.getdata())
    white_count_32 = sum(1 for p in pixels_32 if p[0] > 200 and p[1] > 200 and p[2] > 200)
    print(f"32x32 canvas total pixels: 1024, white symbol pixels: {white_count_32} ({white_count_32/1024*100:.1f}%)")

if __name__ == "__main__":
    build_favicons()
