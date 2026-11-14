# Format

1. Each file you write is formatted at once: layout, sorted imports, members and keys, CSS order. Never format by hand.
2. A file changes after you write it: this is the format pass, not an error. Read it again before you edit it.
3. To format a file you did not write, call `format_file` of the `format` server.
4. The format pass needs the packages of `.agents/package.json`. When `format_file` says one is missing, run `npm install --prefix .agents`.
