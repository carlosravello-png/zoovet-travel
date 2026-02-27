import os
import xml.etree.ElementTree as ET

def verify_sitemap_strict():
    tree = ET.parse('sitemap.xml')
    root = tree.getroot()
    ns = {'s': 'https://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}

    urls_in_sitemap = set()
    
    for url in root.findall('s:url', ns):
        loc = url.find('s:loc', ns)
        if loc is not None:
            path = loc.text.replace('https://zoovettravel.com/', '')
            if not path: path = "index.html"
            urls_in_sitemap.add(path)
        
        for link in url.findall('xhtml:link', ns):
            href = link.attrib.get('href', '')
            path_link = href.replace('https://zoovettravel.com/', '')
            if not path_link: path_link = "index.html"
            urls_in_sitemap.add(path_link)

    print(f"URLs in Sitemap: {len(urls_in_sitemap)}")

    # 1. Check physical files STRICTLY
    physical_htmls = set()
    for d in ['.', 'articles', 'zoopedia', 'articulos-interes']:
        if os.path.exists(d):
            for file in os.listdir(d):
                if file.endswith('.html') and not file.startswith('original_') and not file.startswith('google'):
                    path = os.path.join(d, file).replace('\\', '/')
                    if path.startswith('./'): path = path[2:]
                    physical_htmls.add(path)

    print(f"Physical valid HTMLs: {len(physical_htmls)}")

    missing_in_physical = urls_in_sitemap - physical_htmls
    missing_in_sitemap = physical_htmls - urls_in_sitemap

    print("\n--- EN SITEMAP PERO NO FISICOS (o diferencia de mayúsculas/minúsculas) ---")
    for m in sorted(missing_in_physical):
        print(m)

    print("\n--- FISICOS PERO NO EN SITEMAP ---")
    for m in sorted(missing_in_sitemap):
        print(m)

    # Let's also check canonical and hreflang tags inside physical HTMLs
    malformed_tags = []
    for ph in physical_htmls:
        with open(ph, 'r', encoding='utf-8') as f:
            content = f.read()
            # simple check: does the canonical match expected sitemap URL?
            pass # we'll inspect the lists first

if __name__ == "__main__":
    verify_sitemap_strict()
