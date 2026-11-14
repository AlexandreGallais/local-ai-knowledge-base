---
title: "inspect --- Inspect live objects (part 6 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/inspect.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# inspect --- Inspect live objects (part 6 of 8)

## Introspecting callables with the Signature object

> *Added in version 3.3.*

The `Signature` object represents the call signature of a callable object
and its return annotation. To retrieve a `Signature` object,
use the `signature()`
function.

### `signature(callable, *, follow_wrapped=True, globals=None, locals=None, eval_str=False, annotation_format=Format.VALUE)`

Return a `Signature` object for the given *callable*:

```python

>>> from inspect import signature
>>> def foo(a, *, b:int, **kwargs):
...     pass

>>> sig = signature(foo)

>>> str(sig)
'(a, *, b: int, **kwargs)'

>>> str(sig.parameters['b'])
'b: int'

>>> sig.parameters['b'].annotation
<class 'int'>
```

Accepts a wide range of Python callables, from plain functions and classes to
`functools.partial()` objects.

If some of the annotations are strings (e.g., because
`from __future__ import annotations` was used), `signature()` will
attempt to automatically un-stringize the annotations using
`annotationlib.get_annotations()`.  The
*globals*, *locals*, and *eval_str* parameters are passed
into `annotationlib.get_annotations()` when resolving the
annotations; see the documentation for `annotationlib.get_annotations()`
for instructions on how to use these parameters. A member of the
`annotationlib.Format` enum can be passed to the
*annotation_format* parameter to control the format of the returned
annotations. For example, use
`annotation_format=annotationlib.Format.STRING` to return annotations in string
format.

Raises `ValueError` if no signature can be provided, and
`TypeError` if that type of object is not supported.  Also,
if the annotations are stringized, and *eval_str* is not false,
the `eval()` call(s) to un-stringize the annotations in `annotationlib.get_annotations()`
could potentially raise any kind of exception.

A slash (/) in the signature of a function denotes that the parameters prior
to it are positional-only. For more info, see
the FAQ entry on positional-only parameters.

> *Changed in version 3.5.*
> The *follow_wrapped* parameter was added.
> Pass `False` to get a signature of
> *callable* specifically (`callable.__wrapped__` will not be used to
> unwrap decorated callables.)

> *Changed in version 3.10.*
> The *globals*, *locals*, and *eval_str* parameters were added.

> *Changed in version 3.14.*
> The *annotation_format* parameter was added.

> **Note:** Some callables may not be introspectable in certain implementations of
> Python.  For example, in CPython, some built-in functions defined in
> C provide no metadata about their arguments.

> **CPython implementation detail:** If the passed object has a `__signature__` attribute,
> we may use it to create the signature.
> The exact semantics are an implementation detail and are subject to
> unannounced changes. Consult the source code for current semantics.

### class `Signature(parameters=None, *, return_annotation=Signature.empty)`

A `Signature` object represents the call signature of a function
and its return
annotation.  For each parameter accepted by the function it stores a
`Parameter` object in its `parameters` collection.

The optional *parameters* argument is a sequence of `Parameter`
objects, which is validated to check that there are no parameters with
duplicate names, and that the parameters are in the right order, i.e.
positional-only first, then positional-or-keyword, and that parameters with
defaults follow parameters without defaults.

The optional *return_annotation* argument can be an arbitrary Python object.
It represents the "return" annotation of the callable.

`Signature` objects are *immutable*.  Use `Signature.replace()` or
`copy.replace()` to make a modified copy.

> *Changed in version 3.5.*
> `Signature` objects are now picklable and hashable.

### `Signature.empty`

A special class-level marker to specify absence of a return annotation.

### `Signature.parameters`

An ordered mapping of parameters' names to the corresponding
`Parameter` objects.  Parameters appear in strict definition
order, including keyword-only parameters.

> *Changed in version 3.7.*
> Python only explicitly guaranteed that it preserved the declaration
> order of keyword-only parameters as of version 3.7, although in practice
> this order had always been preserved in Python 3.

### `Signature.return_annotation`

The "return" annotation for the callable.  If the callable has no "return"
annotation, this attribute is set to `Signature.empty`.

### `Signature.bind(*args, **kwargs)`

