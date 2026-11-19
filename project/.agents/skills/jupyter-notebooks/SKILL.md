---
name: jupyter-notebooks
description: "Keeps Jupyter notebooks reproducible - run top to bottom, outputs cleared before commit, logic moved to modules, conversion to scripts. Use when creating or editing a .ipynb file, when a notebook only works in a certain cell order, or when a notebook must become a script."
license: Apache-2.0
metadata:
  id: SCI-10
  stars: "1"
  nature: reference
  mode: R
  wave: V4
  load: auto
---

# Jupyter notebooks

**Core rule:** a notebook must run from top to bottom in a fresh kernel, and is committed without outputs.

## Procedure

1. Never read a notebook raw: list its cells with `jupyter nbconvert --to script <nb>.ipynb --stdout | head -n 80`, or `python3 -c` with `json` to print cell sources.
   - Check: you read code, not JSON with outputs.
2. Edit cells with the notebook tooling or by editing the source cell in JSON precisely (`surgical-editing`).
   - Check: the file is still valid JSON (`python3 -m json.tool <nb>.ipynb > /dev/null`).
3. Run it top to bottom: `jupyter nbconvert --to notebook --execute <nb>.ipynb --output /tmp/run.ipynb`.
   - Check: execution ends without error.
4. Clear outputs before commit: `jupyter nbconvert --clear-output --inplace <nb>.ipynb`.
   - Check: `git diff` shows no output blobs.
5. Move reusable logic into a Python module imported by the notebook.
   - Check: the module has tests.

## Stop and ask the human if

- Jupyter is not installed and the notebook must be executed.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It runs in my kernel." | Hidden state from earlier cells; restart and run all. |
| "Commit with outputs for readers." | Outputs bloat diffs and may leak data. |

## Definition of done

- [ ] Runs top to bottom in a fresh kernel; outputs cleared; logic in modules.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
