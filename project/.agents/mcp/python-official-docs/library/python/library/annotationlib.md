---
title: "annotationlib --- Functionality for introspecting annotations (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/annotationlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `annotationlib` --- Functionality for introspecting annotations

Module `annotationlib`.

> *Added in version 3.14.*

**Source code:** Lib/annotationlib.py

The `annotationlib` module provides tools for introspecting
annotations on modules, classes, and functions.

Annotations are lazily evaluated and often contain
forward references to objects that are not yet defined when the annotation
is created. This module provides a set of low-level tools that can be used to retrieve annotations in a reliable way, even
in the presence of forward references and other edge cases.

This module supports retrieving annotations in three main formats
(see `Format`), each of which works best for different use cases:

- `VALUE` evaluates the annotations and returns their value.
This is most straightforward to work with, but it may raise errors,
for example if the annotations contain references to undefined names.
- `FORWARDREF` returns `ForwardRef` objects
for annotations that cannot be resolved, allowing you to inspect the
annotations without evaluating them. This is useful when you need to
work with annotations that may contain unresolved forward references.
- `STRING` returns the annotations as a string, similar
to how it would appear in the source file. This is useful for documentation
generators that want to display annotations in a readable way.

The `get_annotations()` function is the main entry point for
retrieving annotations. Given a function, class, or module, it returns
an annotations dictionary in the requested format. This module also provides
functionality for working directly with the annotate function
that is used to evaluate annotations, such as `get_annotate_from_class_namespace()`
and `call_annotate_function()`, as well as the
`call_evaluate_function()` function for working with
evaluate functions.

> **Caution:** Most functionality in this module can execute arbitrary code; see
> the security section for more information.

> **See also:** PEP 649 proposed the current model for how annotations work in Python.
>
> PEP 749 expanded on various aspects of PEP 649 and introduced the
> `annotationlib` module.
>
> annotations-howto provides best practices for working with
> annotations.
>
> typing-extensions provides a backport of `get_annotations()`
> that works on earlier versions of Python.

## Annotation semantics

The way annotations are evaluated has changed over the history of Python 3,
and currently still depends on a future import.
There have been execution models for annotations:

- *Stock semantics* (default in Python 3.0 through 3.13; see PEP 3107
and PEP 526): Annotations are evaluated eagerly, as they are
encountered in the source code.
- *Stringified annotations* (used with `from __future__ import annotations`
in Python 3.7 and newer; see PEP 563): Annotations are stored as
strings only.
- *Deferred evaluation* (default in Python 3.14 and newer; see PEP 649 and
PEP 749): Annotations are evaluated lazily, only when they are accessed.

As an example, consider the following program:

```
def func(a: Cls) -> None:
    print(a)

class Cls: pass

print(func.__annotations__)
```

This will behave as follows:

- Under stock semantics (Python 3.13 and earlier), it will throw a
`NameError` at the line where `func` is defined,
because `Cls` is an undefined name at that point.
- Under stringified annotations (if `from __future__ import annotations`
is used), it will print `{'a': 'Cls', 'return': 'None'}`.
- Under deferred evaluation (Python 3.14 and later), it will print
`{'a': <class 'Cls'>, 'return': None}`.

Stock semantics were used when function annotations were first introduced
in Python 3.0 (by PEP 3107) because this was the simplest, most obvious
way to implement annotations. The same execution model was used when variable
annotations were introduced in Python 3.6 (by PEP 526). However,
stock semantics caused problems when using annotations as type hints,
such as a need to refer to names that are not yet defined when the
annotation is encountered. In addition, there were performance problems
with executing annotations at module import time. Therefore, in Python 3.7,
PEP 563 introduced the ability to store annotations as strings using the
`from __future__ import annotations` syntax. The plan at the time was to
eventually make this behavior the default, but a problem appeared:
stringified annotations are more difficult to process for those who
introspect annotations at runtime. An alternative proposal, PEP 649,
introduced the third execution model, deferred evaluation, and was implemented
in Python 3.14. Stringified annotations are still used if
`from __future__ import annotations` is present, but this behavior will
eventually be removed.

## Classes

### class `Format`

An `IntEnum` describing the formats in which annotations
can be returned. Members of the enum, or their equivalent integer values,
can be passed to `get_annotations()` and other functions in this
module, as well as to `__annotate__` functions.

### `VALUE`

Values are the result of evaluating the annotation expressions.

### `VALUE_WITH_FAKE_GLOBALS`

Special value used to signal that an annotate function is being
evaluated in a special environment with fake globals. When passed this
value, annotate functions should either return the same value as for
the `Format.VALUE` format, or raise `NotImplementedError`
to signal that they do not support execution in this environment.
This format is only used internally and should not be passed to
the functions in this module.

### `FORWARDREF`

Values are real annotation values (as per `Format.VALUE` format)
for defined values, and `ForwardRef` proxies for undefined
values. Real objects may contain references to `ForwardRef`
proxy objects.

### `STRING`

Values are the text string of the annotation as it appears in the
source code, up to modifications including, but not restricted to,
whitespace normalizations and constant values optimizations.

The exact values of these strings may change in future versions of Python.

> *Added in version 3.14.*

### class `ForwardRef`

A proxy object for forward references in annotations.

Instances of this class are returned when the `FORWARDREF`
format is used and annotations contain a name that cannot be resolved.
This can happen when a forward reference is used in an annotation, such as
when a class is referenced before it is defined.

### `__forward_arg__`

A string containing the code that was evaluated to produce the
`ForwardRef`. The string may not be exactly equivalent
to the original source.

### `evaluate(*, owner=None, globals=None, locals=None, type_params=None, format=Format.VALUE)`

Evaluate the forward reference, returning its value.

If the *format* argument is `VALUE` (the default),
this method may throw an exception, such as `NameError`, if the forward
reference refers to a name that cannot be resolved. The arguments to this
method can be used to provide bindings for names that would otherwise
be undefined. If the *format* argument is `FORWARDREF`,
the method will never throw an exception, but may return a `ForwardRef`
instance. For example, if the forward reference object contains the code
`list[undefined]`, where `undefined` is a name that is not defined,
evaluating it with the `FORWARDREF` format will return
`list[ForwardRef('undefined')]`. If the *format* argument is
`STRING, the method will return forward_arg__`.

The *owner* parameter provides the preferred mechanism for passing scope
information to this method. The owner of a `ForwardRef` is the
object that contains the annotation from which the `ForwardRef`
derives, such as a module object, type object, or function object.

The *globals*, *locals*, and *type_params* parameters provide a more precise
mechanism for influencing the names that are available when the `ForwardRef`
is evaluated. *globals* and *locals* are passed to `eval()`, representing
the global and local namespaces in which the name is evaluated.
The *type_params* parameter is relevant for objects created using the native
syntax for generic classes and functions.
It is a tuple of type parameters that are in scope
while the forward reference is being evaluated. For example, if evaluating a
`ForwardRef` retrieved from an annotation found in the class namespace
of a generic class `C`, *type_params* should be set to `C.__type_params__`.

`ForwardRef` instances returned by `get_annotations()`
retain references to information about the scope they originated from,
so calling this method with no further arguments may be sufficient to
evaluate such objects. `ForwardRef` instances created by other
means may not have any information about their scope, so passing
arguments to this method may be necessary to evaluate them successfully.

If no *owner*, *globals*, *locals*, or *type_params* are provided and the
`ForwardRef` does not contain information about its origin,
empty globals and locals dictionaries are used.

> *Added in version 3.14.*
