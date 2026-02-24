# Añade og:image y twitter:image a articulos-interes que tienen og:url pero no og:image
import os
import re

ARTICULOS_DIR = os.path.join(os.path.dirname(__file__), "..", "articulos-interes")
OG_IMAGE_LINE = '<meta content="https://zoovettravel.com/images/zoovet-travel-hero.png" property="og:image"/>'
TWITTER_IMAGE_LINE = '<meta content="https://zoovettravel.com/images/zoovet-travel-hero.png" name="twitter:image"/>'

def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if "property=\"og:image\"" in content or "property='og:image'" in content:
        return False
    if "property=\"og:url\"" not in content:
        return False
    # Insert og:image after og:url line
    content = re.sub(
        r'(<meta content="https://zoovettravel\.com/articulos-interes/[^"]+" property="og:url"/>)\n',
        r'\1\n' + OG_IMAGE_LINE + '\n',
        content,
        count=1
    )
    # Insert twitter:image after twitter:title if not present
    if "name=\"twitter:image\"" not in content and "name='twitter:image'" not in content:
        content = re.sub(
            r'(<meta content="[^"]*" name="twitter:title"/>)\n(\s*<link )',
            r'\1\n' + TWITTER_IMAGE_LINE + r'\n\2',
            content,
            count=1
        )
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return True

count = 0
for name in os.listdir(ARTICULOS_DIR):
    if name.endswith(".html"):
        path = os.path.join(ARTICULOS_DIR, name)
        if process_file(path):
            count += 1
            print("Updated:", name)
print("Total updated:", count)
