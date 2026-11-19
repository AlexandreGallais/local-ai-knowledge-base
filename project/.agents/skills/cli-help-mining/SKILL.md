---
name: cli-help-mining
description: "Uses the documentation installed on the machine - man, --help, info, pydoc, rustup doc, dotnet help - as the source for commands and options. Use when unsure of a command's options or syntax, when a CLI rejects a flag, or when the documentation servers do not cover a tool."
metadata:
  id: DOC-07
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# CLI help mining

**Core rule:** the help of the installed tool beats memory: read the exact option in it before using it.

## Procedure

1. Ask the tool itself, shortest first: `<tool> <subcommand> --help`.
   - Check: the option you need is in the output.
2. For long help, filter: `<tool> --help 2>&1 | grep -n -i -- '<word>'`.
   - Check: you read only the matching lines and their neighbours.
3. Use the manual for details: `man <tool> | col -b | grep -n -A3 -- '--<option>'`, or `info <tool>` for GNU tools.
   - Check: the option's meaning and default are quoted.
4. For language libraries, read the installed docstrings: `python3 -m pydoc <module.name>`; for Rust, Java or .NET libraries, read the installed source or XML docs (`dependency-source-reading`).
   - Check: the signature is quoted from the tool output.

| Tool | Local documentation |
| --- | --- |
| Any CLI | `<tool> --help`, `<tool> help <subcommand>` |
| GNU tools | `man <tool>`, `info <tool>` |
| Git | `git help <command>` (opens the man page) |
| Python | `python3 -m pydoc <name>`, `help(<name>)` |
| .NET | `dotnet <command> --help` |
| Rust | `rustc --explain E<code>` for error codes |
| Podman | `podman <command> --help`, `man podman-<command>` |

## Stop and ask the human if

- The tool has no local help and no documentation server covers it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "GNU and BSD flags are the same." | They differ; Fedora has GNU tools. Read the local help. |
| "Print the whole man page." | Filter with `grep`; man pages are long. |

## Definition of done

- [ ] Every option used was seen in the local help or manual.
