# -*- coding: utf-8 -*-
import os

TAILWIND_MONTSERRAT_HEAD = """<!DOCTYPE html>
<html lang="{lang_code}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#0C789E">
  <title>{title}</title>
  <link rel="icon" type="image/x-icon" href="https://zoovettravel.com/images/favicon.ico">
  <link rel="apple-touch-icon" href="https://zoovettravel.com/images/apple-touch-icon.png">

  <link rel="canonical" href="https://zoovettravel.com/{page_name}">
  <link rel="alternate" hreflang="es" href="https://zoovettravel.com/kennels.html">
  <link rel="alternate" hreflang="en" href="https://zoovettravel.com/kennels-en.html">
  <link rel="alternate" hreflang="fr" href="https://zoovettravel.com/kennels-fr.html">
  <link rel="alternate" hreflang="x-default" href="https://zoovettravel.com/kennels.html">

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://zoovettravel.com/{page_name}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="https://zoovettravel.com/images/og-default.png">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html {{ scroll-behavior: smooth; }}
    body {{ font-family: 'Montserrat', sans-serif; background-color: #F8FAFC; color: #1a2e35; }}
    .btn-zoovet {{ background-color: #0C789E; color: white; transition: all 0.3s ease; }}
    .btn-zoovet:hover {{ background-color: #0a6a8a; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }}
    details > summary {{ list-style: none; }}
    details > summary::-webkit-details-marker {{ display: none; }}
    .servicio-details {{ border: 1px solid rgba(26, 46, 53, 0.12); }}
    .servicio-details[open] {{ border-color: rgba(12, 120, 158, 0.25); }}
    .servicio-chevron {{ transition: transform 0.2s ease; }}
    .servicio-details[open] .servicio-chevron {{ transform: rotate(90deg); }}
  </style>
</head>
<body class="bg-[#F8FAFC] min-h-screen antialiased text-[#1a2e35]">
"""

NAV_TEMPLATE = """
  <!-- Breadcrumbs -->
  <nav aria-label="Breadcrumb" class="px-4 py-3 text-sm border-b border-[#1a2e35]/10">
    <ol class="flex gap-2 text-[#1a2e35]/70" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="./index{suffix}.html" class="hover:text-[#1a2e35] transition-colors">
          <span itemprop="name">{nav_home}</span>
        </a>
        <meta itemprop="position" content="1">
      </li>
      <li>/</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name" class="font-medium text-[#1a2e35]">{nav_page}</span>
        <meta itemprop="position" content="2">
      </li>
    </ol>
  </nav>

  <header class="px-4 py-6 md:py-8 flex flex-wrap items-center justify-between gap-4 max-w-6xl mx-auto">
    <div class="flex items-center gap-3">
      <a href="./index{suffix}.html" class="text-lg sm:text-xl md:text-2xl tracking-[0.4em] text-[#1a2e35] font-montserrat hover:opacity-80 transition-opacity">
        <span class="font-light">ZOOVET</span> <span class="font-bold">TRAVEL</span>
      </a>
    </div>
    <div class="flex flex-wrap items-center gap-2 md:gap-4 shrink-0">
      <div class="flex flex-wrap gap-1 sm:gap-2">
        <a href="./kennels.html" class="text-xs font-semibold tracking-widest uppercase {es_style} px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center">ES</a>
        <a href="./kennels-en.html" class="text-xs font-semibold tracking-widest uppercase {en_style} px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center">EN</a>
        <a href="./kennels-fr.html" class="text-xs font-semibold tracking-widest uppercase {fr_style} px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center">FR</a>
      </div>
    </div>
  </header>
"""

