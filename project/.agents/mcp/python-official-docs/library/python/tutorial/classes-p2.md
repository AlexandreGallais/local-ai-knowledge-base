---
title: "Classes (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/tutorial/classes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Classes (part 2 of 3)

## A First Look at Classes

Classes introduce a little bit of new syntax, three new object types, and some
new semantics.

### Class Definition Syntax

The simplest form of class definition looks like this:

```
class ClassName:
    <statement-1>
    .
    .
    .
    <statement-N>
```

Class definitions, like function definitions (`def` statements) must be
executed before they have any effect.  (You could conceivably place a class
definition in a branch of an `if` statement, or inside a function.)

In practice, the statements inside a class definition will usually be function
definitions, but other statements are allowed, and sometimes useful --- we'll
come back to this later.  The function definitions inside a class normally have
a peculiar form of argument list, dictated by the calling conventions for
methods --- again, this is explained later.

When a class definition is entered, a new namespace is created, and used as the
local scope --- thus, all assignments to local variables go into this new
namespace.  In particular, function definitions bind the name of the new
function here.

When a class definition is left normally (via the end), a *class object* is
created.  This is basically a wrapper around the contents of the namespace
created by the class definition; we'll learn more about class objects in the
next section.  The original local scope (the one in effect just before the class
definition was entered) is reinstated, and the class object is bound here to the
class name given in the class definition header (`ClassName` in the
example).

### Class Objects

Class objects support two kinds of operations: attribute references and
instantiation.

*Attribute references* use the standard syntax used for all attribute references
in Python: `obj.name`.  Valid attribute names are all the names that were in
the class's namespace when the class object was created.  So, if the class
definition looked like this:

```
class MyClass:
    """A simple example class"""
    i = 12345

    def f(self):
        return 'hello world'
```

then `MyClass.i` and `MyClass.f` are valid attribute references, returning
an integer and a function object, respectively. Class attributes can also be
assigned to, so you can change the value of `MyClass.i` by assignment.
`__doc__` is also a valid attribute, returning the docstring
belonging to the class: `"A simple example class"`.

Class *instantiation* uses function notation.  Just pretend that the class
object is a parameterless function that returns a new instance of the class.
For example (assuming the above class):

```
x = MyClass()
```

creates a new *instance* of the class and assigns this object to the local
variable `x`.

The instantiation operation ("calling" a class object) creates an empty object.
Many classes like to create objects with instances customized to a specific
initial state. Therefore a class may define a special method named
`__init__()`, like this:

```
def __init__(self):
    self.data = []
```

When a class defines an `__init__()` method, class instantiation
automatically invokes `__init__()` for the newly created class instance.  So
in this example, a new, initialized instance can be obtained by:

```
x = MyClass()
```

Of course, the `__init__()` method may have arguments for greater
flexibility.  In that case, arguments given to the class instantiation operator
are passed on to `__init__()`.  For example,:

```
>>> class Complex:
...     def __init__(self, realpart, imagpart):
...         self.r = realpart
...         self.i = imagpart
...
>>> x = Complex(3.0, -4.5)
>>> x.r, x.i
(3.0, -4.5)
```

### Instance Objects

Now what can we do with instance objects?  The only operations understood by
instance objects are attribute references.  There are two kinds of valid
attribute names: data attributes and methods.

*Data attributes* correspond to "instance variables" in Smalltalk, and to "data
members" in C++.  Data attributes need not be declared; like local variables,
they spring into existence when they are first assigned to.  For example, if
`x` is the instance of `MyClass` created above, the following piece of
code will print the value `16`, without leaving a trace:

```
x.counter = 1
while x.counter < 10:
    x.counter = x.counter * 2
print(x.counter)
del x.counter
```

The other kind of instance attribute reference is a *method*. A method is a
function that "belongs to" an object.

Valid method names of an instance object depend on its class.  By definition,
all attributes of a class that are function  objects define corresponding
methods of its instances.  So in our example, `x.f` is a valid method
reference, since `MyClass.f` is a function, but `x.i` is not, since
`MyClass.i` is not.  But `x.f` is not the same thing as `MyClass.f` --- it
is a *method object*, not a function object.

### Method Objects

Usually, a method is called right after it is bound:

```
x.f()
```

If `x = MyClass()`, as above, this will return the string `'hello world'`.
However, it is not necessary to call a method right away: `x.f` is a method
object, and can be stored away and called at a later time.  For example:

```
xf = x.f
while True:
    print(xf())
```

will continue to print `hello world` until the end of time.

What exactly happens when a method is called?  You may have noticed that
`x.f()` was called without an argument above, even though the function
definition for `f()` specified an argument.  What happened to the argument?
Surely Python raises an exception when a function that requires an argument is
called without any --- even if the argument isn't actually used...

Actually, you may have guessed the answer: the special thing about methods is
that the instance object is passed as the first argument of the function.  In our
example, the call `x.f()` is exactly equivalent to `MyClass.f(x)`.  In
general, calling a method with a list of *n* arguments is equivalent to calling
the corresponding function with an argument list that is created by inserting
the method's instance object before the first argument.

