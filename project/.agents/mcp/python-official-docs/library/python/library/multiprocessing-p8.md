---
title: "multiprocessing --- Process-based parallelism (part 8 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 8 of 10)

### class `Namespace`

A type that can register with `SyncManager`.

A namespace object has no public methods, but does have writable attributes.
Its representation shows the values of its attributes.

However, when using a proxy for a namespace object, an attribute beginning
with `'_'` will be an attribute of the proxy and not an attribute of the
referent:

```python

>>> mp_context = multiprocessing.get_context('spawn')
>>> manager = mp_context.Manager()
>>> Global = manager.Namespace()
>>> Global.x = 10
>>> Global.y = 'hello'
>>> Global._z = 12.3    # this is an attribute of the proxy
>>> print(Global)
Namespace(x=10, y='hello')
```

#### Customized managers

To create one's own manager, one creates a subclass of `BaseManager` and
uses the `register()` classmethod to register new types or
callables with the manager class.  For example:

```
from multiprocessing.managers import BaseManager

class MathsClass:
    def add(self, x, y):
        return x + y
    def mul(self, x, y):
        return x * y

class MyManager(BaseManager):
    pass

MyManager.register('Maths', MathsClass)

if __name__ == '__main__':
    with MyManager() as manager:
        maths = manager.Maths()
        print(maths.add(4, 3))         # prints 7
        print(maths.mul(7, 8))         # prints 56
```

#### Using a remote manager

It is possible to run a manager server on one machine and have clients use it
from other machines (assuming that the firewalls involved allow it).

Running the following commands creates a server for a single shared queue which
remote clients can access:

```
>>> from multiprocessing.managers import BaseManager
>>> from queue import Queue
>>> queue = Queue()
>>> class QueueManager(BaseManager): pass
>>> QueueManager.register('get_queue', callable=lambda:queue)
>>> m = QueueManager(address=('', 50000), authkey=b'abracadabra')
>>> s = m.get_server()
>>> s.serve_forever()
```

One client can access the server as follows:

```
>>> from multiprocessing.managers import BaseManager
>>> class QueueManager(BaseManager): pass
>>> QueueManager.register('get_queue')
>>> m = QueueManager(address=('foo.bar.org', 50000), authkey=b'abracadabra')
>>> m.connect()
>>> queue = m.get_queue()
>>> queue.put('hello')
```

Another client can also use it:

```
>>> from multiprocessing.managers import BaseManager
>>> class QueueManager(BaseManager): pass
>>> QueueManager.register('get_queue')
>>> m = QueueManager(address=('foo.bar.org', 50000), authkey=b'abracadabra')
>>> m.connect()
>>> queue = m.get_queue()
>>> queue.get()
'hello'
```

Local processes can also access that queue, using the code from above on the
client to access it remotely:

```
>>> from multiprocessing import Process, Queue
>>> from multiprocessing.managers import BaseManager
>>> class Worker(Process):
...     def __init__(self, q):
...         self.q = q
...         super().__init__()
...     def run(self):
...         self.q.put('local hello')
...
>>> queue = Queue()
>>> w = Worker(queue)
>>> w.start()
>>> class QueueManager(BaseManager): pass
...
>>> QueueManager.register('get_queue', callable=lambda: queue)
>>> m = QueueManager(address=('', 50000), authkey=b'abracadabra')
>>> s = m.get_server()
>>> s.serve_forever()
```

### Proxy Objects

A proxy is an object which *refers* to a shared object which lives (presumably)
in a different process.  The shared object is said to be the *referent* of the
proxy.  Multiple proxy objects may have the same referent.

A proxy object has methods which invoke corresponding methods of its referent
(although not every method of the referent will necessarily be available through
the proxy).  In this way, a proxy can be used just like its referent can:

```python

>>> mp_context = multiprocessing.get_context('spawn')
>>> manager = mp_context.Manager()
>>> l = manager.list([i*i for i in range(10)])
>>> print(l)
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
>>> print(repr(l))
<ListProxy object, typeid 'list' at 0x...>
>>> l[4]
16
>>> l[2:5]
[4, 9, 16]
```

Notice that applying `str()` to a proxy will return the representation of
the referent, whereas applying `repr()` will return the representation of
the proxy.

An important feature of proxy objects is that they are picklable so they can be
passed between processes.  As such, a referent can contain
multiprocessing-proxy_objects.  This permits nesting of these managed
lists, dicts, and other multiprocessing-proxy_objects:

```python

>>> a = manager.list()
>>> b = manager.list()
>>> a.append(b)         # referent of a now contains referent of b
>>> print(a, b)
[<ListProxy object, typeid 'list' at ...>] []
>>> b.append('hello')
>>> print(a[0], b)
['hello'] ['hello']
```

