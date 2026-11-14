---
title: "multiprocessing --- Process-based parallelism (part 7 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 7 of 10)

### `Array(typecode_or_type, size_or_initializer, *, lock=True, ctx=None)`

The same as `RawArray()` except that depending on the value of *lock* a
process-safe synchronization wrapper may be returned instead of a raw ctypes
array.

If *lock* is `True` (the default) then a new lock object is created to
synchronize access to the value.  If *lock* is a
`Lock` or `RLock` object
then that will be used to synchronize access to the
value.  If *lock* is `False` then access to the returned object will not be
automatically protected by a lock, so it will not necessarily be
"process-safe".

*ctx* is a context object, or `None` (use the current context). If `None`,
calling this may set the global start method. See
global-start-method for more details.

Note that *lock* and *ctx* are keyword-only parameters.

### `Value(typecode_or_type, *args, lock=True, ctx=None)`

The same as `RawValue()` except that depending on the value of *lock* a
process-safe synchronization wrapper may be returned instead of a raw ctypes
object.

If *lock* is `True` (the default) then a new lock object is created to
synchronize access to the value.  If *lock* is a `Lock` or
`RLock` object then that will be used to synchronize access to the
value.  If *lock* is `False` then access to the returned object will not be
automatically protected by a lock, so it will not necessarily be
"process-safe".

*ctx* is a context object, or `None` (use the current context). If `None`,
calling this may set the global start method. See
global-start-method for more details.

Note that *lock* and *ctx* are keyword-only parameters.

### `copy(obj)`

Return a ctypes object allocated from shared memory which is a copy of the
ctypes object *obj*.

### `synchronized(obj, lock=None, ctx=None)`

Return a process-safe wrapper object for a ctypes object which uses *lock* to
synchronize access.  If *lock* is `None` (the default) then a
`multiprocessing.RLock` object is created automatically.

*ctx* is a context object, or `None` (use the current context). If `None`,
calling this may set the global start method. See
global-start-method for more details.

A synchronized wrapper will have two methods in addition to those of the
object it wraps: `get_obj()` returns the wrapped object and
`get_lock()` returns the lock object used for synchronization.

Note that accessing the ctypes object through the wrapper can be a lot slower
than accessing the raw ctypes object.

> *Changed in version 3.5.*
> Synchronized objects support the context manager protocol.

The table below compares the syntax for creating shared ctypes objects from
shared memory with the normal ctypes syntax.  (In the table `MyStruct` is some
subclass of `ctypes.Structure`.)

```text
==================== ========================== ===========================
ctypes               sharedctypes using type    sharedctypes using typecode
==================== ========================== ===========================
c_double(2.4)        RawValue(c_double, 2.4)    RawValue('d', 2.4)
MyStruct(4, 6)       RawValue(MyStruct, 4, 6)
(c_short * 7)()      RawArray(c_short, 7)       RawArray('h', 7)
(c_int * 3)(9, 2, 8) RawArray(c_int, (9, 2, 8)) RawArray('i', (9, 2, 8))
==================== ========================== ===========================
```

Below is an example where a number of ctypes objects are modified by a child
process:

```
from multiprocessing import Process, Lock
from multiprocessing.sharedctypes import Value, Array
from ctypes import Structure, c_double

class Point(Structure):
    _fields_ = [('x', c_double), ('y', c_double)]

def modify(n, x, s, A):
    n.value **= 2
    x.value **= 2
    s.value = s.value.upper()
    for a in A:
        a.x **= 2
        a.y **= 2

if __name__ == '__main__':
    lock = Lock()

    n = Value('i', 7)
    x = Value(c_double, 1.0/3.0, lock=False)
    s = Array('c', b'hello world', lock=lock)
    A = Array(Point, [(1.875,-6.25), (-5.75,2.0), (2.375,9.5)], lock=lock)

    p = Process(target=modify, args=(n, x, s, A))
    p.start()
    p.join()

    print(n.value)
    print(x.value)
    print(s.value)
    print([(a.x, a.y) for a in A])
```

The results printed are:

```
49
0.<example-card-number>
HELLO WORLD
[(3.515625, 39.0625), (33.0625, 4.0), (5.640625, 90.25)]
```

### Managers

Managers provide a way to create data which can be shared between different
processes, including sharing over a network between processes running on
different machines. A manager object controls a server process which manages
*shared objects*.  Other processes can access the shared objects by using
proxies.

### `multiprocessing.Manager()`

Returns a started `SyncManager` object which
can be used for sharing objects between processes.  The returned manager
object corresponds to a spawned child process and has methods which will
create shared objects and return corresponding proxies.

Module `multiprocessing.managers`.

Manager processes will be shutdown as soon as they are garbage collected or
their parent process exits.  The manager classes are defined in the
`multiprocessing.managers` module:

### class `BaseManager(address=None, authkey=None, serializer='pickle', ctx=None, *, shutdown_timeout=1.0)`

Create a BaseManager object.

Once created one should call `start()` or `get_server().serve_forever()` to ensure
that the manager object refers to a started manager process.

*address* is the address on which the manager process listens for new
connections.  If *address* is `None` then an arbitrary one is chosen.

*authkey* is the authentication key which will be used to check the
validity of incoming connections to the server process.  If
*authkey* is `None` then `current_process().authkey` is used.
Otherwise *authkey* is used and it must be a byte string.

