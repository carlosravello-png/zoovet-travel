# Añade favicon y apple-touch-icon a todos los HTML que no los tengan
import os
import re

BASE = os.path.join(os.path.dirname(__file__), "..")
FAVICON_BLOCK = '\n  <link rel="icon" type="image/x-icon" href="https://zoovettravel.com/images/favicon.ico">\n  <link rel="apple-touch-icon" href="https://zoovettravel.com/images/apple-touch-icon.png">\n'

def process(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if 'rel="icon"' in content or "rel='icon'" in content:
        return False
    # Insert after </title>
    if "</title>" in content:
        content = content.replace("</title>", "</title>" + FAVICON_BLOCK, 1)
    else:
        return False
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return True

count = 0
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d != "node_modules"]
    for name in files:
        if name.endswith(".html"):
            path = os.path.join(root, name)
            rel = os.path.relpath(path, BASE)
            if process(path):
                count += 1
                print(rel)
print("Total:", count)
