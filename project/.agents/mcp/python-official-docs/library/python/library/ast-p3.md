---
title: "ast --- Abstract syntax trees (part 3 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ast.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ast --- Abstract syntax trees (part 3 of 7)

### class `Expr(value)`

When an expression, such as a function call, appears as a statement by itself
with its return value not used or stored, it is wrapped in this container.
`value` holds one of the other nodes in this section, a `Constant`, a
`Name`, a `Lambda`, a `Yield` or `YieldFrom` node.

```python

>>> print(ast.dump(ast.parse('-a'), indent=4))
Module(
    body=[
        Expr(
            value=UnaryOp(
                op=USub(),
                operand=Name(id='a')))])
```

### class `UnaryOp(op, operand)`

A unary operation. `op` is the operator, and `operand` any expression
node.

### class `UAdd`

```python
USub
Not
Invert
```

Unary operator tokens. `Not` is the `not` keyword, `Invert`
is the `~` operator.

```python

>>> print(ast.dump(ast.parse('not x', mode='eval'), indent=4))
Expression(
    body=UnaryOp(
        op=Not(),
        operand=Name(id='x')))
```

### class `BinOp(left, op, right)`

A binary operation (like addition or division). `op` is the operator, and
`left` and `right` are any expression nodes.

```python

>>> print(ast.dump(ast.parse('x + y', mode='eval'), indent=4))
Expression(
    body=BinOp(
        left=Name(id='x'),
        op=Add(),
        right=Name(id='y')))
```

### class `Add`

```python
Sub
Mult
Div
FloorDiv
Mod
Pow
LShift
RShift
BitOr
BitXor
BitAnd
MatMult
```

Binary operator tokens.

### class `BoolOp(op, values)`

A boolean operation, 'or' or 'and'. `op` is `Or` or `And`.
`values` are the values involved. Consecutive operations with the same
operator, such as `a or b or c`, are collapsed into one node with several
values.

This doesn't include `not`, which is a `UnaryOp`.

```python

>>> print(ast.dump(ast.parse('x or y', mode='eval'), indent=4))
Expression(
    body=BoolOp(
        op=Or(),
        values=[
            Name(id='x'),
            Name(id='y')]))
```

### class `And`

```python
Or
```

Boolean operator tokens.

### class `Compare(left, ops, comparators)`

A comparison of two or more values. `left` is the first value in the
comparison, `ops` the list of operators, and `comparators` the list
of values after the first element in the comparison.

```python

>>> print(ast.dump(ast.parse('1 <= a < 10', mode='eval'), indent=4))
Expression(
    body=Compare(
        left=Constant(value=1),
        ops=[
            LtE(),
            Lt()],
        comparators=[
            Name(id='a'),
            Constant(value=10)]))
```

### class `Eq`

```python
NotEq
Lt
LtE
Gt
GtE
Is
IsNot
In
NotIn
```

Comparison operator tokens.

### class `Call(func, args, keywords)`

A function call. `func` is the function, which will often be a
`Name` or `Attribute` object. Of the arguments:

- `args` holds a list of the arguments passed by position.
- `keywords` holds a list of `.keyword` objects representing
arguments passed by keyword.

The `args` and `keywords` arguments are optional and default to empty lists.

```python

>>> print(ast.dump(ast.parse('func(a, b=c, *d, **e)', mode='eval'), indent=4))
Expression(
    body=Call(
        func=Name(id='func'),
        args=[
            Name(id='a'),
            Starred(
                value=Name(id='d'))],
        keywords=[
            keyword(
                arg='b',
                value=Name(id='c')),
            keyword(
                value=Name(id='e'))]))
```

### class `keyword(arg, value)`

A keyword argument to a function call or class definition. `arg` is a raw
string of the parameter name, `value` is a node to pass in.

### class `IfExp(test, body, orelse)`

An expression such as `a if b else c`. Each field holds a single node, so
in the following example, all three are `Name` nodes.

```python

>>> print(ast.dump(ast.parse('a if b else c', mode='eval'), indent=4))
Expression(
    body=IfExp(
        test=Name(id='b'),
        body=Name(id='a'),
        orelse=Name(id='c')))
```

### class `Attribute(value, attr, ctx)`

Attribute access, e.g. `d.keys`. `value` is a node, typically a
`Name`. `attr` is a bare string giving the name of the attribute,
and `ctx` is `Load`, `Store` or `Del` according to how
the attribute is acted on.

```python

>>> print(ast.dump(ast.parse('snake.colour', mode='eval'), indent=4))
Expression(
    body=Attribute(
        value=Name(id='snake'),
        attr='colour'))
```

### class `NamedExpr(target, value)`

A named expression. This AST node is produced by the assignment expressions
operator (also known as the walrus operator). As opposed to the `Assign`
node in which the first argument can be multiple nodes, in this case both
`target` and `value` must be single nodes.

```python

>>> print(ast.dump(ast.parse('(x := 4)', mode='eval'), indent=4))
Expression(
    body=NamedExpr(
        target=Name(id='x', ctx=Store()),
        value=Constant(value=4)))
```

