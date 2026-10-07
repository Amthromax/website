import os

workspace = r"d:\Amthromax Website"

file_updates = [
    os.path.join(workspace, "src", "components", "blog", "BlogPage.tsx"),
    os.path.join(workspace, "src", "components", "blog", "BlogPostDetail.tsx"),
    os.path.join(workspace, "src", "components", "blog", "PublishPage.tsx"),
    os.path.join(workspace, "src", "App.tsx")
]

for filepath in file_updates:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content.replace("amthromax_blog_posts", "amthromax_posts_v2")

        if content != new_content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated file: {os.path.relpath(filepath, workspace)}")
        else:
            print(f"No changes needed: {os.path.relpath(filepath, workspace)}")

print("\nCache invalidation script complete.")
