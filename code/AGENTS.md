# AGENTS.md

## Rules

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. Read this base in English, whatever the language of the question.
3. Write code, comments, file content and commit messages in English.
4. Never search the web. Never open a URL. Links in documents only cite sources.
5. Find the topic of your task in `## Index`. Open its index file, then only the documents your task needs. Never read the whole `docs/` folder.
6. Never read files that end with `.fr.md`. They are summaries for people. Open one only when a skill tells you to.
7. Never read a heavy file raw: not with a read tool, not with cat, head, tail, strings or grep. Load the skill `read-heavy-file` first, then read only the extract in `.extract/`.
   Heavy files: .docx .docm .xlsx .xlsm .pptx .pptm .doc .xls .ppt .odt .ods .odp .rtf .pdf .png .jpg .jpeg .gif .webp .tif .tiff .bmp .heic .psd .ai .eps .emf .wmf .xd .sketch .fig .vsdx .drawio .ipynb .zip .7z .tar .gz .tgz .jar .war .nupkg .sqlite .db .msg .eml .dwg .dxf .dll .exe .so .wasm .class .bin
8. A text file over 100 KB or 2,000 lines is heavy too. Before you read a log, data or export file you do not know, check its size with `wc -c -l "<path>"`.
9. Write TypeScript, never plain JavaScript. Configuration files of tools are the only exception.
10. Before you write Angular or TypeScript code, read the versions of `@angular/core` and `typescript` in `package.json`. Write only what the documents of the topics `angular` and `typescript` allow at these versions.
    Before you write C# code, read `TargetFramework` in the `*.csproj` file: it gives the C# version, as `docs/dotnet/csharp-changes.md` says. Never add a package of `docs/dotnet/paid-packages.md` without the user's agreement.
11. Trust the documents of this base more than your memory.
12. When a task matches a line of `## Skills`, load that skill before you start.
13. After you change code, run its check commands below. Fix every error. Repeat until zero errors.
14. After you change a file of this base, run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.
15. Stop after 3 failed attempts on the same error. Show the error to the user.

## Check commands

Run them in the dev container, from the project root.

| Code changed | Commands, in this order |
| --- | --- |
| TypeScript or Angular | `npm run fix`, `npm run check`, `npm run build` |
| C# | `bash scripts/format-csharp.sh`, `dotnet build --no-restore -tl:off -nologo -v:q` |
| Dockerfile, dev container or Kubernetes | The commands of the skill `check-container-change` |

## Skills

| Task | Skill |
| --- | --- |
| To write or change TypeScript or Angular code | load the skill `lint-typescript` |
| To write or change C# code, or to fix a build error | load the skill `analyze-csharp` |
| To write or check a Dockerfile, a devcontainer.json, a Kubernetes manifest, a Helm chart or a kustomization | load the skill `check-container-change` |
| To check an API signature, an option or a command flag | load the skill `look-up-api` |
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

One line per topic. Each line points to the index of the topic: one line per document, with its summary.
Open the index of your topic, then only the documents your task needs.

- [angular](docs/angular/index.md): What changed in Angular 17 to 22, and the old patterns to replace.
- [containers](docs/containers/index.md): Dockerfile rules, .NET and Angular images, Podman, dev containers and container problems.
- [csharp-analysis](docs/csharp-analysis/index.md): C# analysis rules that fail the build, with wrong and right examples.
- [dotnet](docs/dotnet/index.md): What changed in C#, .NET, ASP.NET Core and EF Core 6 to 11, and paid packages.
- [kubernetes](docs/kubernetes/index.md): Manifests, API versions, probes, resources, rollout, validation without a cluster and debugging.
- [maintenance](docs/maintenance/index.md): Update the documents of a tool to a new version.
- [typescript](docs/typescript/index.md): What changed in TypeScript 5.0 to 7.0, RxJS 7 and Node.js 22 to 26.
- [typescript-lint](docs/typescript-lint/index.md): TypeScript and Angular lint rules the tool does not fix, with wrong and right examples.

## Final check

- Is your answer in the language of the question, with no mix of two languages?
- Did you open only the documents of your topic, and no `.fr.md` file?
- Did you read heavy files only through their extract in `.extract/`?
- Did the check commands of the code you changed end with zero errors?
- Did you stay away from the web and from every URL?
