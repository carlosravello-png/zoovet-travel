# Añade Open Graph completo a fichas zoopedia que no tienen og:url
import os
import re

ZOOPEDIA_DIR = os.path.join(os.path.dirname(__file__), "..", "zoopedia")

def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if "property=\"og:url\"" in content:
        return False
    if "index" in os.path.basename(path) and ("index-en" in path or "index-fr" in path or path.endswith("index.html")):
        return False
    # Extract canonical URL
    m_canonical = re.search(r'<link rel="canonical" href="(https://zoovettravel\.com/zoopedia/[^"]+)"', content)
    if not m_canonical:
        return False
    canonical_url = m_canonical.group(1)
    # Extract title
    m_title = re.search(r'<title>([^<]+)</title>', content)
    title = m_title.group(1) if m_title else "Zoovet Travel"
    # Extract meta description
    m_desc = re.search(r'<meta name="description" content="([^"]+)"', content)
    desc = m_desc.group(1) if m_desc else ""
    if len(desc) > 160:
        desc = desc[:157] + "..."
    # Extract image from JSON-LD
    m_img = re.search(r'"image":"(https://zoovettravel\.com/images/ficha-[^"]+\.jpg)"', content)
    og_image = m_img.group(1) if m_img else "https://zoovettravel.com/images/zoovet-travel-hero.png"
    og_block = '''  <meta property="og:type" content="article">
  <meta property="og:url" content="%s">
  <meta property="og:title" content="%s">
  <meta property="og:description" content="%s">
  <meta property="og:image" content="%s">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="%s">
  <meta name="twitter:description" content="%s">
  <meta name="twitter:image" content="%s">
''' % (canonical_url, title.replace('"', '&quot;'), desc.replace('"', '&quot;'), og_image,
       title.replace('"', '&quot;')[:70], (desc[:100] + "..." if len(desc) > 100 else desc).replace('"', '&quot;'), og_image)
    # Insert after robots line
    content = re.sub(
        r'(<meta name="robots" content="[^"]+">)\n(\s*<script type="application/ld\+json">)',
        r'\1\n' + og_block + r'\2',
        content,
        count=1
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return True

count = 0
for name in sorted(os.listdir(ZOOPEDIA_DIR)):
    if name.endswith(".html") and "index" not in name:
        path = os.path.join(ZOOPEDIA_DIR, name)
        if process_file(path):
            count += 1
            print("Updated:", name)
print("Total updated:", count)
