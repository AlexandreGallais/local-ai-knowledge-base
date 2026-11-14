---
title: "Programming FAQ (part 2 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/programming.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Programming FAQ (part 2 of 7)

## Core language

### Why am I getting an UnboundLocalError when the variable has a value?

It can be a surprise to get the `UnboundLocalError` in previously working
code when it is modified by adding an assignment statement somewhere in
the body of a function.

This code:

```python
>>> x = 10
>>> def bar():
...     print(x)
...
>>> bar()
10
```

works, but this code:

```python
>>> x = 10
>>> def foo():
...     print(x)
...     x += 1
```

results in an `UnboundLocalError`:

```python
>>> foo()
Traceback (most recent call last):
```

UnboundLocalError: cannot access local variable 'x' where it is not associated with a value

This is because when you make an assignment to a variable in a scope, that
variable becomes local to that scope and shadows any similarly named variable
in the outer scope.  Since the last statement in foo assigns a new value to
`x`, the compiler recognizes it as a local variable.  Consequently when the
earlier `print(x)` attempts to print the uninitialized local variable and
an error results.

In the example above you can access the outer scope variable by declaring it
global:

```python
>>> x = 10
>>> def foobar():
...     global x
...     print(x)
...     x += 1
...
>>> foobar()
10
```

This explicit declaration is required in order to remind you that (unlike the
superficially analogous situation with class and instance variables) you are
actually modifying the value of the variable in the outer scope:

```python
>>> print(x)
11
```

You can do a similar thing in a nested scope using the `nonlocal`
keyword:

```python
>>> def foo():
...    x = 10
...    def bar():
...        nonlocal x
...        print(x)
...        x += 1
...    bar()
...    print(x)
...
>>> foo()
10
11
```

### What are the rules for local and global variables in Python?

In Python, variables that are only referenced inside a function are implicitly
global.  If a variable is assigned a value anywhere within the function's body,
it's assumed to be a local unless explicitly declared as global.

Though a bit surprising at first, a moment's consideration explains this.  On
one hand, requiring `global` for assigned variables provides a bar
against unintended side-effects.  On the other hand, if `global` was required
for all global references, you'd be using `global` all the time.  You'd have
to declare as global every reference to a built-in function or to a component of
an imported module.  This clutter would defeat the usefulness of the `global`
declaration for identifying side-effects.

### Why do lambdas defined in a loop with different values all return the same result?

Assume you use a for loop to define a few different lambdas (or even plain
functions), for example:

```
>>> squares = []
>>> for x in range(5):
...     squares.append(lambda: x**2)
```

This gives you a list that contains 5 lambdas that calculate `x**2`.  You
might expect that, when called, they would return, respectively, `0`, `1`,
`4`, `9`, and `16`.  However, when you actually try you will see that
they all return `16`:

```
>>> squares[2]()
16
>>> squares[4]()
16
```

This happens because `x` is not local to the lambdas, but is defined in
the outer scope, and it is accessed when the lambda is called --- not when it
is defined.  At the end of the loop, the value of `x` is `4`, so all the
functions now return `4**2`, that is `16`.  You can also verify this by
changing the value of `x` and see how the results of the lambdas change:

```
>>> x = 8
>>> squares[2]()
64
```

In order to avoid this, you need to save the values in variables local to the
lambdas, so that they don't rely on the value of the global `x`:

```
>>> squares = []
>>> for x in range(5):
...     squares.append(lambda n=x: n**2)
```

Here, `n=x` creates a new variable `n` local to the lambda and computed
when the lambda is defined so that it has the same value that `x` had at
that point in the loop.  This means that the value of `n` will be `0`
in the first lambda, `1` in the second, `2` in the third, and so on.
Therefore each lambda will now return the correct result:

```
>>> squares[2]()
4
>>> squares[4]()
16
```

Note that this behaviour is not peculiar to lambdas, but applies to regular
functions too.

### How do I share global variables across modules?

