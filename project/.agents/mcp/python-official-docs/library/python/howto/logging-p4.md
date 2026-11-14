---
title: "Logging HOWTO (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging HOWTO (part 4 of 4)

## Useful Handlers

In addition to the base `Handler` class, many useful subclasses are
provided:

1. `StreamHandler` instances send messages to streams (file-like
objects).

1. `FileHandler` instances send messages to disk files.

1. `BaseRotatingHandler` is the base class for handlers that
rotate log files at a certain point. It is not meant to be  instantiated
directly. Instead, use `RotatingFileHandler` or
`TimedRotatingFileHandler`.

1. `RotatingFileHandler` instances send messages to disk
files, with support for maximum log file sizes and log file rotation.

1. `TimedRotatingFileHandler` instances send messages to
disk files, rotating the log file at certain timed intervals.

1. `SocketHandler` instances send messages to TCP/IP
sockets. Since 3.4, Unix domain sockets are also supported.

1. `DatagramHandler` instances send messages to UDP
sockets. Since 3.4, Unix domain sockets are also supported.

1. `SMTPHandler` instances send messages to a designated
email address.

1. `SysLogHandler` instances send messages to a Unix
syslog daemon, possibly on a remote machine.

1. `NTEventLogHandler` instances send messages to a
Windows NT/2000/XP event log.

1. `MemoryHandler` instances send messages to a buffer
in memory, which is flushed whenever specific criteria are met.

1. `HTTPHandler` instances send messages to an HTTP
server using either `GET` or `POST` semantics.

1. `WatchedFileHandler` instances watch the file they are
logging to. If the file changes, it is closed and reopened using the file
name. This handler is only useful on Unix-like systems; Windows does not
support the underlying mechanism used.

1. `QueueHandler` instances send messages to a queue, such as
those implemented in the `queue` or `multiprocessing` modules.

1. `NullHandler` instances do nothing with error messages. They are used
by library developers who want to use logging, but want to avoid the 'No
handlers could be found for logger *XXX*' message which can be displayed if
the library user has not configured logging. See library-config for
more information.

> *Added in version 3.1.*
> The `NullHandler` class.

> *Added in version 3.2.*
> The `QueueHandler` class.

The `NullHandler`, `StreamHandler` and `FileHandler`
classes are defined in the core logging package. The other handlers are
defined in a sub-module, `logging.handlers`. (There is also another
sub-module, `logging.config`, for configuration functionality.)

Logged messages are formatted for presentation through instances of the
`Formatter` class. They are initialized with a format string suitable for
use with the % operator and a dictionary.

For formatting multiple messages in a batch, instances of
`BufferingFormatter` can be used. In addition to the format
string (which is applied to each message in the batch), there is provision for
header and trailer format strings.

When filtering based on logger level and/or handler level is not enough,
instances of `Filter` can be added to both `Logger` and
`Handler` instances (through their `addFilter()` method).
Before deciding to process a message further, both loggers and handlers consult
all their filters for permission. If any filter returns a false value, the
message is not processed further.

The basic `Filter` functionality allows filtering by specific logger
name. If this feature is used, messages sent to the named logger and its
children are allowed through the filter, and all others dropped.

## Exceptions raised during logging

The logging package is designed to swallow exceptions which occur while logging
in production. This is so that errors which occur while handling logging events
- such as logging misconfiguration, network or other similar errors - do not
cause the application using logging to terminate prematurely.

`SystemExit` and `KeyboardInterrupt` exceptions are never
swallowed. Other exceptions which occur during the `emit()` method
of a `Handler` subclass are passed to its `handleError()`
method.

The default implementation of `handleError()` in `Handler`
checks to see if a module-level variable, `raiseExceptions`, is set. If
set, a traceback is printed to `sys.stderr`. If not set, the exception is
swallowed.

> **Note:** The default value of `raiseExceptions` is `True`. This is
> because during development, you typically want to be notified of any
> exceptions that occur. It's advised that you set `raiseExceptions` to
> `False` for production usage.

## Using arbitrary objects as messages

In the preceding sections and examples, it has been assumed that the message
passed when logging the event is a string. However, this is not the only
possibility. You can pass an arbitrary object as a message, and its
`__str__()` method will be called when the logging system needs to
convert it to a string representation. In fact, if you want to, you can avoid
computing a string representation altogether - for example, the
`SocketHandler` emits an event by pickling it and sending it
over the wire.

## Optimization

Formatting of message arguments is deferred until it cannot be avoided.
However, computing the arguments passed to the logging method can also be
expensive, and you may want to avoid doing it if the logger will just throw
away your event. To decide what to do, you can call the
`isEnabledFor()` method which takes a level argument and returns
true if the event would be created by the Logger for that level of call.
You can write code like this:

```
if logger.isEnabledFor(logging.DEBUG):
    logger.debug('Message with %s, %s', expensive_func1(),
                                        expensive_func2())
```

so that if the logger's threshold is set above `DEBUG`, the calls to
`expensive_func1` and `expensive_func2` are never made.

> **Note:** In some cases, `isEnabledFor()` can itself be more
> expensive than you'd like (e.g. for deeply nested loggers where an explicit
> level is only set high up in the logger hierarchy). In such cases (or if you
> want to avoid calling a method in tight loops), you can cache the result of a
> call to `isEnabledFor()` in a local or instance variable, and use
> that instead of calling the method each time. Such a cached value would only
> need to be recomputed when the logging configuration changes dynamically
> while the application is running (which is not all that common).

There are other optimizations which can be made for specific applications which
need more precise control over what logging information is collected. Here's a
list of things you can do to avoid processing during logging which you don't
need:

```text
+-----------------------------------------------------+---------------------------------------------------+
| What you don't want to collect                      | How to avoid collecting it                        |
+=====================================================+===================================================+
| Information about where calls were made from.       | Set ``logging._srcfile`` to ``None``.             |
|                                                     | This avoids calling :func:`sys._getframe`, which  |
|                                                     | may help to speed up your code in environments    |
|                                                     | like PyPy (which can't speed up code that uses    |
|                                                     | :func:`sys._getframe`).                           |
+-----------------------------------------------------+---------------------------------------------------+
| Threading information.                              | Set ``logging.logThreads`` to ``False``.          |
+-----------------------------------------------------+---------------------------------------------------+
| Current process ID (:func:`os.getpid`)              | Set ``logging.logProcesses`` to ``False``.        |
+-----------------------------------------------------+---------------------------------------------------+
| Current process name when using ``multiprocessing`` | Set ``logging.logMultiprocessing`` to ``False``.  |
| to manage multiple processes.                       |                                                   |
+-----------------------------------------------------+---------------------------------------------------+
| Current :class:`asyncio.Task` name when using       | Set ``logging.logAsyncioTasks`` to ``False``.     |
| ``asyncio``.                                        |                                                   |
+-----------------------------------------------------+---------------------------------------------------+
```

Also note that the core logging module only includes the basic handlers. If
you don't import `logging.handlers` and `logging.config`, they won't
take up any memory.

## Other resources

> **See also:** Module `logging`
> API reference for the logging module.
>
> Module `logging.config`
> Configuration API for the logging module.
>
> Module `logging.handlers`
> Useful handlers included with the logging module.
>
> A logging cookbook
