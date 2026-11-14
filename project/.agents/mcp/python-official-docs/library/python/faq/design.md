---
title: "Design and History FAQ (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/design.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Design and History FAQ

html

## Why does Python use indentation for grouping of statements?

Guido van Rossum believes that using indentation for grouping is extremely
elegant and contributes a lot to the clarity of the average Python program.
Most people learn to love this feature after a while.

Since there are no begin/end brackets there cannot be a disagreement between
grouping perceived by the parser and the human reader.  Occasionally C
programmers will encounter a fragment of code like this:

```
if (x <= y)
        x++;
        y--;
z++;
```

Only the `x++` statement is executed if the condition is true, but the
indentation leads many to believe otherwise.  Even experienced C programmers will
sometimes stare at it a long time wondering as to why `y` is being decremented even
for `x > y`.

Because there are no begin/end brackets, Python is much less prone to
coding-style conflicts.  In C there are many different ways to place the braces.
After becoming used to reading and writing code using a particular style,
it is normal to feel somewhat uneasy when reading (or being required to write)
in a different one.

Many coding styles place begin/end brackets on a line by themselves.  This makes
programs considerably longer and wastes valuable screen space, making it harder
to get a good overview of a program.  Ideally, a function should fit on one
screen (say, 20--30 lines).  20 lines of Python can do a lot more work than 20
lines of C.  This is not solely due to the lack of begin/end brackets -- the
lack of declarations and the high-level data types are also responsible -- but
the indentation-based syntax certainly helps.

## Why am I getting strange results with simple arithmetic operations?

See the next question.

## Why are floating-point calculations so inaccurate?

Users are often surprised by results like this:

```
>>> 1.2 - 1.0
0.19999999999999996
```

and think it is a bug in Python.  It's not.  This has little to do with Python,
and much more to do with how the underlying platform handles floating-point
numbers.

The `float` type in CPython uses a C `double` for storage.  A
`float` object's value is stored in binary floating-point with a fixed
precision (typically 53 bits) and Python uses C operations, which in turn rely
on the hardware implementation in the processor, to perform floating-point
operations. This means that as far as floating-point operations are concerned,
Python behaves like many popular languages including C and Java.

Many numbers that can be written easily in decimal notation cannot be expressed
exactly in binary floating point.  For example, after:

```
>>> x = 1.2
```

the value stored for `x` is a (very good) approximation to the decimal value
`1.2`, but is not exactly equal to it.  On a typical machine, the actual
stored value is:

```
1.0011001100110011001100110011001100110011001100110011 (binary)
```

which is exactly:

```
1.1999999999999999555910790149937383830547332763671875 (decimal)
```

The typical precision of 53 bits provides Python floats with 15--16
decimal digits of accuracy.

For a fuller explanation, please see the :ref:`floating-point arithmetic
<tut-fp-issues>` chapter in the Python tutorial.

## Why are Python strings immutable?

There are several advantages.

One is performance: knowing that a string is immutable means we can allocate
space for it at creation time, and the storage requirements are fixed and
unchanging.  This is also one of the reasons for the distinction between tuples
and lists.

Another advantage is that strings in Python are considered as "elemental" as
numbers.  No amount of activity will change the value 8 to anything else, and in
Python, no amount of activity will change the string "eight" to anything else.

## Why must 'self' be used explicitly in method definitions and calls?

The idea was borrowed from Modula-3.  It turns out to be very useful, for a
variety of reasons.

First, it's more obvious that you are using a method or instance attribute
instead of a local variable.  Reading `self.x` or `self.meth()` makes it
absolutely clear that an instance variable or method is used even if you don't
know the class definition by heart.  In C++, you can sort of tell by the lack of
a local variable declaration (assuming globals are rare or easily recognizable)
-- but in Python, there are no local variable declarations, so you'd have to
look up the class definition to be sure.  Some C++ and Java coding standards
call for instance attributes to have an `m_` prefix, so this explicitness is
still useful in those languages, too.

