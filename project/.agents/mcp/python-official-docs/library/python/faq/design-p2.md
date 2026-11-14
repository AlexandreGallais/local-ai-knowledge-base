---
title: "Design and History FAQ (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/design.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Design and History FAQ (part 2 of 3)

## Why doesn't CPython use a more traditional garbage collection scheme?

For one thing, this is not a C standard feature and hence it's not portable.
(Yes, we know about the Boehm GC library.  It has bits of assembler code for
*most* common platforms, not for all of them, and although it is mostly
transparent, it isn't completely transparent; patches are required to get
Python to work with it.)

Traditional GC also becomes a problem when Python is embedded into other
applications.  While in a standalone Python it's fine to replace the standard
`malloc()` and `free()` with versions provided by the GC library, an application
embedding Python may want to have its *own* substitute for `malloc()` and `free()`,
and may not want Python's.  Right now, CPython works with anything that
implements `malloc()` and `free()` properly.

## Why isn't all memory freed when CPython exits?

Objects referenced from the global namespaces of Python modules are not always
deallocated when Python exits.  This may happen if there are circular
references.  There are also certain bits of memory that are allocated by the C
library that are impossible to free (e.g. a tool like Purify will complain about
these).  Python is, however, aggressive about cleaning up memory on exit and
does try to destroy every single object.

If you want to force Python to delete certain things on deallocation use the
`atexit` module to run a function that will force those deletions.

## Why are there separate tuple and list data types?

Lists and tuples, while similar in many respects, are generally used in
fundamentally different ways.  Tuples can be thought of as being similar to
Pascal `records` or C `structs`; they're small collections of related data which may
be of different types which are operated on as a group.  For example, a
Cartesian coordinate is appropriately represented as a tuple of two or three
numbers.

Lists, on the other hand, are more like arrays in other languages.  They tend to
hold a varying number of objects all of which have the same type and which are
operated on one-by-one.  For example, `os.listdir('.')`
returns a list of
strings representing the files in the current directory.  Functions which
operate on this output would generally not break if you added another file or
two to the directory.

Tuples are immutable, meaning that once a tuple has been created, you can't
replace any of its elements with a new value.  Lists are mutable, meaning that
you can always change a list's elements.  Only hashable objects can
be used as dictionary keys. Most immutable types are hashable, which is why
tuples, but not lists, can be used as keys. Note, however, that a tuple is
only hashable if all of its elements are hashable.

## How are lists implemented in CPython?

CPython's lists are really variable-length arrays, not Lisp-style linked lists.
The implementation uses a contiguous array of references to other objects, and
keeps a pointer to this array and the array's length in a list head structure.

This makes indexing a list `a[i]` an operation whose cost is independent of
the size of the list or the value of the index.

When items are appended or inserted, the array of references is resized.  Some
cleverness is applied to improve the performance of appending items repeatedly;
when the array must be grown, some extra space is allocated so the next few
times don't require an actual resize.

See time-complexity for the costs of the various list operations.

## How are dictionaries implemented in CPython?

CPython's dictionaries are implemented as resizable hash tables.  Compared to
B-trees, this gives better performance for lookup (the most common operation by
far) under most circumstances, and the implementation is simpler.

Dictionaries work by computing a hash code for each key <example-value> in the dictionary
using the `hash()` built-in function.  The hash code varies widely depending
on the key and a per-process seed; for example, `'Python'` could hash to
`-539294296` while `'python'`, a string that differs by a single bit, could hash
to `1142331976`.  The hash code is then used to calculate a location in an
internal array where the value will be stored.  Assuming that you're storing
keys that all have different hash values, this means that dictionaries take
constant time -- *O*(1), in Big-O notation -- to retrieve a key.

See time-complexity for the costs of the various dictionary operations.

## Why must dictionary keys be immutable?

The hash table implementation of dictionaries uses a hash value calculated from
the key value to find the key.  If the key were a mutable object, its value
could change, and thus its hash could also change.  But since whoever changes
the key <example-value> can't tell that it was being used as a dictionary key, it can't
move the entry around in the dictionary.  Then, when you try to look up the same
object in the dictionary it won't be found because its hash value is different.
If you tried to look up the old value it wouldn't be found either, because the
value of the object found in that hash bin would be different.

If you want a dictionary indexed with a list, simply convert the list to a tuple
first; the function `tuple(L)` creates a tuple with the same entries as the
list `L`.  Tuples are immutable and can therefore be used as dictionary keys.

Some unacceptable solutions that have been proposed:

- Hash lists by their address (object ID).  This doesn't work because if you
construct a new list with the same value it won't be found; e.g.:

```
mydict = {[1, 2]: '12'}
print(mydict[[1, 2]])
```

would raise a `KeyError` exception because the id of the `[1, 2]` used in the
second line differs from that in the first line.  In other words, dictionary
keys should be compared using `==`, not using `is`.

- Make a copy when using a list as a key.  This doesn't work because the list,
being a mutable object, could contain a reference to itself, and then the
copying code would run into an infinite loop.

- Allow lists as keys but tell the user not to modify them.  This would allow a
class of hard-to-track bugs in programs when you forgot or modified a list by
accident. It also invalidates an important invariant of dictionaries: every
value in `d.keys()` is usable as a key of the dictionary.

- Mark lists as read-only once they are used as a dictionary key.  The problem
is that it's not just the top-level object that could change its value; you
could use a tuple containing a list as a key.  Entering anything as a key into
a dictionary would require marking all objects reachable from there as
read-only -- and again, self-referential objects could cause an infinite loop.

