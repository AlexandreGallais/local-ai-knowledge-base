---
title: "Event loop (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-eventloop.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Event loop (part 5 of 6)

### Executing code in thread or process pools

loop.run_in_executor(executor, func, *args)

Arrange for *func* to be called in the specified executor
passing *args* as positional arguments.

The *executor* argument should be an `concurrent.futures.Executor`
instance. The default executor is used if *executor* is `None`.
The default executor can be set by `loop.set_default_executor()`,
otherwise, a `concurrent.futures.ThreadPoolExecutor` will be
lazy-initialized and used by `run_in_executor()` if needed.

Example:

```
import asyncio
import concurrent.futures

def blocking_io():
    # File operations (such as logging) can block the
    # event loop: run them in a thread pool.
    with open('/dev/urandom', 'rb') as f:
        return f.read(100)

def cpu_bound():
    # CPU-bound operations will block the event loop:
    # in general it is preferable to run them in a
    # process pool.
    return sum(i * i for i in range(10 ** 7))

async def main():
    loop = asyncio.get_running_loop()

    ## Options:

    # 1. Run in the default loop's executor:
    result = await loop.run_in_executor(
        None, blocking_io)
    print('default thread pool', result)

    # 2. Run in a custom thread pool:
    with concurrent.futures.ThreadPoolExecutor() as pool:
        result = await loop.run_in_executor(
            pool, blocking_io)
        print('custom thread pool', result)

    # 3. Run in a custom process pool:
    with concurrent.futures.ProcessPoolExecutor() as pool:
        result = await loop.run_in_executor(
            pool, cpu_bound)
        print('custom process pool', result)

    # 4. Run in a custom interpreter pool:
    with concurrent.futures.InterpreterPoolExecutor() as pool:
        result = await loop.run_in_executor(
            pool, cpu_bound)
        print('custom interpreter pool', result)

if __name__ == '__main__':
    asyncio.run(main())
```

Note that the entry point guard (`if __name__ == '__main__'`)
is required for option 3 due to the peculiarities of `multiprocessing`,
which is used by `ProcessPoolExecutor`.
See Safe importing of main module.

This method returns a `asyncio.Future` object.

Use `functools.partial()` :ref:`to pass <example-value> arguments
<asyncio-pass-keywords>` to *func*.

> *Changed in version 3.5.3.*
> `loop.run_in_executor()` no longer configures the
> `max_workers` of the thread pool executor it creates, instead
> leaving it up to the thread pool executor
> (`ThreadPoolExecutor`) to set the
> default.

### `loop.set_default_executor(executor)`

Set *executor* as the default executor used by `run_in_executor()`.
*executor* must be an instance of
`ThreadPoolExecutor`, which includes
`InterpreterPoolExecutor`.

> *Changed in version 3.11.*
> *executor* must be an instance of
> `ThreadPoolExecutor`.

### Error handling API

Allows customizing how exceptions are handled in the event loop.

### `loop.set_exception_handler(handler)`

Set *handler* as the new event loop exception handler.

If *handler* is `None`, the default exception handler will
be set.  Otherwise, *handler* must be a callable with the signature
matching `(loop, context)`, where `loop`
is a reference to the active event loop, and `context`
is a `dict` object containing the details of the exception
(see `call_exception_handler()` documentation for details
about context).

If the handler is called on behalf of a `Task` or
`Handle`, it is run in the
`contextvars.Context` of that task or callback handle.

> *Changed in version 3.12.*
> The handler may be called in the `Context`
> of the task or handle where the exception originated.

### `loop.get_exception_handler()`

Return the current exception handler, or `None` if no custom
exception handler was set.

> *Added in version 3.5.2.*

### `loop.default_exception_handler(context)`

Default exception handler.

This is called when an exception occurs and no exception
handler is set. This can be called by a custom exception
handler that wants to defer to the default handler behavior.

*context* parameter has the same meaning as in
`call_exception_handler()`.

### `loop.call_exception_handler(context)`

Call the current event loop exception handler.

*context* is a `dict` object containing the following keys
(new keys may be introduced in future Python versions):

- 'message': Error message;
- 'exception' (optional): Exception object;
- 'future' (optional): `asyncio.Future` instance;
- 'task' (optional): `asyncio.Task` instance;
- 'handle' (optional): `asyncio.Handle` instance;
- 'protocol' (optional): Protocol instance;
- 'transport' (optional): Transport instance;
- 'socket' (optional): `socket.socket` instance;
- 'source_traceback' (optional): Traceback of the source;
- 'handle_traceback' (optional): Traceback of the handle;
- 'asyncgen' (optional): Asynchronous generator that caused
the exception.