Create a mapping from positional and keyword arguments to parameters.
Returns `BoundArguments` if `*args` and `**kwargs` match the
signature, or raises a `TypeError`.

### `Signature.bind_partial(*args, **kwargs)`

Works the same way as `Signature.bind()`, but allows the omission of
some required arguments (mimics `functools.partial()` behavior.)
Returns `BoundArguments`, or raises a `TypeError` if the
passed arguments do not match the signature.

### `Signature.replace(*, parameters)`

Create a new `Signature` instance based on the instance
`replace()` was invoked on.
It is possible to pass <example-value> *parameters* and/or
*return_annotation* to override the corresponding properties of the base
signature.  To remove `return_annotation` from the copied
`Signature`, pass in
`Signature.empty`.

```python

>>> def test(a, b):
...     pass
...
>>> sig = signature(test)
>>> new_sig = sig.replace(return_annotation="new return anno")
>>> str(new_sig)
"(a, b) -> 'new return anno'"
```

`Signature` objects are also supported by the generic function
`copy.replace()`.

### `format(*, max_width=None, quote_annotation_strings=True)`

Create a string representation of the `Signature` object.

If *max_width* is passed, the method will attempt to fit
the signature into lines of at most *max_width* characters.
If the signature is longer than *max_width*,
all parameters will be on separate lines.

If *quote_annotation_strings* is False, annotations
in the signature are displayed without opening and closing quotation
marks if they are strings. This is useful if the signature was created with the
`STRING` format or if
`from __future__ import annotations` was used.

> *Added in version 3.13.*

> *Changed in version 3.14.*
> The *unquote_annotations* parameter was added.

### classmethod `Signature.from_callable(obj, *, follow_wrapped=True, globals=None, locals=None, eval_str=False)`

Return a `Signature` (or its subclass) object for a given callable
*obj*.

This method simplifies subclassing of `Signature`:

```python

class MySignature(Signature):
    pass
sig = MySignature.from_callable(sum)
assert isinstance(sig, MySignature)
```

Its behavior is otherwise identical to that of `signature()`.

> *Added in version 3.5.*

> *Changed in version 3.10.*
> The *globals*, *locals*, and *eval_str* parameters were added.

### class `Parameter(name, kind, *, default=Parameter.empty, annotation=Parameter.empty)`

`Parameter` objects are *immutable*.
Instead of modifying a `Parameter` object,
you can use `Parameter.replace()` or `copy.replace()` to create a modified copy.

> *Changed in version 3.5.*
> Parameter objects are now picklable and hashable.

### `Parameter.empty`

A special class-level marker to specify absence of default values and
annotations.

### `Parameter.name`

The name of the parameter as a string.  The name must be a valid
Python identifier.

> **CPython implementation detail:** CPython generates implicit parameter names of the form `.0` on the
> code objects used to implement comprehensions and generator
> expressions.
>
>
> > *Changed in version 3.6.*
> > These parameter names are now exposed by this module as names like
> > `implicit0`.
>

### `Parameter.default`

The default value for the parameter.  If the parameter has no default
value, this attribute is set to `Parameter.empty`.

### `Parameter.annotation`

The annotation for the parameter.  If the parameter has no annotation,
this attribute is set to `Parameter.empty`.

### `Parameter.kind`

Describes how argument values are bound to the parameter.  The possible
values are accessible via `Parameter` (like `Parameter.KEYWORD_ONLY`),
and support comparison and ordering, in the following order:

```text
+------------------------+----------------------------------------------+
|    Name                | Meaning                                      |
+========================+==============================================+
| *POSITIONAL_ONLY*      | Value must be supplied as a positional       |
|                        | argument. Positional only parameters are     |
|                        | those which appear before a ``/`` entry (if  |
|                        | present) in a Python function definition.    |
+------------------------+----------------------------------------------+
| *POSITIONAL_OR_KEYWORD*| Value may be supplied as either a keyword or |
|                        | positional argument (this is the standard    |
|                        | binding behaviour for functions implemented  |
|                        | in Python.)                                  |
+------------------------+----------------------------------------------+
| *VAR_POSITIONAL*       | A tuple of positional arguments that aren't  |
|                        | bound to any other parameter. This           |
|                        | corresponds to a ``*args`` parameter in a    |
|                        | Python function definition.                  |
+------------------------+----------------------------------------------+
| *KEYWORD_ONLY*         | Value must be supplied as a keyword argument.|
|                        | Keyword only parameters are those which      |
|                        | appear after a ``*`` or ``*args`` entry in a |
|                        | Python function definition.                  |
+------------------------+----------------------------------------------+
| *VAR_KEYWORD*          | A dict of keyword arguments that aren't bound|
|                        | to any other parameter. This corresponds to a|
|                        | ``**kwargs`` parameter in a Python function  |
|                        | definition.                                  |
+------------------------+----------------------------------------------+
```

