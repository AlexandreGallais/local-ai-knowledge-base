# Skills of the project

One folder per skill, each with its `SKILL.md`, and its script in `scripts/` when it has one. OpenCode
finds them without any setting. Every skill the AI has is here.

| Skill | When the AI loads it |
| --- | --- |
| `look-up-api` | To check an API, an option or a command at the version of the project, with the documentation servers. |
| `name-branch` | To name a Git branch. |
| `write-agent` | To write an agent of OpenCode. |
| `write-agents-md` | To write or update the `AGENTS.md` of the project. |
| `write-commit-message` | To write a commit message. |
| `write-skill` | To write a new skill of the project, and check it. |
| `write-tests` | To write and run tests with the runner the project already has. |

## Usage

To add a skill, ask the AI to use the skill `write-skill`: it writes the folder and checks it. To check
a skill by hand, from the root of the project:

```sh
node .agents/skills/write-skill/scripts/check-skill.ts .agents/skills/<name>
python3 .agents/skills/write-skill/scripts/check_skill.py .agents/skills/<name>   # the same, without Node
```

To remove a skill, delete its folder.