Second, it means that no special syntax is necessary if you want to explicitly
reference or call the method from a particular class.  In C++, if you want to
use a method from a base class which is overridden in a derived class, you have
to use the `::` operator -- in Python you can write
`baseclass.methodname(self, <argument list>)`.  This is particularly useful
for `__init__()` methods, and in general in cases where a derived class
method wants to extend the base class method of the same name and thus has to
call the base class method somehow.

Finally, for instance variables it solves a syntactic problem with assignment:
since local variables in Python are (by definition!) those variables to which a
value is assigned in a function body (and that aren't explicitly declared
global), there has to be some way to tell the interpreter that an assignment was
meant to assign to an instance variable instead of to a local variable, and it
should preferably be syntactic (for efficiency reasons).  C++ does this through
declarations, but Python doesn't have declarations and it would be a pity having
to introduce them just for this purpose.  Using the explicit `self.var` solves
this nicely.  Similarly, for using instance variables, having to write
`self.var` means that references to unqualified names inside a method don't
have to search the instance's directories.  To put it another way, local
variables and instance variables live in two different namespaces, and you need
to tell Python which namespace to use.

## Why can't I use an assignment in an expression?

Starting in Python 3.8, you can!

Assignment expressions using the walrus operator `:=` assign a variable in an
expression:

```
while chunk := fp.read(200):
   print(chunk)
```

See PEP 572 for more information.

## Why does Python use methods for some functionality (e.g. list.index()) but functions for other (e.g. len(list))?

As Guido said:

(a) For some operations, prefix notation just reads better than
postfix -- prefix (and infix!) operations have a long tradition in
mathematics which likes notations where the visuals help the
mathematician thinking about a problem. Compare the easy with which we
rewrite a formula like x*(a+b) into x*a + x*b to the clumsiness of
doing the same thing using a raw OO notation.

(b) When I read code that says len(x) I *know* that it is asking for
the length of something. This tells me two things: the result is an
integer, and the argument is some kind of container. To the contrary,
when I read x.len(), I have to already know that x is some kind of
container implementing an interface or inheriting from a class that
has a standard len(). Witness the confusion we occasionally have when
a class that is not implementing a mapping has a get() or keys()
method, or something that isn't a file has a write() method.

-- https://mail.python.org/pipermail/python-3000/2006-November/004643.html

## Why is join() a string method instead of a list or tuple method?

Strings became much more like other standard types starting in Python 1.6, when
methods were added which give the same functionality that has always been
available using the functions of the string module.  Most of these new methods
have been widely accepted, but the one which appears to make some programmers
feel uncomfortable is:

```
", ".join(['1', '2', '4', '8', '16'])
```

which gives the result:

```
"1, 2, 4, 8, 16"
```

There are two common arguments against this usage.

The first runs along the lines of: "It looks really ugly using a method of a
string literal (string constant)", to which the answer is that it might, but a
string literal is just a fixed value. If the methods are to be allowed on names
bound to strings there is no logical reason to make them unavailable on
literals.

The second objection is typically cast as: "I am really telling a sequence to
join its members together with a string constant".  Sadly, you aren't.  For some
reason there seems to be much less difficulty with having `split()` as
a string method, since in that case it is easy to see that:

```
"1, 2, 4, 8, 16".split(", ")
```

is an instruction to a string literal to return the substrings delimited by the
given separator (or, by default, arbitrary runs of white space).

`join()` is a string method because in using it you are telling the
separator string to iterate over a sequence of strings and insert itself between
adjacent elements.  This method can be used with any argument which obeys the
rules for sequence objects, including any new classes you might define yourself.
Similar methods exist for bytes and bytearray objects.

## How fast are exceptions?

A `try`/`except` block is extremely efficient if no exceptions
are raised.  Actually
catching an exception is expensive.  In versions of Python prior to 2.0 it was
common to use this idiom:

```
try:
    value = mydict[key]
except KeyError:
    mydict[key] = getvalue(key)
    value = mydict[key]
```

