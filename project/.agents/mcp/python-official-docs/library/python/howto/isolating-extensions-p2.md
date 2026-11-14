---
title: "Isolating Extension Modules (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/isolating-extensions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Isolating Extension Modules (part 2 of 2)

## Heap Types

Traditionally, types defined in C code are *static*; that is,
`static PyTypeObject` structures defined directly in code and
initialized using `PyType_Ready()`.

Such types are necessarily shared across the process. Sharing them
between module objects requires paying attention to any state they own
or access. To limit the possible issues, static types are immutable at
the Python level: for example, you can't set `str.myattribute = 123`.

> **CPython implementation detail:** Sharing truly immutable objects between interpreters is fine,
> as long as they don't provide access to mutable objects.
> However, in CPython, every Python object has a mutable implementation
> detail: the reference count. Changes to the refcount are guarded by the GIL.
> Thus, code that shares any Python objects across interpreters implicitly
> depends on CPython's current, process-wide GIL.

Because they are immutable and process-global, static types cannot access
"their" module state.
If any method of such a type requires access to module state,
the type must be converted to a *heap-allocated type*, or *heap type*
for short. These correspond more closely to classes created by Python's
`class` statement.

For new modules, using heap types by default is a good rule of thumb.

### Changing Static Types to Heap Types

Static types can be converted to heap types, but note that
the heap type API was not designed for "lossless" conversion
from static types—that is, creating a type that works exactly like a given
static type.
So, when rewriting the class definition in a new API,
you are likely to unintentionally change a few details (e.g. pickleability
or inherited slots).
Always test the details that are important to you.

Watch out for the following two points in particular (but note that this is not
a comprehensive list):

- Unlike static types, heap type objects are mutable by default.
Use the `Py_TPFLAGS_IMMUTABLETYPE` flag to prevent mutability.
- Heap types inherit `tp_new` by default,
so it may become possible to instantiate them from Python code.
You can prevent this with the `Py_TPFLAGS_DISALLOW_INSTANTIATION` flag.

### Defining Heap Types

Heap types can be created by filling a `PyType_Spec` structure, a
description or "blueprint" of a class, and calling
`PyType_FromModuleAndSpec` to construct a new class object.

> **Note:** Other functions, like `PyType_FromSpec`, can also create
> heap types, but `PyType_FromModuleAndSpec` associates the module
> with the class, allowing access to the module state from methods.

The class should generally be stored in *both* the module state (for
safe access from C) and the module's `__dict__` (for access from
Python code).

### Garbage-Collection Protocol

Instances of heap types hold a reference to their type.
This ensures that the type isn't destroyed before all its instances are,
but may result in reference cycles that need to be broken by the
garbage collector.

To avoid memory leaks, instances of heap types must implement the
garbage collection protocol.
That is, heap types should:

- Have the `Py_TPFLAGS_HAVE_GC` flag.
- Define a traverse function using `Py_tp_traverse`, which
visits the type (e.g. using `Py_VISIT(Py_TYPE(self))`).

Please refer to the documentation of
`Py_TPFLAGS_HAVE_GC` and `tp_traverse`
for additional considerations.

The API for defining heap types grew organically, leaving it
somewhat awkward to use in its current state.
The following sections will guide you through common issues.

#### `tp_traverse` in Python 3.8 and lower

The requirement to visit the type from `tp_traverse` was added in Python 3.9.
If you support Python 3.8 and lower, the traverse function must *not*
visit the type, so it must be more complicated:

```
static int my_traverse(PyObject *self, visitproc visit, void *arg)
{
    if (Py_Version >= 0x03090000) {
        Py_VISIT(Py_TYPE(self));
    }
    return 0;
}
```

Unfortunately, `Py_Version` was only added in Python 3.11.
As a replacement, use:

- `PY_VERSION_HEX`, if not using the stable ABI, or
- `sys.version_info` (via `PySys_GetObject` and
`PyArg_ParseTuple`).

#### Delegating `tp_traverse`

If your traverse function delegates to the `tp_traverse`
of its base class (or another type), ensure that `Py_TYPE(self)` is visited
only once.
Note that only heap type are expected to visit the type in `tp_traverse`.

For example, if your traverse function includes:

```
base->tp_traverse(self, visit, arg)
```

It is not necessary to handle the type's reference count in
`tp_new` and `tp_clear`.

#### Defining `tp_dealloc`

If your type has a custom `tp_dealloc` function,
it needs to:

- call `PyObject_GC_UnTrack` before any fields are invalidated, and
- decrement the reference count of the type.

To keep the type valid while `tp_free` is called, the type's refcount needs
to be decremented *after* the instance is deallocated. For example:

```
static void my_dealloc(PyObject *self)
{
    PyObject_GC_UnTrack(self);
    ...
    PyTypeObject *type = Py_TYPE(self);
    type->tp_free(self);
    Py_DECREF(type);
}
```

The default `tp_dealloc` function does this, so
if your type does *not* override
`tp_dealloc` you don't need to add it.

#### Not overriding `tp_free`

The `tp_free` slot of a heap type must be set to
`PyObject_GC_Del`.
This is the default; do not override it.

#### Avoiding `PyObject_New`

GC-tracked objects need to be allocated using GC-aware functions.

