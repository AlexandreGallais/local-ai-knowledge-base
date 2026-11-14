---
title: "shlex --- Simple lexical analysis (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/shlex.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# shlex --- Simple lexical analysis (part 2 of 2)

## Improved Compatibility with Shells

> *Added in version 3.6.*

The `shlex` class provides compatibility with the parsing performed by
common Unix shells like `bash`, `dash`, and `sh`.  To take advantage of
this compatibility, specify the `punctuation_chars` argument in the
constructor.  This defaults to `False`, which preserves pre-3.6 behaviour.
However, if it is set to `True`, then parsing of the characters `();<>|&`
is changed: any run of these characters is returned as a single token.  While
this is short of a full parser for shells (which would be out of scope for the
standard library, given the multiplicity of shells out there), it does allow
you to perform processing of command lines more easily than you could
otherwise.  To illustrate, you can see the difference in the following snippet:

```python

>>> import shlex
>>> text = "a && b; c && d || e; f >'abc'; (def \"ghi\")"
>>> s = shlex.shlex(text, posix=True)
>>> s.whitespace_split = True
>>> list(s)
['a', '&&', 'b;', 'c', '&&', 'd', '||', 'e;', 'f', '>abc;', '(def', 'ghi)']
>>> s = shlex.shlex(text, posix=True, punctuation_chars=True)
>>> s.whitespace_split = True
>>> list(s)
['a', '&&', 'b', ';', 'c', '&&', 'd', '||', 'e', ';', 'f', '>', 'abc', ';',
'(', 'def', 'ghi', ')']
```

Of course, tokens will be returned which are not valid for shells, and you'll
need to implement your own error checks on the returned tokens.

Instead of passing `True` as the value for the punctuation_chars parameter,
you can pass a string with specific characters, which will be used to determine
which characters constitute punctuation. For example:

```
>>> import shlex
>>> s = shlex.shlex("a && b || c", punctuation_chars="|")
>>> list(s)
['a', '&', '&', 'b', '||', 'c']
```

> **Note:** When `punctuation_chars` is specified, the `wordchars`
> attribute is augmented with the characters `~-./*?=`.  That is because these
> characters can appear in file names (including wildcards) and command-line
> arguments (e.g. `--color=auto`). Hence:
>
>
> ```
> >>> import shlex
> >>> s = shlex.shlex('~/a && b-c --color=auto || d *.py?',
> ...                 punctuation_chars=True)
> >>> list(s)
> ['~/a', '&&', 'b-c', '--color=auto', '||', 'd', '*.py?']
> ```
>
>
> However, to match the shell as closely as possible, it is recommended to
> always use `posix` and `whitespace_split` when using
> `punctuation_chars`, which will negate
> `wordchars` entirely.

For best effect, `punctuation_chars` should be set in conjunction with
`posix=True`. (Note that `posix=False` is the default for
`shlex`.)
