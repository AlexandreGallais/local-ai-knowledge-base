---
title: "json --- JSON encoder and decoder (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/json.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# json --- JSON encoder and decoder (part 3 of 3)

## Command-line interface

Module `json.tool`.

**Source code:** Lib/json/tool.py

The `json` module can be invoked as a script via `python -m json`
to validate and pretty-print JSON objects. The `json.tool` submodule
implements this interface.

If the optional `infile` and `outfile` arguments are not
specified, `sys.stdin` and `sys.stdout` will be used respectively:

```shell-session
$ echo '{"json": "obj"}' | python -m json
{
    "json": "obj"
}
$ echo '{1.2:3.4}' | python -m json
Expecting property name enclosed in double quotes: line 1 column 2 (char 1)
```

> *Changed in version 3.5.*
> The output is now in the same order as the input. Use the
> `--sort-keys` option to sort the output of dictionaries
> alphabetically by key.

> *Changed in version 3.14.*
> The `json` module may now be directly executed as
> `python -m json`. For backwards compatibility, invoking
> the CLI as `python -m json.tool` remains supported.

### option `infile`

The JSON file to be validated or pretty-printed:

```shell-session
$ python -m json mp_films.json
[
    {
        "title": "And Now for Something Completely Different",
        "year": 1971
    },
    {
        "title": "Monty Python and the Holy Grail",
        "year": 1975
    }
]
```

If *infile* is not specified, read from `sys.stdin`.

### option `outfile`

Write the output of the *infile* to the given *outfile*. Otherwise, write it
to `sys.stdout`.

### option `--sort-keys`

Sort the output of dictionaries alphabetically by key.

> *Added in version 3.5.*

### option `--no-ensure-ascii`

Disable escaping of non-ascii characters, see `json.dumps()` for more information.

> *Added in version 3.9.*

### option `--json-lines`

Parse every input line as separate JSON object.

> *Added in version 3.8.*

### option `--indent, --tab, --no-indent, --compact`

Mutually exclusive options for whitespace control.

> *Added in version 3.9.*

### option `-h, --help`

Show the help message.

**Footnotes**