Example: print all keyword-only arguments without default values:

```python

>>> def foo(a, b, *, c, d=10):
...     pass

>>> sig = signature(foo)
>>> for param in sig.parameters.values():
...     if (param.kind == param.KEYWORD_ONLY and
...                        param.default is param.empty):
...         print('Parameter:', param)
Parameter: c
```

### `Parameter.kind.description`

Describes an enum value of `Parameter.kind`.

> *Added in version 3.8.*

Example: print all descriptions of arguments:

```python

>>> def foo(a, b, *, c, d=10):
...     pass

>>> sig = signature(foo)
>>> for param in sig.parameters.values():
...     print(param.kind.description)
positional or keyword
positional or keyword
keyword-only
keyword-only
```

### `Parameter.replace(*, name, default)`

Create a new `Parameter` instance based on the instance replaced was invoked
on.  To override a `Parameter` attribute, pass the corresponding
argument.  To remove a default value or/and an annotation from a
`Parameter`, pass `Parameter.empty`.

```python

>>> from inspect import Parameter
>>> param = Parameter('foo', Parameter.KEYWORD_ONLY, default=42)
>>> str(param)
'foo=42'

>>> str(param.replace()) # Will create a shallow copy of 'param'
'foo=42'

>>> str(param.replace(default=Parameter.empty, annotation='spam'))
"foo: 'spam'"
```

`Parameter` objects are also supported by the generic function
`copy.replace()`.

> *Changed in version 3.4.*
> In Python 3.3 `Parameter` objects were allowed to have `name` set
> to `None` if their `kind` was set to `POSITIONAL_ONLY`.
> This is no longer permitted.

### class `BoundArguments`

Result of a `Signature.bind()` or `Signature.bind_partial()` call.
Holds the mapping of arguments to the function's parameters.

### `BoundArguments.arguments`

A mutable mapping of parameters' names to arguments' values.
Contains only explicitly bound arguments.  Changes in `arguments`
will reflect in `args` and `kwargs`.

Should be used in conjunction with `Signature.parameters` for any
argument processing purposes.

> **Note:** Arguments for which `Signature.bind()` or
> `Signature.bind_partial()` relied on a default value are skipped.
> However, if needed, use `BoundArguments.apply_defaults()` to add
> them.

> *Changed in version 3.9.*
> `arguments` is now of type `dict`. Formerly, it was of
> type `collections.OrderedDict`.

### `BoundArguments.args`

A tuple of positional arguments values.  Dynamically computed from the
`arguments` attribute.

### `BoundArguments.kwargs`

A dict of keyword arguments values.  Dynamically computed from the
`arguments` attribute.  Arguments that can be passed positionally
are included in `args` instead.

### `BoundArguments.signature`

A reference to the parent `Signature` object.

### `BoundArguments.apply_defaults()`

Set default values for missing arguments.

For variable-positional arguments (`*args`) the default is an
empty tuple.

For variable-keyword arguments (`**kwargs`) the default is an
empty dict.

```python

>>> def foo(a, b='ham', *args): pass
>>> ba = inspect.signature(foo).bind('spam')
>>> ba.apply_defaults()
>>> ba.arguments
{'a': 'spam', 'b': 'ham', 'args': ()}
```

> *Added in version 3.5.*

The `args` and `kwargs` properties can be used to invoke
functions:

```python

def test(a, *, b):
    ...

sig = signature(test)
ba = sig.bind(10, b=20)
test(*ba.args, **ba.kwargs)
```

> **See also:** PEP 362 - Function Signature Object.
> The detailed specification, implementation details and examples.
