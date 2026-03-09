import os
import re
import sys

def remove_fadein_from_body(directory):
    count_modified = 0
    count_total = 0
    
    # Expresión regular para encontrar la regla de animación en css
    # Busca "animation: fadeIn 0.5s ease-out;" con posibles espacios
    pattern_animation = re.compile(r'^\s*animation:\s*fadeIn\s+0\.5s\s+ease-out;\s*$', re.MULTILINE)
    
    # Exponemos también buscar de forma exacta keyframes de ser necesario, pero mejor
    # probemos primero sólo quitando la declaración de animation del body,
    # aunque para limpiar bien podemos quitar todo el bloque de @keyframes si existe.
    pattern_keyframes = re.compile(r'^\s*@keyframes\s+fadeIn\s*\{\s*from\s*\{\s*opacity:\s*0;\s*\}\s*to\s*\{\s*opacity:\s*1;\s*\}\s*\}\s*$', re.MULTILINE)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                count_total += 1
                filepath = os.path.join(root, file)
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    original_content = content
                    
                    # Remover rule de animation
                    content = pattern_animation.sub('', content)
                    
                    # Remover el bloque de keyframes
                    content = pattern_keyframes.sub('', content)
                    
                    if content != original_content:
                        # Remover líneas vacías extra generadas por la sustitución en la etiqueta de estilo
                        # un doble espaciado
                        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
                        
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(content)
                        count_modified += 1
                        print(f"Modificado: {filepath}")
                        
                except Exception as e:
                    print(f"Error procesando {filepath}: {e}", file=sys.stderr)
                    
    print(f"\nFinalizado. Total archivos procesados: {count_total}")
    print(f"Archivos modificados exitosamente: {count_modified}")

if __name__ == "__main__":
    current_dir = os.getcwd()
    print(f"Iniciando limpieza de CSS en: {current_dir}")
    remove_fadein_from_body(current_dir)