*serializer* must be `'pickle'` (use `pickle` serialization) or
`'xmlrpclib'` (use `xmlrpc.client` serialization).

*ctx* is a context object, or `None` (use the current context). If `None`,
calling this may set the global start method. See
global-start-method for more details.

*shutdown_timeout* is a timeout in seconds used to wait until the process
used by the manager completes in the `shutdown()` method. If the
shutdown times out, the process is terminated. If terminating the process
also times out, the process is killed.

> *Changed in version 3.11.*
> Added the *shutdown_timeout* parameter.

### `start([initializer[, initargs]])`

Start a subprocess to start the manager.  If *initializer* is not `None`
then the subprocess will call `initializer(*initargs)` when it starts.

### `get_server()`

Returns a `Server` object which represents the actual server under
the control of the Manager. The `Server` object supports the
`serve_forever()` method:

```python
>>> from multiprocessing.managers import BaseManager
>>> manager = BaseManager(address=('', 50000), authkey=b'abc')
>>> server = manager.get_server()
>>> server.serve_forever()
```

`Server` additionally has an `address` attribute.

### `connect()`

Connect a local manager object to a remote manager process:

```python
>>> from multiprocessing.managers import BaseManager
>>> m = BaseManager(address=('127.0.0.1', 50000), authkey=b'abc')
>>> m.connect()
```

### `shutdown()`

Stop the process used by the manager.  This is only available if
`start()` has been used to start the server process.

This can be called multiple times.

### `register(typeid[, callable[, proxytype[, exposed[, method_to_typeid[, create_method]]]]])`

A classmethod which can be used for registering a type or callable with
the manager class.

*typeid* is a "type identifier" which is used to identify a particular
type of shared object.  This must be a string.

*callable* is a callable used for creating objects for this type
identifier.  If a manager instance will be connected to the
server using the `connect()` method, or if the
*create_method* argument is `False` then this can be left as
`None`.

*proxytype* is a subclass of `BaseProxy` which is used to create
proxies for shared objects with this *typeid*.  If `None` then a proxy
class is created automatically.

*exposed* is used to specify a sequence of method names which proxies for
this typeid should be allowed to access using
`BaseProxy._callmethod()`.  (If *exposed* is `None` then
`proxytype._exposed_` is used instead if it exists.)  In the case
where no exposed list is specified, all "public methods" of the shared
object will be accessible.  (Here a "public method" means any attribute
which has a `__call__()` method and whose name does not begin
with `'_'`.)

*method_to_typeid* is a mapping used to specify the return type of those
exposed methods which should return a proxy.  It maps method names to
typeid strings.  (If *method_to_typeid* is `None` then
`proxytype._method_to_typeid_` is used instead if it exists.)  If a
method's name is not a key of this mapping or if the mapping is `None`
then the object returned by the method will be copied by value.

*create_method* determines whether a method should be created with name
*typeid* which can be used to tell the server process to create a new
shared object and return a proxy for it.  By default it is `True`.

`BaseManager` instances also have one read-only property:

### `address`

The address used by the manager.

> *Changed in version 3.3.*
> Manager objects support the context management protocol -- see
> typecontextmanager.  `__enter__()` starts the
> server process (if it has not already started) and then returns the
> manager object.  `__exit__()` calls `shutdown()`.
> In previous versions `__enter__()` did not start the
> manager's server process if it was not already started.

### class `SyncManager`

A subclass of `BaseManager` which can be used for the synchronization
of processes.  Objects of this type are returned by
`multiprocessing.Manager()`.

Its methods create and return multiprocessing-proxy_objects for a
number of commonly used data types to be synchronized across processes.
This notably includes shared lists and dictionaries.

### `Barrier(parties[, action[, timeout]])`

Create a shared `threading.Barrier` object and return a
proxy for it.

> *Added in version 3.3.*

### `BoundedSemaphore([value])`

Create a shared `threading.BoundedSemaphore` object and return a
proxy for it.

### `Condition([lock])`

Create a shared `threading.Condition` object and return a proxy for
it.

If *lock* is supplied then it should be a proxy for a
`threading.Lock` or `threading.RLock` object.

> *Changed in version 3.3.*
> The `wait_for()` method was added.

### `Event()`

Create a shared `threading.Event` object and return a proxy for it.

### `Lock()`

Create a shared `threading.Lock` object and return a proxy for it.

### `Namespace()`

Create a shared `Namespace` object and return a proxy for it.

### `Queue([maxsize])`

Create a shared `queue.Queue` object and return a proxy for it.

### `RLock()`

Create a shared `threading.RLock` object and return a proxy for it.

### `Semaphore([value])`

Create a shared `threading.Semaphore` object and return a proxy for
it.

### `Array(typecode, sequence)`

Create an array and return a proxy for it.

### `Value(typecode, value)`

Create an object with a writable `value` attribute and return a proxy
for it.

### `dict()`

```python
dict(mapping)
dict(sequence)
```

Create a shared `dict` object and return a proxy for it.

### `list()`

```python
list(sequence)
```

Create a shared `list` object and return a proxy for it.

### `set()`

```python
set(sequence)
set(mapping)
```

Create a shared `set` object and return a proxy for it.

> *Added in version 3.14.*
> `set` support was added.

> *Changed in version 3.6.*
> Shared objects are capable of being nested.  For example, a shared
> container object such as a shared list can contain other shared objects
> which will all be managed and synchronized by the `SyncManager`.
