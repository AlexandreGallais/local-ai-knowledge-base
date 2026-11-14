---
title: "Descriptor Guide (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/descriptor.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Descriptor Guide (part 3 of 4)

## Pure Python Equivalents

The descriptor protocol is simple and offers exciting possibilities.  Several
use cases are so common that they have been prepackaged into built-in tools.
Properties, bound methods, static methods, class methods, and __slots__ are
all based on the descriptor protocol.

### Properties

Calling `property()` is a succinct way of building a data descriptor that
triggers a function call upon access to an attribute.  Its signature is:

```
property(fget=None, fset=None, fdel=None, doc=None) -> property
```

The documentation shows a typical use to define a managed attribute `x`:

```python

class C:
    def getx(self): return self.__x
    def setx(self, value): self.__x = value
    def delx(self): del self.__x
    x = property(getx, setx, delx, "I'm the 'x' property.")
```

```python

>>> C.x.__doc__
"I'm the 'x' property."
>>> c.x = 2.71828
>>> c.x
2.71828
>>> del c.x
>>> c.x
Traceback (most recent call last):
  ...
AttributeError: 'C' object has no attribute '_C__x'
```

To see how `property()` is implemented in terms of the descriptor protocol,
here is a pure Python equivalent that implements most of the core functionality:

```python

class Property:
    "Emulate PyProperty_Type() in Objects/descrobject.c"

    def __init__(self, fget=None, fset=None, fdel=None, doc=None):
        self.fget = fget
        self.fset = fset
        self.fdel = fdel
        if doc is None and fget is not None:
            doc = fget.__doc__
        self.__doc__ = doc

    def __set_name__(self, owner, name):
        self.__name__ = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        if self.fget is None:
            raise AttributeError
        return self.fget(obj)

    def __set__(self, obj, value):
        if self.fset is None:
            raise AttributeError
        self.fset(obj, value)

    def __delete__(self, obj):
        if self.fdel is None:
            raise AttributeError
        self.fdel(obj)

    def getter(self, fget):
        return type(self)(fget, self.fset, self.fdel, self.__doc__)

    def setter(self, fset):
        return type(self)(self.fget, fset, self.fdel, self.__doc__)

    def deleter(self, fdel):
        return type(self)(self.fget, self.fset, fdel, self.__doc__)
```

```python

# Verify the Property() emulation

class CC:
    def getx(self):
        return self.__x
    def setx(self, value):
        self.__x = value
    def delx(self):
        del self.__x
    x = Property(getx, setx, delx, "I'm the 'x' property.")
    no_getter = Property(None, setx, delx, "I'm the 'x' property.")
    no_setter = Property(getx, None, delx, "I'm the 'x' property.")
    no_deleter = Property(getx, setx, None, "I'm the 'x' property.")
    no_doc = Property(getx, setx, delx, None)

# Now do it again but use the decorator style

class CCC:
    @Property
    def x(self):
        return self.__x
    @x.setter
    def x(self, value):
        self.__x = value
    @x.deleter
    def x(self):
        del self.__x
```

```python

>>> cc = CC()
>>> hasattr(cc, 'x')
False
>>> cc.x = 33
>>> cc.x
33
>>> del cc.x
>>> hasattr(cc, 'x')
False

>>> ccc = CCC()
>>> hasattr(ccc, 'x')
False
>>> ccc.x = 333
>>> ccc.x == 333
True
>>> del ccc.x
>>> hasattr(ccc, 'x')
False

>>> cc = CC()
>>> cc.x = 33
>>> try:
...     cc.no_getter
... except AttributeError as e:
...     type(e).__name__
...
'AttributeError'

>>> try:
...     cc.no_setter = 33
... except AttributeError as e:
...     type(e).__name__
...
'AttributeError'

>>> try:
...     del cc.no_deleter
... except AttributeError as e:
...     type(e).__name__
...
'AttributeError'

>>> CC.no_doc.__doc__ is None
True
```

The `property()` builtin helps whenever a user interface has granted
attribute access and then subsequent changes require the intervention of a
method.

For instance, a spreadsheet class may grant access to a cell value through
`Cell('b10').value`. Subsequent improvements to the program require the cell
to be recalculated on every access; however, the programmer does not want to
affect existing client code accessing the attribute directly.  The solution is
to wrap access to the value attribute in a property data descriptor:

```python

class Cell:
    ...

    @property
    def value(self):
        "Recalculate the cell before returning value"
        self.recalc()
        return self._value
```

Either the built-in `property()` or our `Property()` equivalent would
work in this example.

### Functions and methods

Python's object oriented features are built upon a function based environment.
Using non-data descriptors, the two are merged seamlessly.

Functions stored in class dictionaries get turned into methods when invoked.
Methods only differ from regular functions in that the object instance is
prepended to the other arguments.  By convention, the instance is called
*self* but could be called *this* or any other variable name.

