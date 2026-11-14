---
name: look-up-api
description: Use when you check an API signature or option, or when the user asks how a function, class, method, command or flag works - the exact answer at the version the project uses, from the local documentation and the installed packages.
---

# Look up an API

## Rules

- Use the version installed in the project, not the version you remember.
- Search first, then read one section or about 80 lines around the match. Never read a whole `.d.ts` file or a whole folder.
- Say "not found" when the search finds nothing. Never guess a signature.
- Give the version, and the document, file or command the answer comes from.

## Steps

1. Note the tool, the name of the API or command, and the question.
2. Read the installed version: `grep -m1 '"version"' node_modules/<package>/package.json`.
3. Search the local documentation with the `docs` tools: `search_docs` with the exact name and two words of the question.
   Add `tool` to narrow it: `angular`, `mdn-api`, `typescript`, `ngrx-signals`, `vitest`.
4. Read the best result with `read_doc`: one section only.
5. When the version of the document differs from the installed one, or nothing matches, search the
   declaration in the packages with a narrow pattern, the opening bracket included:
   - Angular: `grep -rn --include="*.d.ts" "declare function <name>" node_modules/@angular/<package>/`;
     for a class `"declare class <Name>"`, for an interface `"interface <Name> "`.
   - JavaScript and DOM built-ins: `grep -n "<member>(" node_modules/typescript/lib/lib.es*.d.ts node_modules/typescript/lib/lib.dom.d.ts`
   - Other typed packages: `grep -rn --include="*.d.ts" "function <name>(" node_modules/<package>/`
6. Read only the lines around the match: `sed -n '<line - 30>,<line + 40>p' <file>`.
7. A lint rule: search its id with `search_docs`, for example `no-floating-promises`.
8. A command: run `<tool> <command> --help`, for example `npx --no -- ng generate --help`.
9. If nothing matches, widen the search once. If nothing matches again, stop and say so.
10. Give the signature or option, one sentence on what it does, the default value, any deprecation,
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

- Reading `lib.dom.d.ts` or an Angular `.d.ts` file from the top: thousands of lines. Search the name instead.
- The declaration sits in a "chunk" file with an odd name: search the whole package folder, not one file.
- Many matches: add the type name or the opening bracket to the pattern.
- A document of the base with an older version than the project: say it, and check the package.

## Final check

- Did you give the installed version and where the answer comes from?
- Did you read one section or the lines around the match only?
- Did you say "not found" instead of guessing?
