---
title: "npm-completion"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-completion.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-completion

### Description

Enables tab-completion in all npm commands.

The synopsis above loads the completions into your current shell.
Adding it to your ~/.bashrc or ~/.zshrc will make the completions available everywhere:

```bash
npm completion >> ~/.bashrc
npm completion >> ~/.zshrc
```

You may of course also pipe the output of `npm completion` to a file such as `/usr/local/etc/bash_completion.d/npm` or
`/etc/bash_completion.d/npm` if you have a system that will read
that file for you.

When `COMP_CWORD`, `COMP_LINE`, and `COMP_POINT` are defined in the environment, `npm completion` acts in "plumbing mode", and outputs completions based on the arguments.

### See Also

* npm developers
* npm