FOOTER = """
  <!-- Footer -->
  <footer class="bg-[#1a2e35] text-[#F8FAFC] font-montserrat border-t-[0.5px] border-white/10" role="contentinfo">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">
        <div class="lg:col-span-1">
          <p class="text-base font-bold tracking-[0.2em] uppercase text-[#F8FAFC] mb-3">ZOOVET TRAVEL</p>
          <p class="text-sm text-[#F8FAFC]/80 leading-relaxed max-w-xs">{footer_desc}</p>
        </div>
        <div>
          <p class="text-xs font-semibold tracking-wider uppercase text-[#F8FAFC]/90 mb-4">{exp_title}</p>
          <ul class="space-y-2">
            <li><a href="./index{suffix}.html#exportacion" class="text-sm text-slate-400 hover:text-white transition-colors block py-2">Gestión SENASA</a></li>
            <li><a href="./index{suffix}.html#exportacion" class="text-sm text-slate-400 hover:text-white transition-colors block py-2">Microchip ISO</a></li>
            <li><a href="./index{suffix}.html#exportacion" class="text-sm text-slate-400 hover:text-white transition-colors block py-2">Serología de Rabia</a></li>
            <li><a href="./index{suffix}.html#exportacion" class="text-sm text-slate-400 hover:text-white transition-colors block py-2">{prot_title}</a></li>
          </ul>
        </div>
        <div>
          <p class="text-xs font-semibold tracking-wider uppercase text-[#F8FAFC]/90 mb-4">{footer_contact}</p>
          <div class="space-y-4 text-sm text-slate-400">
            <p class="flex items-start gap-2">
              <span class="flex-shrink-0 mt-0.5 text-[#0C789E]" aria-hidden="true">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <a href="https://www.google.com/maps/search/?api=1&query=Calle+Cuba+241,+Urb.+El+Recreo,+Trujillo,+La+Libertad,+Peru" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Calle Cuba 241, Urb. El Recreo, Trujillo</a>
            </p>
            <div class="space-y-2">
              <a href="tel:044366094" class="flex items-center gap-2 hover:text-white transition-colors block">
                <svg class="w-4 h-4 flex-shrink-0 text-[#0C789E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                044 366094
              </a>
              <a href="https://wa.me/51979620402" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-white transition-colors block">
                <svg class="w-4 h-4 flex-shrink-0 text-[#0C789E]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                +51 922083707
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-[#F8FAFC]/10 px-4 sm:px-6 py-4">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-[#F8FAFC]/60 text-center sm:text-left">{cpy}</p>
        <p class="text-[10px] text-[#F8FAFC]/40 font-mono text-center sm:text-right">Diseño y propiedad: Carlos Ravello Joo · Modelo de coherencia dinámico — MCD</p>
      </div>
    </div>
  </footer>
</body>
</html>
"""

