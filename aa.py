import os
from babel.messages import Catalog
from babel import Locale
from babel.messages.pofile import read_po
from babel.messages.pofile import write_po
from babel.messages.mofile import write_mo

# Укажите путь к каталогу с переводами
translations_dir = "translations"

# Проходим по всем папкам в директории translations
for lang_dir in os.listdir(translations_dir):
    lang_path = os.path.join(translations_dir, lang_dir, 'LC_MESSAGES')
    if os.path.isdir(lang_path):
        for po_file in os.listdir(lang_path):
            if po_file.endswith('.po'):
                po_path = os.path.join(lang_path, po_file)
                
                # Загружаем .po файл
                with open(po_path, 'r', encoding='utf-8') as f:
                    catalog = read_po(f)
                
                # Компилируем .po в .mo
                mo_path = os.path.join(lang_path, po_file.replace('.po', '.mo'))
                with open(mo_path, 'wb') as f:
                    write_mo(f, catalog)
                
                print(f"Компиляция {po_path} в {mo_path} завершена.")
