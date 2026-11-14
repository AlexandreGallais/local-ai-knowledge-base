---
title: "General Python FAQ (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/general.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# General Python FAQ (part 2 of 2)

## Python in the real world

### How stable is Python?

Very stable.  New, stable releases have been coming out roughly every 6 to 18
months since 1991, and this seems likely to continue.  As of version 3.9,
Python will have a new feature release every 12 months (PEP 602).

The developers issue bugfix releases of older versions, so the stability of
existing releases gradually improves.  Bugfix releases, indicated by a third
component of the version number (e.g. 3.5.3, 3.6.2), are managed for stability;
only fixes for known problems are included in a bugfix release, and it's
guaranteed that interfaces will remain the same throughout a series of bugfix
releases.

The latest stable releases can always be found on the `Python download page
<https://www.python.org/downloads/>`_.
Python 3.x is the recommended version and supported by most widely used libraries.
Python 2.x PEP is not maintained anymore.

### How many people are using Python?

There are probably millions of users, though it's difficult to obtain an exact
count.

Python is available for free download, so there are no sales figures, and it's
available from many different sites and packaged with many Linux distributions,
so download statistics don't tell the whole story either.

The comp.lang.python newsgroup is very active, but not all Python users post to
the group or even read it.

### Have any significant projects been done in Python?

See https://www.python.org/about/success for a list of projects that use Python.
Consulting the proceedings for `past Python conferences
<https://www.python.org/community/workshops/>`_ will reveal contributions from many
different companies and organizations.

High-profile Python projects include `the Mailman mailing list manager
<https://www.list.org>`_ and `the Zope application server
<https://www.zope.dev>`_.  Several Linux distributions, most notably `Red Hat
<https://www.redhat.com>`_, have written part or all of their installer and
system administration software in Python.  Companies that use Python internally
include Google, Yahoo, and Lucasfilm Ltd.

### What new developments are expected for Python in the future?

See https://peps.python.org/ for the Python Enhancement Proposals
(PEPs). PEPs are design documents describing a suggested new feature for Python,
providing a concise technical specification and a rationale.  Look for a PEP
titled "Python X.Y Release Schedule", where X.Y is a version that hasn't been
publicly released yet.

New development is discussed on `the python-dev mailing list
<https://mail.python.org/mailman3/lists/python-dev.python.org/>`_.

### Is it reasonable to propose incompatible changes to Python?

In general, no.  There are already millions of lines of Python code around the
world, so any change in the language that invalidates more than a very small
fraction of existing programs has to be frowned upon.  Even if you can provide a
conversion program, there's still the problem of updating all documentation;
many books have been written about Python, and we don't want to invalidate them
all at a single stroke.

Providing a gradual upgrade path is necessary if a feature has to be changed.
PEP 5 describes the procedure followed for introducing backward-incompatible
changes while minimizing disruption for users.

### Is Python a good language for beginning programmers?

Yes.

It is still common to start students with a procedural and statically typed
language such as Pascal, C, or a subset of C++ or Java.  Students may be better
served by learning Python as their first language.  Python has a very simple and
consistent syntax and a large standard library and, most importantly, using
Python in a beginning programming course lets students concentrate on important
programming skills such as problem decomposition and data type design.  With
Python, students can be quickly introduced to basic <example-value> such as loops and
procedures.  They can probably even work with user-defined objects in their very
first course.

For a student who has never programmed before, using a statically typed language
seems unnatural.  It presents additional complexity that the student must master
and slows the pace of the course.  The students are trying to learn to think
like a computer, decompose problems, design consistent interfaces, and
encapsulate data.  While learning to use a statically typed language is
important in the long term, it is not necessarily the best topic to address in
the students' first programming course.

Many other aspects of Python make it a good first language.  Like Java, Python
has a large standard library so that students can be assigned programming
projects very early in the course that *do* something.  Assignments aren't
restricted to the standard four-function calculator and check balancing
programs.  By using the standard library, students can gain the satisfaction of
working on realistic applications as they learn the fundamentals of programming.
Using the standard library also teaches students about code reuse.  Third-party
modules such as PyGame are also helpful in extending the students' reach.

Python's interactive interpreter enables students to test language features
while they're programming.  They can keep a window with the interpreter running
while they enter their program's source in another window.  If they can't
remember the methods for a list, they can do something like this:

```
>>> L = []
>>> dir(L) # doctest: +NORMALIZE_WHITESPACE
['__add__', '__class__', '__contains__', '__delattr__', '__delitem__',
'__dir__', '__doc__', '__eq__', '__format__', '__ge__',
'__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__',
'__imul__', '__init__', '__iter__', '__le__', '__len__', '__lt__',
'__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__',
'__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__',
'__sizeof__', '__str__', '__subclasshook__', 'append', 'clear',
'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove',
'reverse', 'sort']
>>> [d for d in dir(L) if '__' not in d]
['append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

>>> help(L.append)
Help on built-in function append:
<BLANKLINE>
append(...)
    L.append(object) -> None -- append object to end
<BLANKLINE>
>>> L.append(1)
>>> L
[1]
```

With the interpreter, documentation is never far from the student as they are
programming.

There are also good IDEs for Python.  IDLE is a cross-platform IDE for Python
that is written in Python using Tkinter.
Emacs users will be happy to know that there is a very good Python mode for
Emacs.  All of these programming environments provide syntax highlighting,
auto-indenting, and access to the interactive interpreter while coding.  Consult
the Python wiki for a full list
of Python editing environments.

If you want to discuss Python's use in education, you may be interested in
joining `the edu-sig mailing list
<https://www.python.org/community/sigs/current/edu-sig>`_.
