---
title: "multiprocessing --- Process-based parallelism (part 9 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 9 of 10)

### `join()`

Wait for the worker processes to exit.  One must call `close()` or
`terminate()` before using `join()`.

> *Changed in version 3.3.*
> Pool objects now support the context management protocol -- see
> typecontextmanager.  `__enter__()` returns the
> pool object, and `__exit__()` calls `terminate()`.

### class `AsyncResult`

The class of the result returned by `Pool.apply_async()` and
`Pool.map_async()`.

### `get([timeout])`

Return the result when it arrives.  If *timeout* is not `None` and the
result does not arrive within *timeout* seconds then
`multiprocessing.TimeoutError` is raised.  If the remote call raised
an exception then that exception will be reraised by `get()`.

### `wait([timeout])`

Wait until the result is available or until *timeout* seconds pass.

### `ready()`

Return whether the call has completed.

### `successful()`

Return whether the call completed without raising an exception.  Will
raise `ValueError` if the result is not ready.

> *Changed in version 3.7.*
> If the result is not ready, `ValueError` is raised instead of
> `AssertionError`.

The following example demonstrates the use of a pool:

```
from multiprocessing import Pool
import time

def f(x):
    return x*x

if __name__ == '__main__':
    with Pool(processes=4) as pool:         # start 4 worker processes
        result = pool.apply_async(f, (10,)) # evaluate "f(10)" asynchronously in a single process
        print(result.get(timeout=1))        # prints "100" unless your computer is *very* slow

        print(pool.map(f, range(10)))       # prints "[0, 1, 4,..., 81]"

        it = pool.imap(f, range(10))
        print(next(it))                     # prints "0"
        print(next(it))                     # prints "1"
        print(it.next(timeout=1))           # prints "4" unless your computer is *very* slow

        result = pool.apply_async(time.sleep, (10,))
        print(result.get(timeout=1))        # raises multiprocessing.TimeoutError
```

### Listeners and Clients

Module `multiprocessing.connection`.

Usually message passing between processes is done using queues or by using
`Connection` objects returned by
`Pipe()`.

However, the `multiprocessing.connection` module allows some extra
flexibility.  It basically gives a high level message oriented API for dealing
with sockets or Windows named pipes.  It also has support for *digest
authentication* using the `hmac` module, and for polling
multiple connections at the same time.

### `deliver_challenge(connection, authkey)`

Send a randomly generated message to the other end of the connection and wait
for a reply.

If the reply matches the digest of the message using *authkey* as the key
then a welcome message is sent to the other end of the connection.  Otherwise
`AuthenticationError` is raised.

### `answer_challenge(connection, authkey)`

Receive a message, calculate the digest of the message using *authkey* as the
key, and then send the digest back.

If a welcome message is not received, then
`AuthenticationError` is raised.

### `Client(address[, family[, authkey]])`

Attempt to set up a connection to the listener which is using address
*address*, returning a `Connection`.

The type of the connection is determined by *family* argument, but this can
generally be omitted since it can usually be inferred from the format of
*address*. (See multiprocessing-address-formats)

If *authkey* is given and not `None`, it should be a byte string and will be
used as the secret key for an HMAC-based authentication challenge. No
authentication is done if *authkey* is `None`.
`AuthenticationError` is raised if authentication fails.
See multiprocessing-auth-keys.

### class `Listener([address[, family[, backlog[, authkey]]]])`

A wrapper for a bound socket or Windows named pipe which is 'listening' for
connections.

*address* is the address to be used by the bound socket or named pipe of the
listener object.

> **Note:** If an address of '0.0.0.0' is used, the address will not be a connectable
> end point on Windows. If you require a connectable end-point,
> you should use '127.0.0.1'.

*family* is the type of socket (or named pipe) to use.  This can be one of
the strings `'AF_INET'` (for a TCP socket), `'AF_UNIX'` (for a Unix
domain socket) or `'AF_PIPE'` (for a Windows named pipe).  Of these only
the first is guaranteed to be available.  If *family* is `None` then the
family is inferred from the format of *address*.  If *address* is also
`None` then a default is chosen.  This default is the family which is
assumed to be the fastest available.  See
multiprocessing-address-formats.  Note that if *family* is
`'AF_UNIX'` and address is `None` then the socket will be created in a
private temporary directory created using `tempfile.mkstemp()`.

