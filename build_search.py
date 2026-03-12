import os
import re
import json

def extract_metadata(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    title = ""
    keywords = ""
    lang = "es"

    m_lang = re.search(r'<html[^>]*lang=["\']([^"\']+)["\']', content, re.IGNORECASE)
    if m_lang:
        lang = m_lang.group(1).split('-')[0].lower()
    else:
        if 'en' in path.lower(): lang = 'en'
        elif 'fr' in path.lower(): lang = 'fr'

    m_title = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    if m_title:
        title = m_title.group(1).split('|')[0].strip()

    m_kw = re.search(r'<meta[^>]*name=["\']keywords["\'][^>]*content=["\']([^"\']+)["\']', content, re.IGNORECASE)
    if m_kw:
        keywords = m_kw.group(1)
    
    if not keywords:
        m_desc = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']', content, re.IGNORECASE)
        if m_desc:
            keywords = m_desc.group(1)

    return lang, title, keywords

def build_db():
    dirs = {
        '.': 'Home',
        'zoopedia': 'Zoopedia',
        'articulos-interes': 'Guía Práctica',
        'articles': 'Artículo Científico'
    }
    
    data = []
    
    for d, cat in dirs.items():
        if not os.path.exists(d): continue
        for file in os.listdir(d):
            if file.endswith('.html') and not file.startswith('google') and not file.startswith('original_'):
                # Avoid scanning subdirs recursively here to avoid duplication
                if d == '.' and file not in ['index.html', 'index-en.html', 'index-fr.html']:
                    continue # Only the root indexes

                path = os.path.join(d, file).replace('\\', '/')
                if path.startswith('./'):
                    path = path[2:]
                    
                lang, title, keywords = extract_metadata(path)
                
                if not title: title = file.replace('.html', '').replace('-', ' ')
                
                # Assign categorical title to root index pages for better UX
                if file.startswith('index'):
                    if d == '.':
                        title = "Página Principal" if lang == 'es' else ("Home Page" if lang == 'en' else "Page d'accueil")
                    elif d == 'articles':
                        title = "Índice de Artículos Científicos" if lang == 'es' else ("Index of Scientific Articles" if lang == 'en' else "Index des Articles Scientifiques")
                    elif d == 'zoopedia':
                        title = "Índice de Zoopedia" if lang == 'es' else ("Zoopedia Index" if lang == 'en' else "Index Zoopedia")
                    elif d == 'articulos-interes':
                        title = "Guías Prácticas de Exportación" if lang == 'es' else ("Practical Export Guides" if lang == 'en' else "Guides Pratiques d'Exportation")

                data.append({
                    'title': title.replace(' | Zoovet Travel', ''),
                    'url': path,
                    'category': cat,
                    'keywords': keywords,
                    'lang': lang
                })

    js_content = """// Base de datos de Búsqueda Auto-Generada Multilingüe (100% Alineada al Sitemap)
const rawSearchData = """ + json.dumps(data, indent=2, ensure_ascii=False) + """;

// Filtramos la base de datos automáticamente según el idioma de la página anfitriona
(function() {
  const currentLang = (document.documentElement.lang || 'es').split('-')[0].toLowerCase();
  
  window.searchData = rawSearchData.filter(item => {
    return item.lang === currentLang || item.lang === 'any';
  });
})();
"""

    with open('scripts/search_data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Base de datos alineada con el sitemap ({len(data)} entradas)!")

if __name__ == "__main__":
    build_db()
