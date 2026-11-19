---
name: cli-tool-building
description: "Manual: run only when the user explicitly asks for /cli-tool-building. Builds a command-line tool with proper argument parsing, --help, exit codes, errors on stderr and optional JSON output."
metadata:
  id: TOL-03
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: manual
---

# CLI tool building

**Core rule:** a CLI documents itself with `--help`, writes results to stdout and errors to stderr, and exits 0 on success and non-zero on failure.

## Procedure

1. Write the usage first: command, arguments, options, examples.
   - Check: the usage text answers how to run the main case.
2. Parse arguments with the language's standard parser (`argparse`, `node:util` `parseArgs`, `clap` if already used, `System.CommandLine` if already used).
   - Check: `--help` prints the usage; an unknown option exits 2 with a message.
3. Write results to stdout, diagnostics to stderr; add `--json` when other tools will read the output.
   - Check: `tool ... --json | jq .` parses.
4. Use exit codes: 0 success, 1 failure, 2 usage error.
   - Check: each code is produced by a test.
5. Test it as a process: run it with arguments and check stdout, stderr and the exit code.
   - Check: tests cover success, failure and usage error.

## Stop and ask the human if

- The tool will modify shared data or systems.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Print errors to stdout." | They corrupt piped output. Use stderr. |
| "Exit 0 after printing an error." | Scripts and CI then think it worked. |

## Definition of done

- [ ] `--help`, stdout and stderr separation, exit codes, optional JSON; process-level tests pass.
