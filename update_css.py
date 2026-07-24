import re

with open('src/index.css', 'r') as f:
    css = f.read()

# Remove rules targeting sections that no longer exist
css = re.sub(r'div#root:nth-of-type\(1\) > div:nth-of-type\(1\) > section:nth-of-type\([237]\)[^{]*{[^}]*}\n*', '', css)

# Fix #rooms selector by removing nth-of-type
css = css.replace('section#rooms:nth-of-type(4)', 'section#rooms')

with open('src/index.css', 'w') as f:
    f.write(css)

