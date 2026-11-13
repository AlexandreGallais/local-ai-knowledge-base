---
name: write-chat-model
description: Write the system prompt and settings of one custom chat model, for one subject or for one single task. Use when the user asks to create, update or review a chat model, its system prompt, or an assistant restricted to one task.
license: MIT
metadata:
  variant: files
  version: "0.2.0"
---

# Write a chat model

## Rules

- One model covers one subject (`scope: subject`) or one single task (`scope: restricted`).
- Attach only the knowledge and the skills of that subject. Attach three skills at most.
- Keep the system prompt at 40 lines or fewer. It is sent with every message.
- Keep the system prompt static: no date, no time, no user name, no variable.
- With knowledge: the first rule tells the model to search the attached knowledge before it answers, and to search again with one plain keyword when it finds nothing.
- Without knowledge: write `knowledge: none`, and never ask the model to search a knowledge. The attached skills are then sent with every message: the prompt and the skills make 150 lines at most.
- A restricted model has a scope rule: "If the request is not about <task>, refuse in one sentence and say what you can do."
- Tell the model that it cannot write files or run commands.
- Tell the model to answer in the language of the question, never a mix of two languages.
- Never name a software in the system prompt. Never tell the model to search the web or to open a URL.

## Steps

1. Ask the user for: the subject or the single task, the knowledge to attach (or none), the skills to attach, the group that may use the model.
2. Produce the model with the template below: the settings in the header, the system prompt in the body.
3. For a restricted model, add the scope rule first, with what the model can do in one short list.
4. Check the rules above one by one.

<!-- files:begin -->

5. Write the content to `chat/models/<model-id>.md`.
6. Run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.

<!-- files:end -->

7. Give five test questions of the subject. With knowledge, each answer must name a document. For a restricted model, add one question out of scope: the answer must be a refusal in one sentence.

## Template

```markdown
---
id: <model-id, lowercase with hyphens>
name: <Name shown to users>
description: <One sentence: what the model does.>
subject: <subject or task>
scope: <subject | restricted>
knowledge: <knowledge name>, <knowledge name> | none
skills: <skill-name>, <skill-name> | none
access: <group name>
---

# <Name shown to users>

You are the <subject> assistant of a software team.

## Rules

1. Search the attached knowledge before you answer. Search the whole knowledge, not one file.
2. If the search finds nothing, search again with one plain keyword. Then try a second keyword.
3. Answer from the knowledge you found and from the user's message. If it does not hold the answer, say so. Do not guess.
4. Name each document you used, by its title.
5. You cannot write files. You cannot run commands. Never say that you did.
6. When a check is needed, give the user the command to run. Ask for its output.
7. Answer in the language of the user's question. Never mix two languages. Write code, identifiers and comments in English.
8. Never search the web. Never open a URL.

## Answer format

1. The answer, in one to three short sentences.
2. The details, as a list or a code block.
3. `Sources:` and the titles of the documents you used.
```

For `knowledge: none`, drop rules 1 to 4 and the `Sources:` line. For `scope: restricted`, put the scope rule first.

## Example

Wrong: a restricted model that answers anything.

```markdown
You are a helpful assistant for commit messages. Answer the user.
```

Right:

```markdown
1. If the request is not about commit messages, refuse in one sentence and say what you can do.
```

Wrong answer to "What is the capital of France?": the capital, then a commit message.

Right answer: "I only help to write commit messages: tell me what you changed."

## Pitfalls

- Many skills attached to one model: each one may be loaded in every chat. Attach three at most.
- A date or a time in the system prompt: it changes every day and breaks the prompt cache.
- Knowledge of another subject attached "just in case": remove it.
- A model without knowledge whose prompt says "search the knowledge": it searches nothing and may invent.

## Final check

- With knowledge, does the first rule tell the model to search it? Without, is it `knowledge: none`?
- Does a restricted model refuse out-of-scope requests in one sentence?
- Is the system prompt static and 40 lines or fewer?
- Does the model have only the knowledge and the skills of its subject?
