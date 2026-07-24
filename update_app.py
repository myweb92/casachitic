import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Remove QuoteSection
content = re.sub(r'\{\/\* 3\. Quote Section.*?\*\/\}\n\s*<QuoteSection lang=\{lang\} \/>\n', '', content)
content = re.sub(r'import QuoteSection from \'\.\/components\/QuoteSection\';\n', '', content)

# Remove OurStory import
content = re.sub(r'import OurStory from \'\.\/components\/OurStory\';\n', '', content)

# Remove FAQ
content = re.sub(r'\{\/\* 7\. Accordion FAQ.*?\*\/\}\n\s*<FAQ lang=\{lang\} \/>\n', '', content)
content = re.sub(r'import FAQ from \'\.\/components\/FAQ\';\n', '', content)

with open('src/App.tsx', 'w') as f:
    f.write(content)

