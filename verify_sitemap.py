import os
import xml.etree.ElementTree as ET

def verify_sitemap_alignment():
    tree = ET.parse('sitemap.xml')
    root = tree.getroot()
    ns = {'s': 'https://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}

    urls_in_sitemap = []
    
    for url in root.findall('s:url', ns):
        loc = url.find('s:loc', ns)
        if loc is not None:
            path = loc.text.replace('https://zoovettravel.com/', '')
            if not path: path = "index.html"
            urls_in_sitemap.append(path)
        
        for link in url.findall('xhtml:link', ns):
            href = link.attrib.get('href', '')
            path_link = href.replace('https://zoovettravel.com/', '')
            if not path_link: path_link = "index.html"
            urls_in_sitemap.append(path_link)

    urls_in_sitemap = list(set(urls_in_sitemap))
    
    # 1. Check if files in sitemap exist
    missing_files = []
    for u in urls_in_sitemap:
        if not os.path.exists(u):
            # Try appending index.html if it's a dir
            if os.path.isdir(u) and os.path.exists(os.path.join(u, 'index.html')):
                pass
            else:
                # Sometimes it redirects to index.html or lacks trailing slash
                if u.endswith('/') and os.path.exists(u + 'index.html'):
                    pass
                else:
                    missing_files.append(u)

    print("=== ARCHIVOS EN SITEMAP QUE NO EXISTEN FISICAMENTE ===")
    for m in missing_files:
        print(m)

    # 2. Files in directories that are NOT in sitemap
    print("\n=== HTML FISICOS QUE NO ESTAN EN SITEMAP (POSIBLE DESALINEACION) ===")
    dirs = ['articles', 'zoopedia', 'articulos-interes']
    physical_htmls = []
    for d in dirs:
        if os.path.exists(d):
            for file in os.listdir(d):
                if file.endswith('.html') and not file.startswith('original_') and not file.startswith('google'):
                    path = os.path.join(d, file).replace('\\', '/')
                    physical_htmls.append(path)
                    
    for ph in physical_htmls:
        # Check matching
        if ph not in urls_in_sitemap and ph.replace('index.html', '') not in urls_in_sitemap:
            print(ph)

if __name__ == "__main__":
    verify_sitemap_alignment()