Methods can be created manually with `types.MethodType` which is
roughly equivalent to:

```python

class MethodType:
    "Emulate PyMethod_Type in Objects/classobject.c"

    def __init__(self, func, obj):
        self.__func__ = func
        self.__self__ = obj

    def __call__(self, *args, **kwargs):
        func = self.__func__
        obj = self.__self__
        return func(obj, *args, **kwargs)

    def __getattribute__(self, name):
        "Emulate method_getset() in Objects/classobject.c"
        if name == '__doc__':
            return self.__func__.__doc__
        return object.__getattribute__(self, name)

    def __getattr__(self, name):
        "Emulate method_getattro() in Objects/classobject.c"
        return getattr(self.__func__, name)

    def __get__(self, obj, objtype=None):
        "Emulate method_descr_get() in Objects/classobject.c"
        return self
```

To support automatic creation of methods, functions include the
`__get__()` method for binding methods during attribute access.  This
means that functions are non-data descriptors that return bound methods
during dotted lookup from an instance.  Here's how it works:

```python

class Function:
    ...

    def __get__(self, obj, objtype=None):
        "Simulate func_descr_get() in Objects/funcobject.c"
        if obj is None:
            return self
        return MethodType(self, obj)
```

Running the following class in the interpreter shows how the function
descriptor works in practice:

```python

class D:
    def f(self):
         return self

class D2:
    pass
```

```python

>>> d = D()
>>> d2 = D2()
>>> d2.f = d.f.__get__(d2, D2)
>>> d2.f() is d
True
```

The function has a qualified name attribute to support introspection:

```python

>>> D.f.__qualname__
'D.f'
```

Accessing the function through the class dictionary does not invoke
`__get__()`.  Instead, it just returns the underlying function object:

```
>>> D.__dict__['f']
<function D.f at 0x00C45070>
```

Dotted access from a class calls `__get__()` which just returns the
underlying function unchanged:

```
>>> D.f
<function D.f at 0x00C45070>
```

The interesting behavior occurs during dotted access from an instance.  The
dotted lookup calls `__get__()` which returns a bound method object:

```
>>> d = D()
>>> d.f
<bound method D.f of <__main__.D object at 0x00B18C90>>
```

Internally, the bound method stores the underlying function and the bound
instance:

```
>>> d.f.__func__
<function D.f at 0x00C45070>

>>> d.f.__self__
<__main__.D object at 0x00B18C90>
```

If you have ever wondered where *self* comes from in regular methods or where
*cls* comes from in class methods, this is it!

### Kinds of methods

Non-data descriptors provide a simple mechanism for variations on the usual
patterns of binding functions into methods.

To recap, functions have a `__get__()` method so that they can be converted
to a method when accessed as attributes.  The non-data descriptor transforms an
`obj.f(*args)` call into `f(obj, *args)`.  Calling `cls.f(*args)`
becomes `f(*args)`.

This chart summarizes the binding and its two most useful variants:

```text
      +-----------------+----------------------+------------------+
      | Transformation  | Called from an       | Called from a    |
      |                 | object               | class            |
      +=================+======================+==================+
      | function        | f(obj, \*args)       | f(\*args)        |
      +-----------------+----------------------+------------------+
      | staticmethod    | f(\*args)            | f(\*args)        |
      +-----------------+----------------------+------------------+
      | classmethod     | f(type(obj), \*args) | f(cls, \*args)   |
      +-----------------+----------------------+------------------+
```

### Static methods

Static methods return the underlying function without changes.  Calling either
`c.f` or `C.f` is the equivalent of a direct lookup into
`object.__getattribute__(c, "f")` or `object.__getattribute__(C, "f")`. As a
result, the function becomes identically accessible from either an object or a
class.

Good candidates for static methods are methods that do not reference the
`self` variable.

For instance, a statistics package may include a container class for
experimental data.  The class provides normal methods for computing the average,
mean, median, and other descriptive statistics that depend on the data. However,
there may be useful functions which are conceptually related but do not depend
on the data.  For instance, `erf(x)` is handy conversion routine that comes up
in statistical work but does not directly depend on a particular dataset.
It can be called either from an object or the class:  `s.erf(1.5) --> 0.9332`
or `Sample.erf(1.5) --> 0.9332`.

Since static methods return the underlying function with no changes, the
example calls are unexciting:

```python

class E:
    @staticmethod
    def f(x):
        return x * 10
```

```python

>>> E.f(3)
30
>>> E().f(3)
30
```

Using the non-data descriptor protocol, a pure Python version of
staticmethod would look like this:

