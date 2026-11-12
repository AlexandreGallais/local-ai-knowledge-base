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
9. Trust the documents of this base more than your memory.
10. When a task matches a line of `## Skills`, load that skill before you start.
11. After you change a file of this base, run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.
12. Stop after 3 failed attempts on the same error. Show the error to the user.

## Skills

- To read a heavy file, or a folder of them: load the skill `read-heavy-file`.
- To write a commit message, or to commit: load the skill `write-commit-message`.
- To choose a version number, or to tag a release: load the skill `choose-version`.
- To name a branch, or to create one: load the skill `name-branch`.
- To write or shorten `AGENTS.md`: load the skill `write-agents-md`.
- To write a skill: load the skill `write-skill`.
- To write an agent: load the skill `write-agent`.
- To add or update a document of the base: load the skill `write-base-document`.
- To write the system prompt of a chat model: load the skill `write-chat-model`.

## Index

One line per document, in this form: `- [Title](docs/<topic>/<file>.md): <summary>`.
Open only the documents of your topic.

No document yet.

## Final check

- Is your answer in the language of the question, with no mix of two languages?
- Did you open only the documents of your topic, and no `.fr.md` file?
- Did you read heavy files only through their extract in `.extract/`?
- Did you stay away from the web and from every URL?
