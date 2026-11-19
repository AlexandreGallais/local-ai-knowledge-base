---
name: skill-testing
description: "Manual: run only when the user explicitly asks for /skill-testing. Tests a skill in pairs, the same task in a fresh session without then with the skill, with a deterministic check, plus a trigger test of 6 requests, and logs the result in _eval."
metadata:
  id: SKL-03
  stars: "4"
  nature: process
  mode: A
  wave: V0
  load: manual
---

# Skill testing

**Core rule:** keep a skill only if the same task, checked by a command, goes better with it than without it.

## When to use

- Use when: a skill is new or changed; a skill seems never to trigger or to mislead.
- Do not use when: you only fixed a typo in a skill already tested.

## Procedure

1. Write the trigger test: 3 requests that must load the skill and 3 close ones that must not.
   - Check: the 6 requests are written in `_eval/<name>.md`.
2. Run each of the 6 requests in a fresh session and note which skills the agent announces.
   - Check: the 3 positive requests load the skill, the 3 negative ones do not. Otherwise narrow or widen the `description` and run again.
3. Write 2 or 3 realistic tasks, each with a deterministic check: a test that passes, a file content, a pipeline status, a command output.
   - Check: each check is one command with a pass or fail result.
4. Prepare two copies of the project: `cp -a <project> /tmp/eval-with` and `cp -a <project> /tmp/eval-without`, then delete `.agents/skills/<name>` in the second copy only.
   - Check: `ls /tmp/eval-without/.agents/skills/<name>` fails and `ls /tmp/eval-with/.agents/skills/<name>` succeeds.
5. Run each task in a fresh, non-interactive session in both copies, for example from the copy: `opencode run --format json "<task>" > /tmp/eval-<with|without>-<n>.json`.
   - Check: both runs end and their outputs are saved.
6. Run the deterministic check in both copies and count the tokens from the `step_finish` events of each output.
   - Check: you have, per task, pass or fail and the tokens, with and without the skill.
7. Decide: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
   - Check: the decision is written in `_eval/<name>.md`.

## Log format of `_eval/<name>.md`

```markdown
# Eval: <name> (<ID>)

- Date: <YYYY-MM-DD>
- Model and version: <model served locally>
- Status: done

## Trigger test
| Request | Expected | Loaded? |

## Paired tasks
| Task | Check | Without | With | Tokens without | Tokens with |

## Decision
<keep | shorten | rewrite | drop>, because <reason>.
```

## Stop and ask the human if

- No deterministic check exists for the skill's tasks: ask what proves success.
- The result is worse with the skill and you cannot see why.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One run is enough." | Run each task at least once per side; rerun when results are close. |
| "Same session, skill added halfway." | The context already holds the answer. Use fresh sessions. |
| "The output looks better." | Looks are not a check. Use the command. |

## Definition of done

- [ ] Trigger test: 6 requests behave as expected.
- [ ] Paired test: 2 or 3 tasks, with and without, each with a pass or fail result and tokens.
- [ ] Decision written in `_eval/<name>.md`; the skill kept only if it helps.
