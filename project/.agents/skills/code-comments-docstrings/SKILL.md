---
name: code-comments-docstrings
description: "Writes comments that explain why, and API documentation in the language's format - JSDoc or TSDoc, Python docstrings, C# XML doc, rustdoc, Javadoc, Doxygen - on public functions and types. Use when adding or changing a public function, class or module, when asked to document code, or when a comment only repeats the code."
metadata:
  id: WRT-02
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Code comments and docstrings

**Core rule:** comments say why and what to watch for, never what the next line obviously does; every public API gets a doc comment in its language's format.

## Procedure

1. List the public items you added or changed: exported functions, classes, modules, endpoints.
   - Check: each has a doc comment.
2. Write the doc comment with the format of the table: summary line, parameters, return, errors, one example when the use is not obvious.
   - Check: parameters in the comment match the signature exactly.
3. Add inline comments only for non-obvious reasons: a workaround, a constraint, a unit, a reference to an issue.
   - Check: no comment paraphrases the code.
4. Run the project's doc or lint check if it has one (`tsc`, `cargo doc`, `dotnet build` with doc warnings).
   - Check: no new documentation warning.

| Language | Format |
| --- | --- |
| TypeScript, JavaScript | `/** Summary. @param x ... @returns ... @throws ... */` |
| Python | triple-quoted docstring; the project's style (Google, NumPy or reST) |
| C# | `/// <summary>`, `<param name="x">`, `<returns>`, `<exception cref="...">` |
| Rust | `///` with `# Errors`, `# Panics`, `# Examples` sections |
| Java | `/** Summary. @param x ... @return ... @throws ... */` |
| C, C++ | Doxygen `/** @brief ... @param ... @return ... */` if the project uses it |

## Stop and ask the human if

- The project has a documentation style guide that contradicts this table.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`// increment i`" | Says nothing. Delete it; write why if needed. |
| "Docs can wait." | Stale or missing docs mislead the next reader, including the agent. |

## Definition of done

- [ ] Each public item has a doc comment matching its signature.
- [ ] Inline comments explain reasons only; doc checks clean.
