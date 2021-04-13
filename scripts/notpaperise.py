import os
import subprocess
import shutil

template_directory = os.path.normpath(os.path.join(os.path.dirname(__file__), '../templates'))
filter_py = os.path.join(os.path.dirname(__file__), 'include_metadata.py')

# input file should be turned into an argument, but hard coded for now
os.chdir('examplepaper')
input_tex_file = "scifile.tex"
output_html_file = "paper.html"
template_base = 'threecolumnfixed'

# run pandoc
html_template = os.path.join(template_directory, template_base+'.html')
subprocess.run(f'pandoc {input_tex_file} --mathjax -o {output_html_file} -C --template={html_template}')

# run template
# html_snippet = open(output_html_file, 'r', encoding='utf-8').read()
# html_out = html_template.replace('<!--CONTENT-->', html_snippet)
# open(output_html_file, 'w', encoding='utf-8').write(html_out)
shutil.copyfile(os.path.join(template_directory, template_base+'.css'),
                template_base+'.css')
shutil.copyfile(os.path.join(template_directory, template_base+'.js'),
                template_base+'.js')                