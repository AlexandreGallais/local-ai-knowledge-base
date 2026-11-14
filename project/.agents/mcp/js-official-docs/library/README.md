# Official documentation library

The official documentation of the tools, converted to plain Markdown, at a pinned version, cut into
files of 16 KB at most, with one index per tool. The AI searches it with the docs tools of the base,
then reads one section; each profile of project searches only the tools it uses.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # headers, index, 16 KB at most, notices
```

## Tools

| Tool | Documentation | Version | License | Profiles | Size |
| --- | --- | --- | --- | --- | --- |
| [mdn-javascript](mdn-javascript/index.md) | MDN Web Docs: JavaScript guide and reference | 2026-11 | CC-BY-SA-2.5 | all | 1435 files, 5.8 MB |
| [mdn-html](mdn-html/index.md) | MDN Web Docs: HTML elements, attributes and guides | 2026-11 | CC-BY-SA-2.5 | all | 305 files, 1.9 MB |
| [mdn-css](mdn-css/index.md) | MDN Web Docs: CSS properties, selectors, values and guides | 2026-11 | CC-BY-SA-2.5 | all | 1399 files, 7.6 MB |
| [mdn-api](mdn-api/index.md) | MDN Web Docs: Web APIs (DOM, SVG DOM, Canvas, Fetch, Workers, WebSocket, events, storage, animations) | 2026-11 | CC-BY-SA-2.5 | all | 8337 files, 20.3 MB |
| [mdn-http](mdn-http/index.md) | MDN Web Docs: HTTP headers, methods, status codes and guides | 2026-11 | CC-BY-SA-2.5 | all | 401 files, 1.5 MB |
| [mdn-svg](mdn-svg/index.md) | MDN Web Docs: SVG elements, attributes and guides | 2026-11 | CC-BY-SA-2.5 | all | 318 files, 1.0 MB |
| [mdn-accessibility](mdn-accessibility/index.md) | MDN Web Docs: accessibility, ARIA roles, states and properties | 2026-11 | CC-BY-SA-2.5 | all | 184 files, 1.0 MB |
| [angular](angular/index.md) | Angular documentation (angular.dev), without Material, CDK nor Angular Aria | 22.2 | CC-BY-4.0 | angular-app, angular-lib | 520 files, 3.9 MB |
| [typescript](typescript/index.md) | TypeScript Handbook, reference and release notes | 6.0 | CC-BY-4.0 | all | 199 files, 1.8 MB |
| [rxjs](rxjs/index.md) | RxJS 7 guides, operators and deprecations | 7.8 | Apache-2.0 | angular-app, angular-lib | 26 files, 0.2 MB |
| [ngrx-signals](ngrx-signals/index.md) | NgRx Signals guide (SignalStore, features, entities, events, testing) and the NgRx ESLint rules | 22.0 | MIT | angular-app, angular-lib | 57 files, 0.2 MB |
| [node](node/index.md) | Node.js API reference | 26.13 | MIT | all | 374 files, 4.0 MB |
| [npm](npm/index.md) | npm commands, package.json and configuration | 12.2 | Artistic-2.0 | all | 92 files, 0.3 MB |
| [vite](vite/index.md) | Vite guide, configuration and API | 8.3 | MIT | all | 54 files, 0.4 MB |
| [vitest](vitest/index.md) | Vitest guide, API and configuration | 5.1 | MIT | all | 262 files, 1.4 MB |
| [playwright](playwright/index.md) | Playwright for TypeScript: guides and API | 1.65 | Apache-2.0 | angular-app, angular-lib | 241 files, 2.2 MB |
| [eslint](eslint/index.md) | ESLint: using it, configuring it, and its core rules | 10.14 | MIT | all | 371 files, 1.6 MB |
| [typescript-eslint](typescript-eslint/index.md) | typescript-eslint rules | 8.72 | MIT | all | 169 files, 0.5 MB |
| [angular-eslint](angular-eslint/index.md) | angular-eslint rules for TypeScript and templates | 22.6 | MIT | angular-app, angular-lib | 121 files, 0.9 MB |
| [eslint-stylistic](eslint-stylistic/index.md) | ESLint Stylistic rules, the formatting pass | 5.10 | MIT | all | 101 files, 0.5 MB |
| [perfectionist](perfectionist/index.md) | eslint-plugin-perfectionist rules: sort everything | 5.13 | MIT | all | 50 files, 0.4 MB |
| [unicorn](unicorn/index.md) | eslint-plugin-unicorn rules | 79.0 | MIT | all | 377 files, 0.9 MB |
| [eslint-regexp](eslint-regexp/index.md) | eslint-plugin-regexp rules | 3.3 | MIT | all | 84 files, 0.2 MB |
| [import-lite](import-lite/index.md) | eslint-plugin-import-lite rules: the import rules that need no resolver | 0.6 | MIT | all | 9 files, 0.0 MB |
| [eslint-jsdoc](eslint-jsdoc/index.md) | eslint-plugin-jsdoc rules | 65.4 | BSD-3-Clause | angular-lib, ts-lib, ts-pure-lib | 116 files, 0.8 MB |
| [eslint-functional](eslint-functional/index.md) | eslint-plugin-functional rules | 10.0 | MIT | ts-pure-lib | 21 files, 0.1 MB |
| [eslint-vitest](eslint-vitest/index.md) | @vitest/eslint-plugin rules | 1.6 | MIT | all | 82 files, 0.1 MB |
| [rxjs-x](rxjs-x/index.md) | eslint-plugin-rxjs-x rules | 1.0 | MIT | angular-app, angular-lib | 44 files, 0.1 MB |
| [eslint-jsonc](eslint-jsonc/index.md) | eslint-plugin-jsonc rules | 3.4 | MIT | all | 45 files, 0.1 MB |
| [stylelint](stylelint/index.md) | Stylelint user guide and rules | 18.0 | MIT | all | 166 files, 0.4 MB |
| [stylelint-stylistic](stylelint-stylistic/index.md) | @stylistic/stylelint-plugin rules, the formatting pass for CSS and SCSS | 6.0 | MIT | all | 86 files, 0.2 MB |
| [stylelint-order](stylelint-order/index.md) | stylelint-order rules | 8.1 | MIT | all | 4 files, 0.0 MB |