This only made sense when you expected the dict to have the key <example-value> all the
time.  If that wasn't the case, you coded it like this:

```
if key in mydict:
    value = mydict[key]
else:
    value = mydict[key] = getvalue(key)
```

For this specific case, you could also use ``value = dict.setdefault(key,
getvalue(key))`, but only if the `getvalue()`` call is cheap enough because it
is evaluated in all cases.

## Why isn't there a switch or case statement in Python?

In general, structured switch statements execute one block of code
when an expression has a particular value or set of values.
Since Python 3.10 one can easily match literal values, or constants
within a namespace, with a `match ... case` statement.
See the specification and the tutorial
for more information about `match` statements.
An older alternative is a sequence of `if... elif... elif... else`.

For cases where you need to choose from a very large number of possibilities,
you can create a dictionary mapping case values to functions to call.  For
example:

```
functions = {'a': function_1,
             'b': function_2,
             'c': self.method_1}

func = functions[value]
func()
```

For calling methods on objects, you can simplify yet further by using the
`getattr()` built-in to retrieve methods with a particular name:

```
class MyVisitor:
    def visit_a(self):
        ...

    def dispatch(self, value):
        method_name = 'visit_' + str(value)
        method = getattr(self, method_name)
        method()
```

It's suggested that you use a prefix for the method names, such as `visit_` in
this example.  Without such a prefix, if values are coming from an untrusted
source, an attacker would be able to call any method on your object.

Imitating switch with fallthrough, as with C's switch-case-default,
is possible, much harder, and less needed.

## Can't you emulate threads in the interpreter instead of relying on an OS-specific thread implementation?

Answer 1: Unfortunately, the interpreter pushes at least one C stack frame for
each Python stack frame.  Also, extensions can call back into Python at almost
random moments.  Therefore, a complete threads implementation requires thread
support for C.

Answer 2: Fortunately, there is Stackless Python,
which has a completely redesigned interpreter loop that avoids the C stack.

## Why can't lambda expressions contain statements?

Python lambda expressions cannot contain statements because Python's syntactic
framework can't handle statements nested inside expressions.  However, in
Python, this is not a serious problem.  Unlike lambda forms in other languages,
where they add functionality, Python lambdas are only a shorthand notation if
you're too lazy to define a function.

Functions are already first class objects in Python, and can be declared in a
local scope.  Therefore the only advantage of using a lambda instead of a
locally defined function is that you don't need to invent a name for the
function -- but that's just a local variable to which the function object (which
is exactly the same type of object that a lambda expression yields) is assigned!

## Can Python be compiled to machine code, C or some other language?

Cython compiles a modified version of Python with
optional annotations into C extensions.  Nuitka is
an up-and-coming compiler of Python into C++ code, aiming to support the full
Python language.

## How does Python manage memory?

The details of Python memory management depend on the implementation.  The
standard implementation of Python, CPython, uses reference counting to
detect inaccessible objects, and another mechanism to collect reference cycles,
periodically executing a cycle detection algorithm which looks for inaccessible
cycles and deletes the objects involved. The `gc` module provides functions
to perform a garbage collection, obtain debugging statistics, and tune the
collector's parameters.

Other implementations (such as Jython or
PyPy), however, can rely on a different mechanism
such as a full-blown garbage collector.  This difference can cause some
subtle porting problems if your Python code depends on the behavior of the
reference counting implementation.

In some Python implementations, the following code (which is fine in CPython)
will probably run out of file descriptors:

```
for file in very_long_list_of_files:
    f = open(file)
    c = f.read(1)
```

Indeed, using CPython's reference counting and destructor scheme, each new
assignment to `f` closes the previous file.  With a traditional GC, however,
those file objects will only get collected (and closed) at varying and possibly
long intervals.

If you want to write code that will work with any Python implementation,
you should explicitly close the file or use the `with` statement;
this will work regardless of memory management scheme:

```
for file in very_long_list_of_files:
    with open(file) as f:
        c = f.read(1)
```
