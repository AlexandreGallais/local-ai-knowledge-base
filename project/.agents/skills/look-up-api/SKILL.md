---
name: look-up-api
description: Use when you check an API signature or option, or when the user asks how a function, class, method, command or flag works - the exact answer at the version the project uses, from the local documentation servers and the installed packages.
---

# Look up an API

## Rules

- Use the version the project uses, not the version you remember.
- Search first, then read one section or about 80 lines around the match. Never read a whole folder or a whole large file.
- Say "not found" when the search finds nothing. Never guess a signature.
- Give the version, and the document, file or command the answer comes from.

## Steps

1. Note the language, the tool, the name of the API or command, and the question.
2. Read the version the project uses, in its own file: `package.json` (JavaScript, TypeScript), `*.csproj` or
   `Directory.Packages.props` (C#), `pyproject.toml` or `requirements.txt` (Python), `Cargo.toml` (Rust),
   `pom.xml` or `build.gradle` (Java), `CMakeLists.txt` (C, C++).
3. Search the documentation server of that language or tool, as `.agents/README.md` lists them:
   `search_docs` with the exact name and two words of the question. Add `tool` to narrow it.
4. Read the best result with `read_doc`: one section only.
5. When the version of the document differs from the one of the project, or nothing matches, search the
   declaration in the installed packages with a narrow pattern, the opening bracket included, for example:
   - TypeScript: `grep -rn --include="*.d.ts" "declare function <name>" node_modules/<package>/`
   - Python: `grep -rn "def <name>(" <site-packages>/<package>/`
6. Read only the lines around the match: `sed -n '<line - 30>,<line + 40>p' <file>`.
7. A command: run `<tool> <command> --help`, or search the command with `search_docs`.
8. If nothing matches, widen the search once. If nothing matches again, stop and say so.
9. Give the signature or option, one sentence on what it does, the default value, any deprecation,
   the version, and where it comes from.

## Example

Wrong:

```text
signal() takes a value and an equality function, I think.
```

Right:

```text
@angular/core 22.2.6, library/angular/guide/signals.md, section "Writable signals":
signal<T>(initialValue: T, options?: CreateSignalOptions<T>): WritableSignal<T>
It creates a writable signal. The options can hold an equality function.
```

## Pitfalls

- Reading a large declaration file from the top: thousands of lines. Search the name instead.
- Many matches: add the type name or the opening bracket to the pattern.
- Documentation of another version than the project: say it, and check the package.

## Final check

- Did you give the version and where the answer comes from?
- Did you read one section or the lines around the match only?
- Did you say "not found" instead of guessing?
