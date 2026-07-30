import re

with open('index.html', 'r') as f:
    content = f.read()

# find the script tag containing WhistleLiveChat
pattern = re.compile(r'<!-- Cloudbeds Guest Experience Live Chat Plugin -->\s*<script type="text/javascript" async defer>[\s\S]*?</script>')

new_script = '''<!-- Cloudbeds Guest Experience Live Chat Plugin -->
    <script type="text/javascript" async defer>
      (function () {
        if (!window.location.hostname.includes("run.app") && window.location.hostname !== "localhost") {
          window.WhistleLiveChat = {
            company: "184869",
            source: "https://plugins.whistle.cloudbeds.com",
          };
          var e = document.createElement("script");
          e.async = !0;
          e.type = "text/javascript";
          e.src = window.WhistleLiveChat.source + "/live-chat/initialize.js";
          var t = document.getElementsByTagName("script")[0];
          t.parentNode.insertBefore(e, t);
        }
      })();
    </script>'''

content = pattern.sub(new_script, content)

with open('index.html', 'w') as f:
    f.write(content)
