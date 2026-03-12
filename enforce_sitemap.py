import os
import re
import xml.etree.ElementTree as ET

def enforce_sitemap_hreflangs():
    tree = ET.parse('sitemap.xml')
    root = tree.getroot()
    ns = {'s': 'https://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}

    # Build a master dict of the expected tags
    # mapping physical path -> block of canonical and hreflang tags
    expected_tags = {}
    
    # helper: group urls by their translation set
    url_groups = []
    
    for url in root.findall('s:url', ns):
        loc = url.find('s:loc', ns).text
        links = url.findall('xhtml:link', ns)
        
        group = {'loc': loc, 'es': '', 'en': '', 'fr': '', 'x-default': ''}
        for link in links:
            hl = link.attrib.get('hreflang')
            href = link.attrib.get('href')
            if hl in group:
                group[hl] = href
        
        # If no links defined, assume loc is just its own canonical
        if not group['es']:
            # fallback logic is not really needed as sitemap is perfect
            pass
            
        url_groups.append(group)
        
    for group in url_groups:
        loc = group['loc']
        path = loc.replace('https://zoovettravel.com/', '')
        if not path: path = "index.html"
        
        # Build strict HTML block
        block = f'  <link rel="canonical" href="{loc}">\n'
        if group['es']:
            block += f'  <link rel="alternate" hreflang="es" href="{group["es"]}">\n'
        if group['en']:
            block += f'  <link rel="alternate" hreflang="en" href="{group["en"]}">\n'
        if group['fr']:
            block += f'  <link rel="alternate" hreflang="fr" href="{group["fr"]}">\n'
        if group['x-default']:
            block += f'  <link rel="alternate" hreflang="x-default" href="{group["x-default"]}">\n'
            
        expected_tags[path] = block.strip()
        
        # also populate for the translations
        for hl, href in group.items():
            if hl != 'loc' and href:
                p = href.replace('https://zoovettravel.com/', '')
                if not p: p = "index.html"
                
                b2 = f'  <link rel="canonical" href="{href}">\n'
                if group['es']: b2 += f'  <link rel="alternate" hreflang="es" href="{group["es"]}">\n'
                if group['en']: b2 += f'  <link rel="alternate" hreflang="en" href="{group["en"]}">\n'
                if group['fr']: b2 += f'  <link rel="alternate" hreflang="fr" href="{group["fr"]}">\n'
                if group['x-default']: b2 += f'  <link rel="alternate" hreflang="x-default" href="{group["x-default"]}">\n'
                expected_tags[p] = b2.strip()

    # Now iterate all files and apply
    for file_path, new_block in expected_tags.items():
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Regex to find everything from canonical down to the last alternate
            # First, strip out all existing canonical and alternate links
            content = re.sub(r'<link[^>]*rel=["\']canonical["\'][^>]*>\s*', '', content)
            content = re.sub(r'<link[^>]*rel=["\']alternate["\'][^>]*hreflang=[^>]*>\s*', '', content)
            
            # Find a good place to inject (after <title> or <link rel="apple-touch-icon"...>)
            if '<link rel="apple-touch-icon"' in content:
                content = re.sub(r'(<link rel="apple-touch-icon"[^>]*>\s*)', r'\1\n' + new_block + '\n\n', content, count=1)
            elif '</title>' in content:
                content = re.sub(r'(</title>\s*)', r'\1\n' + new_block + '\n\n', content, count=1)
            else:
                content = re.sub(r'(</head>)', new_block + r'\n\1', content, count=1)
                
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
    print(f"Hreflang y Canonical estandarizados en {len(expected_tags)} rutas según sitemap.")

if __name__ == "__main__":
    enforce_sitemap_hreflangs()
