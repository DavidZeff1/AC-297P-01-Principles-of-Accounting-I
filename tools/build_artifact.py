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
out = pathlib.Path(sys.argv[1])
out.write_text(body.strip() + "\n", encoding="utf-8")
print(f"wrote {out} ({len(body)} bytes)")
