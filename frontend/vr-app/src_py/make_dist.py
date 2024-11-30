from pathlib import Path
import shutil

# Clean up existing dist directory
dist_path = Path('dist')
if dist_path.exists():
    shutil.rmtree(dist_path)

# Create dist directories if they don't exist
dist_templates_path = dist_path / 'src' / 'templates'
dist_templates_path.mkdir(parents=True, exist_ok=True)

# Copy template files and rename to .html
src_templates = Path('src/templates').glob('*.template')
for template in src_templates:
    dest_file = dist_templates_path / f"{template.stem}.html"
    shutil.copy2(template, dest_file)

# Copy index files to dist
shutil.copy2('index.html', dist_path / 'index.html')
shutil.copy2('index.css', dist_path / 'index.css')

# Copy remaining files from src to dist/src
src_path = Path('src')
dist_src_path = dist_path / 'src'

def copy_remaining_files(source_dir, dest_dir):
    for item in source_dir.iterdir():
        if item.name in ['index.html', 'index.css']:
            continue
        if item.name == 'templates':
            continue
        
        dest = dest_dir / item.relative_to(source_dir)
        if item.is_dir():
            dest.mkdir(parents=True, exist_ok=True)
            copy_remaining_files(item, dest)
        else:
            shutil.copy2(item, dest)

copy_remaining_files(src_path, dist_src_path)

# Replace .template with .html in index.html
index_path = dist_path / 'index.html'
with open(index_path, 'r', encoding='utf-8') as file:
    content = file.read()

content = content.replace('.template', '.html')
content = content.replace('serverURL: http://192.168.1.38:8080/; ', '')

with open(index_path, 'w', encoding='utf-8') as file:
    file.write(content)

# Create assets mapping dictionary
def parse_glitch_assets():
    assets_dict = {}
    
    # Read through glitch-assets.json and parse each line
    with open('src_py/glitch-assets.json', 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line and line[0] == '{':  # Only process JSON lines
                try:
                    asset = eval(line.rstrip(','))  # Remove trailing comma if present
                    if 'deleted' in asset and asset['deleted']:
                        # If this is a deletion entry, remove the UUID from our dict
                        print('removing UUID', asset['uuid'])
                        if asset['uuid'] in assets_dict:
                            del assets_dict[asset['uuid']]
                    elif 'uuid' in asset:
                        # Add/update the asset entry
                        assets_dict[asset['uuid']] = {
                            'name': asset['name'],
                            'url': asset['url']
                        }
                except:
                    continue
    
    return assets_dict

# Create the assets mapping
assets_mapping = parse_glitch_assets()
print('\n'.join([f'{v['name']}={v["url"]}' for k, v in assets_mapping.items()]))

# Replace local asset paths with CDN URLs in index.html and assets.html
files_to_update = [
    dist_path / 'index.html',
    dist_path / 'src' / 'assets.html',
    *(dist_path / 'src' / 'templates').glob('slide-*.html')  # Use glob() to get iterable
]

for file_path in files_to_update:
    if file_path.exists():
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # Replace each asset path with its CDN URL
        for asset_data in assets_mapping.values():
            content = content.replace(asset_data['name'], asset_data['url'])
            
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
