# AGENTS.md

## Rules

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. Read this base in English, whatever the language of the question.
3. Write code, comments, file content and commit messages in English.
4. Never search the web. Never open a URL. Links in documents only cite sources.
5. Open only the documents of the topic of your task, from `## Index`. Never read the whole `docs/` folder.
6. Never read files that end with `.fr.md`. They are summaries for people. Open one only when a skill tells you to.
7. Trust the documents of this base more than your memory.
8. When a task matches a line of `## Skills`, load that skill before you start.
9. After you change a file of this base, run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.
10. Stop after 3 failed attempts on the same error. Show the error to the user.

## Skills

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
- Did you stay away from the web and from every URL?
