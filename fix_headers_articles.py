import os
import re

def fix_article_headers():
    files = {
        'es': 'articles/index.html',
        'en': 'articles/index-en.html',
        'fr': 'articles/index-fr.html'
    }

    btn_es = '<a href="index.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 hover:border-[#1a2e35]/50 px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center">ES</a>'
    btn_en = '<a href="index-en.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 hover:border-[#1a2e35]/50 px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center">EN</a>'
    btn_fr = '<a href="index-fr.html" class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35]/80 hover:text-[#1a2e35] border border-[#1a2e35]/30 hover:border-[#1a2e35]/50 px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center">FR</a>'

    active_es = '<span class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10 px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center" aria-current="page">ES</span>'
    active_en = '<span class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10 px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center" aria-current="page">EN</span>'
    active_fr = '<span class="text-xs font-semibold tracking-widest uppercase text-[#1a2e35] border border-[#0C789E] bg-[#0C789E]/10 px-2 sm:px-3 py-2 rounded-sm transition-all duration-300 min-h-[44px] inline-flex items-center justify-center" aria-current="page">FR</span>'

    for lang, path in files.items():
        if not os.path.exists(path):
            continue
            
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Build correct button block
        if lang == 'es':
            buttons = f"{active_es}\n        {btn_en}\n        {btn_fr}"
        elif lang == 'en':
            buttons = f"{btn_es}\n        {active_en}\n        {btn_fr}"
        else:
            buttons = f"{btn_es}\n        {btn_en}\n        {active_fr}"

        # We will make it ALWAYS visible using flex instead of hidden md:flex
        new_block = f"""
      <div class="hidden md:block h-6 w-px bg-[#1a2e35]/20"></div>
      <div class="flex flex-wrap gap-1 sm:gap-2">
        {buttons}
      </div>
    </div>
"""
        
        # Regex to replace from the hidden md:block separator down to the end of the div holding languages
        pattern = r'<div class="hidden md:block h-6 w-px bg-\[#1a2e35\]/20"></div>\s*<div class="[^"]*flex[^"]*gap-[^"]+">.*?(?=</div>\s*</div>)</div>\s*</div>'
        
        # In EN/FR there is no hamburger wrap, so we replace carefully.
        # Actually it's safer to just replace from <div class="hidden md:block h-6 w-px bg-[#1a2e35]/20"></div>
        # up to the next </div>\s*</div>
        
        content = re.sub(
            r'<div class="hidden md:block h-6 w-px bg-\[#1a2e35\]/20"></div>\s*<div class="[^"]*flex[^"]+gap-[^"]+">[\s\S]*?</a>\s*</div>\s*</div>',
            new_block.strip() + '\n',
            content
        )
        
        # Let's ensure <header class="px-4 py-6 md:py-8 flex flex-row items-center justify-between gap-4 max-w-6xl mx-auto"> is used everywhere
        content = re.sub(
            r'<header class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">',
            r'<header class="px-4 py-6 md:py-8 flex flex-row flex-wrap items-center justify-between gap-4 max-w-6xl mx-auto">',
            content
        )

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
            print(f"Fixed {path}")

if __name__ == "__main__":
    fix_article_headers()
