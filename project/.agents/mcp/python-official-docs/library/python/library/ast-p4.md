---
title: "ast --- Abstract syntax trees (part 4 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ast.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ast --- Abstract syntax trees (part 4 of 7)

### class `Import(names)`

An import statement. `names` is a list of `alias` nodes.

```python

>>> print(ast.dump(ast.parse('import x,y,z'), indent=4))
Module(
    body=[
        Import(
            names=[
                alias(name='x'),
                alias(name='y'),
                alias(name='z')],
            is_lazy=0)])
```

### class `ImportFrom(module, names, level)`

Represents `from x import y`. `module` is a raw string of the 'from' name,
without any leading dots, or `None` for statements such as `from . import foo`.
`level` is an integer holding the level of the relative import (0 means
absolute import).

```python

>>> print(ast.dump(ast.parse('from y import x,y,z'), indent=4))
Module(
    body=[
        ImportFrom(
            module='y',
            names=[
                alias(name='x'),
                alias(name='y'),
                alias(name='z')],
            level=0,
            is_lazy=0)])
```

### class `alias(name, asname)`

Both parameters are raw strings of the names. `asname` can be `None` if
the regular name is to be used.

```python

>>> print(ast.dump(ast.parse('from ..foo.bar import a as b, c'), indent=4))
Module(
    body=[
        ImportFrom(
            module='foo.bar',
            names=[
                alias(name='a', asname='b'),
                alias(name='c')],
            level=2,
            is_lazy=0)])
```

### Control flow

> **Note:** Optional clauses such as `else` are stored as an empty list if they're
> not present.

### class `If(test, body, orelse)`

An `if` statement. `test` holds a single node, such as a `Compare`
node. `body` and `orelse` each hold a list of nodes.

`elif` clauses don't have a special representation in the AST, but rather
appear as extra `If` nodes within the `orelse` section of the
previous one.

```python

>>> print(ast.dump(ast.parse("""
... if x:
...    ...
... elif y:
...    ...
... else:
...    ...
... """), indent=4))
Module(
    body=[
        If(
            test=Name(id='x'),
            body=[
                Expr(
                    value=Constant(value=Ellipsis))],
            orelse=[
                If(
                    test=Name(id='y'),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))],
                    orelse=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

### class `For(target, iter, body, orelse, type_comment)`

A `for` loop. `target` holds the variable(s) the loop assigns to, as a
single `Name`, `Tuple`, `List`, `Attribute` or
`Subscript` node. `iter` holds the item to be looped over, again
as a single node. `body` and `orelse` contain lists of nodes to execute.
Those in `orelse` are executed if the loop finishes normally, rather than
via a `break` statement.

### `type_comment`

`type_comment` is an optional string with the type annotation as a comment.

```python

>>> print(ast.dump(ast.parse("""
... for x in y:
...     ...
... else:
...     ...
... """), indent=4))
Module(
    body=[
        For(
            target=Name(id='x', ctx=Store()),
            iter=Name(id='y'),
            body=[
                Expr(
                    value=Constant(value=Ellipsis))],
            orelse=[
                Expr(
                    value=Constant(value=Ellipsis))])])
```

### class `While(test, body, orelse)`

A `while` loop. `test` holds the condition, such as a `Compare`
node.

```python

>>> print(ast.dump(ast.parse("""
... while x:
...    ...
... else:
...    ...
... """), indent=4))
Module(
    body=[
        While(
            test=Name(id='x'),
            body=[
                Expr(
                    value=Constant(value=Ellipsis))],
            orelse=[
                Expr(
                    value=Constant(value=Ellipsis))])])
```

### class `Break`

```python
Continue
```

The `break` and `continue` statements.

```python

>>> print(ast.dump(ast.parse("""\
... for a in b:
...     if a > 5:
...         break
...     else:
...         continue
...
... """), indent=4))
Module(
    body=[
        For(
            target=Name(id='a', ctx=Store()),
            iter=Name(id='b'),
            body=[
                If(
                    test=Compare(
                        left=Name(id='a'),
                        ops=[
                            Gt()],
                        comparators=[
                            Constant(value=5)]),
                    body=[
                        Break()],
                    orelse=[
                        Continue()])])])
```

### class `Try(body, handlers, orelse, finalbody)`

`try` blocks. All attributes are list of nodes to execute, except for
`handlers`, which is a list of `ExceptHandler` nodes.

```python

>>> print(ast.dump(ast.parse("""
... try:
...    ...
... except Exception:
...    ...
... except OtherException as e:
...    ...
... else:
...    ...
... finally:
...    ...
... """), indent=4))
Module(
    body=[
        Try(
            body=[
                Expr(
                    value=Constant(value=Ellipsis))],
            handlers=[
                ExceptHandler(
                    type=Name(id='Exception'),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))]),
                ExceptHandler(
                    type=Name(id='OtherException'),
                    name='e',
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])],
            orelse=[
                Expr(
                    value=Constant(value=Ellipsis))],
            finalbody=[
                Expr(
                    value=Constant(value=Ellipsis))])])