The canonical way to share information across modules within a single program is
to create a special module (often called config or cfg).  Just import the config
module in all modules of your application; the module then becomes available as
a global name.  Because there is only one instance of each module, any changes
made to the module object get reflected everywhere.  For example:

config.py:

```
x = 0   # Default value of the 'x' configuration setting
```

mod.py:

```
import config
config.x = 1
```

main.py:

```
import config
import mod
print(config.x)
```

Note that using a module is also the basis for implementing the singleton design
pattern, for the same reason.

### What are the "best practices" for using import in a module?

In general, don't use `from modulename import *`.  Doing so clutters the
importer's namespace, and makes it much harder for linters to detect undefined
names.

Import modules at the top of a file.  Doing so makes it clear what other modules
your code requires and avoids questions of whether the module name is in scope.
Using one import per line makes it easy to add and delete module imports, but
using multiple imports per line uses less screen space.

It's good practice if you import modules in the following order:

1. standard library modules -- such as `sys`, `os`, `argparse`, `re`
1. third-party library modules (anything installed in Python's site-packages
directory) -- such as dateutil, requests, tzdata
1. locally developed modules

It is sometimes necessary to move imports to a function or class to avoid
problems with circular imports.  Gordon McMillan says:

Circular imports are fine where both modules use the "import <module>" form
of import.  They fail when the 2nd module wants to grab a name out of the
first ("from module import name") and the import is at the top level.  That's
because names in the 1st are not yet available, because the first module is
busy importing the 2nd.

In this case, if the second module is only used in one function, then the import
can easily be moved into that function.  By the time the import is called, the
first module will have finished initializing, and the second module can do its
import.

It may also be necessary to move imports out of the top level of code if some of
the modules are platform-specific.  In that case, it may not even be possible to
import all of the modules at the top of the file.  In this case, importing the
correct modules in the corresponding platform-specific code is a good option.

Only move imports into a local scope, such as inside a function definition, if
it's necessary to solve a problem such as avoiding a circular import or are
trying to reduce the initialization time of a module.  This technique is
especially helpful if many of the imports are unnecessary depending on how the
program executes.  You may also want to move imports into a function if the
modules are only ever used in that function.  Note that loading a module the
first time may be expensive because of the one time initialization of the
module, but loading a module multiple times is virtually free, costing only a
couple of dictionary lookups.  Even if the module name has gone out of scope,
the module is probably available in `sys.modules`.

### Why are default values shared between objects?

This type of bug commonly bites neophyte programmers.  Consider this function:

```
def foo(mydict={}):  # Danger: shared reference to one dict for all calls
    ... compute something ...
    mydict[key] = value
    return mydict
```

The first time you call this function, `mydict` contains a single item.  The
second time, `mydict` contains two items because when `foo()` begins
executing, `mydict` starts out with an item already in it.

It is often expected that a function call creates new objects for default
values. This is not what happens. Default values are created exactly once, when
the function is defined.  If that object is changed, like the dictionary in this
example, subsequent calls to the function will refer to this changed object.

By definition, immutable objects such as numbers, strings, tuples, and `None`,
are safe from change. Changes to mutable objects such as dictionaries, lists,
and class instances can lead to confusion.

Because of this feature, it is good programming practice to not use mutable
objects as default values.  Instead, use `None` as the default value and
inside the function, check if the parameter is `None` and create a new
list/dictionary/whatever if it is.  For example, don't write:

```
def foo(mydict={}):
    ...
```

but:

```
def foo(mydict=None):
    if mydict is None:
        mydict = {}  # create a new dict for local namespace
```

This feature can be useful.  When you have a function that's time-consuming to
compute, a common technique is to cache the parameters and the resulting value
of each call to the function, and return the cached value if the same value is
requested again.  This is called "memoizing", and can be implemented like this:

