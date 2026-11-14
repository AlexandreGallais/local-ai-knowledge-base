---
title: "annotationlib --- Functionality for introspecting annotations (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/annotationlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# annotationlib --- Functionality for introspecting annotations (part 3 of 3)

## Limitations of the `STRING` format

The `STRING` format is meant to approximate the source code
of the annotation, but the implementation strategy used means that it is not
always possible to recover the exact source code.

First, the stringifier of course cannot recover any information that is not present in
the compiled code, including comments, whitespace, parenthesization, and operations that
get simplified by the compiler.

Second, the stringifier can intercept almost all operations that involve names looked
up in some scope, but it cannot intercept operations that operate fully on constants.
As a corollary, this also means it is not safe to request the `STRING` format on
untrusted code: Python is powerful enough that it is possible to achieve arbitrary
code execution even with no access to any globals or builtins. For example:

```pycon
>>> def f(x: (1).__class__.__base__.__subclasses__()[-1].__init__.__builtins__["print"]("Hello world")): pass
...
>>> annotationlib.get_annotations(f, format=annotationlib.Format.STRING)
Hello world
{'x': 'None'}
```

> **Note:** This particular example works as of the time of writing, but it relies on
> implementation details and is not guaranteed to work in the future.

Among the different kinds of expressions that exist in Python,
as represented by the `ast` module, some expressions are supported,
meaning that the `STRING` format can generally recover the original source code;
others are unsupported, meaning that they may result in incorrect output or an error.

The following are supported (sometimes with caveats):

- `ast.BinOp`
- `ast.UnaryOp`

- `ast.Invert` (`~`), `ast.UAdd` (`+`), and `ast.USub` (`-`) are supported
- `ast.Not` (`not`) is not supported

- `ast.Dict` (except when using `**` unpacking)
- `ast.Set`
- `ast.Compare`

- `ast.Eq` and `ast.NotEq` are supported
- `ast.Lt`, `ast.LtE`, `ast.Gt`, and `ast.GtE` are supported, but the operand may be flipped
- `ast.Is`, `ast.IsNot`, `ast.In`, and `ast.NotIn` are not supported

- `ast.Call` (except when using `**` unpacking)
- `ast.Constant` (though not the exact representation of the constant; for example, escape
sequences in strings are lost; hexadecimal numbers are converted to decimal)
- `ast.Attribute` (assuming the value is not a constant)
- `ast.Subscript` (assuming the value is not a constant)
- `ast.Starred` (`*` unpacking)
- `ast.Name`
- `ast.List`
- `ast.Tuple`
- `ast.Slice`

The following are unsupported, but throw an informative error when encountered by the
stringifier:

- `ast.FormattedValue` (f-strings; error is not detected if conversion specifiers like `!r`
are used)
- `ast.JoinedStr` (f-strings)

The following are unsupported and result in incorrect output:

- `ast.BoolOp` (`and` and `or`)
- `ast.IfExp`
- `ast.Lambda`
- `ast.ListComp`
- `ast.SetComp`
- `ast.DictComp`
- `ast.GeneratorExp`

The following are disallowed in annotation scopes and therefore not relevant:

- `ast.NamedExpr` (`:=`)
- `ast.Await`
- `ast.Yield`
- `ast.YieldFrom`

## Limitations of the `FORWARDREF` format

The `FORWARDREF` format aims to produce real values as much
as possible, with anything that cannot be resolved replaced with
`ForwardRef` objects. It is affected by broadly the same Limitations
as the `STRING` format: annotations that perform operations on
literals or that use unsupported expression types may raise exceptions when
evaluated using the `FORWARDREF` format.

Below are a few examples of the behavior with unsupported expressions:

```pycon
>>> from annotationlib import get_annotations, Format
>>> def zerodiv(x: 1 / 0): ...
>>> get_annotations(zerodiv, format=Format.STRING)
Traceback (most recent call last):
  ...
ZeroDivisionError: division by zero
>>> get_annotations(zerodiv, format=Format.FORWARDREF)
Traceback (most recent call last):
  ...
ZeroDivisionError: division by zero
>>> def ifexp(x: 1 if y else 0): ...
>>> get_annotations(ifexp, format=Format.STRING)
{'x': '1'}
```

## Security implications of introspecting annotations

Much of the functionality in this module involves executing code related to annotations,
which can then do arbitrary things. For example,
`get_annotations()` may call an arbitrary annotate function, and
`ForwardRef.evaluate()` may call `eval()` on an arbitrary string. Code contained
in an annotation might make arbitrary system calls, enter an infinite loop, or perform any
other operation. This is also true for any access of the `__annotations__` attribute,
and for various functions in the `typing` module that work with annotations, such as
`typing.get_type_hints()`.

Any security issue arising from this also applies immediately after importing
code that may contain untrusted annotations: importing code can always cause arbitrary operations
to be performed. However, it is unsafe to accept strings or other input from an untrusted source and
pass them to any of the APIs for introspecting annotations, for example by editing an
`__annotations__` dictionary or directly creating a `ForwardRef` object.