There is a trick to get around this if you need to, but use it at your own risk:
You can wrap a mutable structure inside a class instance which has both a
`__eq__() and a hash__()` method.
You must then make sure that the
hash value for all such wrapper objects that reside in a dictionary (or other
hash based structure), remain fixed while the object is in the dictionary (or
other structure).:

```
class ListWrapper:
    def __init__(self, the_list):
        self.the_list = the_list

    def __eq__(self, other):
        return self.the_list == other.the_list

    def __hash__(self):
        l = self.the_list
        result = 98767 - len(l)*555
        for i, el in enumerate(l):
            try:
                result = result + (hash(el) % 9999999) * 1001 + i
            except Exception:
                result = (result % 7777777) + i * 333
        return result
```

Note that the hash computation is complicated by the possibility that some
members of the list may be unhashable and also by the possibility of arithmetic
overflow.

Furthermore it must always be the case that if `o1 == o2` (ie ``o1.__eq__(o2)
is True`) then `hash(o1) == hash(o2)` (ie, `o1.__hash__() == o2.__hash__()``),
regardless of whether the object is in a dictionary or not.  If you fail to meet
these restrictions dictionaries and other hash based structures will misbehave.

In the case of `ListWrapper`, whenever the wrapper object is in a dictionary the
wrapped list must not change to avoid anomalies.  Don't do this unless you are
prepared to think hard about the requirements and the consequences of not
meeting them correctly.  Consider yourself warned.

## Why doesn't list.sort() return the sorted list?

In situations where performance matters, making a copy of the list just to sort
it would be wasteful. Therefore, `list.sort()` sorts the list in place. In
order to remind you of that fact, it does not return the sorted list.  This way,
you won't be fooled into accidentally overwriting a list when you need a sorted
copy but also need to keep the unsorted version around.

If you want to return a new list, use the built-in `sorted()` function
instead.  This function creates a new list from a provided iterable, sorts
it and returns it.  For example, here's how to iterate over the keys of a
dictionary in sorted order:

```
for key in sorted(mydict):
    ...  # do whatever with mydict[key]...
```

## How do you specify and enforce an interface spec in Python?

An interface specification for a module as provided by languages such as C++ and
Java describes the prototypes for the methods and functions of the module.  Many
feel that compile-time enforcement of interface specifications helps in the
construction of large programs.

Python 2.6 adds an `abc` module that lets you define Abstract Base Classes
(ABCs).  You can then use `isinstance()` and `issubclass()` to check
whether an instance or a class implements a particular ABC.  The
`collections.abc` module defines a set of useful ABCs such as
`Iterable`, `Container`, and
`MutableMapping`.

For Python, many of the advantages of interface specifications can be obtained
by an appropriate test discipline for components.

A good test suite for a module can both provide a regression test and serve as a
module interface specification and a set of examples.  Many Python modules can
be run as a script to provide a simple "self test."  Even modules which use
complex external interfaces can often be tested in isolation using trivial
"stub" emulations of the external interface.  The `doctest` and
`unittest` modules or third-party test frameworks can be used to construct
exhaustive test suites that exercise every line of code in a module.

An appropriate testing discipline can help build large complex applications in
Python as well as having interface specifications would.  In fact, it can be
better because an interface specification cannot test certain properties of a
program.  For example, the `list.append()` method is expected to add new elements
to the end of some internal list; an interface specification cannot test that
your `list.append()` implementation will actually do this correctly, but it's
trivial to check this property in a test suite.

Writing test suites is very helpful, and you might want to design your code to
make it easily tested. One increasingly popular technique, test-driven
development, calls for writing parts of the test suite first, before you write
any of the actual code.  Of course Python allows you to be sloppy and not write
test cases at all.

## Why is there no goto?

In the 1970s people realized that unrestricted goto could lead
to messy "spaghetti" code that was hard to understand and revise.
In a high-level language, it is also unneeded as long as there
are ways to branch (in Python, with `if` statements and `or`,
`and`, and `if`/`else` expressions) and loop (with `while`
and `for` statements, possibly containing `continue` and `break`).

One can also use exceptions to provide a "structured goto"
that works even across
function calls.  Many feel that exceptions can conveniently emulate all
reasonable uses of the `go` or `goto` constructs of C, Fortran, and other
languages.  For example:

```
class label(Exception): pass  # declare a label

try:
    ...
    if condition: raise label()  # goto label
    ...
except label:  # where to goto
    pass
...
```

This doesn't allow you to jump into the middle of a loop, but that's usually
considered an abuse of `goto` anyway.  Use sparingly.

## Why can't raw strings (r-strings) end with a backslash?

More precisely, they can't end with an odd number of backslashes: the unpaired
backslash at the end escapes the closing quote character, leaving an
unterminated string.

Raw strings were designed to ease creating input for processors (chiefly regular
expression engines) that want to do their own backslash escape processing. Such
processors consider an unmatched trailing backslash to be an error anyway, so
raw strings disallow that.  In return, they allow you to pass on the string
quote character by escaping it with a backslash.  These rules work well when
r-strings are used for their intended purpose.

If you're trying to build Windows pathnames, note that all Windows system calls
accept forward slashes too:

```
f = open("/mydir/file.txt")  # works fine!
```

If you're trying to build a pathname for a DOS command, try e.g. one of:

```
dir = r"\this\is\my\dos\dir" "\\"
dir = r"\this\is\my\dos\dir\ "[:-1]
dir = "\\this\\is\\my\\dos\\dir\\"
```