In general, methods work as follows.  When a non-data attribute
of an instance is referenced, the instance's class is searched.
If the name denotes a valid class attribute that is a function object,
references to both the instance object and the function object
are packed into a method object.  When the method object is called
with an argument list, a new argument list is constructed from the instance
object and the argument list, and the function object is called with this new
argument list.

### Class and Instance Variables

Generally speaking, instance variables are for data unique to each instance
and class variables are for attributes and methods shared by all instances
of the class:

```
class Dog:

    kind = 'canine'         # class variable shared by all instances

    def __init__(self, name):
        self.name = name    # instance variable unique to each instance

>>> d = Dog('Fido')
>>> e = Dog('Buddy')
>>> d.kind                  # shared by all dogs
'canine'
>>> e.kind                  # shared by all dogs
'canine'
>>> d.name                  # unique to d
'Fido'
>>> e.name                  # unique to e
'Buddy'
```

As discussed in tut-object, shared data can have possibly surprising
effects involving mutable objects such as lists and dictionaries.
For example, the *tricks* list in the following code should not be used as a
class variable because just a single list would be shared by all *Dog*
instances:

```
class Dog:

    tricks = []             # mistaken use of a class variable

    def __init__(self, name):
        self.name = name

    def add_trick(self, trick):
        self.tricks.append(trick)

>>> d = Dog('Fido')
>>> e = Dog('Buddy')
>>> d.add_trick('roll over')
>>> e.add_trick('play dead')
>>> d.tricks                # unexpectedly shared by all dogs
['roll over', 'play dead']
```

Correct design of the class should use an instance variable instead:

```
class Dog:

    def __init__(self, name):
        self.name = name
        self.tricks = []    # creates a new empty list for each dog

    def add_trick(self, trick):
        self.tricks.append(trick)

>>> d = Dog('Fido')
>>> e = Dog('Buddy')
>>> d.add_trick('roll over')
>>> e.add_trick('play dead')
>>> d.tricks
['roll over']
>>> e.tricks
['play dead']
```

## Random Remarks

If the same attribute name occurs in both an instance and in a class,
then attribute lookup prioritizes the instance:

```
>>> class Warehouse:
...    purpose = 'storage'
...    region = 'west'
...
>>> w1 = Warehouse()
>>> print(w1.purpose, w1.region)
storage west
>>> w2 = Warehouse()
>>> w2.region = 'east'
>>> print(w2.purpose, w2.region)
storage east
```

Data attributes may be referenced by methods as well as by ordinary users
("clients") of an object.  In other words, classes are not usable to implement
pure abstract data types.  In fact, nothing in Python makes it possible to
enforce data hiding --- it is all based upon convention.  (On the other hand,
the Python implementation, written in C, can completely hide implementation
details and control access to an object if necessary; this can be used by
extensions to Python written in C.)

Clients should use data attributes with care --- clients may mess up invariants
maintained by the methods by stamping on their data attributes.  Note that
clients may add data attributes of their own to an instance object without
affecting the validity of the methods, as long as name conflicts are avoided ---
again, a naming convention can save a lot of headaches here.

There is no shorthand for referencing data attributes (or other methods!) from
within methods.  I find that this actually increases the readability of methods:
there is no chance of confusing local variables and instance variables when
glancing through a method.

Often, the first argument of a method is called `self`.  This is nothing more
than a convention: the name `self` has absolutely no special meaning to
Python.  Note, however, that by not following the convention your code may be
less readable to other Python programmers, and it is also conceivable that a
*class browser* program might be written that relies upon such a convention.

Any function object that is a class attribute defines a method for instances of
that class.  It is not necessary that the function definition is textually
enclosed in the class definition: assigning a function object to a local
variable in the class is also ok.  For example:

```
# Function defined outside the class
def f1(self, x, y):
    return min(x, x+y)

class C:
    f = f1

    def g(self):
        return 'hello world'

    h = g
```

Now `f`, `g` and `h` are all attributes of class `C` that refer to
function objects, and consequently they are all methods of instances of
`C` --- `h` being exactly equivalent to `g`.  Note that this practice
usually only serves to confuse the reader of a program.

Methods may call other methods by using method attributes of the `self`
argument:

```
class Bag:
    def __init__(self):
        self.data = []

    def add(self, x):
        self.data.append(x)

    def addtwice(self, x):
        self.add(x)
        self.add(x)
```

Methods may reference global names in the same way as ordinary functions.  The
global scope associated with a method is the module containing its
definition.  (A class is never used as a global scope.)  While one
rarely encounters a good reason for using global data in a method, there are
many legitimate uses of the global scope: for one thing, functions and modules
imported into the global scope can be used by methods, as well as functions and
classes defined in it.  Usually, the class containing the method is itself
defined in this global scope, and in the next section we'll find some good
reasons why a method would want to reference its own class.

Each value is an object, and therefore has a *class* (also called its *type*).
It is stored as `object.__class__`.
