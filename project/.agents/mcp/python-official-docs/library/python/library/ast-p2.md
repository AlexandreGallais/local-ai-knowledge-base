---
title: "ast --- Abstract syntax trees (part 2 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ast.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ast --- Abstract syntax trees (part 2 of 7)

## Node classes

### class `AST`

This is the abstract base of all AST node classes.  The actual node classes are
derived from the `Parser/Python.asdl` file, which is reproduced
above.  They are defined in the `_ast` C
module and re-exported in `ast`.

There is one class defined for each left-hand side symbol in the abstract
grammar (for example, `ast.stmt` or `ast.expr`).  In addition,
there is one class defined for each constructor on the right-hand side; these
classes inherit from the classes for the left-hand side trees.  For example,
`ast.BinOp` inherits from `ast.expr`.  For production rules
with alternatives (aka "sums"), the left-hand side class is abstract: only
instances of specific constructor nodes are ever created.

### `_fields`

Each concrete class has an attribute `_fields` which gives the names
of all child nodes.

Each instance of a concrete class has one attribute for each child node,
of the type as defined in the grammar.  For example, `ast.BinOp`
instances have an attribute `left` of type `ast.expr`.

If these attributes are marked as optional in the grammar (using a
question mark), the value might be `None`.  If the attributes can have
zero-or-more values (marked with an asterisk), the values are represented
as Python lists.  All possible attributes must be present and have valid
values when compiling an AST with `compile()`.

### `_field_types`

The `_field_types` attribute on each concrete class is a dictionary
mapping field names (as also listed in `_fields`) to their types.

```python

>>> ast.TypeVar._field_types
{'name': <class 'str'>, 'bound': ast.expr | None, 'default_value': ast.expr | None}
```

> *Added in version 3.13.*

### `lineno`

```python
col_offset
end_lineno
end_col_offset
```

Instances of `ast.expr` and `ast.stmt` subclasses have
`lineno`, `col_offset`, `end_lineno`, and
`end_col_offset` attributes.  The `lineno` and `end_lineno`
are the first and last line numbers of source text span (1-indexed so the
first line is line 1) and the `col_offset` and `end_col_offset`
are the corresponding UTF-8 byte offsets of the first and last tokens that
generated the node. The UTF-8 offset is recorded because the parser uses
UTF-8 internally.

Note that the end positions are not required by the compiler and are
therefore optional. The end offset is *after* the last symbol, for example
one can get the source segment of a one-line expression node using
`source_line[node.col_offset : node.end_col_offset]`.

The constructor of a class `ast.T` parses its arguments as follows:

- If there are positional arguments, there must be as many as there are items
in `T._fields`; they will be assigned as attributes of these names.
- If there are keyword arguments, they will set the attributes of the same
names to the given values.

For example, to create and populate an `ast.UnaryOp` node, you could
use:

```
node = ast.UnaryOp(ast.USub(), ast.Constant(5, lineno=0, col_offset=0),
                   lineno=0, col_offset=0)
```

If a field that is optional in the grammar is omitted from the constructor,
it defaults to `None`. If a list field is omitted, it defaults to the empty
list. If a field of type `ast.expr_context` is omitted, it defaults to
`Load()`. If any other field is omitted, a `DeprecationWarning` is raised
and the AST node will not have this field. In Python 3.15, this condition will
raise an error.

> *Changed in version 3.8.*
> Class `ast.Constant` is now used for all constants.

> *Changed in version 3.9.*
> Simple indices are represented by their value, extended slices are
> represented as tuples.

> *Changed in version 3.13.*
> AST node constructors were changed to provide sensible defaults for omitted
> fields: optional fields now default to `None`, list fields default to an
> empty list, and fields of type `ast.expr_context` default to
> `Load()`. Previously, omitted attributes would not exist on constructed
> nodes (accessing them raised `AttributeError`).

> *Changed in version 3.14.*
> The `__repr__()` output of `AST` nodes includes
> the values of the node fields.

> *Deprecated since version 3.8, removed in version 3.14.*
> Previous versions of Python provided the AST classes `ast.Num`,
> `ast.Str`, `ast.Bytes`, `ast.NameConstant` and
> `ast.Ellipsis`, which were deprecated in Python 3.8. These classes
> were removed in Python 3.14, and their functionality has been replaced with
> `ast.Constant`.

> *Deprecated since version 3.9.*
> Old classes `ast.Index` and `ast.ExtSlice` are still
> available, but they will be removed in future Python releases.
> In the meantime, instantiating them will return an instance of
> a different class.

> *Deprecated since version 3.13, removed in version 3.15.*
> Previous versions of Python allowed the creation of AST nodes that were missing
> required fields. Similarly, AST node constructors allowed arbitrary keyword
> arguments that were set as attributes of the AST node, even if they did not
> match any of the fields of the AST node. These cases now raise a `TypeError`.