If you use `PyObject_New` or `PyObject_NewVar`:

- Get and call type's `tp_alloc` slot, if possible.
That is, replace `TYPE *o = PyObject_New(TYPE, typeobj)` with:

```
TYPE *o = typeobj->tp_alloc(typeobj, 0);
```

Replace `o = PyObject_NewVar(TYPE, typeobj, size)` with the same,
but use size instead of the 0.

- If the above is not possible (e.g. inside a custom `tp_alloc`),
call `PyObject_GC_New` or `PyObject_GC_NewVar`:

```
TYPE *o = PyObject_GC_New(TYPE, typeobj);

TYPE *o = PyObject_GC_NewVar(TYPE, typeobj, size);
```

### Module State Access from Classes

If you have a type object defined with `PyType_FromModuleAndSpec`,
you can call `PyType_GetModule` to get the associated module, and then
`PyModule_GetState` to get the module's state.

To save a some tedious error-handling boilerplate code, you can combine
these two steps with `PyType_GetModuleState`, resulting in:

```
my_struct *state = (my_struct*)PyType_GetModuleState(type);
if (state == NULL) {
    return NULL;
}
```

### Module State Access from Regular Methods

Accessing the module-level state from methods of a class is somewhat more
complicated, but is possible thanks to API introduced in Python 3.9.
To get the state, you need to first get the *defining class*, and then
get the module state from it.

The largest roadblock is getting *the class a method was defined in*, or
that method's "defining class" for short. The defining class can have a
reference to the module it is part of.

Do not confuse the defining class with `Py_TYPE(self)`. If the method
is called on a *subclass* of your type, `Py_TYPE(self)` will refer to
that subclass, which may be defined in different module than yours.

> **Note:** The following Python code can illustrate the concept.
> `Base.get_defining_class` returns `Base` even
> if `type(self) == Sub`:
>
>
> ```python
> class Base:
>     def get_type_of_self(self):
>         return type(self)
>
>     def get_defining_class(self):
>         return __class__
>
> class Sub(Base):
>     pass
> ```
>

For a method to get its "defining class", it must use the
METH_METHOD | METH_FASTCALL | METH_KEYWORDS
`calling convention`
and the corresponding `PyCMethod` signature:

```
PyObject *PyCMethod(
    PyObject *self,               // object the method was called on
    PyTypeObject *defining_class, // defining class
    PyObject *const *args,        // C array of arguments
    Py_ssize_t nargs,             // length of "args"
    PyObject *kwnames)            // NULL, or dict of keyword arguments
```

Once you have the defining class, call `PyType_GetModuleState` to get
the state of its associated module.

For example:

```
static PyObject *
example_method(PyObject *self,
        PyTypeObject *defining_class,
        PyObject *const *args,
        Py_ssize_t nargs,
        PyObject *kwnames)
{
    my_struct *state = (my_struct*)PyType_GetModuleState(defining_class);
    if (state == NULL) {
        return NULL;
    }
    ... // rest of logic
}

PyDoc_STRVAR(example_method_doc, "...");

static PyMethodDef my_methods[] = {
    {"example_method",
      (PyCFunction)(void(*)(void))example_method,
      METH_METHOD|METH_FASTCALL|METH_KEYWORDS,
      example_method_doc}
    {NULL},
}
```

### Module State Access from Slot Methods, Getters and Setters

> **Note:** This is new in Python 3.11.
>

Slot methods—the fast C equivalents for special methods, such as
`nb_add for add__` or
`tp_new` for initialization—have a very simple API that
doesn't allow passing in the defining class, unlike with `PyCMethod`.
The same goes for getters and setters defined with
`PyGetSetDef`.

To access the module state in these cases, use the
`PyType_GetModuleByDef` function, and pass in the module definition.
Once you have the module, call `PyModule_GetState`
to get the state:

```
PyObject *module = PyType_GetModuleByDef(Py_TYPE(self), &module_def);
my_struct *state = (my_struct*)PyModule_GetState(module);
if (state == NULL) {
    return NULL;
}
```

`PyType_GetModuleByDef` works by searching the
method resolution order (i.e. all superclasses) for the first
superclass that has a corresponding module.

> **Note:** In very exotic cases (inheritance chains spanning multiple modules
> created from the same definition), `PyType_GetModuleByDef` might not
> return the module of the true defining class. However, it will always
> return a module with the same definition, ensuring a compatible
> C memory layout.

### Lifetime of the Module State

When a module object is garbage-collected, its module state is freed.
For each pointer to (a part of) the module state, you must hold a reference
to the module object.

Usually this is not an issue, because types created with
`PyType_FromModuleAndSpec`, and their instances, hold a reference
to the module.
However, you must be careful in reference counting when you reference
module state from other places, such as callbacks for external
libraries.

## Open Issues

Several issues around per-module state and heap types are still open.

Discussions about improving the situation are best held on the discuss forum under c-api tag.

### Per-Class Scope

It is currently (as of Python 3.11) not possible to attach state to individual
*types* without relying on CPython implementation details (which may change
in the future—perhaps, ironically, to allow a proper solution for
per-class scope).

### Lossless Conversion to Heap Types

The heap type API was not designed for "lossless" conversion from static types;
that is, creating a type that works exactly like a given static type.