def get_content(lang):
    c = {}
    if lang == "es":
        c["title"] = "Kennels IATA para Viaje Internacional | Zoovet Travel"
        c["desc"] = "Kennels IATA para Viaje Internacional. Certificados bajo normativa LAR 2026. Envío a todo el Perú."
        c["nav_home"] = "Inicio"
        c["nav_page"] = "Kennels IATA"
        c["hero_title"] = "Kennels IATA para Viaje Internacional"
        c["hero_subtitle"] = "Certificados bajo normativa LAR 2026. Envío a todo el Perú."
        c["hero_cta"] = "Consulta disponibilidad"
        c["intro"] = "No todos los kennels son iguales ante una aerolínea. Un kennel incorrecto puede significar que tu mascota no aborde. Todos nuestros kennels cumplen la normativa IATA LAR 2026."
        c["calc"] = "[CALCULADORA INTERACTIVA — se integra en siguiente fase]"
        c["req_title"] = "¿Qué debe tener un kennel IATA?"
        c["req1"] = "Construcción rígida con tornillos metálicos"
        c["req2"] = "Puerta metálica con cierre doble (arriba y abajo)"
        c["req3"] = "Ventilación en los 4 costados"
        c["req4"] = "Dos recipientes fijados a la puerta rellenables desde el exterior sin abrir"
        c["legal"] = "Las medidas y pesos indicados son referenciales según normativa IATA LAR 2026. Las aerolíneas pueden aplicar restricciones adicionales. Consulta siempre con tu aerolínea antes de viajar. Zoovet Travel no se responsabiliza por cambios en políticas de aerolíneas."
        c["contact_text"] = "¿No sabes qué talla necesita tu mascota? Escríbenos con el peso y la raza y te asesoramos sin costo."
        c["footer_desc"] = "Más de 12 años de excelencia en exportación internacional de mascotas y medicina veterinaria de especialidad."
        c["footer_contact"] = "Contacto"
        c["exp_title"] = "Exportación"
        c["prot_title"] = "Protocolos Internacionales"
        c["cpy"] = "© 2026 Zoovet Travel. Todos los derechos reservados."
        
        c["lbl_dim"] = "Dimensiones"
        c["lbl_w"] = "Peso máximo"
        c["lbl_use"] = "Uso"
        c["lbl_breed"] = "Razas de referencia"
        c["btn_wa"] = "Consultar Kennel"
        c["wa_msg"] = "Hola, me interesa el Kennel"
        c["wa_tail"] = "para mi mascota."
        
        c["desc_L50"] = "Ideal para razas toy y gatos. Apto para cabina en aerolíneas que lo permitan."
        c["desc_L60"] = "Para razas pequeñas y medianas. Bodega en vuelos internacionales."
        c["desc_L70"] = "Para razas medianas activas. Bodega obligatoria."
        c["desc_L80"] = "Para razas medianas grandes. Bodega obligatoria."
        c["desc_L90"] = "El más solicitado. Razas grandes estándar. Bodega obligatoria."
        c["desc_L100"] = "Para razas grandes de trabajo. Bodega obligatoria."
        c["desc_L120"] = "Para razas gigantes. El kennel más grande de nuestra línea."
        
    elif lang == "en":
        c["title"] = "IATA Kennels for International Travel | Zoovet Travel"
        c["desc"] = "IATA Kennels for International Travel. Certified under LAR 2026 regulations. Shipping throughout Peru."
        c["nav_home"] = "Home"
        c["nav_page"] = "IATA Kennels"
        c["hero_title"] = "IATA Kennels for International Travel"
        c["hero_subtitle"] = "Certified under LAR 2026 regulations. Shipping throughout Peru."
        c["hero_cta"] = "Check availability"
        c["intro"] = "Not all kennels are the same for airlines. An incorrect kennel can mean your pet won't board. All our kennels meet IATA LAR 2026 regulations."
        c["calc"] = "[INTERACTIVE CALCULATOR — to be integrated in next phase]"
        c["req_title"] = "What should an IATA kennel have?"
        c["req1"] = "Rigid construction with metal screws"
        c["req2"] = "Metal door with double lock (top and bottom)"
        c["req3"] = "Ventilation on all 4 sides"
        c["req4"] = "Two bowls attached to the door, refillable from the outside without opening"
        c["legal"] = "Measurements and weights are referential according to IATA LAR 2026 regulations. Airlines may apply additional restrictions. Always consult your airline before traveling. Zoovet Travel is not responsible for changes in airline policies."
        c["contact_text"] = "Don't know what size your pet needs? Write us with the weight and breed and we'll advise you free of charge."
        c["footer_desc"] = "Over 12 years of excellence in international pet export and specialty veterinary medicine."
        c["footer_contact"] = "Contact"
        c["exp_title"] = "Export"
        c["prot_title"] = "International Protocols"
        c["cpy"] = "© 2026 Zoovet Travel. All rights reserved."

        c["lbl_dim"] = "Dimensions"
        c["lbl_w"] = "Maximum weight"
        c["lbl_use"] = "Use"
        c["lbl_breed"] = "Reference breeds"
        c["btn_wa"] = "Inquire about Kennel"
        c["wa_msg"] = "Hello, I am interested in Kennel"
        c["wa_tail"] = "for my pet."
        
        c["desc_L50"] = "Ideal for toy breeds and cats. Suitable for cabin on airlines that allow it."
        c["desc_L60"] = "For small and medium breeds. Hold in international flights."
        c["desc_L70"] = "For active medium breeds. Hold mandatory."
        c["desc_L80"] = "For large medium breeds. Hold mandatory."
        c["desc_L90"] = "Most requested. Standard large breeds. Hold mandatory."
        c["desc_L100"] = "For large working breeds. Hold mandatory."
        c["desc_L120"] = "For giant breeds. The largest kennel in our line."

    elif lang == "fr":
        c["title"] = "Caisses de transport IATA pour vols internationaux | Zoovet Travel"
        c["desc"] = "Caisses de transport IATA pour vols internationaux. Certifiées selon la réglementation LAR 2026. Expédition dans tout le Pérou."
        c["nav_home"] = "Accueil"
        c["nav_page"] = "Caisses IATA"
        c["hero_title"] = "Caisses de transport IATA pour vols internationaux"
        c["hero_subtitle"] = "Certifiées selon la réglementation LAR 2026. Expédition dans tout le Pérou."
        c["hero_cta"] = "Vérifier la disponibilité"
        c["intro"] = "Toutes les caisses de transport ne se valent pas pour une compagnie aérienne. Une caisse inadaptée peut empêcher votre animal d'embarquer. Toutes nos caisses sont conformes à la réglementation IATA LAR 2026."
        c["calc"] = "[CALCULATRICE INTERACTIVE — à intégrer dans la prochaine phase]"
        c["req_title"] = "Que doit avoir une caisse de transport IATA ?"
        c["req1"] = "Construction rigide avec vis métalliques"
        c["req2"] = "Porte métallique avec double fermeture (en haut et en bas)"
        c["req3"] = "Ventilation sur les 4 côtés"
        c["req4"] = "Deux récipients fixés à la porte, remplissables de l'extérieur sans ouvrir"
        c["legal"] = "Les dimensions et poids indiqués sont donnés à titre indicatif selon la réglementation IATA LAR 2026. Les compagnies aériennes peuvent appliquer des restrictions supplémentaires. Consultez toujours votre compagnie aérienne avant de voyager. Zoovet Travel n'est pas responsable des modifications des politiques des compagnies aériennes."
        c["contact_text"] = "Vous ne savez pas de quelle taille votre animal a besoin ? Écrivez-nous en précisant son poids et sa race et nous vous conseillerons gratuitement."
        c["footer_desc"] = "Plus de 12 ans d'excellence dans l'exportation internationale d'animaux de compagnie et la médecine vétérinaire spécialisée."
        c["footer_contact"] = "Contact"
        c["exp_title"] = "Exportation"
        c["prot_title"] = "Protocoles Internationaux"
        c["cpy"] = "© 2026 Zoovet Travel. Tous droits réservés."

        c["lbl_dim"] = "Dimensions"
        c["lbl_w"] = "Poids maximum"
        c["lbl_use"] = "Utilisation"
        c["lbl_breed"] = "Races de référence"
        c["btn_wa"] = "Se renseigner sur la caisse"
        c["wa_msg"] = "Bonjour, je suis intéressé par la caisse de transport"
        c["wa_tail"] = "pour mon animal."
        
        c["desc_L50"] = "Idéal pour les races toy et les chats. Convient pour la cabine (pour les compagnies qui l'autorisent)."
        c["desc_L60"] = "Pour les petites et moyennes races. Soute obligatoire en vol international."
        c["desc_L70"] = "Pour les races moyennes actives. Soute obligatoire."
        c["desc_L80"] = "Pour les moyennes et grandes races. Soute obligatoire."
        c["desc_L90"] = "La plus demandée. Races de grande taille standards. Soute obligatoire."
        c["desc_L100"] = "Pour les grandes races de travail. Soute obligatoire."
        c["desc_L120"] = "Pour les races géantes. La plus grande caisse de notre gamme."

    return c

