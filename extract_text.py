import re
with open('temp_js.js', 'r') as f:
    content = f.read()

# Just extract anything between children:" and "
# This might be too noisy. Let's look for standard patterns.
print("Extracting...")
