---
title: "Expressions (part 2 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/expressions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Expressions (part 2 of 8)

## Atoms

Atoms are the most basic <example-value> of expressions.
The simplest atoms are builtin constants,
names and literals.
More complex atoms are enclosed in paired delimiters:

- `()` (parentheses): groups,
tuple displays,
yield atoms, and
generator expressions;
- `[]` (square brackets): list displays;
- `{}` (curly braces): dictionary and set displays.

Formally, the syntax for atoms is:

```text

atom:
   | `builtin_constant`
   | `identifier`
   | `literal`
   | `parenthesized_enclosure`
   | `bracketed_enclosure`
   | `braced_enclosure`
parenthesized_enclosure:
   | `group`
   | `tuple`
   | `yield_atom`
   | `generator_expression`
bracketed_enclosure:
   | `listcomp`
   | `list`
braced_enclosure:
   | `dictcomp`
   | `dict`
   | `setcomp`
   | `set`
```

### Built-in constants

The keywords `True`, `False`, and `None` name
built-in constants.
The token `...` names the `Ellipsis` constant.

Evaluation of these atoms yields the corresponding value.

> **Note:** Several more built-in constants are available as global variables,
> but only the ones mentioned here are keywords.
> In particular, these names cannot be reassigned or used as attributes:
>
>
> ```pycon
> >>> False = 123
>   File "", line 1
>    False = 123
>    ^^^^^
> SyntaxError: cannot assign to False
> ```
>

Formally, the syntax for built-in constants is:

```text

builtin_constant: 'True' | 'False' | 'None' | '...'
```

### Identifiers (Names)

An identifier occurring as an atom is a name.  See section identifiers
for lexical definition and section naming for documentation of naming and
binding.

When the name is bound to an object, evaluation of the atom yields that object.
When a name is not bound, an attempt to evaluate it raises a `NameError`
exception.

#### Private name mangling

When an identifier that textually occurs in a class definition begins with two
or more underscore characters and does not end in two or more underscores, it
is considered a private name of that class.

> **See also:** The class specifications.

More precisely, private names are transformed to a longer form before code is
generated for them.  If the transformed name is longer than 255 characters,
implementation-defined truncation may happen.

The transformation is independent of the syntactical context in which the
identifier is used but only the following private identifiers are mangled:

- Any name used as the name of a variable that is assigned or read or any
name of an attribute being accessed.

The `__name__` attribute of nested functions, classes, and
type aliases is however not mangled.

- The name of imported modules, e.g., `__spam` in `import __spam`.
If the module is part of a package (i.e., its name contains a dot),
the name is *not* mangled, e.g., the `__foo` in `import __foo.bar`
is not mangled.

- The name of an imported member, e.g., `__f` in `from spam import __f`.

The transformation rule is defined as follows:

- The class name, with leading underscores removed and a single leading
underscore inserted, is inserted in front of the identifier, e.g., the
identifier `__spam` occurring in a class named `Foo`, `_Foo` or
`__Foo` is transformed to `_Foo__spam`.

- If the class name consists only of underscores, the transformation is the
identity, e.g., the identifier `__spam` occurring in a class named `_`
or `__` is left as is.

### Literals

A literal is a textual representation of a value.
Python supports numeric, string and bytes literals.
Format strings and template strings
are treated as string literals.

Numeric literals consist of a single `NUMBER`
token, which names an integer, floating-point number, or an imaginary number.
See the numbers section in Lexical analysis documentation for details.

String and bytes literals may consist of several tokens.
See section string-concatenation for details.

Note that negative and complex numbers, like `-3` or `3+4.2j`,
are syntactically not literals, but unary or
binary arithmetic operations involving the `-` or `+`
operator.

Evaluation of a literal yields an object of the given type
(`int`, `float`, `complex`, `str`,
`bytes`, or `Template`) with the given value.
The value may be approximated in the case of floating-point
and imaginary literals.

The formal grammar for literals is:

```text

literal: `strings` | `NUMBER`
```

#### Literals and object identity

All literals correspond to immutable data types, and hence the object's identity
is less important than its value.  Multiple evaluations of literals with the
same value (either the same occurrence in the program text or a different
occurrence) may obtain the same object or a different object with the same
value.

