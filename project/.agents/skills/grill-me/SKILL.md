---
name: grill-me
description: "Manual: run only when the user explicitly asks for /grill-me. Interviews the user one round of questions at a time, each with a recommended answer, until a plan or a design has no open decision left."
license: MIT
metadata:
  id: PLN-01
  stars: "4"
  nature: process
  mode: R
  wave: V2
  load: manual
---

# Grill me

**Core rule:** ask only the questions whose prerequisites are settled, each with your recommended answer, and wait for the answers before the next round.

## When to use

- Use when: the user types `/grill-me` about a plan, a design or an idea.
- Do not use when: the request is only underspecified; use `ask-when-underspecified`.

## Procedure

1. Write the decision tree: the main decision, and the decisions that depend on it.
   - Check: each decision has its prerequisites listed.
2. Find facts yourself (code, configs, docs); only decisions go to the user.
   - Check: no question asks for a fact you could look up.
3. Ask one round: every decision whose prerequisites are settled, numbered, each with options and your recommended answer first, through the `question` tool.
   - Check: no question in the round depends on another question of the same round.
4. Record the answers, update the tree, ask the next round.
   - Check: the settled decisions are written down.
5. Stop when no open decision remains; summarise the decisions and ask the user to confirm.
   - Check: the user confirmed the summary before any code is written.

## Stop and ask the human if

- The user wants to stop: give the summary of what is settled and what is open.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Ask everything at once." | Later questions depend on earlier answers. Ask by rounds. |
| "Open questions are more polite." | Options with a recommendation get faster, clearer answers. |

## Definition of done

- [ ] Every decision of the tree settled by the user.
- [ ] Summary confirmed before any implementation.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