> *Added in version 3.8.*

#### Subscripting

### class `Subscript(value, slice, ctx)`

A subscript, such as `l[1]`. `value` is the subscripted object
(usually sequence or mapping). `slice` is an index, slice or key.
It can be a `Tuple` and contain a `Slice`.
`ctx` is `Load`, `Store` or `Del`
according to the action performed with the subscript.

```python

>>> print(ast.dump(ast.parse('l[1:2, 3]', mode='eval'), indent=4))
Expression(
    body=Subscript(
        value=Name(id='l'),
        slice=Tuple(
            elts=[
                Slice(
                    lower=Constant(value=1),
                    upper=Constant(value=2)),
                Constant(value=3)])))
```

### class `Slice(lower, upper, step)`

Regular slicing (on the form `lower:upper` or `lower:upper:step`).
Can occur only inside the *slice* field of `Subscript`, either
directly or as an element of `Tuple`.

```python

>>> print(ast.dump(ast.parse('l[1:2]', mode='eval'), indent=4))
Expression(
    body=Subscript(
        value=Name(id='l'),
        slice=Slice(
            lower=Constant(value=1),
            upper=Constant(value=2))))
```

#### Comprehensions

### class `ListComp(elt, generators)`

```python
SetComp(elt, generators)
GeneratorExp(elt, generators)
DictComp(key, value, generators)
```

List and set comprehensions, generator expressions, and dictionary
comprehensions. `elt` (or `key` and `value`) is a single node
representing the part that will be evaluated for each item.

For dictionary comprehensions using unpacking, for example
`{**item for item in items}`, the expression to be expanded goes in
`key` and `value` is `None`.

`generators` is a list of `comprehension` nodes.

```python

>>> print(ast.dump(
...     ast.parse('[x for x in numbers]', mode='eval'),
...     indent=4,
... ))
Expression(
    body=ListComp(
        elt=Name(id='x'),
        generators=[
            comprehension(
                target=Name(id='x', ctx=Store()),
                iter=Name(id='numbers'),
                is_async=0)]))
>>> print(ast.dump(
...     ast.parse('{x: x**2 for x in numbers}', mode='eval'),
...     indent=4,
... ))
Expression(
    body=DictComp(
        key=Name(id='x'),
        value=BinOp(
            left=Name(id='x'),
            op=Pow(),
            right=Constant(value=2)),
        generators=[
            comprehension(
                target=Name(id='x', ctx=Store()),
                iter=Name(id='numbers'),
                is_async=0)]))
>>> print(ast.dump(
...     ast.parse('{x for x in numbers}', mode='eval'),
...     indent=4,
... ))
Expression(
    body=SetComp(
        elt=Name(id='x'),
        generators=[
            comprehension(
                target=Name(id='x', ctx=Store()),
                iter=Name(id='numbers'),
                is_async=0)]))
```

### class `comprehension(target, iter, ifs, is_async)`

One `for` clause in a comprehension. `target` is the reference to use for
each element - typically a `Name` or `Tuple` node. `iter`
is the object to iterate over. `ifs` is a list of test expressions: each
`for` clause can have multiple `ifs`.

`is_async` indicates a comprehension is asynchronous (using an
`async for` instead of `for`). The value is an integer (0 or 1).

```python

>>> print(ast.dump(ast.parse('[ord(c) for line in file for c in line]', mode='eval'),
...                indent=4)) # Multiple comprehensions in one.
Expression(
    body=ListComp(
        elt=Call(
            func=Name(id='ord'),
            args=[
                Name(id='c')]),
        generators=[
            comprehension(
                target=Name(id='line', ctx=Store()),
                iter=Name(id='file'),
                is_async=0),
            comprehension(
                target=Name(id='c', ctx=Store()),
                iter=Name(id='line'),
                is_async=0)]))

>>> print(ast.dump(ast.parse('(n**2 for n in it if n>5 if n<10)', mode='eval'),
...                indent=4)) # generator comprehension
Expression(
    body=GeneratorExp(
        elt=BinOp(
            left=Name(id='n'),
            op=Pow(),
            right=Constant(value=2)),
        generators=[
            comprehension(
                target=Name(id='n', ctx=Store()),
                iter=Name(id='it'),
                ifs=[
                    Compare(
                        left=Name(id='n'),
                        ops=[
                            Gt()],
                        comparators=[
                            Constant(value=5)]),
                    Compare(
                        left=Name(id='n'),
                        ops=[
                            Lt()],
                        comparators=[
                            Constant(value=10)])],
                is_async=0)]))

>>> print(ast.dump(ast.parse('[i async for i in soc]', mode='eval'),
...                indent=4)) # Async comprehension
Expression(
    body=ListComp(
        elt=Name(id='i'),
        generators=[
            comprehension(
                target=Name(id='i', ctx=Store()),
                iter=Name(id='soc'),
                is_async=1)]))
```