```

### class `TryStar(body, handlers, orelse, finalbody)`

`try` blocks which are followed by `except*` clauses. The attributes are the
same as for `Try` but the `ExceptHandler` nodes in `handlers`
are interpreted as `except*` blocks rather than `except`.

```python

>>> print(ast.dump(ast.parse("""
... try:
...    ...
... except* Exception:
...    ...
... """), indent=4))
Module(
    body=[
        TryStar(
            body=[
                Expr(
                    value=Constant(value=Ellipsis))],
            handlers=[
                ExceptHandler(
                    type=Name(id='Exception'),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.11.*

### class `ExceptHandler(type, name, body)`

A single `except` clause. `type` is the exception type it will match,
typically a `Name` node (or `None` for a catch-all `except:` clause).
`name` is a raw string for the name to hold the exception, or `None` if
the clause doesn't have `as foo`. `body` is a list of nodes.

```python

>>> print(ast.dump(ast.parse("""\
... try:
...     a + 1
... except TypeError:
...     pass
... """), indent=4))
Module(
    body=[
        Try(
            body=[
                Expr(
                    value=BinOp(
                        left=Name(id='a'),
                        op=Add(),
                        right=Constant(value=1)))],
            handlers=[
                ExceptHandler(
                    type=Name(id='TypeError'),
                    body=[
                        Pass()])])])
```

### class `With(items, body, type_comment)`

A `with` block. `items` is a list of `withitem` nodes representing
the context managers, and `body` is the indented block inside the context.

### `type_comment`

`type_comment` is an optional string with the type annotation as a comment.

### class `withitem(context_expr, optional_vars)`

A single context manager in a `with` block. `context_expr` is the context
manager, often a `Call` node. `optional_vars` is a `Name`,
`Tuple` or `List` for the `as foo` part, or `None` if that
isn't used.

```python

>>> print(ast.dump(ast.parse("""\
... with a as b, c as d:
...    something(b, d)
... """), indent=4))
Module(
    body=[
        With(
            items=[
                withitem(
                    context_expr=Name(id='a'),
                    optional_vars=Name(id='b', ctx=Store())),
                withitem(
                    context_expr=Name(id='c'),
                    optional_vars=Name(id='d', ctx=Store()))],
            body=[
                Expr(
                    value=Call(
                        func=Name(id='something'),
                        args=[
                            Name(id='b'),
                            Name(id='d')]))])])
```

### class `Match(subject, cases)`

A `match` statement. `subject` holds the subject of the match (the object
that is being matched against the cases) and `cases` contains an iterable of
`match_case` nodes with the different cases.

> *Added in version 3.10.*

### class `match_case(pattern, guard, body)`

A single case pattern in a `match` statement. `pattern` contains the
match pattern that the subject will be matched against. Note that the
`AST` nodes produced for patterns differ from those produced for
expressions, even when they share the same syntax.

The `guard` attribute contains an expression that will be evaluated if
the pattern matches the subject.

`body` contains a list of nodes to execute if the pattern matches and
the result of evaluating the guard expression is true.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case [x] if x>0:
...         ...
...     case tuple():
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchSequence(
                        patterns=[
                            MatchAs(name='x')]),
                    guard=Compare(
                        left=Name(id='x'),
                        ops=[
                            Gt()],
                        comparators=[
                            Constant(value=0)]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))]),
                match_case(
                    pattern=MatchClass(
                        cls=Name(id='tuple')),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `MatchValue(value)`

A match literal or value pattern that compares by equality. `value` is
an expression node. Permitted value nodes are restricted as described in
the match statement documentation. This pattern succeeds if the match
subject is equal to the evaluated value.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case "Relevant":
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchValue(
                        value=Constant(value='Relevant')),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `MatchSingleton(value)`

A match literal pattern that compares by identity. `value` is the
singleton to be compared against: `None`, `True`, or `False`. This
pattern succeeds if the match subject is the given constant.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case None:
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchSingleton(value=None),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `MatchSequence(patterns)`

A match sequence pattern. `patterns` contains the patterns to be matched
against the subject elements if the subject is a sequence. Matches a variable
length sequence if one of the subpatterns is a `MatchStar` node, otherwise
matches a fixed length sequence.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case [1, 2]:
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchSequence(
                        patterns=[
                            MatchValue(
                                value=Constant(value=1)),
                            MatchValue(
                                value=Constant(value=2))]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*

### class `MatchStar(name)`

Matches the rest of the sequence in a variable length match sequence pattern.
If `name` is not `None`, a list containing the remaining sequence
elements is bound to that name if the overall sequence pattern is successful.

```python

>>> print(ast.dump(ast.parse("""
... match x:
...     case [1, 2, *rest]:
...         ...
...     case [*_]:
...         ...
... """), indent=4))
Module(
    body=[
        Match(
            subject=Name(id='x'),
            cases=[
                match_case(
                    pattern=MatchSequence(
                        patterns=[
                            MatchValue(
                                value=Constant(value=1)),
                            MatchValue(
                                value=Constant(value=2)),
                            MatchStar(name='rest')]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))]),
                match_case(
                    pattern=MatchSequence(
                        patterns=[
                            MatchStar()]),
                    body=[
                        Expr(
                            value=Constant(value=Ellipsis))])])])
```

> *Added in version 3.10.*
