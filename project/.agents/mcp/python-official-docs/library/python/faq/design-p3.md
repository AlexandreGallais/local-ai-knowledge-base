---
title: "Design and History FAQ (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/design.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Design and History FAQ (part 3 of 3)

## Why doesn't Python have a "with" statement for attribute assignments?

Python has a `with` statement that wraps the execution of a block, calling code
on the entrance and exit from the block.  Some languages have a construct that
looks like this:

```
with obj:
    a = 1               # equivalent to obj.a = 1
    total = total + 1   # obj.total = obj.total + 1
```

In Python, such a construct would be ambiguous.

Other languages, such as Object Pascal, Delphi, and C++, use static types, so
it's possible to know, in an unambiguous way, what member is being assigned
to. This is the main point of static typing -- the compiler *always* knows the
scope of every variable at compile time.

Python uses dynamic types. It is impossible to know in advance which attribute
will be referenced at runtime. Member attributes may be added or removed from
objects on the fly. This makes it impossible to know, from a simple reading,
what attribute is being referenced: a local one, a global one, or a member
attribute?

For instance, take the following incomplete snippet:

```
def foo(a):
    with a:
        print(x)
```

The snippet assumes that `a` must have a member attribute called `x`. However,
there is nothing in Python that tells the interpreter this. What should happen
if `a` is, let us say, an integer?  If there is a global variable named `x`,
will it be used inside the `with` block?  As you see, the dynamic nature of Python
makes such choices much harder.

The primary benefit of `with` and similar language features (reduction of code
volume) can, however, easily be achieved in Python by assignment.  Instead of:

```
function(args).mydict[index][index].a = 21
function(args).mydict[index][index].b = 42
function(args).mydict[index][index].c = 63
```

write this:

```
ref = function(args).mydict[index][index]
ref.a = 21
ref.b = 42
ref.c = 63
```

This also has the side-effect of increasing execution speed because name
bindings are resolved at run-time in Python, and the second version only needs
to perform the resolution once.

Similar proposals that would introduce syntax to further reduce code volume,
such as using a 'leading dot', have been rejected in favour of explicitness (see
https://mail.python.org/pipermail/python-ideas/2016-May/040070.html).

## Why don't generators support the with statement?

For technical reasons, a generator used directly as a context manager
would not work correctly.  When, as is most common, a generator is used as
an iterator run to completion, no closing is needed.  When it is, wrap
it as `contextlib.closing(generator)`
in the `with` statement.

## Why are colons required for the if/while/def/class statements?

The colon is required primarily to enhance readability (one of the results of
the experimental ABC language).  Consider this:

```
if a == b
    print(a)
```

versus:

```
if a == b:
    print(a)
```

Notice how the second one is slightly easier to read.  Notice further how a
colon sets off the example in this FAQ answer; it's a standard usage in English.

Another minor reason is that the colon makes it easier for editors with syntax
highlighting; they can look for colons to decide when indentation needs to be
increased instead of having to do a more elaborate parsing of the program text.

## Why does Python allow commas at the end of lists and tuples?

Python lets you add a trailing comma at the end of lists, tuples, and
dictionaries:

```
[1, 2, 3,]
('a', 'b', 'c',)
d = {
    "A": [1, 5],
    "B": [6, 7],  # last trailing comma is optional but good style
}
```

There are several reasons to allow this.

When you have a literal value for a list, tuple, or dictionary spread across
multiple lines, it's easier to add more elements because you don't have to
remember to add a comma to the previous line.  The lines can also be reordered
without creating a syntax error.

Accidentally omitting the comma can lead to errors that are hard to diagnose.
For example:

```
x = [
  "fee",
  "fie"
  "foo",
  "fum"
]
```

This list looks like it has four elements, but it actually contains three:
"fee", "fiefoo" and "fum".  Always adding the comma avoids this source of error.

Allowing the trailing comma may also make programmatic code generation easier.
