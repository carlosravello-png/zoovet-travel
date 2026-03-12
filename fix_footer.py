import os
import re

for lang in ['en', 'fr']:
    path = f"c:/Users/RAVELLO CAMACHO/Documents/GitHub/zoovet-travel/zoopedia/index-{lang}.html"
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # remove strictly multiple </footer> tags that are consecutive
        content = re.sub(r'</footer>\s*</footer>', r'</footer>', content)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned {path}")