items = [
    { "id": "L50", "dim": "50 × 38 × 35 cm", "w": "5 kg", "use": "Cabina/Bodega", "breeds": "Chihuahua, Yorkshire, Maltés, Gato" },
    { "id": "L60", "dim": "60 × 43 × 40 cm", "w": "10 kg", "use": "Bodega", "breeds": "Beagle, Schnauzer, Shih Tzu, Dachshund" },
    { "id": "L70", "dim": "70 × 50 × 48 cm", "w": "15 kg", "use": "Bodega", "breeds": "Cocker Spaniel, Border Collie" },
    { "id": "L80", "dim": "80 × 55 × 55 cm", "w": "23 kg", "use": "Bodega", "breeds": "Labrador hembra, Golden mediano, Pitbull" },
    { "id": "L90", "dim": "90 × 60 × 65 cm", "w": "31 kg", "use": "Bodega", "breeds": "Labrador adulto, Golden adulto, Husky Siberiano" },
    { "id": "L100", "dim": "100 × 68 × 75 cm", "w": "41 kg", "use": "Bodega", "breeds": "Pastor Alemán, Doberman" },
    { "id": "L120", "dim": "120 × 80 × 88 cm", "w": "57 kg", "use": "Bodega", "breeds": "Rottweiler, Gran Danés" }
]