### class `Assign(targets, value, type_comment)`

An assignment. `targets` is a list of nodes, and `value` is a single node.

Multiple nodes in `targets` represents assigning the same value to each.
Unpacking is represented by putting a `Tuple` or `List`
within `targets`.

### `type_comment`

`type_comment` is an optional string with the type annotation as a comment.

```python

>>> print(ast.dump(ast.parse('a = b = 1'), indent=4)) # Multiple assignment
Module(
    body=[
        Assign(
            targets=[
                Name(id='a', ctx=Store()),
                Name(id='b', ctx=Store())],
            value=Constant(value=1))])

>>> print(ast.dump(ast.parse('a,b = c'), indent=4)) # Unpacking
Module(
    body=[
        Assign(
            targets=[
                Tuple(
                    elts=[
                        Name(id='a', ctx=Store()),
                        Name(id='b', ctx=Store())],
                    ctx=Store())],
            value=Name(id='c'))])
```

### class `AnnAssign(target, annotation, value, simple)`

An assignment with a type annotation. `target` is a single node and can
be a `Name`, an `Attribute` or a `Subscript`.
`annotation` is the annotation, such as a `Constant` or `Name`
node. `value` is a single optional node.

`simple` is always either 0 (indicating a "complex" target) or 1
(indicating a "simple" target). A "simple" target consists solely of a
`Name` node that does not appear between parentheses; all other
targets are considered complex. Only simple targets appear in
the `__annotations__` dictionary of modules and classes.

```python

>>> print(ast.dump(ast.parse('c: int'), indent=4))
Module(
    body=[
        AnnAssign(
            target=Name(id='c', ctx=Store()),
            annotation=Name(id='int'),
            simple=1)])

>>> print(ast.dump(ast.parse('(a): int = 1'), indent=4)) # Annotation with parenthesis
Module(
    body=[
        AnnAssign(
            target=Name(id='a', ctx=Store()),
            annotation=Name(id='int'),
            value=Constant(value=1),
            simple=0)])

>>> print(ast.dump(ast.parse('a.b: int'), indent=4)) # Attribute annotation
Module(
    body=[
        AnnAssign(
            target=Attribute(
                value=Name(id='a'),
                attr='b',
                ctx=Store()),
            annotation=Name(id='int'),
            simple=0)])

>>> print(ast.dump(ast.parse('a[1]: int'), indent=4)) # Subscript annotation
Module(
    body=[
        AnnAssign(
            target=Subscript(
                value=Name(id='a'),
                slice=Constant(value=1),
                ctx=Store()),
            annotation=Name(id='int'),
            simple=0)])
```

### class `AugAssign(target, op, value)`

Augmented assignment, such as `a += 1`. In the following example,
`target` is a `Name` node for `x` (with the `Store`
context), `op` is `Add`, and `value` is a `Constant` with
value for 1.

The `target` attribute cannot be of class `Tuple` or `List`,
unlike the targets of `Assign`.

```python

>>> print(ast.dump(ast.parse('x += 2'), indent=4))
Module(
    body=[
        AugAssign(
            target=Name(id='x', ctx=Store()),
            op=Add(),
            value=Constant(value=2))])
```

### class `Raise(exc, cause)`

A `raise` statement. `exc` is the exception object to be raised, normally a
`Call` or `Name`, or `None` for a standalone `raise`.
`cause` is the optional part for `y` in `raise x from y`.

```python

>>> print(ast.dump(ast.parse('raise x from y'), indent=4))
Module(
    body=[
        Raise(
            exc=Name(id='x'),
            cause=Name(id='y'))])
```

### class `Assert(test, msg)`

An assertion. `test` holds the condition, such as a `Compare` node.
`msg` holds the failure message.

```python

>>> print(ast.dump(ast.parse('assert x,y'), indent=4))
Module(
    body=[
        Assert(
            test=Name(id='x'),
            msg=Name(id='y'))])
```

### class `Delete(targets)`

Represents a `del` statement. `targets` is a list of nodes, such as
`Name`, `Attribute` or `Subscript` nodes.

```python

>>> print(ast.dump(ast.parse('del x,y,z'), indent=4))
Module(
    body=[
        Delete(
            targets=[
                Name(id='x', ctx=Del()),
                Name(id='y', ctx=Del()),
                Name(id='z', ctx=Del())])])
```

### class `Pass()`

A `pass` statement.

```python

>>> print(ast.dump(ast.parse('pass'), indent=4))
Module(
    body=[
        Pass()])
```

### class `TypeAlias(name, type_params, value)`

A type alias created through the `type`
statement. `name` is the name of the alias, `type_params` is a list of
type parameters, and `value` is the value of the
type alias.

```python

>>> print(ast.dump(ast.parse('type Alias = int'), indent=4))
Module(
    body=[
        TypeAlias(
            name=Name(id='Alias', ctx=Store()),
            value=Name(id='int'))])
```

> *Added in version 3.12.*

Other statements which are only applicable inside functions or loops are
described in other sections.

#### Imports
