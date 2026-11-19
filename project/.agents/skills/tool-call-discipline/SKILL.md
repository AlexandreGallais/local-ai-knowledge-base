---
name: tool-call-discipline
description: "Makes every action a real tool call, one action per call, with its result read before the next step. Use when taking any action at any step of a task, and above all when about to write 'I will run', 'I have updated' or a command in prose, or when a tool returned an error or an empty result."
metadata:
  id: MET-03
  stars: "5"
  nature: guardrail
  mode: A
  wave: V0
  load: always
---

# Tool-call discipline

**Core rule:** act only through real tool calls. A command or an edit written as text did not happen.

## Rules

1. To run a command, call the `shell` tool. To change a file, call `edit`, `write` or `patch`. To read, call `read`, `grep` or `glob`.
   - Check: every action you report has a matching tool call above it in this turn.
2. One call does one action: one command, one file edit.
   - Check: no call chains unrelated commands with `&&` or `;`.
3. Read the result of each call before the next one: exit code, error text, changed lines.
   - Check: your next step cites what the previous result said.
4. Report only what a tool result shows. Past tense ("I updated") only after the tool confirmed it.
   - Check: each "done" sentence points to a tool result.
5. Write tool names as words. Never type call syntax, tags or JSON of a tool call into your reply.
   - Check: your reply holds no raw tool-call markup.

## Example

Bad: "I ran `npm test` and everything passes." with no `shell` call.

Good: call `shell` with `npm test`, read `Tests: 12 passed, 0 failed`, then write "npm test: 12 passed, 0 failed."

## Stop and ask the human if

- A tool you need is missing or refused by a permission.
- The same tool call fails twice with the same error (see `loop-breaker`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Describing the command is enough." | Nothing ran. Call the tool. |
| "I will batch five edits in one call." | One failure hides the others. One action per call. |
| "The tool probably succeeded." | Read the result. Errors are often in the last lines. |

## Definition of done

- [ ] Every reported action has its tool call and its read result.
- [ ] No action described in prose instead of executed.
