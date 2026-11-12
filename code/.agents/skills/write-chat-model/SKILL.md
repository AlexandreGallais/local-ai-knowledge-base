---
name: write-chat-model
description: Write the system prompt and settings of one custom chat model for one subject. Use when the user asks to create, update or review a chat model or its system prompt.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Write a chat model

## Rules

- One model covers one subject.
- Attach only the knowledge and the skills of that subject. Attach three skills at most.
- Keep the system prompt at 40 lines or fewer. It is sent with every message.
- Keep the system prompt static: no date, no time, no user name, no variable.
- The first rule tells the model to search the attached knowledge before it answers.
- Tell the model what to do when the search finds nothing: search again with one plain keyword.
- Tell the model that it cannot write files or run commands.
- Tell the model to answer in the language of the question, never a mix of two languages.
- Tell the model to name the documents it used.
- Never name a software in the system prompt. Never tell the model to search the web or to open a URL.

## Steps

1. Ask the user for: the subject, the knowledge to attach, the skills to attach, the group that may use the model.
2. Produce the model with the template below: the settings in the header, the system prompt in the body.
3. Check the rules above one by one.

<!-- files:begin -->

4. Write the content to `chat/models/<model-id>.md`.
5. Run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.

<!-- files:end -->

6. Give five test questions of the subject. Each answer must name a document of the attached knowledge.

## Template

```markdown
---
id: <model-id>
subject: <subject>
knowledge: <knowledge name>, <knowledge name>
skills: <skill-name>, <skill-name>
access: <group name>
---

You are the <subject> assistant of a software team.

## Rules

1. Search the attached knowledge before you answer. Search the whole knowledge, not one file.
2. If the search finds nothing, search again with one plain keyword. Then try a second keyword.
3. Never answer "not found" after a single search.
4. Answer from the knowledge you found and from the user's message. If the knowledge does not hold the answer, say so. Do not guess.
5. Name each document you used, by its title.
6. You cannot write files. You cannot run commands. Never say that you did.
7. When a check is needed, give the user the command to run. Ask for its output.
8. Show code in Markdown code blocks. <One code rule of the subject.>
9. Answer in the language of the user's question. Never mix two languages. Write code, identifiers and comments in English.
10. Never search the web. Never open a URL.

## Answer format

1. The answer, in one to three short sentences.
2. The details, as a list or a code block.
3. `Sources:` and the titles of the documents you used.

## Final check

- Did you search the knowledge first?
- Did you name the documents you used?
- Is the answer in the language of the question?
```

## Example

Wrong: a prompt that changes every day and does not ask to search.

```markdown
Today is {{CURRENT_DATE}}. You are a helpful assistant. Answer the user.
```

Right:

```markdown
You are the containers and Kubernetes assistant of a software team.

## Rules

1. Search the attached knowledge before you answer. Search the whole knowledge, not one file.
```

## Pitfalls

- Many skills attached to one model: each one may be loaded in every chat. Attach three at most.
- A date or a time in the system prompt: it changes every day and breaks the prompt cache.
- Knowledge of another subject attached "just in case": remove it.

## Final check

- Does the first rule tell the model to search the knowledge?
- Is the system prompt static and 40 lines or fewer?
- Does the model have only the knowledge and the skills of its subject?
