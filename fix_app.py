import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'import Footer from "./components/Footer";',
    'import Footer from "./components/Footer";\nimport ChatWidget from "./components/ChatWidget";'
)

content = content.replace(
    '<Footer lang={lang} setLang={setLang} />',
    '<Footer lang={lang} setLang={setLang} />\n      <ChatWidget />'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)
