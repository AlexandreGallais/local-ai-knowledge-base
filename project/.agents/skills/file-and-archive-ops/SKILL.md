---
name: file-and-archive-ops
description: "Does bulk file operations safely - tar, zip, rsync, diff and patch, mass rename or move with a preview. Use when archiving or extracting files, copying trees, synchronising folders, comparing directories, applying a patch, or renaming or moving many files at once."
metadata:
  id: LNX-08
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# File and archive operations

**Core rule:** preview every bulk operation (list, dry run) before running it, and never extract or sync into a folder you have not checked.

## Procedure

1. Preview: list what an archive holds or what a sync will do (table).
   - Check: the list matches the intent.
2. Run the operation into a known target folder.
   - Check: the target exists and is the intended one (`ls -la <target>`).
3. Verify the result: counts, sizes or a diff.
   - Check: `diff -rq <source> <target>` shows only expected differences.

| Need | Preview | Run |
| --- | --- | --- |
| Extract a tar | `tar -tf a.tar.gz \| head` | `tar -xzf a.tar.gz -C <dir>` |
| Create a tar | `find <dir> \| head` | `tar -czf out.tar.gz -C <parent> <dir>` |
| Zip | `unzip -l a.zip` | `unzip a.zip -d <dir>` |
| Sync folders | `rsync -av --dry-run src/ dst/` | `rsync -av src/ dst/` |
| Compare trees | `diff -rq a/ b/` | not applicable |
| Apply a patch | `git apply --check p.patch` or `patch --dry-run -p1 < p.patch` | `git apply p.patch` |

## Stop and ask the human if

- An operation would delete files (`rsync --delete`, extraction over existing files).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`rsync src dst` and `rsync src/ dst/` are the same." | The trailing slash changes whether the folder itself is copied. |
| "Extract here." | Archives may hold many top-level files or absolute paths. List first. |

## Definition of done

- [ ] Preview shown before each bulk operation; result verified by counts or diff.
