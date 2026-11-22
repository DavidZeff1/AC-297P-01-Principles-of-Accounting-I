"""Make the claude.ai artifact version of index.html.

The artifact host adds its own <!doctype>/<head>/<body> wrapper, so the page it
receives must be only what sits between the artifact:start / artifact:end
markers in index.html. Usage:

    python3 tools/build_artifact.py <output.html>
"""
import pathlib
import sys

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "index.html").read_text(encoding="utf-8")
start = src.index("<!-- artifact:start -->") + len("<!-- artifact:start -->")
end = src.index("<!-- artifact:end -->")
body = src[start:end].replace("</head>\n<body>\n", "")

# Cache-busting: stamp every local script/stylesheet with a short content hash so browsers
# fetch the new copy after each publish instead of reusing a stale cached one.
import hashlib, re
def stamp(m):
    path = root / m.group(2)
    if not path.exists():
        return m.group(0)
    v = hashlib.md5(path.read_bytes()).hexdigest()[:8]
    return '%s="%s?v=%s"' % (m.group(1), m.group(2), v)
body = re.sub(r'(src|href)="((?:assets|lessons|defs|talks|audio)/[^"?]+\.(?:js|css))"', stamp, body)
out = pathlib.Path(sys.argv[1])
out.write_text(body.strip() + "\n", encoding="utf-8")
print(f"wrote {out} ({len(body)} bytes)")
