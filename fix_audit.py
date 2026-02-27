import os
import re

def fix_broken_links_and_re_audit():
    print("Corrigiendo enlaces rotos identificados...")
    dirs = ['.', 'articles', 'zoopedia', 'articulos-interes']
    
    html_files = []
    for d in dirs:
        if os.path.exists(d):
            for f in os.listdir(d):
                if f.endswith('.html') and not f.startswith('original_') and not f.startswith('google'):
                    html_files.append(os.path.join(d, f).replace('\\', '/'))

    # Known broken link map to their actual filenames in the directory
    # Based on the ls of `articles/`
    replacements = {
        'zoovet_art5_estres-metabolico_ES.html': 'zoovet_art5_estres-metabolico-ES.html',
        'zoovet_art5_estres-metabolico_EN.html': 'zoovet_art5_estres-metabolico-EN.html',
        'zoovet_art5_estres-metabolico_FR.html': 'zoovet_art5_estres-metabolico-FR.html',
        'zoovet_art10_certificado-salud-EN.html': 'zoovet_art10_certificado-salud-EN.html', # wait, this was reported broken. Is it?
        # Let's just do a generic replace for the known estres-metabolico ones
    }
    
    fixed_count = 0
    for fpath in html_files:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # specific string replacements
        content = content.replace('zoovet_art5_estres-metabolico_ES.html', 'zoovet_art5_estres-metabolico-ES.html')
        content = content.replace('zoovet_art5_estres-metabolico_FR.html', 'zoovet_art5_estres-metabolico-FR.html')
        content = content.replace('zoovet_art5_estres-metabolico_EN.html', 'zoovet_art5_estres-metabolico-EN.html')
        
        if content != original_content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            fixed_count += 1
            
    print(f"Archivos corregidos: {fixed_count}")

def audit_full_site():
    print("\nIniciando auditoria completa del sitio...")
    dirs = ['.', 'articles', 'zoopedia', 'articulos-interes']
    
    html_files = []
    for d in dirs:
        if os.path.exists(d):
            for f in os.listdir(d):
                if f.endswith('.html') and not f.startswith('original_') and not f.startswith('google'):
                    html_files.append(os.path.join(d, f).replace('\\', '/'))
                    
    valid_paths = set(html_files)
    
    def url_to_local(url):
        url = url.replace('https://zoovettravel.com/', '')
        if not url: return './index.html'
        if url.endswith('/'): url += 'index.html'
        if '#' in url: url = url.split('#')[0]
        if url.startswith('./'): url = url[2:]
        if url == '': return './index.html'
        if not url.endswith('.html'):
            if os.path.exists(os.path.join(url, 'index.html')):
                return os.path.join(url, 'index.html').replace('\\', '/')
        if not '/' in url and os.path.exists(os.path.join('.', url)):
            return os.path.join('.', url).replace('\\', '/')
        return url

    errors_404 = []
    
    for fpath in html_files:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        links = re.findall(r'href=["\']([^"\']+)["\']', content)
        for link in links:
            # IGNORAR JS TEMPLATES
            if '${match.url}' in link or '${' in link:
                continue
                
            if link.startswith('mailto:') or link.startswith('tel:') or link.startswith('http') and 'zoovettravel.com' not in link:
                continue
            
            if 'zoovettravel.com' in link:
                local_tgt = url_to_local(link)
            else:
                clean_link = link.split('#')[0].split('?')[0]
                if not clean_link:
                    continue
                if clean_link == '/':
                    local_tgt = './index.html'
                else:
                    if fpath.startswith('./'): base_dir = '.'
                    else: base_dir = os.path.dirname(fpath)
                    
                    local_tgt = os.path.normpath(os.path.join(base_dir, clean_link)).replace('\\', '/')
                    if os.path.isdir(local_tgt) and os.path.exists(os.path.join(local_tgt, 'index.html')):
                        local_tgt = os.path.join(local_tgt, 'index.html').replace('\\', '/')

            if local_tgt.startswith('./'): local_tgt = local_tgt[2:]
            if local_tgt == '': local_tgt = 'index.html'
            if local_tgt == 'articles': local_tgt = 'articles/index.html'
            if local_tgt == 'zoopedia': local_tgt = 'zoopedia/index.html'
            if local_tgt == 'articulos-interes': local_tgt = 'articulos-interes/index.html'

            if local_tgt not in valid_paths and f"./{local_tgt}" not in valid_paths and local_tgt.replace('./', '') not in valid_paths:
                if not local_tgt.endswith('.html') and os.path.exists(local_tgt): continue
                if local_tgt.startswith('mailto:') or local_tgt.startswith('tel:'): continue
                if 'http' in local_tgt and 'zoovettravel' not in local_tgt: continue
                if not local_tgt.endswith('.html') and not os.path.exists(local_tgt):
                    if local_tgt.endswith('.css') or local_tgt.endswith('.js') or local_tgt.endswith('.png') or local_tgt.endswith('.jpg') or local_tgt.endswith('.xml'):
                        continue
                        
                if not os.path.exists(local_tgt):
                    errors_404.append((fpath, link, local_tgt))

    if errors_404:
        print("\n--- ERRORES 404 INTERNOS ENCONTRADOS ---")
        for e in set(errors_404):
            print(f"- En '{e[0]}' enlace roto: '{e[1]}' -> Evaluado como: {e[2]}")
    else:
        print("\n0 ERRORES 404 HTML ENCONTRADOS. Todos los enlaces internos resuelven.")

if __name__ == "__main__":
    fix_broken_links_and_re_audit()
    audit_full_site()
