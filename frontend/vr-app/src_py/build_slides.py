import json
from pathlib import Path
from jinja2 import Environment, FileSystemLoader

def build_slides():
    # Set up paths
    slide_data_dir = Path('slide_data')
    template_path = slide_data_dir / 'slide.template'
    
    # Create Jinja2 environment
    env = Environment(loader=FileSystemLoader(slide_data_dir))
    template = env.get_template('slide.template')
    
    # Process all JSON files in slide_data directory
    json_files = sorted(slide_data_dir.glob('stall-*.json'))
    for slide_idx, json_file in enumerate(json_files):
        print(f'Processing {slide_idx} -> {json_file}')
        # Load JSON data
        with open(json_file, 'r') as f:
            slide_data = json.load(f)
        # Generate output filename (e.g., 'slide-1.template' from 'stall-1.json')
        slide_number = int(json_file.stem.split('-')[1])
        output_dir = Path('src/templates')
        output_dir.mkdir(parents=True, exist_ok=True)
        output_file = output_dir / f'slide-{slide_number}.template'

        # Render template with JSON data and save
        print(slide_data['children'])
        rendered_content = template.render(stall_num=slide_number, stall=slide_data)
        with open(output_file, 'w') as f:
            f.write(rendered_content)

        print(f'Generated {output_file}')

if __name__ == '__main__':
    build_slides()