> **CPython implementation detail:** For example, in CPython, *small* integers with the same value evaluate
> to the same object:
>
>
> ```
> >>> x = 7
> >>> y = 7
> >>> x is y
> True
> ```
>
>
> However, large integers evaluate to different objects:
>
>
> ```
> >>> x = 123456789
> >>> y = 123456789
> >>> x is y
> False
> ```
>
>
> This behavior may change in future versions of CPython.
> In particular, the boundary between "small" and "large" integers has
> already changed in the past.
>
> CPython will emit a `SyntaxWarning` when you compare literals
> using `is`:
>
>
> ```
> >>> x = 7
> >>> x is 7
> :1: SyntaxWarning: "is" with 'int' literal. Did you mean "=="?
> True
> ```
>
>
> See faq-identity-with-is for more information.

Template strings are immutable but may reference mutable
objects as `Interpolation` values.
For the purposes of this section, two t-strings have the "same value" if
both their structure and the *identity* of the values match.

> **CPython implementation detail:** Currently, each evaluation of a template string results in
> a different object.

#### String literal concatenation

Multiple adjacent string or bytes literals, possibly
using different quoting conventions, are allowed, and their meaning is the same
as their concatenation:

```
>>> "hello" 'world'
"helloworld"
```

This feature is defined at the syntactical level, so it only works with literals.
To concatenate string expressions at run time, the '+' operator may be used:

```
>>> greeting = "Hello"
>>> space = " "
>>> name = "Blaise"
>>> print(greeting + space + name)   # not: print(greeting space name)
Hello Blaise
```

Literal concatenation can freely mix raw strings, triple-quoted strings,
and formatted string literals.
For example:

```
>>> "Hello" r', ' f"{name}!"
"Hello, Blaise!"
```

This feature can be used to reduce the number of backslashes
needed, to split long strings conveniently across long lines, or even to add
comments to parts of strings. For example:

```
re.compile("[A-Za-z_]"       # letter or underscore
           "[A-Za-z0-9_]*"   # letter, digit or underscore
          )
```

However, bytes literals may only be combined with other byte literals;
not with string literals of any kind.
Also, template string literals may only be combined with other template
string literals:

```
>>> t"Hello" t"{name}!"
Template(strings=('Hello', '!'), interpolations=(...))
```

Formally:

```text

strings: (`STRING` | `fstring`)+ | `tstring`+
```

### Parenthesized groups

A parenthesized group is an expression enclosed in parentheses.
The group evaluates to the same value as the expression inside.

Groups are used to override or clarify
operator precedence,
in the same way as in math notation.
For example:

```
>>> 3 << 2 | 4
12
>>> 3 << (2 | 4)   # Override precedence of the | (bitwise OR)
192
>>> (3 << 2) | 4   # Same as without parentheses (but more clear)
12
```

Note that not everything in parentheses is a *group*.
Specifically, a parenthesized group must include exactly one expression,
and cannot end with a comma.
See tuple displays and
generator expressions for other parenthesized forms.

Formally, the syntax for groups is:

```text

group: '(' `assignment_expression` ')'
```

### Container displays

For constructing builtin containers (lists, sets, tuples or dictionaries),
Python provides special syntax called displays.
There are subtle differences between the four kinds of displays,
detailed in the following sections.
All displays, however, consist of comma-separated items enclosed in paired
delimiters.

For example, a *list display* is a series of expressions enclosed in
square brackets:

```
>>> ["one", "two", "three"]
['one', 'two', 'three']
>>> [1 + 2, 2 + 3]
[3, 5]
```

In list, tuple and dictionary (but not set) displays, the series may be empty:

```
>>> []  # empty list
[]
>>> ()  # empty tuple
()
>>> {}  # empty dictionary
{}
```

If the series is not empty, the items may be followed by an additional comma,
which has no effect:

```
>>> ["one", "two", "three",]  # note comma after "three"
['one', 'two', 'three']
```

> **Note:** The trailing comma is often used for displays that span multiple lines
> (using implicit line joining),
> so when a future programmer adds a new entry at the end, they do not
> need to modify an existing line:
>
>
> ```
> >>> [
> ...     'one',
> ...     'two',
> ...     'three',
> ... ]
> ['one', 'two', 'three']
> ```
>

At runtime, when a display is evaluated, the listed items are evaluated from
left to right and placed into a new container of the appropriate type.

For tuple, list and set (but not dict) displays, any item in the display may
be prefixed with an asterisk (`*`).
This denotes iterable unpacking.
At runtime, the asterisk-prefixed expression must evaluate to an iterable,
whose contents are inserted into the container at the location of
the unpacking. For example:

```
>>> numbers = (1, 2)
>>> [*numbers, 'word', *numbers]
[1, 2, 'word', 1, 2]
```

Dictionary displays use a similar mechanism called
*dictionary unpacking*, denoted with a double
asterisk (`**`).
See dict for details.

A more advanced form of displays are comprehensions, where items are
computed via a set of looping and filtering instructions.
See the comprehensions section for details.

> *Added in version 3.5.*
> Iterable and dictionary unpacking in displays, originally proposed
> by PEP 448.

#### List displays

A list display is a possibly empty series of expressions enclosed in
square brackets. For example:

```
>>> ["one", "two", "three"]
['one', 'two', 'three']
>>> ["one"]  # One-element list
['one']
>>> []       # empty list
[]
```

See displays for general information on displays.

The formal grammar for list displays is:

```text

list: '[' [`flexible_expression_list`] ']'
```

#### Set displays

A set display is a *non-empty* series of expressions enclosed in
curly braces. For example:

```
>>> {"one", "two", "three"}
{'one', 'three', 'two'}
>>> {"one"}  # One-element set
{'one'}
```

See displays for general information on displays.

There is no special syntax for the empty set.
The `{}` literal is a dictionary display that constructs an
empty dictionary.
Call `set()` with no arguments to get an empty set.

The formal grammar for set displays is:

```text

set: '{' `flexible_expression_list` '}'
```

#### Tuple displays

A tuple display is a series of expressions enclosed in
parentheses. For example:

```
>>> (1, 2)
(1, 2)
>>> ()  # an empty tuple
()
```

See displays for general information on displays.

To avoid ambiguity, if a tuple display has exactly one element,
it requires a trailing comma.
Without it, you get a parenthesized group:

```
>>> ('single',)  # single-element tuple
('single',)
>>> ('single')   # no comma: single string
'single'
```

To put it in other words, a tuple display is a parenthesized list of either:

- two or more comma-separated expressions, or
- zero or more expressions, each followed by a comma.

Since tuples are immutable, object identity rules for literals
also apply to tuples: at runtime, two occurrences of tuples with the same
values may or may not yield the same object.

> **Note:** Python's syntax also includes expression lists,
> where a comma-separated list of expressions is *not* enclosed in parentheses
> but evaluates to tuple.
>
> In other words, when it comes to tuple syntax, the comma is more important
> that the use of parentheses.
> Only the empty tuple is spelled without a comma.

The formal grammar for tuple displays is:

```text

tuple:
   | '(' `flexible_expression` (',' `flexible_expression`)+ [','] ')'
   | '(' `flexible_expression` ',' ')'
   | '(' ')'
```

#### Dictionary displays

A dictionary display is a possibly empty series of dict items
enclosed in curly braces.
Each dict item is a colon-separated pair of expressions: the key
and its associated value.
For example:

```
>>> {1: 'one', 2: 'two'}
{1: 'one', 2: 'two'}
```

At runtime, when a dictionary comprehension is evaluated, the expressions
are evaluated from left to right.
Each key <example-value> is used as a key into the dictionary to store the
corresponding value.
This means that you can specify the same key <example-value> times in the
comprehension, and the final dictionary's value for a given key will be the
last one given.
For example:

```
>>> {
...     1: 'this will be overridden',
...     2: 'two',
...     1: 'also overridden',
...     1: 'one',
... }
{1: 'one', 2: 'two'}
```

Instead of a key-value pair, a dict item may be an expression prefixed by
a double asterisk `**`. This denotes dictionary unpacking.
At runtime, the expression must evaluate to a mapping;
each item of the mapping is added to the new dictionary.
As with key-value pairs, later values replace values already set by
earlier items and unpackings.
This may be used to override a set of defaults:

```
>>> defaults = {'color': 'blue', 'count': 8}
>>> overrides = {'color': 'yellow'}
>>> {**defaults, **overrides}
{'color': 'yellow', 'count': 8}
```

> *Added in version 3.5.*
> Unpacking into dictionary displays, originally proposed by PEP 448.

The formal grammar for dict displays is:

```text

dict:                   '{' [`double_starred_kvpairs`] '}'
double_starred_kvpairs: ','.`double_starred_kvpair`+ [',']
double_starred_kvpair:  '**' `or_expr` | `kvpair`
kvpair:                 `expression` ':' `expression`
```
