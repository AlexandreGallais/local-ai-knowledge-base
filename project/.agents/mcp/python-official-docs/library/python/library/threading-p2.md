---
title: "threading --- Thread-based parallelism (part 2 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/threading.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# threading --- Thread-based parallelism (part 2 of 5)

## Reference

This module defines the following functions:

### `active_count()`

Return the number of `Thread` objects currently alive.  The returned
count is equal to the length of the list returned by `.enumerate()`.

The function `activeCount` is a deprecated alias for this function.

### `current_thread()`

Return the current `Thread` object, corresponding to the caller's thread
of control.  If the caller's thread of control was not created through the
`threading` module, a dummy thread object with limited functionality is
returned.

The function `currentThread` is a deprecated alias for this function.

### `excepthook(args, /)`

Handle uncaught exception raised by `Thread.run()`.

The *args* argument has the following attributes:

- *exc_type*: Exception type.
- *exc_value*: Exception value, can be `None`.
- *exc_traceback*: Exception traceback, can be `None`.
- *thread*: Thread which raised the exception, can be `None`.

If *exc_type* is `SystemExit`, the exception is silently ignored.
Otherwise, the exception is printed out on `sys.stderr`.

If  this function raises an exception, `sys.excepthook()` is called to
handle it.

`threading.excepthook()` can be overridden to control how uncaught
exceptions raised by `Thread.run()` are handled.

Storing *exc_value* using a custom hook can create a reference cycle. It
should be cleared explicitly to break the reference cycle when the
exception is no longer needed.

Storing *thread* using a custom hook can resurrect it if it is set to an
object which is being finalized. Avoid storing *thread* after the custom
hook completes to avoid resurrecting objects.

> **See also:** `sys.excepthook()` handles uncaught exceptions.

> *Added in version 3.8.*

### `__excepthook__`

Holds the original value of `threading.excepthook()`. It is saved so that the
original value can be restored in case they happen to get replaced with
broken or alternative objects.

> *Added in version 3.10.*

### `get_ident()`

Return the 'thread identifier' of the current thread.  This is a nonzero
integer.  Its value has no direct meaning; it is intended as a magic cookie
to be used e.g. to index a dictionary of thread-specific data.  Thread
identifiers may be recycled when a thread exits and another thread is
created.

> *Added in version 3.3.*

### `get_native_id()`

Return the native integral Thread ID of the current thread assigned by the kernel.
This is a non-negative integer.
Its value may be used to uniquely identify this particular thread system-wide
(until the thread terminates, after which the value may be recycled by the OS).

> **Availability:** Windows, FreeBSD, Linux, macOS, OpenBSD, NetBSD, AIX, DragonFlyBSD, GNU/kFreeBSD, Solaris.

> *Added in version 3.8.*

> *Changed in version 3.13.*
> Added support for GNU/kFreeBSD.

> *Changed in version 3.15.*
> Added support for Solaris.

### `enumerate()`

Return a list of all `Thread` objects currently active.  The list
includes daemonic threads and dummy thread objects created by
`current_thread()`.  It excludes terminated threads and threads
that have not yet been started.  However, the main thread is always part
of the result, even when terminated.

### `main_thread()`

Return the main `Thread` object.  In normal conditions, the
main thread is the thread from which the Python interpreter was
started.

> *Added in version 3.4.*

### `settrace(func)`

Set a trace function for all threads started from the `threading` module.
The *func* will be passed to  `sys.settrace()` for each thread, before its
`run()` method is called.

### `settrace_all_threads(func)`

Set a trace function for all threads started from the `threading` module
and all Python threads that are currently executing.

The *func* will be passed to  `sys.settrace()` for each thread, before its
`run()` method is called.

> *Added in version 3.12.*

### `gettrace()`

Get the trace function as set by `settrace()`.

> *Added in version 3.10.*

### `setprofile(func)`

Set a profile function for all threads started from the `threading` module.
The *func* will be passed to  `sys.setprofile()` for each thread, before its
`run()` method is called.

### `setprofile_all_threads(func)`

Set a profile function for all threads started from the `threading` module
and all Python threads that are currently executing.

The *func* will be passed to  `sys.setprofile()` for each thread, before its
`run()` method is called.

> *Added in version 3.12.*

### `getprofile()`

Get the profiler function as set by `setprofile()`.

> *Added in version 3.10.*

### `stack_size([size])`