If the listener object uses a socket then *backlog* (1 by default) is passed
to the `listen()` method of the socket once it has been
bound.

If *authkey* is given and not `None`, it should be a byte string and will be
used as the secret key for an HMAC-based authentication challenge. No
authentication is done if *authkey* is `None`.
`AuthenticationError` is raised if authentication fails.
See multiprocessing-auth-keys.

### `accept()`

Accept a connection on the bound socket or named pipe of the listener
object and return a `Connection` object.
If authentication is attempted and fails, then
`AuthenticationError` is raised.

### `close()`

Close the bound socket or named pipe of the listener object.  This is
called automatically when the listener is garbage collected.  However it
is advisable to call it explicitly.

Listener objects have the following read-only properties:

### `address`

The address which is being used by the Listener object.

### `last_accepted`

The address from which the last accepted connection came.  If this is
unavailable then it is `None`.

> *Changed in version 3.3.*
> Listener objects now support the context management protocol -- see
> typecontextmanager.  `__enter__()` returns the
> listener object, and `__exit__()` calls `close()`.

### `wait(object_list, timeout=None)`

Wait till an object in *object_list* is ready.  Returns the list of
those objects in *object_list* which are ready.  If *timeout* is a
float then the call blocks for at most that many seconds.  If
*timeout* is `None` then it will block for an unlimited period.
A negative timeout is equivalent to a zero timeout.

For both POSIX and Windows, an object can appear in *object_list* if
it is

- a readable `Connection` object;
- a connected and readable `socket.socket` object; or
- the `sentinel` attribute of a
`Process` object.

A connection or socket object is ready when there is data available
to be read from it, or the other end has been closed.

**POSIX**: `wait(object_list, timeout)` almost equivalent
`select.select(object_list, [], [], timeout)`.  The difference is
that, if `select.select()` is interrupted by a signal, it can
raise `OSError` with an error number of `EINTR`, whereas
`wait()` will not.

**Windows**: An item in *object_list* must either be an integer
handle which is waitable (according to the definition used by the
documentation of the Win32 function `WaitForMultipleObjects()`)
or it can be an object with a `fileno()` method which returns a
socket handle or pipe handle.  (Note that pipe handles and socket
handles are **not** waitable handles.)

> *Added in version 3.3.*

**Examples**

The following server code creates a listener which uses `'<example-value>'` as
an authentication key.  It then waits for a connection and sends some data to
the client:

```
from multiprocessing.connection import Listener
from array import array

address = ('localhost', 6000)     # family is deduced to be 'AF_INET'

with Listener(address, authkey=b'<example-value>') as listener:
    with listener.accept() as conn:
        print('connection accepted from', listener.last_accepted)

        conn.send([2.25, None, 'junk', float])

        conn.send_bytes(b'hello')

        conn.send_bytes(array('i', [42, 1729]))
```

The following code connects to the server and receives some data from the
server:

```
from multiprocessing.connection import Client
from array import array

address = ('localhost', 6000)

with Client(address, authkey=b'<example-value>') as conn:
    print(conn.recv())                  # => [2.25, None, 'junk', float]

    print(conn.recv_bytes())            # => 'hello'

    arr = array('i', [0, 0, 0, 0, 0])
    print(conn.recv_bytes_into(arr))    # => 8
    print(arr)                          # => array('i', [42, 1729, 0, 0, 0])
```

The following code uses `wait()` to
wait for messages from multiple processes at once:

```
from multiprocessing import Process, Pipe, current_process
from multiprocessing.connection import wait

def foo(w):
    for i in range(10):
        w.send((i, current_process().name))
    w.close()

if __name__ == '__main__':
    readers = []

    for i in range(4):
        r, w = Pipe(duplex=False)
        readers.append(r)
        p = Process(target=foo, args=(w,))
        p.start()
        # We close the writable end of the pipe now to be sure that
        # p is the only process which owns a handle for it.  This
        # ensures that when p closes its handle for the writable end,
        # wait() will promptly report the readable end as being ready.
        w.close()

    while readers:
        for r in wait(readers):
            try:
                msg = r.recv()
            except EOFError:
                readers.remove(r)
            else:
                print(msg)
```

