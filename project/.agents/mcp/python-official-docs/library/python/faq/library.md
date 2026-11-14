---
title: "Library and Extension FAQ (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/library.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

- **tocdepth:** 2

# Library and Extension FAQ

html

## General Library Questions

### How do I find a module or application to perform task X?

Check the Library Reference to see if there's a relevant
standard library module.  (Eventually you'll learn what's in the standard
library and will be able to skip this step.)

For third-party packages, search the `Python Package Index
<https://pypi.org>`_ or try Google or
another web search engine.  Searching for "Python" plus a keyword or two for
your topic of interest will usually find something helpful.

### Where is the math.py (socket.py, regex.py, etc.) source file?

If you can't find a source file for a module it may be a built-in or
dynamically loaded module implemented in C, C++ or other compiled language.
In this case you may not have the source file or it may be something like
`mathmodule.c`, somewhere in a C source directory (not on the Python Path).

There are (at least) three kinds of modules in Python:

1) modules written in Python (.py);
2) modules written in C and dynamically loaded (.dll, .pyd, .so, .sl, etc);
3) modules written in C and linked with the interpreter; to get a list of these,
type:

```
import sys
print(sys.builtin_module_names)
```

### How do I make a Python script executable on Unix?

You need to do two things: the script file's mode must be executable and the
first line must begin with `#!` followed by the path of the Python
interpreter.

The first is done by executing `chmod +x scriptfile` or perhaps ``chmod 755
scriptfile``.

The second can be done in a number of ways.  The most straightforward way is to
write:

```
#!/usr/local/bin/python
```

as the very first line of your file, using the pathname for where the Python
interpreter is installed on your platform.

If you would like the script to be independent of where the Python interpreter
lives, you can use the `env` program.  Almost all Unix variants support
the following, assuming the Python interpreter is in a directory on the user's
`PATH`:

```
#!/usr/bin/env python
```

*Don't* do this for CGI scripts.  The `PATH` variable for CGI scripts is
often very minimal, so you need to use the actual absolute pathname of the
interpreter.

Occasionally, a user's environment is so full that the `/usr/bin/env`
program fails; or there's no env program at all.  In that case, you can try the
following hack (due to Alex Rezinsky):

```sh
#! /bin/sh
""":"
exec python $0 ${1+"$@"}
"""
```

The minor disadvantage is that this defines the script's __doc__ string.
However, you can fix that by adding:

```
__doc__ = """...Whatever..."""
```

### Is there a curses/termcap package for Python?

For Unix variants: The standard Python source distribution comes with a curses
module in the Modules subdirectory, though it's not compiled by default.
(Note that this is not available in the Windows distribution -- there is no
curses module for Windows.)

The `curses` module supports basic <example-value> features as well as many additional
functions from ncurses and SYSV curses such as colour, alternative character set
support, pads, and mouse support. This means the module isn't compatible with
operating systems that only have BSD curses, but there don't seem to be any
currently maintained OSes that fall into this category.

### Is there an equivalent to C's onexit() in Python?

The `atexit` module provides a register function that is similar to C's
`onexit`.

### Why don't my signal handlers work?

The most common problem is that the signal handler is declared with the wrong
argument list.  It is called as:

```
handler(signum, frame)
```

so it should be declared with two parameters:

```
def handler(signum, frame):
    ...
```

## Common tasks

### How do I test a Python program or component?

Python comes with two testing frameworks.  The `doctest` module finds
examples in the docstrings for a module and runs them, comparing the output with
the expected output given in the docstring.

The `unittest` module is a fancier testing framework modelled on Java and
Smalltalk testing frameworks.

To make testing easier, you should use good modular design in your program.
Your program should have almost all functionality
encapsulated in either functions or class methods -- and this sometimes has the
surprising and delightful effect of making the program run faster (because local
variable accesses are faster than global accesses).  Furthermore the program
should avoid depending on mutating global variables, since this makes testing
much more difficult to do.

The "global main logic" of your program may be as simple as:

```
if __name__ == "__main__":
    main_logic()
```

at the bottom of the main module of your program.