Similarly, dict and list proxies may be nested inside one another:

```
>>> l_outer = manager.list([ manager.dict() for i in range(2) ])
>>> d_first_inner = l_outer[0]
>>> d_first_inner['a'] = 1
>>> d_first_inner['b'] = 2
>>> l_outer[1]['c'] = 3
>>> l_outer[1]['z'] = 26
>>> print(l_outer[0])
{'a': 1, 'b': 2}
>>> print(l_outer[1])
{'c': 3, 'z': 26}
```

If standard (non-proxy) `list` or `dict` objects are contained
in a referent, modifications to those mutable values will not be propagated
through the manager because the proxy has no way of knowing when the values
contained within are modified.  However, storing a value in a container proxy
(which triggers a `__setitem__` on the proxy object) does propagate through
the manager and so to effectively modify such an item, one could re-assign the
modified value to the container proxy:

```
# create a list proxy and append a mutable object (a dictionary)
lproxy = manager.list()
lproxy.append({})
# now mutate the dictionary
d = lproxy[0]
d['a'] = 1
d['b'] = 2
# at this point, the changes to d are not yet synced, but by
# updating the dictionary, the proxy is notified of the change
lproxy[0] = d
```

This approach is perhaps less convenient than employing nested
multiprocessing-proxy_objects for most use cases but also
demonstrates a level of control over the synchronization.

> **Note:** The proxy types in `multiprocessing` do nothing to support comparisons
> by value.  So, for instance, we have:
>
>
> ```python
>
> >>> manager.list([1,2,3]) == [1,2,3]
> False
> ```
>
>
> One should just use a copy of the referent instead when making comparisons.

### class `BaseProxy`

Proxy objects are instances of subclasses of `BaseProxy`.

### `_callmethod(methodname[, args[, kwds]])`

Call and return the result of a method of the proxy's referent.

If `proxy` is a proxy whose referent is `obj` then the expression:

```
proxy._callmethod(methodname, args, kwds)
```

will evaluate the expression:

```
getattr(obj, methodname)(*args, **kwds)
```

in the manager's process.

The returned value will be a copy of the result of the call or a proxy to
a new shared object -- see documentation for the *method_to_typeid*
argument of `BaseManager.register()`.

If an exception is raised by the call, then is re-raised by
`_callmethod()`.  If some other exception is raised in the manager's
process then this is converted into a `RemoteError` exception and is
raised by `_callmethod()`.

Note in particular that an exception will be raised if *methodname* has
not been *exposed*.

An example of the usage of `_callmethod()`:

```python

>>> l = manager.list(range(10))
>>> l._callmethod('__len__')
10
>>> l._callmethod('__getitem__', (slice(2, 7),)) # equivalent to l[2:7]
[2, 3, 4, 5, 6]
>>> l._callmethod('__getitem__', (20,))          # equivalent to l[20]
Traceback (most recent call last):
...
IndexError: list index out of range
```

### `_getvalue()`

Return a copy of the referent.

If the referent is unpicklable then this will raise an exception.

### `__repr__`

Return a representation of the proxy object.

### `__str__`

Return the representation of the referent.

#### Cleanup

A proxy object uses a weakref callback so that when it gets garbage collected it
deregisters itself from the manager which owns its referent.

A shared object gets deleted from the manager process when there are no longer
any proxies referring to it.

### Process Pools

Module `multiprocessing.pool`.

One can create a pool of processes which will carry out tasks submitted to it
with the `Pool` class.

### class `Pool([processes[, initializer[, initargs[, maxtasksperchild [, context]]]]])`

A process pool object which controls a pool of worker processes to which jobs
can be submitted.  It supports asynchronous results with timeouts and
callbacks and has a parallel map implementation.

*processes* is the number of worker processes to use.  If *processes* is
`None` then the number returned by `os.process_cpu_count()` is used.

If *initializer* is not `None` then each worker process will call
`initializer(*initargs)` when it starts.

*maxtasksperchild* is the number of tasks a worker process can complete
before it will exit and be replaced with a fresh worker process, to enable
unused resources to be freed. The default *maxtasksperchild* is `None`, which
means worker processes will live as long as the pool.

*context* can be used to specify the context used for starting
the worker processes.  Usually a pool is created using the
function `multiprocessing.Pool()` or the `Pool()` method
of a context object.  In both cases *context* is set
appropriately. If `None`, calling this function will have the side effect
of setting the current global start method if it has not been set already.
See the `get_context()` function.

