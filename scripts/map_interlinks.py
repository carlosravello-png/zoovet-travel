import os
import re

# Directorios a escanear (versiones en español)
dirs_to_scan = ['../articulos-interes', '../zoopedia']

# Mapa de Pilares (Artículos Científicos)
pillars = {
    "Art1_Serologia": {
        "url": "../articles/zoovet_article_v2.html",
        "keywords": ["serología", "rnatt", "rffit", "favn", "anticuerpos neutralizantes", "titulo de rabia", "título de rabia", "extracción de muestra"]
    },
    "Art3_Braquicefalos": {
        "url": "../articles/zoovet_article3_braquicefalos_ES.html",
        "keywords": ["braquicéfalo", "boas", "pug", "bulldog", "hocico chato", "obstrucción de vías respiratorias", "respiratorio"]
    },
    "Art4_Desparasitacion": {
        "url": "../articles/zoovet_art4_desparasitacionES.html",
        "keywords": ["desparasitación", "tratamiento antiparasitario", "gusano barrenador", "cochliomyia", "echinococcus", "tenia"]
    },
    "Art5_Estres": {
        "url": "../articles/zoovet_art5_estres-metabolico-ES.html",
        "keywords": ["estrés", "eje intestino-cerebro", "psicobióticos", "metabolismo", "taquipnea", "jadeo", "estrés de viaje"]
    },
    "Art6_Microchip": {
        "url": "../articles/zoovet_art6_microchip-ES.html",
        "keywords": ["microchip", "iso 11784", "iso 11785", "identificación electrónica", "lectura de chip"]
    },
    "Art7_Jetlag": {
        "url": "../articles/zoovet_art7_jetlag-ES.html",
        "keywords": ["jet lag", "ritmos circadianos", "huso horario", "sueño", "melatonina"]
    },
    "Art8_Hipobaria": {
        "url": "../articles/zoovet_art8_hipobaria-ES.html",
        "keywords": ["hipobaria", "bodega", "presión de cabina", "oxígeno", "bodega presurizada", "bodega climatizada", "bodega del avión"]
    },
    "Art9_Vacunacion": {
        "url": "../articles/zoovet_art9_certificados-vacunacion-ES.html",
        "keywords": ["cartilla de vacunación", "historial de vacunas", "certificado de vacunación", "vacuna expirada", "vacuna vigente"]
    },
    "Art10_Salud": {
        "url": "../articles/zoovet_art10_certificado-salud-ES.html",
        "keywords": ["certificado de salud", "certificado sanitario", "inspección clínica", "examen clínico", "certificado veterinario", "csi"]
    },
    "Art11_Cuarentena": {
        "url": "../articles/zoovet_art11_cuarentena-ES.html",
        "keywords": ["cuarentena", "aislamiento", "instalación de cuarentena", "post-llegada"]
    },
    "Art12_Expediente": {
        "url": "../articles/zoovet_art12_expediente-ES.html",
        "keywords": ["expediente", "trazabilidad", "cadena documental", "error documentario", "senasa", "trámites de exportación"]
    }
}

# Archivos a ignorar o ya mapeados en ES
ignore_files = ['index.html', 'index-en.html', 'index-fr.html', 'llevar_gato_estados_unidos_desde_peru_guia_2026_editorial_v2.html', 'eeuu.html']

def extract_text(html_content):
    # Elimina todo el javascript y css
    text = re.sub(r'<script.*?</script>', '', html_content, flags=re.DOTALL)
    text = re.sub(r'<style.*?</style>', '', text, flags=re.DOTALL)
    # Ignora el header (menus) y footer para evitar falsos positivos
    text = re.sub(r'<header.*?</header>', '', text, flags=re.DOTALL)
    text = re.sub(r'<footer.*?</footer>', '', text, flags=re.DOTALL)
    # Extrae el texto real
    text = re.sub(r'<[^>]+>', ' ', text)
    return text.lower()

def scan():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    report = []
    
    for d in dirs_to_scan:
        if not os.path.exists(d): continue
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.html') and not file.endswith("-en.html") and not file.endswith("-fr.html") and not file.endswith("EN.html") and not file.endswith("FR.html") and not "FR" in file and not "EN" in file and file not in ignore_files:
                    path = os.path.join(root, file)
                    try:
                        with open(path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        text_to_search = extract_text(content)
                        
                        # Buscar los enlaces existentes a "articles/"
                        existing_links = re.findall(r'href=[\'"]\.\./articles/([^\'"]+)[\'"]', content)
                        
                        opportunities = []
                        for pillar_name, p_data in pillars.items():
                            link_filename = p_data["url"].split("/")[-1]
                            
                            # Si ya está enlazado, lo saltamos
                            if link_filename in existing_links:
                                continue
                            
                            # Si hay coincidencia de keywords en el texto
                            matched = []
                            for kw in p_data["keywords"]:
                                if kw in text_to_search:
                                    matched.append(kw)
                            
                            if matched:
                                opportunities.append(f"  -> {pillar_name} (Matches: {', '.join(matched)})")
                                
                        if opportunities:
                            report.append(f"\n[{file}]")
                            report.extend(opportunities)
                            
                    except Exception as e:
                        print(f"Error procesando {file}: {e}")
                        
    with open("INTERLINKING_OPPORTUNITIES.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(report))
        print("Reporte generado en INTERLINKING_OPPORTUNITIES.txt")

if __name__ == "__main__":
    scan()