Once your program is organized as a tractable collection of function and class
behaviours, you should write test functions that exercise the behaviours.  A
test suite that automates a sequence of tests can be associated with each module.
This sounds like a lot of work, but since Python is so terse and flexible it's
surprisingly easy.  You can make coding much more pleasant and fun by writing
your test functions in parallel with the "production code", since this makes it
easy to find bugs and even design flaws earlier.

"Support modules" that are not intended to be the main module of a program may
include a self-test of the module.:

```
if __name__ == "__main__":
    self_test()
```

Even programs that interact with complex external interfaces may be tested when
the external interfaces are unavailable by using "fake" interfaces implemented
in Python.

### How do I create documentation from doc strings?

The `pydoc` module can create HTML from the doc strings in your Python
source code.  An alternative for creating API documentation purely from
docstrings is epydoc.  `Sphinx
<https://www.sphinx-doc.org>`_ can also include docstring content.

### How do I get a single keypress at a time?

For Unix variants there are several solutions.  It's straightforward to do this
using curses, but curses is a fairly large module to learn.

## Threads

### How do I program using threads?

Be sure to use the `threading module and not the thread` module.
The `threading` module builds convenient abstractions on top of the
low-level primitives provided by the `_thread` module.

### None of my threads seem to run: why?

As soon as the main thread exits, all threads are killed.  Your main thread is
running too quickly, giving the threads no time to do any work.

A simple fix is to add a sleep to the end of the program that's long enough for
all the threads to finish:

```
import threading, time

def thread_task(name, n):
    for i in range(n):
        print(name, i)

for i in range(10):
    T = threading.Thread(target=thread_task, args=(str(i), i))
    T.start()

time.sleep(10)  # <---------------------------!
```

But now (on many platforms) the threads don't run in parallel, but appear to run
sequentially, one at a time!  The reason is that the OS thread scheduler doesn't
start a new thread until the previous thread is blocked.

A simple fix is to add a tiny sleep to the start of the run function:

```
def thread_task(name, n):
    time.sleep(0.001)  # <--------------------!
    for i in range(n):
        print(name, i)

for i in range(10):
    T = threading.Thread(target=thread_task, args=(str(i), i))
    T.start()

time.sleep(10)
```

Instead of trying to guess a good delay value for `time.sleep()`,
it's better to use some kind of semaphore mechanism.  One idea is to use the
`queue` module to create a queue object, let each thread append a token to
the queue when it finishes, and let the main thread read as many tokens from the
queue as there are threads.

### How do I parcel out work among a bunch of worker threads?

The easiest way is to use the `concurrent.futures` module,
especially the `ThreadPoolExecutor` class.

Or, if you want fine control over the dispatching algorithm, you can write
your own logic manually.  Use the `queue` module to create a queue
containing a list of jobs.  The `Queue` class maintains a
list of objects and has a `.put(obj)` method that adds items to the queue and
a `.get()` method to return them.  The class will take care of the locking
necessary to ensure that each job is handed out exactly once.

Here's a trivial example:

```
import threading, queue, time

# The worker thread gets jobs off the queue.  When the queue is empty, it
# assumes there will be no more work and exits.
# (Realistically workers will run until terminated.)
def worker():
    print('Running worker')
    time.sleep(0.1)
    while True:
        try:
            arg = q.get(block=False)
        except queue.Empty:
            print('Worker', threading.current_thread(), end=' ')
            print('queue empty')
            break
        else:
            print('Worker', threading.current_thread(), end=' ')
            print('running with argument', arg)
            time.sleep(0.5)

# Create queue
q = queue.Queue()

# Start a pool of 5 workers
for i in range(5):
    t = threading.Thread(target=worker, name='worker %i' % (i+1))
    t.start()

# Begin adding work to the queue
for i in range(50):
    q.put(i)

# Give threads time to run
print('Main thread sleeping')
time.sleep(5)
```

When run, this will produce the following output:

```none
Running worker
Running worker
Running worker
Running worker
Running worker
Main thread sleeping
Worker <Thread(worker 1, started 130283832797456)> running with argument 0
Worker <Thread(worker 2, started 130283824404752)> running with argument 1
Worker <Thread(worker 3, started 130283816012048)> running with argument 2
Worker <Thread(worker 4, started 130283807619344)> running with argument 3
Worker <Thread(worker 5, started 130283799226640)> running with argument 4
Worker <Thread(worker 1, started 130283832797456)> running with argument 5
...
```

Consult the module's documentation for more details; the `Queue`
class provides a featureful interface.

### What kinds of global value mutation are thread-safe?

A global interpreter lock (GIL) is used internally to ensure that only one
thread runs in the Python VM at a time.  In general, Python offers to switch
among threads only between bytecode instructions; how frequently it switches can
be set via `sys.setswitchinterval()`.  Each bytecode instruction and
therefore all the C implementation code reached from each instruction is
therefore atomic from the point of view of a Python program.

In theory, this means an exact accounting requires an exact understanding of the
PVM bytecode implementation.  In practice, it means that operations on shared
variables of built-in data types (ints, lists, dicts, etc) that "look atomic"
really are.

For example, the following operations are all atomic (L, L1, L2 are lists, D,
D1, D2 are dicts, x, y are objects, i, j are ints):

```
L.append(x)
L1.extend(L2)
x = L[i]
x = L.pop()
L1[i:j] = L2
L.sort()
x = y
x.field = y
D[x] = y
D1.update(D2)
D.keys()
```

These aren't:

```
i = i+1
L.append(L[-1])
L[i] = L[j]
D[x] = D[x] + 1
```

Operations that replace other objects may invoke those other objects'
`__del__()` method when their reference count reaches zero, and that can
affect things.  This is especially true for the mass updates to dictionaries and
lists.  When in doubt, use a mutex!

### Can't we get rid of the Global Interpreter Lock?

The global interpreter lock (GIL) is often seen as a hindrance to Python's
deployment on high-end multiprocessor server machines, because a multi-threaded
Python program effectively only uses one CPU, due to the insistence that
(almost) all Python code can only run while the GIL is held.

With the approval of PEP 703 work is now underway to remove the GIL from the
CPython implementation of Python.  Initially it will be implemented as an
optional compiler flag when building the interpreter, and so separate
builds will be available with and without the GIL.  Long-term, the hope is
to settle on a single build, once the performance implications of removing the
GIL are fully understood.  Python 3.13 is likely to be the first release
containing this work, although it may not be completely functional in this
release.

The current work to remove the GIL is based on a
fork of Python 3.9 with the GIL removed
by Sam Gross.
Prior to that,
in the days of Python 1.5, Greg Stein actually implemented a comprehensive
patch set (the "free threading" patches) that removed the GIL and replaced it
with fine-grained locking.  Adam Olsen did a similar experiment
in his python-safethread
project.  Unfortunately, both of these earlier experiments exhibited a sharp
drop in single-thread
performance (at least 30% slower), due to the amount of fine-grained locking
necessary to compensate for the removal of the GIL.  The Python 3.9 fork
is the first attempt at removing the GIL with an acceptable performance
impact.

The presence of the GIL in current Python releases
doesn't mean that you can't make good use of Python on multi-CPU machines!
You just have to be creative with dividing the work up between multiple
*processes* rather than multiple *threads*.  The
`ProcessPoolExecutor` class in the new
`concurrent.futures` module provides an easy way of doing so; the
`multiprocessing` module provides a lower-level API in case you want
more control over dispatching of tasks.

Judicious use of C extensions will also help; if you use a C extension to
perform a time-consuming task, the extension can release the GIL while the
thread of execution is in the C code and allow other threads to get some work
done.  Some standard library modules such as `zlib` and `hashlib`
already do this.

An alternative approach to reducing the impact of the GIL is
to make the GIL a per-interpreter-state lock rather than truly global.
This was first implemented in Python 3.12 and is
available in the C API. A Python interface to it is expected in Python 3.13.
The main limitation to it at the moment is likely to be 3rd party extension
modules, since these must be written with multiple interpreters in mind in
order to be usable, so many older extension modules will not be usable.