```
# Callers can only provide two parameters and optionally pass <example-value> by keyword
def expensive(arg1, arg2, *, _cache={}):
    if (arg1, arg2) in _cache:
        return _cache[(arg1, arg2)]

    # Calculate the value
    result = ... expensive computation ...
    _cache[(arg1, arg2)] = result           # Store result in the cache
    return result
```

You could use a global variable containing a dictionary instead of the default
value; it's a matter of taste.

### How can I pass <example-value> or keyword parameters from one function to another?

Collect the arguments using the `*` and `**` specifiers in the function's
parameter list; this gives you the positional arguments as a tuple and the
keyword arguments as a dictionary.  You can then pass these arguments when
calling another function by using `*` and `**`:

```
def f(x, *args, **kwargs):
    ...
    kwargs['width'] = '14.3c'
    ...
    g(x, *args, **kwargs)
```

### What is the difference between arguments and parameters?

Parameters are defined by the names that appear in a
function definition, whereas arguments are the values
actually passed to a function when calling it.  Parameters define what
kind of arguments a function can accept.  For
example, given the function definition:

```
def func(foo, bar=None, **kwargs):
    pass
```

*foo*, *bar* and *kwargs* are parameters of `func`.  However, when calling
`func`, for example:

```
func(42, bar=314, extra=somevar)
```

the values `42`, `314`, and `somevar` are arguments.

### Why did changing list 'y' also change list 'x'?

If you wrote code like:

```
>>> x = []
>>> y = x
>>> y.append(10)
>>> y
[10]
>>> x
[10]
```

you might be wondering why appending an element to `y` changed `x` too.

There are two factors that produce this result:

1) Variables are simply names that refer to objects.  Doing `y = x` doesn't
create a copy of the list -- it creates a new variable `y` that refers to
the same object `x` refers to.  This means that there is only one object
(the list), and both `x` and `y` refer to it.
2) Lists are mutable, which means that you can change their content.

After the call to `append()`, the content of the mutable object has
changed from `[]` to `[10]`.  Since both the variables refer to the same
object, using either name accesses the modified value `[10]`.

If we instead assign an immutable object to `x`:

```
>>> x = 5  # ints are immutable
>>> y = x
>>> x = x + 1  # 5 can't be mutated, we are creating a new object here
>>> x
6
>>> y
5
```

we can see that in this case `x` and `y` are not equal anymore.  This is
because integers are immutable, and when we do `x = x + 1` we are not
mutating the int `5` by incrementing its value; instead, we are creating a
new object (the int `6`) and assigning it to `x` (that is, changing which
object `x` refers to).  After this assignment we have two objects (the ints
`6` and `5`) and two variables that refer to them (`x` now refers to
`6` but `y` still refers to `5`).

Some operations (for example `y.append(10)` and `y.sort()`) mutate the
object, whereas superficially similar operations (for example `y = y + [10]`
and `sorted(y)`) create a new object.  In general in Python (and in all cases
in the standard library) a method that mutates an object will return `None`
to help avoid getting the two types of operations confused.  So if you
mistakenly write `y.sort()` thinking it will give you a sorted copy of `y`,
you'll instead end up with `None`, which will likely cause your program to
generate an easily diagnosed error.

However, there is one class of operations where the same operation sometimes
has different behaviors with different types:  the augmented assignment
operators.  For example, `+=` mutates lists but not tuples or ints (``a_list
+= [1, 2, 3]` is equivalent to `a_list.extend([1, 2, 3])`` and mutates
`a_list`, whereas `some_tuple += (1, 2, 3)` and `some_int += 1` create
new objects).

In other words:

- If we have a mutable object (such as `list`, `dict`, `set`),
we can use some specific operations to mutate it and all the variables
that refer to it will see the change.
- If we have an immutable object (such as `str`, `int`, `tuple`),
all the variables that refer to it will always see the same value,
but operations that transform that value into a new value always return a new
object.

If you want to know if two variables refer to the same object or not, you can
use the `is` operator, or the built-in function `id()`.
