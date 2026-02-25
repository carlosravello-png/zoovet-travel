# Fix missing <div class="scope-box"> after guia-img-lead figure (inserted by insert-guia-images.py)
import os
import re

ARTICULOS_DIR = os.path.join(os.path.dirname(__file__), '..', 'articulos-interes')

for fname in os.listdir(ARTICULOS_DIR):
    if not fname.endswith('.html') or fname == 'index.html':
        continue
    path = os.path.join(ARTICULOS_DIR, fname)
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    if '</figure>' not in html:
        continue
    # Only fix if first </figure> is followed by <strong> without <div class="scope-box"> in between
    after_figure = html.split('</figure>', 1)[1]
    if '<div class="scope-box">' not in after_figure.split('<strong>', 1)[0]:
        # Allow any chars between </figure> and <strong> (e.g. \r\n\x02\r\n from bad insert)
        new_html = re.sub(r'(</figure>)[\s\S]*?(<strong>)', r'\1\n<div class="scope-box">\n\2', html, count=1)
        if new_html != html:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_html)
            print('Fixed:', fname)
