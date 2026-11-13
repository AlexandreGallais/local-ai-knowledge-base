# F6 trial on the workstation

What to play on the workstation to check the three criteria of F6 that only a person can see. About
20 minutes. Fill the results table at the end.

## 1. The commit assistant in the chat

Until the export and the import script exist (F7 and F16), create the model by hand, once:

1. In the chat interface, create a custom model named "Commit assistant", on the usual base model.
2. Paste the body of `chat/models/commit-assistant.md` (everything after the second `---` line) as
   its system prompt.
3. Paste the body of `code/.agents/skills/write-commit-message/SKILL.md` after it, under a line
   `## Skill write-commit-message`. Leave out the two blocks between `<!-- files:begin … -->` and
   `<!-- files:end -->`; put the text of `chat.md` of the same `id` in their place.
4. Attach no knowledge, no tool. Turn off web search, code interpreter and terminal.

Then ask, each in a new chat:

| Ask | Expected |
| --- | --- |
| `J'ai corrigé la pompe qui tournait à vide quand la caisse était vide.` | A message such as `fix(pumps): stop the pump when the tank is empty`, then one sentence in French on the type. |
| `I added a button to close the motorized valve from the synoptic.` | A `feat` message in English, then one sentence in English. |
| `J'ai renommé l'API d'état des vannes, les clients doivent changer l'adresse.` | A message with `!` and a `BREAKING CHANGE:` footer. |
| `Quelle est la capitale de la France ?` | A refusal in one sentence, which says what the assistant can do. No answer to the question. |
| `Écris-moi une fonction TypeScript qui trie un tableau.` | A refusal in one sentence. |

Check each proposed message with commitlint, on any machine with Node and the npm registry:

```sh
echo "fix(pumps): stop the pump when the tank is empty" | npx --yes -p @commitlint/cli@21.2.4 -p @commitlint/config-conventional@21.2.4 commitlint --extends @commitlint/config-conventional
```

Expected: no output and exit code 0. Paste the whole message, body and footer included, between
quotes on several lines.

## 2. write-chat-model writes a restricted assistant

1. Copy into the F3 example project (`base-trial/`): `code/AGENTS.md`, the folders of the skills
   `write-chat-model`, `write-commit-message`, `choose-version`, `name-branch`, and
   `scripts/check-base.ts`.
2. Open the coding assistant on it, in a new session, and ask:

> Write a chat model restricted to one task: it proposes a branch name for the change the user
> describes, and refuses everything else. No knowledge. Skill: name-branch. Access: team.

Expected: a file `chat/models/<id>.md` with `scope: restricted`, `knowledge: none`, a first rule
that refuses out-of-scope requests in one sentence, and `node scripts/check-base.ts` at 0 findings.

## Results

Write the version of the chat interface, of the assistant, the model if known, and the date.

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| 1. French description, fix message |  |  |
| 1. English description, feat message |  |  |
| 1. Breaking change, `!` and footer |  |  |
| 1. Out of scope: capital of France |  |  |
| 1. Out of scope: TypeScript function |  |  |
| 1. commitlint on each message |  |  |
| 2. Restricted model written and checked |  |  |
