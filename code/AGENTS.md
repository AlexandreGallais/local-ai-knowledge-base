# AGENTS.md

## Rules

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. Read this base in English, whatever the language of the question.
3. Write code, comments, file content and commit messages in English.
4. Never search the web. Never open a URL. Links in documents only cite sources.
5. Open only the documents of the topic of your task, from `## Index`. Never read the whole `docs/` folder.
6. Never read files that end with `.fr.md`. They are summaries for people. Open one only when a skill tells you to.
7. Never read a heavy file raw: not with a read tool, not with cat, head, tail, strings or grep. Load the skill `read-heavy-file` first, then read only the extract in `.extract/`.
   Heavy files: .docx .docm .xlsx .xlsm .pptx .pptm .doc .xls .ppt .odt .ods .odp .rtf .pdf .png .jpg .jpeg .gif .webp .tif .tiff .bmp .heic .psd .ai .eps .emf .wmf .xd .sketch .fig .vsdx .drawio .ipynb .zip .7z .tar .gz .tgz .jar .war .nupkg .sqlite .db .msg .eml .dwg .dxf .dll .exe .so .wasm .class .bin
8. A text file over 100 KB or 2,000 lines is heavy too. Before you read a log, data or export file you do not know, check its size with `wc -c -l "<path>"`.
9. Write TypeScript, never plain JavaScript. Configuration files of tools are the only exception.
10. Trust the documents of this base more than your memory.
11. When a task matches a line of `## Skills`, load that skill before you start.
12. After you change code, run its check commands below. Fix every error. Repeat until zero errors.
13. After you change a file of this base, run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.
14. Stop after 3 failed attempts on the same error. Show the error to the user.

## Check commands

Run them in the dev container, from the project root.

| Code changed | Commands, in this order |
| --- | --- |
| TypeScript or Angular | `npm run fix`, `npm run check`, `npm run build` |
| C# | `bash scripts/format-csharp.sh`, `dotnet build --no-restore -tl:off -nologo -v:q` |

## Skills

| Task | Skill |
| --- | --- |
| To write or change TypeScript or Angular code | load the skill `lint-typescript` |
| To write or change C# code, or to fix a build error | load the skill `analyze-csharp` |
| To read a heavy file, or a folder of them | load the skill `read-heavy-file` |
| To write a commit message, or to commit | load the skill `write-commit-message` |
| To choose a version number, or to tag a release | load the skill `choose-version` |
| To name a branch, or to create one | load the skill `name-branch` |
| To write or shorten `AGENTS.md` | load the skill `write-agents-md` |
| To write a skill | load the skill `write-skill` |
| To write an agent | load the skill `write-agent` |
| To add or update a document of the base | load the skill `write-base-document` |
| To write the system prompt of a chat model | load the skill `write-chat-model` |

## Index

One line per document, in this form: `- [Title](docs/<topic>/<file>.md): <summary>`.
Open only the documents of your topic.

### csharp-analysis

- [C# analysis setup](docs/csharp-analysis/analysis-setup.md): Configuration files, format and build commands, and the strict formatting switch of a .NET project. .NET 10.
- [C# async rules](docs/csharp-analysis/async-rules.md): CA2016, CA1849, CS4014 and async void, with wrong and right examples. .NET 10.
- [C# nullability rules](docs/csharp-analysis/nullability-rules.md): CS8602, CS8603, CS8618 and CA1510, with wrong and right examples. .NET 10.
- [C# string and culture rules](docs/csharp-analysis/string-culture-rules.md): CA1305, CA1310 and CA1862, with wrong and right examples. .NET 10.
- [C# logging and exception rules](docs/csharp-analysis/logging-exception-rules.md): CA2254, CA1727, CA1031 and CA2200, with wrong and right examples. .NET 10.
- [C# collection and disposal rules](docs/csharp-analysis/collection-disposal-rules.md): CA1827, CA1860, CA1854, CA1869 and CA1001, with wrong and right examples. .NET 10.
- [C# style rules](docs/csharp-analysis/style-rules.md): IDE1006, IDE0040, IDE0011 and IDE0044 with examples; the style rules the format command fixes. .NET 10.

### typescript-lint

- [TypeScript types without any](docs/typescript-lint/ts-types.md): Rules for any, unknown, type assertions, non-null assertions and thrown values, with examples. typescript-eslint 8.
- [TypeScript null checks and conditions](docs/typescript-lint/ts-null-and-conditions.md): Rules for index access, needless conditions, complete switch statements, template strings and nullish values. TypeScript 6.0.
- [TypeScript promises](docs/typescript-lint/ts-async.md): Rules to handle every promise, await before a test, and use async only with await. typescript-eslint 8.
- [Angular 22 components](docs/typescript-lint/angular-components-v22.md): Rules for inject(), signal inputs and outputs, lifecycle methods, host bindings and standalone components. Angular 22.
- [Angular 22 templates](docs/typescript-lint/angular-templates-v22.md): Rules for control flow, class bindings, buttons, keyboard access and empty lists in templates. Angular 22.
- [Angular and RxJS](docs/typescript-lint/angular-rxjs.md): Rules to end subscriptions with the component and to turn streams into signals. Angular 22, RxJS 7.
- [Strict formatting](docs/typescript-lint/ts-angular-strict-format.md): Member order to write by hand, and what the fix command orders for you. ESLint 10, STRICT_FORMAT.

## Final check

- Is your answer in the language of the question, with no mix of two languages?
- Did you open only the documents of your topic, and no `.fr.md` file?
- Did you read heavy files only through their extract in `.extract/`?
- Did the check commands of the code you changed end with zero errors?
- Did you stay away from the web and from every URL?
