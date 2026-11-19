---
name: surgical-editing
description: "Changes files with small exact edits instead of rewrites, and rereads them after. Use whenever you modify an existing file, when an edit fails with 'old string not found' or 'found multiple times', or when a file looks shorter or truncated after writing."
metadata:
  id: DEV-02
  stars: "5"
  nature: guardrail
  mode: A
  wave: V0
  load: always
---

# Surgical editing

**Core rule:** change an existing file with `edit` (exact replacement) or `patch`, never by rewriting it whole, and read the changed lines back after each edit.

## Rules

1. Read the exact lines first with `read` (with an offset and a limit for a long file).
   - Check: you copied the old text from the tool output, not from memory.
2. Make the `old` text unique: include one or two surrounding lines.
   - Check: `grep` on the old text finds exactly one match.
3. One edit changes one logical place. Several places mean several edits.
   - Check: each edit's new text differs from its old text only where intended.
4. Use `write` only for a new file, or for a file under 50 lines that you read in full just before.
   - Check: the file did not exist, or its full content was in your context.
5. After each edit, `read` the changed region and the line count.
   - Check: indentation, closing brackets and the end of file are intact.
6. Never replace code with a placeholder such as `// ... rest unchanged`.
   - Check: no such line appears in the file.

## Stop and ask the human if

- The file is generated (look for "generated", "do not edit"): change its source instead.
- An edit fails twice on the same file: reread the file, then ask if it still fails.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Rewriting the file is simpler." | It silently drops lines you did not see. |
| "The edit tool said ok." | Read the result. Whitespace or tabs may differ. |
| "A short summary of the unchanged part is fine." | It deletes that part. Copy nothing you did not read. |

## Definition of done

- [ ] Every change made by `edit` or `patch` on exact text, or `write` on a new or fully read small file.
- [ ] Every changed region read back; no truncation, no placeholder.