def build_page(lang):
    c = get_content(lang)
    suffix = "" if lang == "es" else f"-{lang}"
    page_name = f"kennels{suffix}.html"
    
    es_style = "text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10" if lang == "es" else "text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 hover:border-[#1a2e35]/50"
    en_style = "text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10" if lang == "en" else "text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 hover:border-[#1a2e35]/50"
    fr_style = "text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10" if lang == "fr" else "text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 hover:border-[#1a2e35]/50"

    html = TAILWIND_MONTSERRAT_HEAD.format(lang_code=lang, desc=c["desc"], title=c["title"], suffix=suffix, page_name=page_name)
    html += NAV_TEMPLATE.format(suffix=suffix, nav_home=c["nav_home"], nav_page=c["nav_page"], es_style=es_style, en_style=en_style, fr_style=fr_style)
    
    html += f"""
  <main class="w-full">
    <!-- SECCIÓN 1 - HERO -->
    <section class="bg-[#1a2e35] py-16 md:py-24 px-4 text-center border-b-[6px] border-[#0C789E]">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[#F8FAFC]">{c["hero_title"]}</h1>
        <p class="text-lg md:text-xl text-[#F8FAFC]/90 mb-8 max-w-2xl mx-auto">{c["hero_subtitle"]}</p>
        <a href="#contacto-final" class="btn-zoovet inline-block px-8 py-4 text-sm md:text-base font-bold tracking-wide uppercase shadow-lg">
          {c["hero_cta"]}
        </a>
      </div>
    </section>

    <!-- SECCIÓN 2 - INTRO -->
    <section class="max-w-4xl mx-auto px-4 py-16">
        <p class="text-xl md:text-2xl text-[#1a2e35] font-medium leading-relaxed text-center">
          {c["intro"]}
        </p>
    </section>

    <!-- SECCIÓN 3 - CALCULADORA -->
    <section id="calculadora-iata" class="max-w-4xl mx-auto px-4 mb-20">
      <div class="bg-white border text-center p-12 shadow-sm rounded-sm border-[#1a2e35]/10">
        <p class="text-[#0C789E] font-semibold tracking-widest text-sm uppercase">{c["calc"]}</p>
      </div>
    </section>

    <!-- SECCIÓN 4 - CATÁLOGO CORRIDO -->
    <section class="max-w-5xl mx-auto px-4 mb-20">
"""
    for i, it in enumerate(items):
        img_right = (i % 2 != 0)
        img_src = f"./images/kennels/kennel-{it['id'].lower()}.webp"
        desc_key = f"desc_{it['id']}"
        wa_text = f"{c['wa_msg']} L{it['id'].replace('L', '')} {c['wa_tail']}".replace(" ", "%20")
        wa_link = f"https://wa.me/51979620402?text={wa_text}"
        
        use_text = it["use"]
        if lang == "en": use_text = "Cabin/Hold" if use_text == "Cabina/Bodega" else "Hold"
        elif lang == "fr": use_text = "Cabine/Soute" if use_text == "Cabina/Bodega" else "Soute"
        
        img_block = f"""
        <div class="w-full md:w-1/2 flex-shrink-0">
          <img src="{img_src}" alt="Kennel {it['id']}" class="w-full h-auto object-cover rounded-sm shadow-sm border border-[#1a2e35]/10" loading="lazy" width="800" height="500">
        </div>
        """
        
        text_block = f"""
        <div class="w-full md:w-1/2 flex flex-col justify-center {'md:pr-10' if not img_right else 'md:pl-10'}">
          <div>
            <span class="inline-block bg-[#0C789E] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm mb-4">IATA LAR 2026 ✓</span>
            <h2 class="text-3xl lg:text-4xl font-bold text-[#1a2e35] mb-6">Kennel {it['id']}</h2>
          </div>
          
          <ul class="space-y-4 mb-8">
            <li class="flex items-baseline">
              <span class="font-semibold text-[#1a2e35] min-w-[140px] uppercase tracking-wide text-xs">{c["lbl_dim"]}:</span>
              <span class="text-[#1a2e35]/80 bg-[#1a2e35]/5 px-3 py-1 rounded-sm border border-[#1a2e35]/10">{it['dim']}</span>
            </li>
            <li class="flex items-baseline">
              <span class="font-semibold text-[#1a2e35] min-w-[140px] uppercase tracking-wide text-xs">{c["lbl_w"]}:</span>
              <span class="text-[#1a2e35]/80 bg-[#1a2e35]/5 px-3 py-1 rounded-sm border border-[#1a2e35]/10">hasta {it['w']}</span>
            </li>
            <li class="flex items-baseline">
              <span class="font-semibold text-[#1a2e35] min-w-[140px] uppercase tracking-wide text-xs">{c["lbl_use"]}:</span>
              <span class="text-[#1a2e35]/80">{use_text}</span>
            </li>
            <li class="flex items-baseline">
              <span class="font-semibold text-[#1a2e35] min-w-[140px] uppercase tracking-wide text-xs">{c["lbl_breed"]}:</span>
              <span class="text-[#1a2e35]/80">{it['breeds']}</span>
            </li>
          </ul>
          
          <p class="text-[#1a2e35]/90 italic mb-8 border-l-4 border-[#0C789E] pl-4">{c[desc_key]}</p>
          
          <div>
            <a href="{wa_link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border-2 border-[#0C789E] text-[#0C789E] hover:bg-[#0C789E] hover:text-white px-6 py-3 font-bold uppercase tracking-wide transition-colors rounded-sm text-sm">
               <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {c['btn_wa']} L{it['id'].replace('L', '')}
            </a>
          </div>
        </div>
        """
        
        layout = f"{img_block}\n{text_block}" if not img_right else f"{text_block}\n{img_block}"
        
        html += f"""
        <article class="flex flex-col {'md:flex-row' if not img_right else 'md:flex-row-reverse'} gap-8 items-center bg-white p-6 sm:p-10 border border-[#1a2e35]/10 rounded-sm mb-12 shadow-sm">
            {img_block}
            {text_block}
        </article>
        """

    html += f"""
    </section>

    <!-- SECCIÓN 5 - REQUISITOS IATA -->
    <section class="max-w-4xl mx-auto px-4 mb-20">
      <h2 class="text-2xl md:text-3xl font-bold mb-8 tracking-wide text-[#1a2e35] text-center">{c["req_title"]}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-6 border border-[#1a2e35]/10 rounded-sm shadow-sm flex items-start gap-4">
          <div class="text-[#0C789E] mt-1 shrink-0"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
          <p class="font-medium text-[#1a2e35]/90 leading-relaxed">{c["req1"]}</p>
        </div>
        <div class="bg-white p-6 border border-[#1a2e35]/10 rounded-sm shadow-sm flex items-start gap-4">
          <div class="text-[#0C789E] mt-1 shrink-0"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
          <p class="font-medium text-[#1a2e35]/90 leading-relaxed">{c["req2"]}</p>
        </div>
        <div class="bg-white p-6 border border-[#1a2e35]/10 rounded-sm shadow-sm flex items-start gap-4">
          <div class="text-[#0C789E] mt-1 shrink-0"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
          <p class="font-medium text-[#1a2e35]/90 leading-relaxed">{c["req3"]}</p>
        </div>
        <div class="bg-white p-6 border border-[#1a2e35]/10 rounded-sm shadow-sm flex items-start gap-4">
          <div class="text-[#0C789E] mt-1 shrink-0"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
          <p class="font-medium text-[#1a2e35]/90 leading-relaxed">{c["req4"]}</p>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 6 - AVISO LEGAL -->
    <section class="max-w-4xl mx-auto px-4 mb-20">
      <div class="bg-[#1a2e35]/5 p-6 sm:p-8 rounded-sm text-center">
        <p class="text-xs sm:text-sm text-[#1a2e35]/70 italic leading-relaxed max-w-3xl mx-auto">
          {c["legal"]}
        </p>
      </div>
    </section>

    <!-- SECCIÓN 7 - CONTACTO / CTA -->
    <section id="contacto-final" class="bg-[#1a2e35] py-16 px-4 text-center border-t-[4px] border-[#0C789E]">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 tracking-wide text-white">{c["contact_text"]}</h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <a href="https://wa.me/51979620402" target="_blank" rel="noopener noreferrer" class="bg-[#25D366] text-white hover:bg-[#20bd5a] px-8 py-4 font-bold uppercase tracking-wide rounded-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-1">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            +51 979620402
          </a>
          <a href="tel:044366094" class="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 font-bold uppercase tracking-wide rounded-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
            044 366094
          </a>
        </div>
      </div>
    </section>

  </main>
"""
    
    html += FOOTER.format(
        suffix=suffix, 
        footer_desc=c["footer_desc"], 
        exp_title=c["exp_title"], 
        prot_title=c["prot_title"], 
        footer_contact=c["footer_contact"], 
        cpy=c["cpy"]
    )
    
    return html

if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    for lang in ["es", "en", "fr"]:
        content = build_page(lang)
        filename = "kennels.html" if lang == "es" else f"kennels-{lang}.html"
        with open(os.path.join(r"C:\\Users\\RAVELLO CAMACHO\\Documents\\GitHub\\zoovet-travel", filename), "w", encoding='utf-8') as f:
            f.write(content)
        print(f"Created {filename}")
