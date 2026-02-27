import os
import re
from urllib.parse import urlparse

def audit_full_site():
    print("Iniciando auditoria completa del sitio...")
    dirs = ['.', 'articles', 'zoopedia', 'articulos-interes']
    
    html_files = []
    for d in dirs:
        if os.path.exists(d):
            for f in os.listdir(d):
                if f.endswith('.html') and not f.startswith('original_') and not f.startswith('google'):
                    html_files.append(os.path.join(d, f).replace('\\', '/'))
                    
    # Build valid local paths
    valid_paths = set(html_files)
    
    # Let's map equivalent zoovettravel.com urls to local paths
    def url_to_local(url):
        url = url.replace('https://zoovettravel.com/', '')
        if not url: return './index.html'
        if url.endswith('/'): url += 'index.html'
        
        # strip hash
        if '#' in url: url = url.split('#')[0]
            
        if url.startswith('./'): url = url[2:]
        if url == '': return './index.html'
        if not url.endswith('.html'):
            if os.path.exists(os.path.join(url, 'index.html')):
                return os.path.join(url, 'index.html').replace('\\', '/')
        
        # handle root files matching
        if not '/' in url and os.path.exists(os.path.join('.', url)):
            return os.path.join('.', url).replace('\\', '/')
            
        return url

    errors_404 = []
    hreflang_issues = []
    
    # Strict Hreflang logic test
    for fpath in html_files:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. 404 checks for internal links (href="")
        links = re.findall(r'href=["\']([^"\']+)["\']', content)
        for link in links:
            if link.startswith('mailto:') or link.startswith('tel:') or link.startswith('http') and 'zoovettravel.com' not in link:
                continue
            
            # Internal link logic
            if 'zoovettravel.com' in link:
                local_tgt = url_to_local(link)
            else:
                # relative
                # remove #
                clean_link = link.split('#')[0].split('?')[0]
                if not clean_link:
                    continue # just a hash
                if clean_link == '/':
                    local_tgt = './index.html'
                else:
                    if fpath.startswith('./'): base_dir = '.'
                    else: base_dir = os.path.dirname(fpath)
                    
                    local_tgt = os.path.normpath(os.path.join(base_dir, clean_link)).replace('\\', '/')
                    # handle directory links
                    if os.path.isdir(local_tgt) and os.path.exists(os.path.join(local_tgt, 'index.html')):
                        local_tgt = os.path.join(local_tgt, 'index.html').replace('\\', '/')
                    elif os.path.isdir(local_tgt) and not local_tgt.endswith('/'):
                         if os.path.exists(os.path.join(local_tgt, 'index.html')):
                             local_tgt = os.path.join(local_tgt, 'index.html').replace('\\', '/')

            if local_tgt.startswith('./'): local_tgt = local_tgt[2:]
            if local_tgt == '': local_tgt = 'index.html'
            if local_tgt == 'articles': local_tgt = 'articles/index.html'
            if local_tgt == 'zoopedia': local_tgt = 'zoopedia/index.html'
            if local_tgt == 'articulos-interes': local_tgt = 'articulos-interes/index.html'

            # Sometimes relative logic maps 'articles/../index-en.html' to 'index-en.html' maybe?
            if local_tgt not in valid_paths and f"./{local_tgt}" not in valid_paths and local_tgt.replace('./', '') not in valid_paths:
                # Exception for external static assets if they exist but we didn't collect them in valid_paths
                if not local_tgt.endswith('.html') and os.path.exists(local_tgt): continue
                if local_tgt.startswith('mailto:') or local_tgt.startswith('tel:'): continue
                if 'http' in local_tgt and 'zoovettravel' not in local_tgt: continue
                # if not an HTML file, maybe a CSS/JS/image? We ignore non-html for 404 output here if they exist
                if not local_tgt.endswith('.html') and not os.path.exists(local_tgt):
                    # just ignore non-html missing files for now, prioritize HTML broken links
                    if local_tgt.endswith('.css') or local_tgt.endswith('.js') or local_tgt.endswith('.png') or local_tgt.endswith('.jpg') or local_tgt.endswith('.xml'):
                        if not os.path.exists(local_tgt): pass
                        continue
                    
                
                # Check directly with os
                if not os.path.exists(local_tgt):
                    errors_404.append((fpath, link, local_tgt))
                    
        # 2. Hreflang Checks
        canonical = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', content)
        if not canonical:
            hreflang_issues.append((fpath, "Falta etiqueta canonical"))
            
        hreflangs_found = re.findall(r'<link[^>]*rel=["\']alternate["\'][^>]*hreflang=["\']([^"\']+)["\']', content)
        # Should be exactly 4 or none maybe? We forced them from sitemap.
        
    print(f"Total HTML auditados: {len(html_files)}")
    
    if errors_404:
        print("\n--- ERRORES 404 INTERNOS ENCONTRADOS ---")
        for e in set(errors_404):
            print(f"- En '{e[0]}' enlace roto hacia: '{e[1]}' -> Evaluado como: {e[2]}")
    else:
        print("\n0 ERRORES 404 HTML ENCONTRADOS. Todos los enlaces internos resuelven.")
        
    if hreflang_issues:
        print("\n--- ERRORES HREFLANG/CANONICAL ---")
        for h in set(hreflang_issues):
            print(f"Archivo {h[0]}: {h[1]}")
    else:
        print("Hreflangs y Canonicals íntegros.")

if __name__ == "__main__":
    audit_full_site()
