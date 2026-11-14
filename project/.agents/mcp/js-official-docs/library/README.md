# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [mdn-javascript](mdn-javascript.index.md) | MDN Web Docs: JavaScript guide and reference | 2026-11 | CC-BY-SA-2.5 | 1347 files, 6.7 MB |
| [mdn-html](mdn-html.index.md) | MDN Web Docs: HTML elements, attributes and guides | 2026-11 | CC-BY-SA-2.5 | 258 files, 2.4 MB |
| [mdn-css](mdn-css.index.md) | MDN Web Docs: CSS properties, selectors, values and guides | 2026-11 | CC-BY-SA-2.5 | 1288 files, 8.7 MB |
| [mdn-api](mdn-api.index.md) | MDN Web Docs: Web APIs (DOM, SVG DOM, Canvas, Fetch, Workers, WebSocket, events, storage, animations) | 2026-11 | CC-BY-SA-2.5 | 8126 files, 23.2 MB |
| [mdn-http](mdn-http.index.md) | MDN Web Docs: HTTP headers, methods, status codes and guides | 2026-11 | CC-BY-SA-2.5 | 376 files, 1.7 MB |
| [mdn-svg](mdn-svg.index.md) | MDN Web Docs: SVG elements, attributes and guides | 2026-11 | CC-BY-SA-2.5 | 307 files, 1.2 MB |
| [mdn-accessibility](mdn-accessibility.index.md) | MDN Web Docs: accessibility, ARIA roles, states and properties | 2026-11 | CC-BY-SA-2.5 | 172 files, 1.2 MB |
| [angular](angular.index.md) | Angular documentation (angular.dev), without Material, CDK nor Angular Aria | 22.2 | CC-BY-4.0 | 325 files, 2.7 MB |
| [typescript](typescript.index.md) | TypeScript Handbook, reference and release notes | 6.0 | CC-BY-4.0 | 133 files, 1.9 MB |
| [rxjs](rxjs.index.md) | RxJS 7 guides, operators and deprecations | 7.8 | Apache-2.0 | 23 files, 0.2 MB |
| [ngrx-signals](ngrx-signals.index.md) | NgRx Signals guide (SignalStore, features, entities, events, testing) and the NgRx ESLint rules | 22.0 | MIT | 55 files, 0.2 MB |
| [node](node.index.md) | Node.js API reference | 26.13 | MIT | 71 files, 4.7 MB |
| [npm](npm.index.md) | npm commands, package.json and configuration | 12.2 | Artistic-2.0 | 87 files, 0.3 MB |
| [vite](vite.index.md) | Vite guide, configuration and API | 8.3 | MIT | 43 files, 0.4 MB |
| [vitest](vitest.index.md) | Vitest guide, API and configuration | 5.1 | MIT | 224 files, 1.4 MB |
| [playwright](playwright.index.md) | Playwright for TypeScript: guides and API | 1.65 | Apache-2.0 | 148 files, 2.3 MB |
| [eslint](eslint.index.md) | ESLint: using it, configuring it, and its core rules | 10.14 | MIT | 348 files, 1.6 MB |
| [typescript-eslint](typescript-eslint.index.md) | typescript-eslint rules | 8.72 | MIT | 165 files, 0.6 MB |
| [angular-eslint](angular-eslint.index.md) | angular-eslint rules for TypeScript and templates | 22.6 | MIT | 93 files, 1.0 MB |
| [eslint-stylistic](eslint-stylistic.index.md) | ESLint Stylistic rules, the formatting pass | 5.10 | MIT | 97 files, 0.5 MB |
| [perfectionist](perfectionist.index.md) | eslint-plugin-perfectionist rules: sort everything | 5.13 | MIT | 24 files, 0.5 MB |
| [unicorn](unicorn.index.md) | eslint-plugin-unicorn rules | 79.0 | MIT | 376 files, 0.9 MB |
| [eslint-regexp](eslint-regexp.index.md) | eslint-plugin-regexp rules | 3.3 | MIT | 83 files, 0.2 MB |
| [eslint-jsdoc](eslint-jsdoc.index.md) | eslint-plugin-jsdoc rules | 65.4 | BSD-3-Clause | 79 files, 0.9 MB |
| [eslint-vitest](eslint-vitest.index.md) | @vitest/eslint-plugin rules | 1.6 | MIT | 82 files, 0.1 MB |
| [rxjs-x](rxjs-x.index.md) | eslint-plugin-rxjs-x rules | 1.0 | MIT | 44 files, 0.1 MB |
| [stylelint](stylelint.index.md) | Stylelint user guide and rules | 18.0 | MIT | 164 files, 0.4 MB |
| [stylelint-order](stylelint-order.index.md) | stylelint-order rules | 8.1 | MIT | 4 files, 0.0 MB |
| [angular-api](angular-api.index.md) | Angular API reference: the documentation comments of the public API (@publicApi) of the Angular packages | 22.2 | MIT | 238 files, 0.8 MB |
| [angular-cli](angular-cli.index.md) | Angular CLI: the description of each command and the options of each schematic of ng generate | 22.2 | MIT | 38 files, 0.1 MB |
| [rxjs-api](rxjs-api.index.md) | RxJS API reference: the documentation comments of the operators, observables and functions | 7.8 | Apache-2.0 | 203 files, 0.4 MB |
| [ngrx-signals-api](ngrx-signals-api.index.md) | NgRx Signals API reference: the documentation comments of signalStore, the features, entities, events and rxMethod | 22.0 | MIT | 42 files, 0.0 MB |
| [tsconfig](tsconfig.index.md) | TypeScript tsconfig reference: one page per compiler option | 6.0 | CC-BY-4.0 | 166 files, 0.1 MB |
| [typescript-eslint-guides](typescript-eslint-guides.index.md) | typescript-eslint guides: getting started, typed linting, shared configs, troubleshooting | 8.72 | MIT | 53 files, 0.3 MB |
| [prettier](prettier.index.md) | Prettier: options, configuration, CLI, ignoring code, integration with linters | 3.10 | MIT | 24 files, 0.2 MB |
| [editorconfig](editorconfig.index.md) | EditorConfig specification: the file format and its properties | 0.17 | BSD-2-Clause | 1 files, 0.0 MB |
| [import-x](import-x.index.md) | eslint-plugin-import-x rules | 4.18 | MIT | 51 files, 0.1 MB |
| [eslint-config-prettier](eslint-config-prettier.index.md) | eslint-config-prettier: the rules it turns off, the special rules, its CLI helper | 10.1 | MIT | 1 files, 0.0 MB |
| [stylelint-recess-order](stylelint-recess-order.index.md) | stylelint-config-recess-order: the property order of Recess for stylelint-order | 7.10 | ISC | 1 files, 0.0 MB |
| [eslint-headers](eslint-headers.index.md) | eslint-plugin-headers: the header-format rule | 1.3 | ISC | 1 files, 0.0 MB |
| [sass](sass.index.md) | Sass documentation: syntax, variables, at-rules, modules, built-in functions, breaking changes | 2026-11 | MIT | 86 files, 0.5 MB |
| [storybook](storybook.index.md) | Storybook documentation: stories, args, controls, addons, testing, configuration | 10.6 | MIT | 184 files, 1.4 MB |
| [aria-practices](aria-practices.index.md) | ARIA Authoring Practices Guide (APG): the patterns of accessible components and their examples | 2026-11 | W3C-20150513 | 107 files, 1.7 MB |