> **Note:** This method should not be overloaded in subclassed
> event loops.  For custom exception handling, use
> the `set_exception_handler()` method.

### `loop.get_debug()`

Get the debug mode (`bool`) of the event loop.

The default value is `True` if the environment variable
`PYTHONASYNCIODEBUG` is set to a non-empty string, `False`
otherwise.

### `loop.set_debug(enabled: bool)`

Set the debug mode of the event loop.

> *Changed in version 3.7.*
> The new Python Development Mode can now also be used
> to enable the debug mode.

### `loop.slow_callback_duration`

This attribute can be used to set the
minimum execution duration in seconds that is considered "slow".
When debug mode is enabled, "slow" callbacks are logged.

Default value is 100 milliseconds.

> **See also:** The debug mode of asyncio.

### Running subprocesses

Methods described in this subsections are low-level.  In regular
async/await code consider using the high-level
`asyncio.create_subprocess_shell()` and
`asyncio.create_subprocess_exec()` convenience functions instead.

> **Note:** On Windows, the default event loop `ProactorEventLoop` supports
> subprocesses, whereas `SelectorEventLoop` does not. See
> Subprocess Support on Windows for
> details.

### `loop.subprocess_exec(protocol_factory, *args, \`

```python
stdin=subprocess.PIPE, stdout=subprocess.PIPE, \
stderr=subprocess.PIPE, **kwargs)
```

Create a subprocess from one or more string arguments specified by
*args*.

*args* must be a list of strings represented by:

- `str`;
- or `bytes`, encoded to the
filesystem encoding.

The first string specifies the program executable,
and the remaining strings specify the arguments.  Together, string
arguments form the `argv` of the program.

This is similar to the standard library `subprocess.Popen`
class called with `shell=False` and the list of strings passed as
the first argument; however, where `Popen` takes
a single argument which is list of strings, *subprocess_exec*
takes multiple string arguments.

The *protocol_factory* must be a callable returning a subclass of the
`asyncio.SubprocessProtocol` class.

Other parameters:

- *stdin* can be any of these:

- a file-like object
- an existing file descriptor (a positive integer), for example those created with `os.pipe()`
- the `subprocess.PIPE` constant (default) which will create a new
pipe and connect it,
- the value `None` which will make the subprocess inherit the file
descriptor from this process
- the `subprocess.DEVNULL` constant which indicates that the
special `os.devnull` file will be used

- *stdout* can be any of these:

- a file-like object
- the `subprocess.PIPE` constant (default) which will create a new
pipe and connect it,
- the value `None` which will make the subprocess inherit the file
descriptor from this process
- the `subprocess.DEVNULL` constant which indicates that the
special `os.devnull` file will be used

- *stderr* can be any of these:

- a file-like object
- the `subprocess.PIPE` constant (default) which will create a new
pipe and connect it,
- the value `None` which will make the subprocess inherit the file
descriptor from this process
- the `subprocess.DEVNULL` constant which indicates that the
special `os.devnull` file will be used
- the `subprocess.STDOUT` constant which will connect the standard
error stream to the process' standard output stream

- All other keyword arguments are passed to `subprocess.Popen`
without interpretation, except for *bufsize*, *universal_newlines*,
*shell*, *text*, *encoding* and *errors*, which should not be specified
at all.

The `asyncio` subprocess API does not support decoding the streams
as text. `bytes.decode()` can be used to convert the bytes returned
from the stream to text.

If a file-like object passed as *stdin*, *stdout* or *stderr* represents a
pipe, then the other side of this pipe should be registered with
`connect_write_pipe()` or `connect_read_pipe()` for use
with the event loop.

See the constructor of the `subprocess.Popen` class
for documentation on other arguments.

Returns a pair of `(transport, protocol)`, where *transport*
conforms to the `asyncio.SubprocessTransport` base class and
*protocol* is an object instantiated by the *protocol_factory*.

If the transport is closed or is garbage collected, the child process
is killed if it is still running.

### `loop.subprocess_shell(protocol_factory, cmd, *, \`

```python
stdin=subprocess.PIPE, stdout=subprocess.PIPE, \
stderr=subprocess.PIPE, **kwargs)
```

Create a subprocess from *cmd*, which can be a `str` or a
`bytes` string encoded to the
filesystem encoding,
using the platform's "shell" syntax.

This is similar to the standard library `subprocess.Popen`
class called with `shell=True`.

The *protocol_factory* must be a callable returning a subclass of the
`SubprocessProtocol` class.

See `subprocess_exec()` for more details about
the remaining arguments.