Return the thread stack size used when creating new threads.  The optional
*size* argument specifies the stack size to be used for subsequently created
threads, and must be 0 (use platform or configured default) or a positive
integer value of at least 32,768 (32 KiB). If *size* is not specified,
0 is used.  If changing the thread stack size is
unsupported, a `RuntimeError` is raised.  If the specified stack size is
invalid, a `ValueError` is raised and the stack size is unmodified.  32 KiB
is currently the minimum supported stack size value to guarantee sufficient
stack space for the interpreter itself.  Note that some platforms may have
particular restrictions on values for the stack size, such as requiring a
minimum stack size > 32 KiB or requiring allocation in multiples of the system
memory page size - platform documentation should be referred to for more
information (4 KiB pages are common; using multiples of 4096 for the stack size is
the suggested approach in the absence of more specific information).

> **Availability:** Windows, pthreads.
>
> Unix platforms with POSIX threads support.

This module also defines the following constant:

### `TIMEOUT_MAX`

The maximum value allowed for the *timeout* parameter of blocking functions
(`Lock.acquire()`, `RLock.acquire()`, `Condition.wait()`, etc.).
Specifying a timeout greater than this value will raise an
`OverflowError`.

> *Added in version 3.2.*

This module defines a number of classes, which are detailed in the sections
below.

The design of this module is loosely based on Java's threading model. However,
where Java makes locks and condition variables basic <example-value> of every object,
they are separate objects in Python.  Python's `Thread` class supports a
subset of the behavior of Java's Thread class; currently, there are no
priorities, no thread groups, and threads cannot be destroyed, stopped,
suspended, resumed, or interrupted.  The static methods of Java's Thread class,
when implemented, are mapped to module-level functions.

All of the methods described below are executed atomically.

### Thread-local data

Thread-local data is data whose values are thread specific. If you
have data that you want to be local to a thread, create a
`local` object and use its attributes:

```
>>> mydata = local()
>>> mydata.number = 42
>>> mydata.number
42
```

You can also access the `local`-object's dictionary:

```
>>> mydata.__dict__
{'number': 42}
>>> mydata.__dict__.setdefault('widgets', [])
[]
>>> mydata.widgets
[]
```

If we access the data in a different thread:

```
>>> log = []
>>> def f():
...     items = sorted(mydata.__dict__.items())
...     log.append(items)
...     mydata.number = 11
...     log.append(mydata.number)

>>> import threading
>>> thread = threading.Thread(target=f)
>>> thread.start()
>>> thread.join()
>>> log
[[], 11]
```

we get different data.  Furthermore, changes made in the other thread
don't affect data seen in this thread:

```
>>> mydata.number
42
```

Of course, values you get from a `local` object, including their
`__dict__` attribute, are for whatever thread was current
at the time the attribute was read.  For that reason, you generally
don't want to save these values across threads, as they apply only to
the thread they came from.

You can create custom `local` objects by subclassing the
`local` class:

```
>>> class MyLocal(local):
...     number = 2
...     def __init__(self, /, **kw):
...         self.__dict__.update(kw)
...     def squared(self):
...         return self.number ** 2
```

This can be useful to support default values, methods and
initialization.  Note that if you define an `__init__()`
method, it will be called each time the `local` object is used
in a separate thread.  This is necessary to initialize each thread's
dictionary.

Now if we create a `local` object:

```
>>> mydata = MyLocal(color='red')
```

we have a default number:

```
>>> mydata.number
2
```

an initial color:

```
>>> mydata.color
'red'
>>> del mydata.color
```

And a method that operates on the data:

```
>>> mydata.squared()
4
```

As before, we can access the data in a separate thread:

```
>>> log = []
>>> thread = threading.Thread(target=f)
>>> thread.start()
>>> thread.join()
>>> log
[[('color', 'red')], 11]
```

without affecting this thread's data:

```
>>> mydata.number
2
>>> mydata.color
Traceback (most recent call last):
...
AttributeError: 'MyLocal' object has no attribute 'color'
```

Note that subclasses can define __slots__, but they are not
thread local. They are shared across threads:

```
>>> class MyLocal(local):
...     __slots__ = 'number'

>>> mydata = MyLocal()
>>> mydata.number = 42
>>> mydata.color = 'red'
```

So, the separate thread:

```
>>> thread = threading.Thread(target=f)
>>> thread.start()
>>> thread.join()
```

affects what we see:

```
>>> mydata.number
11
```

### class `local()`

A class that represents thread-local data.

### Thread objects

