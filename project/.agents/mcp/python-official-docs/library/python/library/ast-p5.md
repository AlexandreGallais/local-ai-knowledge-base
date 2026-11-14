---
title: "ast --- Abstract syntax trees (part 5 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ast.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ast --- Abstract syntax trees (part 5 of 7)

### class `MatchMapping(keys, patterns, rest)`

A match mapping pattern. `keys` is a sequence of expression nodes.
`patterns` is a corresponding sequence of pattern nodes. `rest` is an
optional name that can be specified to capture the remaining mapping elements.
Permitted key <example-value> are restricted as described in the match statement
documentation.

This pattern succeeds if the subject is a mapping, all evaluated key
expressions are present in the mapping, and the value corresponding to each
key <example-value> the corresponding subpattern. If `rest` is not `None`, a dict
containing the remaining mapping elements is bound to that name if the overall
mapping pattern is successful.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case {1: _, 2: _}:
...         ...
...     case {**rest}:
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchMapping(
                        keys=[
                            Constant(value=1),
                            Constant(value=2)],
                        patterns=[
                            MatchAs(),
                            MatchAs()]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))]),
                match_case(
                    pattern=MatchMapping(rest='rest'),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `MatchClass(cls, patterns, kwd_attrs, kwd_patterns)`

A match class pattern. `cls` is an expression giving the nominal class to
be matched. `patterns` is a sequence of pattern nodes to be matched against
the class defined sequence of pattern matching attributes. `kwd_attrs` is a
sequence of additional attributes to be matched (specified as keyword arguments
in the class pattern), `kwd_patterns` are the corresponding patterns
(specified as keyword values in the class pattern).

This pattern succeeds if the subject is an instance of the nominated class,
all positional patterns match the corresponding class-defined attributes, and
any specified keyword attributes match their corresponding pattern.

Note: classes may define a property that returns self in order to match a
pattern node against the instance being matched. Several builtin types are
also matched that way, as described in the match statement documentation.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case Point2D(0, 0):
...         ...
...     case Point3D(x=0, y=0, z=0):
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchClass(
                        cls=Name(id='Point2D'),
                        patterns=[
                            MatchValue(
                                value=Constant(value=0)),
                            MatchValue(
                                value=Constant(value=0))]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))]),
                match_case(
                    pattern=MatchClass(
                        cls=Name(id='Point3D'),
                        kwd_attrs=[
                            'x',
                            'y',
                            'z'],
                        kwd_patterns=[
                            MatchValue(
                                value=Constant(value=0)),
                            MatchValue(
                                value=Constant(value=0)),
                            MatchValue(
                                value=Constant(value=0))]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `MatchAs(pattern, name)`

A match "as-pattern", capture pattern or wildcard pattern. `pattern`
contains the match pattern that the subject will be matched against.
If the pattern is `None`, the node represents a capture pattern (i.e a
bare name) and will always succeed.

The `name` attribute contains the name that will be bound if the pattern
is successful. If `name` is `None`, `pattern` must also be `None`
and the node represents the wildcard pattern.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case [x] as y:
...         ...
...     case _:
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchAs(
                        pattern=MatchSequence(
                            patterns=[
                                MatchAs(name='x')]),
                        name='y'),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))]),
                match_case(
                    pattern=MatchAs(),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `MatchOr(patterns)`

A match "or-pattern". An or-pattern matches each of its subpatterns in turn
to the subject, until one succeeds. The or-pattern is then deemed to
succeed. If none of the subpatterns succeed the or-pattern fails. The
`patterns` attribute contains a list of match pattern nodes that will be
matched against the subject.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case [x] | (y):
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchOr(
                        patterns=[
                            MatchSequence(
                                patterns=[
                                    MatchAs(name='x')]),
                            MatchAs(name='y')]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `TypeIgnore(lineno, tag)`

A `# type: ignore` comment located at *lineno*.
*tag* is the optional tag specified by the form `# type: ignore <tag>`.

```python

>>> print(ast.dump(ast.parse('x = 1 # type: ignore', type_comments=True), indent=4))
Module(
    body=[
        Assign(
            targets=[
                Name(id='x', ctx=Store())],
            value=Constant(value=1))],
    type_ignores=[
        TypeIgnore(lineno=1, tag='')])
>>> print(ast.dump(ast.parse('x: bool = 1 # type: ignore[assignment]', type_comments=True), indent=4))
Module(
    body=[
        AnnAssign(
            target=Name(id='x', ctx=Store()),
            annotation=Name(id='bool'),
            value=Constant(value=1),
            simple=1)],
    type_ignores=[
        TypeIgnore(lineno=1, tag='[assignment]')])
```

> **Note:** `TypeIgnore` nodes are not generated when the *type_comments* parameter
> is set to `False` (default).  See `ast.parse()` for more details.

> *Added in version 3.8.*

### Type parameters

Type parameters can exist on classes, functions, and type
aliases.

### class `TypeVar(name, bound, default_value)`

A `typing.TypeVar`. `name` is the name of the type variable.
`bound` is the bound or constraints, if any. If `bound` is a `Tuple`,
it represents constraints; otherwise it represents the bound. `default_value`
is the default value; if the `TypeVar` has no default, this
attribute will be set to `None`.

```python

>>> print(ast.dump(ast.parse("type Alias[T: int = bool] = list[T]"), indent=4))
Module(
    body=[
        TypeAlias(
            name=Name(id='Alias', ctx=Store()),
            type_params=[
                TypeVar(
                    name='T',
                    bound=Name(id='int'),
                    default_value=Name(id='bool'))],
            value=Subscript(
                value=Name(id='list'),
                slice=Name(id='T')))])
```

> *Added in version 3.12.*

> *Changed in version 3.13.*
> Added the *default_value* parameter.

### class `ParamSpec(name, default_value)`

A `typing.ParamSpec`. `name` is the name of the parameter specification.
`default_value` is the default value; if the `ParamSpec` has no default,
this attribute will be set to `None`.

```python

>>> print(ast.dump(ast.parse("type Alias[**P = [int, str]] = Callable[P, int]"), indent=4))
Module(
    body=[
        TypeAlias(
            name=Name(id='Alias', ctx=Store()),
            type_params=[
                ParamSpec(
                    name='P',
                    default_value=List(
                        elts=[
                            Name(id='int'),
                            Name(id='str')]))],
            value=Subscript(
                value=Name(id='Callable'),
                slice=Tuple(
                    elts=[
                        Name(id='P'),
                        Name(id='int')])))])
```

> *Added in version 3.12.*

> *Changed in version 3.13.*
> Added the *default_value* parameter.

### class `TypeVarTuple(name, default_value)`

A `typing.TypeVarTuple`. `name` is the name of the type variable tuple.
`default_value` is the default value; if the `TypeVarTuple` has no
default, this attribute will be set to `None`.

```python

>>> print(ast.dump(ast.parse("type Alias[*Ts = ()] = tuple[*Ts]"), indent=4))
Module(
    body=[
        TypeAlias(
            name=Name(id='Alias', ctx=Store()),
            type_params=[
                TypeVarTuple(name='Ts', default_value=Tuple())],
            value=Subscript(
                value=Name(id='tuple'),
                slice=Tuple(
                    elts=[
                        Starred(
                            value=Name(id='Ts'))])))])
```

> *Added in version 3.12.*

> *Changed in version 3.13.*
> Added the *default_value* parameter.

### class `FunctionDef(name, args, body, decorator_list, returns, type_comment, type_params)`

A function definition.

- `name` is a raw string of the function name.
- `args` is an `arguments` node.
- `body` is the list of nodes inside the function.
- `decorator_list` is the list of decorators to be applied, stored outermost
first (i.e. the first in the list will be applied last).
- `returns` is the return annotation.
- `type_params` is a list of type parameters.

### `type_comment`

`type_comment` is an optional string with the type annotation as a comment.

> *Changed in version 3.12.*
> Added `type_params`.

### class `Lambda(args, body)`

`lambda` is a minimal function definition that can be used inside an
expression. Unlike `FunctionDef`, `body` holds a single node.

```python

>>> print(ast.dump(ast.parse('lambda x,y: ...'), indent=4))
Module(
    body=[
        Expr(
            value=Lambda(
                args=arguments(
                    args=[
                        arg(arg='x'),
                        arg(arg='y')]),
                body=Constant(value=Ellipsis)))])
```

### class `arguments(posonlyargs, args, vararg, kwonlyargs, kw_defaults, kwarg, defaults)`

The arguments for a function.

- `posonlyargs`, `args` and `kwonlyargs` are lists of `arg` nodes.
- `vararg` and `kwarg` are single `arg` nodes, referring to the
`*args, **kwargs` parameters.
- `kw_defaults` is a list of default values for keyword-only arguments. If
one is `None`, the corresponding argument is required.
- `defaults` is a list of default values for arguments that can be passed
positionally. If there are fewer defaults, they correspond to the last n
arguments.

### class `arg(arg, annotation, type_comment)`

A single argument in a list. `arg` is a raw string of the argument
name; `annotation` is its annotation, such as a `Name` node.

### `type_comment`

`type_comment` is an optional string with the type annotation as a comment

```python

>>> print(ast.dump(ast.parse("""\
... @decorator1
... @decorator2
... def f(a: 'annotation', b=1, c=2, *d, e, f=3, **g) -> 'return annotation':
...     pass
... """), indent=4))
Module(
    body=[
        FunctionDef(
            name='f',
            args=arguments(
                args=[
                    arg(
                        arg='a',
                        annotation=Constant(value='annotation')),
                    arg(arg='b'),
                    arg(arg='c')],
                vararg=arg(arg='d'),
                kwonlyargs=[
                    arg(arg='e'),
                    arg(arg='f')],
                kw_defaults=[
                    None,
                    Constant(value=3)],
                kwarg=arg(arg='g'),
                defaults=[
                    Constant(value=1),
                    Constant(value=2)]),
            body=[
                Pass()],
            decorator_list=[
                Name(id='decorator1'),
                Name(id='decorator2')],
            returns=Constant(value='return annotation'))])
```

### class `Return(value)`

A `return` statement.

```python

>>> print(ast.dump(ast.parse('return 4'), indent=4))
Module(
    body=[
        Return(
            value=Constant(value=4))])
```

### class `Yield(value)`

```python
YieldFrom(value)
```

A `yield` or `yield from` expression. Because these are expressions, they
must be wrapped in an `Expr` node if the value sent back is not used.

```python

>>> print(ast.dump(ast.parse('yield x'), indent=4))
Module(
    body=[
        Expr(
            value=Yield(
                value=Name(id='x')))])

>>> print(ast.dump(ast.parse('yield from x'), indent=4))
Module(
    body=[
        Expr(
            value=YieldFrom(
                value=Name(id='x')))])
```

### class `Global(names)`

```python
Nonlocal(names)
```

`global` and `nonlocal` statements. `names` is a list of raw strings.

```python

>>> print(ast.dump(ast.parse('global x,y,z'), indent=4))
Module(
    body=[
        Global(
            names=[
                'x',
                'y',
                'z'])])

>>> print(ast.dump(ast.parse('nonlocal x,y,z'), indent=4))
Module(
    body=[
        Nonlocal(
            names=[
                'x',
                'y',
                'z'])])
```