> *Deprecated since version 3.15, removed in version 3.20.*
> In the grammar above, the AST node classes that
> correspond to production rules with variants (aka "sums") are abstract
> classes. Previous versions of Python allowed for the creation of direct
> instances of these abstract node classes. This behavior is deprecated and
> will be removed in Python 3.20.

> **Note:** The descriptions of the specific node classes displayed here
> were initially adapted from the fantastic `Green Tree
> Snakes <https://greentreesnakes.readthedocs.io/en/latest/>`__ project and
> all its contributors.

### class `Module(body, type_ignores)`

A Python module, as with file input.
Node type generated by `ast.parse()` in the default `"exec"` *mode*.

`body` is a `list` of the module's ast-statements.

`type_ignores` is a `list` of the module's type ignore comments;
see `ast.parse()` for more details.

```python

>>> print(ast.dump(ast.parse('x = 1'), indent=4))
Module(
    body=[
        Assign(
            targets=[
                Name(id='x', ctx=Store())],
            value=Constant(value=1))])
```

### class `Expression(body)`

A single Python expression input.
Node type generated by `ast.parse()` when *mode* is `"eval"`.

`body` is a single node,
one of the expression types.

```python

>>> print(ast.dump(ast.parse('123', mode='eval'), indent=4))
Expression(
    body=Constant(value=123))
```

### class `Interactive(body)`

A single interactive input, like in tut-interac.
Node type generated by `ast.parse()` when *mode* is `"single"`.

`body` is a `list` of statement nodes.

```python

>>> print(ast.dump(ast.parse('x = 1; y = 2', mode='single'), indent=4))
Interactive(
    body=[
        Assign(
            targets=[
                Name(id='x', ctx=Store())],
            value=Constant(value=1)),
        Assign(
            targets=[
                Name(id='y', ctx=Store())],
            value=Constant(value=2))])
```

### class `FunctionType(argtypes, returns)`

A representation of an old-style type comments for functions,
as Python versions prior to 3.5 didn't support PEP 484 annotations.
Node type generated by `ast.parse()` when *mode* is `"func_type"`.

Such type comments would look like this:

```
def sum_two_number(a, b):
    # type: (int, int) -> int
    return a + b
```

`argtypes` is a `list` of expression nodes.

`returns` is a single expression node.

```python

>>> print(ast.dump(ast.parse('(int, str) -> List[int]', mode='func_type'), indent=4))
FunctionType(
    argtypes=[
        Name(id='int'),
        Name(id='str')],
    returns=Subscript(
        value=Name(id='List'),
        slice=Name(id='int')))
```

> *Added in version 3.8.*

### class `Constant(value, kind)`

A constant value. The `value` attribute of the `Constant` literal contains the
Python object it represents. The values represented can be instances of `str`,
`bytes`, `int`, `float`, `complex`, and `bool`,
and the constants `None` and `Ellipsis`.

The `kind` attribute is an optional string. For string literals with a
`u` prefix, `kind` is set to `'u'`. For all other
constants, `kind` is `None`.

```python

>>> print(ast.dump(ast.parse('123', mode='eval'), indent=4))
Expression(
    body=Constant(value=123))
>>> print(ast.dump(ast.parse("u'hello'", mode='eval'), indent=4))
Expression(
    body=Constant(value='hello', kind='u'))
```

### class `FormattedValue(value, conversion, format_spec)`

Node representing a single formatting field in an f-string. If the string
contains a single formatting field and nothing else the node can be
isolated otherwise it appears in `JoinedStr`.

- `value` is any expression node (such as a literal, a variable, or a
function call).
- `conversion` is an integer:

- -1: no formatting
- 97 (`ord('a')`): `!a` `ASCII()` formatting
- 114 (`ord('r')`): `!r` `repr()` formatting
- 115 (`ord('s')`): `!s` `string()` formatting

- `format_spec` is a `JoinedStr` node representing the formatting
of the value, or `None` if no format was specified. Both
`conversion` and `format_spec` can be set at the same time.

### class `JoinedStr(values)`

An f-string, comprising a series of `FormattedValue` and `Constant`
nodes.

```python

>>> print(ast.dump(ast.parse('f"sin({a}) is {sin(a):.3}"', mode='eval'), indent=4))
Expression(
    body=JoinedStr(
        values=[
            Constant(value='sin('),
            FormattedValue(
                value=Name(id='a'),
                conversion=-1),
            Constant(value=') is '),
            FormattedValue(
                value=Call(
                    func=Name(id='sin'),
                    args=[
                        Name(id='a')]),
                conversion=-1,
                format_spec=JoinedStr(
                    values=[
                        Constant(value='.3')]))]))
```

