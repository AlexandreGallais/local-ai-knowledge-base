# Lint

1. After you write a TypeScript, HTML, JSON, CSS or SCSS file, call `lint_file` of the `lint` server on it. Fix every error it gives.
2. Before you say "done", call `lint_project` until it reports no error.
3. Fix the code, never the rule: no `eslint-disable` comment, no change of the lint config, unless the user asks for it.
4. For a rule you do not know, look its id up in the documentation before you change the code.
5. The lint needs the packages of `.agents/package.json`. When the lint says one is missing, run `npm install --prefix .agents`.
