---
name: look-up-api
description: Find the exact signature, options and doc comment of an API or command in the documentation installed with the project. Use when you check an API signature or option, or when the user asks how a function, class, method, command or flag works in the version the project uses.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Look up an API in the installed documentation

## Rules

- Use the version installed in the project, not the version you remember.
- Search first with a narrow pattern. Then read only about 80 lines around the match.
- Never read a whole type declaration file or XML documentation file: they hold thousands of lines.
- Say "not found" when the search finds nothing. Do not guess a signature.
- Give the version, and the file or command the answer comes from.
- Never search the web. Never open a URL.

## Steps

1. Note the tool, the API or command name, and the question.
2. Check the documents of this base first: find the topic in `## Index` of `AGENTS.md`, then the document in `docs/<topic>/index.md`; read only the matching section.

<!-- files:begin id=lookup -->

3. Find the installed version:
   - npm packages: `grep -m1 '"version"' node_modules/<package>/package.json`
   - .NET: read `TargetFramework` in the `*.csproj` file, then run `dotnet --list-sdks`.
4. Search with a narrow pattern, the opening bracket included:
   - Angular: `grep -rn --include="*.d.ts" "declare function <name>" node_modules/@angular/<package>/`
     For a class: `"declare class <Name>"`. For a decorator or an interface: `"interface <Name> "`.
   - JavaScript built-ins: `grep -n "<member>(" node_modules/typescript/lib/lib.es*.d.ts`
   - Other typed packages: `grep -rn --include="*.d.ts" "function <name>(" node_modules/<package>/`
   - Lint rules: read the documents of `docs/typescript-lint/` first. Else: `grep -n -m2 "description" node_modules/@typescript-eslint/eslint-plugin/dist/rules/<rule>.js`
   - Angular rules for models: `node_modules/@angular/core/resources/best-practices.md` if it exists. Read it in ranges of 100 lines.
   - .NET base library: in `<dotnet root>/packs/Microsoft.NETCore.App.Ref/<version>/ref/net<x>/`, run `grep -n 'name="M:<Namespace>.<Type>.<Method>' *.xml`. Use `T:` for a type, `P:` for a property.
   - NuGet packages: the same search in `~/.nuget/packages/<package id in lowercase>/<version>/lib/<framework>/*.xml`.
   - Commands: `<tool> <command> --help`, for example `dotnet build --help` or `kubectl apply --help`.
5. Read the lines around the match only: `sed -n '<line - 30>,<line + 40>p' <file>`.
6. If nothing matches, search the official documentation in `library/`, when the project has it:
   - Find the tool in `library/README.md`, for example `angular`, `mdn-svg`, `dotnet-csharp`.
   - Run `grep -i -m 10 "<words>" library/<tool>/index.md`. Never read the index whole.
   - Open the file of the best line. List its headings with `grep -n "^## " <file>`, then read only the section you need.
7. If nothing matches, widen the pattern once. If nothing matches again, stop and say so.

<!-- files:end -->

8. Give the signature or option, one sentence on what it does, the default value, any deprecation, the version, and the file or command it comes from.

## Example

Wrong:

```text
signal() takes a value and an equality function, I think.
```

Right:

```text
@angular/core 22.2.6, node_modules/@angular/core/types/_chrome_dev_tools_performance-chunk.d.ts, line 60:
declare function signal<T>(initialValue: T, options?: CreateSignalOptions<T>): WritableSignal<T>;
It creates a writable signal. The options can hold an equality function.
```

## Pitfalls

- Reading `lib.dom.d.ts` or an Angular `.d.ts` file from the top: thousands of lines. Search the name instead.
- Using the version you remember: read the version from the project files first.
- The declaration sits in a "chunk" file with an odd name: search the whole package folder, not one file.
- `kubectl explain` fails without a cluster: use `kubectl <command> --help` and the documents of this base.
- An XML documentation file is missing: say the documentation is not installed, then use the documents of this base and `library/`.
- A file of `library/` has a version in its header: say it when it differs from the version of the project.
- Many matches: add the type name or the opening bracket to the pattern.

## Final check

- Did you give the installed version and the file or command the answer comes from?
- Did you read only the lines around the match?
- Did you say "not found" instead of guessing?