```python

import functools

class StaticMethod:
    "Emulate PyStaticMethod_Type() in Objects/funcobject.c"

    def __init__(self, f):
        self.f = f
        functools.update_wrapper(self, f)

    def __get__(self, obj, objtype=None):
        return self.f

    def __call__(self, *args, **kwds):
        return self.f(*args, **kwds)

    @property
    def __annotations__(self):
        return self.f.__annotations__
```

The `functools.update_wrapper()` call adds a `__wrapped__` attribute
that refers to the underlying function.  Also it carries forward
the attributes necessary to make the wrapper look like the wrapped
function, including `__name__, qualname__`,
and `__doc__`.

```python

class E_sim:
    @StaticMethod
    def f(x: int) -> str:
        "Simple function example"
        return "!" * x

wrapped_ord = StaticMethod(ord)
```

```python

>>> E_sim.f(3)
'!!!'
>>> E_sim().f(3)
'!!!'

>>> sm = vars(E_sim)['f']
>>> type(sm).__name__
'StaticMethod'
>>> f = E_sim.f
>>> type(f).__name__
'function'
>>> sm.__name__
'f'
>>> f.__name__
'f'
>>> sm.__qualname__
'E_sim.f'
>>> f.__qualname__
'E_sim.f'
>>> sm.__doc__
'Simple function example'
>>> f.__doc__
'Simple function example'
>>> sm.__annotations__
{'x': <class 'int'>, 'return': <class 'str'>}
>>> f.__annotations__
{'x': <class 'int'>, 'return': <class 'str'>}
>>> sm.__module__ == f.__module__
True
>>> sm(3)
'!!!'
>>> f(3)
'!!!'

>>> wrapped_ord('A')
65
>>> wrapped_ord.__module__ == ord.__module__
True
>>> wrapped_ord.__wrapped__ == ord
True
>>> wrapped_ord.__name__ == ord.__name__
True
>>> wrapped_ord.__qualname__ == ord.__qualname__
True
>>> wrapped_ord.__doc__ == ord.__doc__
True
```

### Class methods

Unlike static methods, class methods prepend the class reference to the
argument list before calling the function.  This format is the same
for whether the caller is an object or a class:

```python

class F:
    @classmethod
    def f(cls, x):
        return cls.__name__, x
```

```python

>>> F.f(3)
('F', 3)
>>> F().f(3)
('F', 3)
```

This behavior is useful whenever the method only needs to have a class
reference and does not rely on data stored in a specific instance.  One use for
class methods is to create alternate class constructors.  For example, the
classmethod `dict.fromkeys()` creates a new dictionary from a list of
keys.  The pure Python equivalent is:

```python

class Dict(dict):
    @classmethod
    def fromkeys(cls, iterable, value=None):
        "Emulate dict_fromkeys() in Objects/dictobject.c"
        d = cls()
        for key in iterable:
            d[key] = value
        return d
```

Now a new dictionary of unique keys can be constructed like this:

```python

>>> d = Dict.fromkeys('abracadabra')
>>> type(d) is Dict
True
>>> d
{'a': None, 'b': None, 'r': None, 'c': None, 'd': None}
```

Using the non-data descriptor protocol, a pure Python version of
classmethod would look like this:

```python

import functools

class ClassMethod:
    "Emulate PyClassMethod_Type() in Objects/funcobject.c"

    def __init__(self, f):
        self.f = f
        functools.update_wrapper(self, f)

    def __get__(self, obj, cls=None):
        if cls is None:
            cls = type(obj)
        return MethodType(self.f, cls)
```

```python

# Verify the emulation works
class T:
    @ClassMethod
    def cm(cls, x: int, y: str) -> tuple[str, int, str]:
        "Class method that returns a tuple"
        return (cls.__name__, x, y)
```

```python

>>> T.cm(11, 22)
('T', 11, 22)

# Also call it from an instance
>>> t = T()
>>> t.cm(11, 22)
('T', 11, 22)

# Verify that T uses our emulation
>>> type(vars(T)['cm']).__name__
'ClassMethod'

# Verify that update_wrapper() correctly copied attributes
>>> T.cm.__name__
'cm'
>>> T.cm.__qualname__
'T.cm'
>>> T.cm.__doc__
'Class method that returns a tuple'
>>> T.cm.__annotations__
{'x': <class 'int'>, 'y': <class 'str'>, 'return': tuple[str, int, str]}

# Verify that __wrapped__ was added and works correctly
>>> f = vars(T)['cm'].__wrapped__
>>> type(f).__name__
'function'
>>> f.__name__
'cm'
>>> f(T, 11, 22)
('T', 11, 22)
```

The `functools.update_wrapper()` call in `ClassMethod` adds a
`__wrapped__` attribute that refers to the underlying function.  Also
it carries forward the attributes necessary to make the wrapper look
like the wrapped function: `__name__`,
`__qualname__, doc__`,
and `__annotations__`.