The `Thread` class represents an activity that is run in a separate
thread of control.  There are two ways to specify the activity: by passing a
callable object to the constructor, or by overriding the `run()`
method in a subclass.  No other methods (except for the constructor) should be
overridden in a subclass.  In other words, *only*  override the
`__init__()` and `run()` methods of this class.

Once a thread object is created, its activity must be started by calling the
thread's `start()` method.  This invokes the `run()`
method in a separate thread of control.

Once the thread's activity is started, the thread is considered 'alive'. It
stops being alive when its `run()` method terminates -- either
normally, or by raising an unhandled exception.  The `is_alive()`
method tests whether the thread is alive.

Other threads can call a thread's `join()` method.  This blocks
the calling thread until the thread whose `join()` method is
called is terminated.

A thread has a name.  The name can be passed to the constructor, and read or
changed through the `name` attribute.

If the `run()` method raises an exception,
`threading.excepthook()` is called to handle it. By default,
`threading.excepthook()` ignores silently `SystemExit`.

A thread can be flagged as a "daemon thread".  The significance of this flag is
that the entire Python program exits when only daemon threads are left.  The
initial value is inherited from the creating thread.  The flag can be set
through the `daemon` property or the *daemon* constructor
argument.

> **Note:** Daemon threads are abruptly stopped at shutdown.  Their resources (such
> as open files, database transactions, etc.) may not be released properly.
> If you want your threads to stop gracefully, make them non-daemonic and
> use a suitable signalling mechanism such as an `Event`.

There is a "main thread" object; this corresponds to the initial thread of
control in the Python program.  It is not a daemon thread.

There is the possibility that "dummy thread objects" are created. These are
thread objects corresponding to "alien threads", which are threads of control
started outside the threading module, such as directly from C code.  Dummy
thread objects have limited functionality; they are always considered alive and
daemonic, and cannot be joined.  They are never deleted,
since it is impossible to detect the termination of alien threads.

### class `Thread(group=None, target=None, name=None, args=(), kwargs={}, *, \`

```python
daemon=None, context=None)
```

This constructor should always be called with keyword arguments.  Arguments
are:

*group* must be `None` as it is reserved for future extension when a
`ThreadGroup` class is implemented.

*target* is the callable object to be invoked by the `run()` method.
Defaults to `None`, meaning nothing is called.

*name* is the thread name. By default, a unique name is constructed
of the form "Thread-*N*" where *N* is a small decimal number,
or "Thread-*N* (target)" where "target" is `target.__name__` if the
*target* argument is specified.

*args* is a list or tuple of arguments for the target invocation.  Defaults to `()`.

*kwargs* is a dictionary of keyword arguments for the target invocation.
Defaults to `{}`.

If not `None`, *daemon* explicitly sets whether the thread is daemonic.
If `None` (the default), the daemonic property is inherited from the
current thread.

*context* is the `Context` value to use when starting
the thread.  The default value is `None` which indicates that the
`sys.flags.thread_inherit_context` flag controls the behaviour.  If
the flag is true, threads will start with a copy of the context of the
caller of `start()`.  If false, they will start with an empty
context.  To explicitly start with an empty context, pass a new instance of
`Context()`.  To explicitly start with a copy of the
current context, pass the value from `copy_context()`. The
flag defaults true on free-threaded builds and false otherwise.

If the subclass overrides the constructor, it must make sure to invoke the
base class constructor (`Thread.__init__()`) before doing anything else to
the thread.

> *Changed in version 3.3.*
> Added the *daemon* parameter.

> *Changed in version 3.10.*
> Use the *target* name if *name* argument is omitted.

> *Changed in version 3.14.*
> Added the *context* parameter.

### `start()`

Start the thread's activity.

It must be called at most once per thread object.  It arranges for the
object's `run()` method to be invoked in a separate thread
of control.

This method will raise a `RuntimeError` if called more than once
on the same thread object.

If supported, set the operating system thread name to
`threading.Thread.name`. The name can be truncated depending on the
operating system thread name limits.

> *Changed in version 3.14.*
> Set the operating system thread name.

### `run()`

Method representing the thread's activity.

You may override this method in a subclass.  The standard `run()`
method invokes the callable object passed to the object's constructor as
the *target* argument, if any, with positional and keyword arguments taken
from the *args* and *kwargs* arguments, respectively.

Using list or tuple as the *args* argument which passed to the `Thread`
could achieve the same effect.

Example:

```
>>> from threading import Thread
>>> t = Thread(target=print, args=[1])
>>> t.run()
1
>>> t = Thread(target=print, args=(1,))
>>> t.run()
1
```