Returns a pair of `(transport, protocol)`, where *transport*
conforms to the `SubprocessTransport` base class and
*protocol* is an object instantiated by the *protocol_factory*.

If the transport is closed or is garbage collected, the child process
is killed if it is still running.

> **Note:** It is the application's responsibility to ensure that all whitespace
> and special characters are quoted appropriately to avoid `shell injection
> <https://en.wikipedia.org/wiki/Shell_injection#Shell_injection>`_
> vulnerabilities. The `shlex.quote()` function can be used to
> properly escape whitespace and special characters in strings that
> are going to be used to construct shell commands.

## Callback handles

### class `Handle`

A callback wrapper object returned by `loop.call_soon()`,
`loop.call_soon_threadsafe()`.

### `get_context()`

Return the `contextvars.Context` object
associated with the handle.

> *Added in version 3.12.*

### `cancel()`

Cancel the callback.  If the callback has already been canceled
or executed, this method has no effect.

### `cancelled()`

Return `True` if the callback was cancelled.

> *Added in version 3.7.*

### class `TimerHandle`

A callback wrapper object returned by `loop.call_later()`,
and `loop.call_at()`.

This class is a subclass of `Handle`.

### `when()`

Return a scheduled callback time as `float` seconds.

The time is an absolute timestamp, using the same time
reference as `loop.time()`.

> *Added in version 3.7.*

## Server objects

Server objects are created by `loop.create_server()`,
`loop.create_unix_server()`, `start_server()`,
and `start_unix_server()` functions.

Do not instantiate the `Server` class directly.

### class `Server`

*Server* objects are asynchronous context managers.  When used in an
`async with` statement, it's guaranteed that the Server object is
closed and not accepting new connections when the `async with`
statement is completed:

```
srv = await loop.create_server(...)

async with srv:
    # some code

# At this point, srv is closed and no longer accepts new connections.
```

> *Changed in version 3.7.*
> Server object is an asynchronous context manager since Python 3.7.

> *Changed in version 3.11.*
> This class was exposed publicly as `asyncio.Server` in Python 3.9.11, 3.10.3 and 3.11.

### `close()`

Stop serving: close listening sockets and set the `sockets`
attribute to `None`.

The sockets that represent existing incoming client connections
are left open.

The server is closed asynchronously; use the `wait_closed()`
coroutine to wait until the server is closed (and no more
connections are active).

### `close_clients()`

Close all existing incoming client connections.

Calls `close()` on all associated
transports.

`close()` should be called before `close_clients()` when
closing the server to avoid races with new clients connecting.

> *Added in version 3.13.*

### `abort_clients()`

Close all existing incoming client connections immediately,
without waiting for pending operations to complete.

Calls `abort()` on all associated
transports.

`close()` should be called before `abort_clients()` when
closing the server to avoid races with new clients connecting.

> *Added in version 3.13.*

### `get_loop()`

Return the event loop associated with the server object.

> *Added in version 3.7.*

### `start_serving()`

Start accepting connections.

This method is idempotent, so it can be called when
the server is already serving.

The *start_serving* keyword-only parameter to
`loop.create_server()` and
`asyncio.start_server()` allows creating a Server object
that is not accepting connections initially.  In this case
`Server.start_serving()`, or `Server.serve_forever()` can be used
to make the Server start accepting connections.

> *Added in version 3.7.*

### `serve_forever()`

Start accepting connections until the coroutine is cancelled.
Cancellation of `serve_forever` task causes the server
to be closed.

This method can be called if the server is already accepting
connections.  Only one `serve_forever` task can exist per
one *Server* object.

Example:

```
async def client_connected(reader, writer):
    # Communicate with the client with
    # reader/writer streams.  For example:
    await reader.readline()

async def main(host, port):
    srv = await asyncio.start_server(
        client_connected, host, port)
    await srv.serve_forever()

asyncio.run(main('127.0.0.1', 0))
```

> *Added in version 3.7.*

### `is_serving()`

Return `True` if the server is accepting new connections.

> *Added in version 3.7.*

### `wait_closed()`

Wait until the `close()` method completes and all active
connections have finished.

> *Changed in version 3.12.*
> `wait_closed()` now waits until the server is closed and
> all active connections have finished.  Previously, it returned
> immediately if the server was already closed, even if
> connections were still active.

### `sockets`

List of socket-like objects, `asyncio.trsock.TransportSocket`, which
the server is listening on.

> *Changed in version 3.7.*
> Prior to Python 3.7 `Server.sockets` used to return an
> internal list of server sockets directly.  In 3.7 a copy
> of that list is returned.
