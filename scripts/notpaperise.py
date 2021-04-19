import os
import subprocess
import shutil
import pdf2image
import re
import argparse
import glob

# fixed directories (relative to script location)
template_directory = os.path.normpath(os.path.join(os.path.dirname(__file__), '../templates'))
filter_py = os.path.join(os.path.dirname(__file__), 'include_metadata.py')

# automatically gather template names
template_choices = []
for fname in glob.glob(os.path.join(template_directory, '*.html')):
    _, fname = os.path.split(fname)
    fname, _ = os.path.splitext(fname)
    template_choices.append(fname)

# parse arguments
parser = argparse.ArgumentParser(description='Convert LaTeX document to notpaper format.')
parser.add_argument('source',
    help='Source LaTeX file.')
parser.add_argument('--target',
    help='Destination HTML file.')
parser.add_argument('--template',
    choices=template_choices,
    default='threecolumnfixed',
    help='HTML template name.')
args = parser.parse_args()

# validate arguments
if not os.path.exists(args.source):
    print(f"{args.source} does not exist.")
    exit(1)
input_tex_file = os.path.abspath(args.source)
if args.target is None:
    base, ext = os.path.splitext(args.source)
    args.target = base+".html"
    print(f"No target given, using {args.target}")
input_base, _ = os.path.split(input_tex_file)
output_html_file = os.path.abspath(args.target)
output_base, _ = os.path.split(output_html_file)
if not os.path.exists(output_base):
    print(f"Output base directory does not exist, attempting to create it first: {output_base}")
    os.mkdir(output_base)
template_base = args.template

# run pandoc
html_template = os.path.join(template_directory, template_base+'.html')
subprocess.run(f'pandoc "{input_tex_file}" --mathjax -o "{output_html_file}" -C --template="{html_template}" --resource-path="{input_base}"')

# convert pdf figures to pngs
html = open(output_html_file, 'r', encoding='utf-8').read()
for fname in re.findall('''<embed src="(.*?).pdf"''', html, flags=re.IGNORECASE):
    pdf_in = os.path.abspath(os.path.join(input_base, fname+'.pdf'))
    png_out = os.path.abspath(os.path.join(output_base, fname+'.png'))
    png_dir, _ = os.path.split(png_out)
    if not os.path.exists(png_out):
        if not os.path.exists(png_dir):
            os.makedirs(png_dir)
        img = pdf2image.convert_from_path(pdf_in)[0]
        img.save(png_out, "png")
html = re.sub('''<embed src="(.*?).pdf" id="(.*?)".*?>''',
              f'''<img src="\\1.png" id="\\2" class="figureImage"/>''', html, flags=re.IGNORECASE)
html = re.sub('''<embed src="(.*?).pdf".*?>''',
              f'''<img src="\\1.png" id="\\1" class="figureImage"/>''', html, flags=re.IGNORECASE)
html = html.replace('"figure*"', '"figure"')
open(output_html_file, "w", encoding="utf-8").write(html)

# copy css/js
shutil.copyfile(os.path.join(template_directory, template_base+'.css'),
                os.path.join(output_base, template_base+'.css'))
shutil.copyfile(os.path.join(template_directory, template_base+'.js'),
                os.path.join(output_base, template_base+'.js'))