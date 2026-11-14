---
title: "ast --- Abstract syntax trees (part 7 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ast.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ast --- Abstract syntax trees (part 7 of 7)

## Compiler flags

The following flags may be passed to `compile()` in order to change
effects on the compilation of a program:

### `PyCF_ALLOW_TOP_LEVEL_AWAIT`

Enables support for top-level `await`, `async for`, `async with`
and async comprehensions.

> *Added in version 3.8.*

### `PyCF_ONLY_AST`

Generates and returns an abstract syntax tree instead of returning a
compiled code object.

### `PyCF_OPTIMIZED_AST`

The returned AST is optimized according to the *optimize* argument
in `compile()` or `ast.parse()`.

> *Added in version 3.13.*

### `PyCF_TYPE_COMMENTS`

Enables support for PEP 484 and PEP 526 style type comments
(`# type: <type>`, `# type: ignore <stuff>`).

> *Added in version 3.8.*

## Command-line usage

> *Added in version 3.9.*

> *Changed in version 3.15.*
> The output is now syntax highlighted by default. This can be
> controlled using environment variables.

The `ast` module can be executed as a script from the command line.
It is as simple as:

```sh
python -m ast [-m <mode>] [-a] [infile]
```

The following options are accepted:

ast

### option `-h, --help`

Show the help message and exit.

### option `-m <mode>`

```python
--mode <mode>
```

Specify what kind of code must be compiled, like the *mode* argument
in `parse()`.

### option `--no-type-comments`

Don't parse type comments.

### option `-a, --include-attributes`

Include attributes such as line numbers and column offsets.

### option `-i <indent>`

```python
--indent <indent>
```

Indentation of nodes in AST (number of spaces).

### option `--feature-version <version>`

Python version in the format 3.x (for example, 3.10). Defaults to the
current version of the interpreter.

> *Added in version 3.14.*

### option `-O <level>`

```python
--optimize <level>
```

Optimization level for parser. Defaults to no optimization.

> *Added in version 3.14.*

### option `--show-empty`

Show empty lists and fields that are `None`. Defaults to not showing empty
objects.

> *Added in version 3.14.*

If `infile` is specified its contents are parsed to AST and dumped
to stdout.  Otherwise, the content is read from stdin.

> **See also:** Green Tree Snakes, an external
> documentation resource, has good details on working with Python ASTs.
>
> ASTTokens
> annotates Python ASTs with the positions of tokens and text in the source
> code that generated them. This is helpful for tools that make source code
> transformations.
>
> leoAst.py
> unifies the
> token-based and parse-tree-based views of python programs by inserting
> two-way links between tokens and ast nodes.
>
> LibCST parses code as a Concrete Syntax
> Tree that looks like an ast tree and keeps all formatting details. It's
> useful for building automated refactoring (codemod) applications and
> linters.
>
> Parso is a Python parser that supports
> error recovery and round-trip parsing for different Python versions (in
> multiple Python versions). Parso is also able to list multiple syntax errors
> in your Python file.