#### Address Formats

- An `'AF_INET'` address is a tuple of the form `(hostname, port)` where
*hostname* is a string and *port* is an integer.

- An `'AF_UNIX'` address is a string representing a filename on the
filesystem.

- An `'AF_PIPE'` address is a string of the form
`r'\\\.\pipe\\{PipeName}'`.  To use `Client()` to connect to a named
pipe on a remote computer called *ServerName* one should use an address of the
form `r'\\\\{ServerName}\pipe\\{PipeName}'` instead.

Note that any string beginning with two backslashes is assumed by default to be
an `'AF_PIPE'` address rather than an `'AF_UNIX'` address.

### Authentication keys

When one uses `Connection.recv()`, the
data received is automatically
unpickled. Unfortunately unpickling data from an untrusted source is a security
risk. Therefore `Listener` and `Client()` use the `hmac` module
to provide digest authentication.

An authentication key is a byte string which can be thought of as a
password: once a connection is established both ends will demand proof
that the other knows the authentication key.  (Demonstrating that both
ends are using the same key does **not** involve sending the key over
the connection.)

If authentication is requested but no authentication key is specified then the
return value of `current_process().authkey` is used (see
`Process`).  This value will be automatically inherited by
any `Process` object that the current process creates.
This means that (by default) all processes of a multi-process program will share
a single authentication key which can be used when setting up connections
between themselves.

Suitable authentication keys can also be generated by using `os.urandom()`.

This authentication protects `Listener` and `Client()` connections,
which are reachable by address.  It is not applied to the anonymous pipes
created by `Pipe()` or used internally by
`Queue`.
`multiprocessing` treats all local processes running as the same user as
trusted; on most operating systems such processes can access each other's pipe
file descriptors regardless.  Applications that require isolation between
processes of the same user must arrange it at the operating-system level --
for example, by running workers under a different user account or in a sandbox.

### Logging

Some support for logging is available.  Note, however, that the `logging`
package does not use process shared locks so it is possible (depending on the
handler type) for messages from different processes to get mixed up.

### `get_logger()`

Returns the logger used by `multiprocessing`.  If necessary, a new one
will be created.

When first created the logger has level `logging.NOTSET` and no
default handler. Messages sent to this logger will not by default propagate
to the root logger.

Note that on Windows child processes will only inherit the level of the
parent process's logger -- any other customization of the logger will not be
inherited.

### `log_to_stderr(level=None)`

This function performs a call to `get_logger()` but in addition to
returning the logger created by get_logger, it adds a handler which sends
output to `sys.stderr` using format
`'[%(levelname)s/%(processName)s] %(message)s'`.
You can modify `levelname` of the logger by passing a `level` argument.

Below is an example session with logging turned on:

```
>>> import multiprocessing, logging
>>> logger = multiprocessing.log_to_stderr()
>>> logger.setLevel(logging.INFO)
>>> logger.warning('doomed')
[WARNING/MainProcess] doomed
>>> m = multiprocessing.Manager()
[INFO/SyncManager-...] child process calling self.run()
[INFO/SyncManager-...] created temp directory /.../pymp-...
[INFO/SyncManager-...] manager serving at '/.../listener-...'
>>> del m
[INFO/MainProcess] sending shutdown message to manager
[INFO/SyncManager-...] manager exiting with exitcode 0
```

For a full table of logging levels, see the `logging` module.

### The `multiprocessing.dummy` module

Module `multiprocessing.dummy`.

`multiprocessing.dummy` replicates the API of `multiprocessing` but is
no more than a wrapper around the `threading` module.

In particular, the `Pool` function provided by `multiprocessing.dummy`
returns an instance of `ThreadPool`, which is a subclass of
`Pool` that supports all the same method calls but uses a pool of
worker threads rather than worker processes.