### class `TemplateStr(values, /)`

> *Added in version 3.14.*

Node representing a template string literal, comprising a series of
`Interpolation` and `Constant` nodes.
These nodes may be any order, and do not need to be interleaved.

```python

>>> expr = ast.parse('t"{name} finished {place:ordinal}"', mode='eval')
>>> print(ast.dump(expr, indent=4))
Expression(
    body=TemplateStr(
        values=[
            Interpolation(
                value=Name(id='name'),
                str='name',
                conversion=-1),
            Constant(value=' finished '),
            Interpolation(
                value=Name(id='place'),
                str='place',
                conversion=-1,
                format_spec=JoinedStr(
                    values=[
                        Constant(value='ordinal')]))]))
```

### class `Interpolation(value, str, conversion, format_spec=None)`

> *Added in version 3.14.*

Node representing a single interpolation field in a template string literal.

- `value` is any expression node (such as a literal, a variable, or a
function call).
This has the same meaning as `FormattedValue.value`.
- `str` is a constant containing the text of the interpolation expression.

If `str` is set to `None`, then `value` is used to generate code
when calling `ast.unparse()`. This no longer guarantees that the
generated code is identical to the original and is intended for code
generation.
- `conversion` is an integer:

- -1: no conversion
- 97 (`ord('a')`): `!a` `ASCII()` conversion
- 114 (`ord('r')`): `!r` `repr()` conversion
- 115 (`ord('s')`): `!s` `string()` conversion

This has the same meaning as `FormattedValue.conversion`.
- `format_spec` is a `JoinedStr` node representing the formatting
of the value, or `None` if no format was specified. Both
`conversion` and `format_spec` can be set at the same time.
This has the same meaning as `FormattedValue.format_spec`.

### class `List(elts, ctx)`

```python
Tuple(elts, ctx)
```

A list or tuple. `elts` holds a list of nodes representing the elements.
`ctx` is `Store` if the container is an assignment target (i.e.
`(x,y)=something`), and `Load` otherwise.

```python

>>> print(ast.dump(ast.parse('[1, 2, 3]', mode='eval'), indent=4))
Expression(
    body=List(
        elts=[
            Constant(value=1),
            Constant(value=2),
            Constant(value=3)]))
>>> print(ast.dump(ast.parse('(1, 2, 3)', mode='eval'), indent=4))
Expression(
    body=Tuple(
        elts=[
            Constant(value=1),
            Constant(value=2),
            Constant(value=3)]))
```

### class `Set(elts)`

A set. `elts` holds a list of nodes representing the set's elements.

```python

>>> print(ast.dump(ast.parse('{1, 2, 3}', mode='eval'), indent=4))
Expression(
    body=Set(
        elts=[
            Constant(value=1),
            Constant(value=2),
            Constant(value=3)]))
```

### class `Dict(keys, values)`

A dictionary. `keys` and `values` hold lists of nodes representing the
keys and the values respectively, in matching order (what would be returned
when calling `dictionary.keys()` and `dictionary.values()`).

When doing dictionary unpacking using dictionary literals the expression to be
expanded goes in the `values` list, with a `None` at the corresponding
position in `keys`.

```python

>>> print(ast.dump(ast.parse('{"a":1, **d}', mode='eval'), indent=4))
Expression(
    body=Dict(
        keys=[
            Constant(value='a'),
            None],
        values=[
            Constant(value=1),
            Name(id='d')]))
```

### class `Name(id, ctx)`

A variable name. `id` holds the name as a string, and `ctx` is one of
the following types.

### class `Load()`

```python
Store()
Del()
```

Variable references can be used to load the value of a variable, to assign
a new value to it, or to delete it. Variable references are given a context
to distinguish these cases.

```python

>>> print(ast.dump(ast.parse('a'), indent=4))
Module(
    body=[
        Expr(
            value=Name(id='a'))])

>>> print(ast.dump(ast.parse('a = 1'), indent=4))
Module(
    body=[
        Assign(
            targets=[
                Name(id='a', ctx=Store())],
            value=Constant(value=1))])

>>> print(ast.dump(ast.parse('del a'), indent=4))
Module(
    body=[
        Delete(
            targets=[
                Name(id='a', ctx=Del())])])
```

### class `Starred(value, ctx)`

A `*var` variable reference. `value` holds the variable, typically a
`Name` node. This type must be used when building a `Call`
node with `*args`.

```python

>>> print(ast.dump(ast.parse('a, *b = it'), indent=4))
Module(
    body=[
        Assign(
            targets=[
                Tuple(
                    elts=[
                        Name(id='a', ctx=Store()),
                        Starred(
                            value=Name(id='b', ctx=Store()),
                            ctx=Store())],
                    ctx=Store())],
            value=Name(id='it'))])
```