Note that the methods of the pool object should only be called by
the process which created the pool.

> **Warning:** `multiprocessing.pool` objects have internal resources that need to be
> properly managed (like any other resource) by using the pool as a context manager
> or by calling `close()` and `terminate()` manually. Failure to do this
> can lead to the process hanging on finalization.
>
> Note that it is **not correct** to rely on the garbage collector to destroy the pool
> as CPython does not assure that the finalizer of the pool will be called
> (see `object.__del__()` for more information).

> *Changed in version 3.2.*
> Added the *maxtasksperchild* parameter.

> *Changed in version 3.4.*
> Added the *context* parameter.

> *Changed in version 3.13.*
> *processes* uses `os.process_cpu_count()` by default, instead of
> `os.cpu_count()`.

> **Note:** Worker processes within a `Pool` typically live for the complete
> duration of the Pool's work queue. A frequent pattern found in other
> systems (such as Apache, mod_wsgi, etc) to free resources held by
> workers is to allow a worker within a pool to complete only a set
> amount of work before exiting, being cleaned up and a new
> process spawned to replace the old one. The *maxtasksperchild*
> argument to the `Pool` exposes this ability to the end user.

### `apply(func[, args[, kwds]])`

Call *func* with arguments *args* and keyword arguments *kwds*.  It blocks
until the result is ready. Given this blocks, `apply_async()` is
better suited for performing work in parallel. Additionally, *func*
is only executed in one of the workers of the pool.

### `apply_async(func[, args[, kwds[, callback[, error_callback]]]])`

A variant of the `apply()` method which returns a
`AsyncResult` object.

If *callback* is specified then it should be a callable which accepts a
single argument.  When the result becomes ready *callback* is applied to
it, that is unless the call failed, in which case the *error_callback*
is applied instead.

If *error_callback* is specified then it should be a callable which
accepts a single argument.  If the target function fails, then
the *error_callback* is called with the exception instance.

Callbacks should complete immediately since otherwise the thread which
handles the results will get blocked.

### `map(func, iterable[, chunksize])`

A parallel equivalent of the `map()` built-in function (it supports only
one *iterable* argument though, for multiple iterables see `starmap()`).
It blocks until the result is ready.

This method chops the iterable into a number of chunks which it submits to
the process pool as separate tasks.  The (approximate) size of these
chunks can be specified by setting *chunksize* to a positive integer.

Note that it may cause high memory usage for very long iterables. Consider
using `imap()` or `imap_unordered()` with explicit *chunksize*
option for better efficiency.

### `map_async(func, iterable[, chunksize[, callback[, error_callback]]])`

A variant of the `.map()` method which returns a
`AsyncResult` object.

If *callback* is specified then it should be a callable which accepts a
single argument.  When the result becomes ready *callback* is applied to
it, that is unless the call failed, in which case the *error_callback*
is applied instead.

If *error_callback* is specified then it should be a callable which
accepts a single argument.  If the target function fails, then
the *error_callback* is called with the exception instance.

Callbacks should complete immediately since otherwise the thread which
handles the results will get blocked.

### `imap(func, iterable[, chunksize])`

An iterator-based version of `.map()`.

The *chunksize* argument is the same as the one used by the `.map()`
method.  For very long iterables using a large value for *chunksize* can
make the job complete **much** faster than using the default value of
`1`.

Also if *chunksize* is `1` then the `next()` method of the iterator
returned by the `imap()` method has an optional *timeout* parameter:
`next(timeout)` will raise `multiprocessing.TimeoutError` if the
result cannot be returned within *timeout* seconds.

### `imap_unordered(func, iterable[, chunksize])`

The same as `imap()` except that the ordering of the results from the
returned iterator should be considered arbitrary.  (Only when there is
only one worker process is the order guaranteed to be "correct".)

### `starmap(func, iterable[, chunksize])`

Like `map()` except that the
elements of the *iterable* are expected to be iterables that are
unpacked as arguments.

Hence an *iterable* of `[(1,2), (3, 4)]` results in ``[func(1,2),
func(3,4)]``.

> *Added in version 3.3.*

### `starmap_async(func, iterable[, chunksize[, callback[, error_callback]]])`

A combination of `starmap()` and `map_async()` that iterates over
*iterable* of iterables and calls *func* with the iterables unpacked.
Returns a result object.

> *Added in version 3.3.*

### `close()`

Prevents any more tasks from being submitted to the pool.  Once all the
tasks have been completed the worker processes will exit.

### `terminate()`

Stops the worker processes immediately without completing outstanding
work.  When the pool object is garbage collected `terminate()` will be
called immediately.
