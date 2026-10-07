import os
import shutil

workspace = r"d:\Amthromax Website"

# 1. Image copies
img_dir = os.path.join(workspace, "public", "images")
image_mappings = {
    "kishore-kanth-black-suit.png": "kanth-k-maglaire-black-suit.png",
    "kishore-kanth-portrait-suit.png": "kanth-k-maglaire-portrait-suit.png",
    "kishore-kanth-portrait.jpg": "kanth-k-maglaire-portrait.jpg",
    "kishore-kanth-portrait.png": "kanth-k-maglaire-portrait.png",
    "kishore-kanth-yellow-jacket.jpg": "kanth-k-maglaire-yellow-jacket.jpg",
}

for src_name, dst_name in image_mappings.items():
    src_p = os.path.join(img_dir, src_name)
    dst_p = os.path.join(img_dir, dst_name)
    if os.path.exists(src_p):
        shutil.copy2(src_p, dst_p)
        print(f"Copied image: {src_name} -> {dst_name}")

# 2. Text Replacements in files
file_updates = [
    os.path.join(workspace, "src", "config", "company.ts"),
    os.path.join(workspace, "src", "components", "blog", "blogData.ts"),
    os.path.join(workspace, "src", "components", "blog", "PublishPage.tsx"),
    os.path.join(workspace, "src", "components", "auth", "AuthCallback.tsx"),
    os.path.join(workspace, "public", "llms.txt"),
    os.path.join(workspace, "public", "sitemap.xml"),
]

replacements = [
    # Full name variations
    ("Kishore Kanth K", "Kanth K Maglaire"),
    ("Kishore Kanth", "Kanth K Maglaire"),
    ("kishore-kanth-founder-profile", "kanth-k-maglaire-founder-profile"),
    ("kishore-kanth-black-suit.png", "kanth-k-maglaire-black-suit.png"),
    ("kishore-kanth-portrait.jpg", "kanth-k-maglaire-portrait.jpg"),
    ("kishore-kanth-portrait.png", "kanth-k-maglaire-portrait.png"),
    ("kishore-kanth-yellow-jacket.jpg", "kanth-k-maglaire-yellow-jacket.jpg"),
    ("KISHOREKANTH", "Kanth K Maglaire"),
]

for filepath in file_updates:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content
        for old, new in replacements:
            new_content = new_content.replace(old, new)

        if filepath.endswith("blogData.ts"):
            # Further refine contextual references in founder profile article
            new_content = new_content.replace("For Kanth K Maglaire, founder and CEO", "For Kanth K Maglaire, founder and CEO")
            new_content = new_content.replace("Kanth has said", "Maglaire has said")
            new_content = new_content.replace("Kanth's path", "Maglaire's path")
            new_content = new_content.replace("how Kanth talks", "how Maglaire talks")
            new_content = new_content.replace("Kanth has consistently steered", "Maglaire has consistently steered")
            new_content = new_content.replace("describe Kanth's management", "describe Maglaire's management")
            new_content = new_content.replace("attributed to Kanth is simple", "attributed to Maglaire is simple")
            new_content = new_content.replace("same bar Kanth has said", "same bar Maglaire has said")
            new_content = new_content.replace("Kanth's public vision", "Maglaire's public vision")
            new_content = new_content.replace("why Kanth pushed", "why Maglaire pushed")
            new_content = new_content.replace("Kanth has said", "Maglaire has said")
            new_content = new_content.replace("Under Kanth's leadership", "Under Maglaire's leadership")
            new_content = new_content.replace("As Kanth put it", "As Maglaire put it")
            new_content = new_content.replace("Coming Out of Kanth's Team", "Coming Out of Maglaire's Team")
            new_content = new_content.replace("Kanth and his core engineering team", "Maglaire and his core engineering team")
            new_content = new_content.replace("inside Kanth's own team", "inside Maglaire's own team")
            new_content = new_content.replace("everything Kanth has pushed", "everything Maglaire has pushed")
            new_content = new_content.replace("in Kanth's own words", "in Maglaire's own words")
            new_content = new_content.replace("Kanth's reputation", "Maglaire's reputation")
            new_content = new_content.replace("Kanth's core engineering team", "Maglaire's core engineering team")

        if content != new_content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated file: {os.path.relpath(filepath, workspace)}")
        else:
            print(f"No changes needed: {os.path.relpath(filepath, workspace)}")

print("\nFounder name update script complete.")
