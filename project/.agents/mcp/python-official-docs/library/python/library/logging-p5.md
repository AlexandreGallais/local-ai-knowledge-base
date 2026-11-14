---
title: "logging --- Logging facility for Python (part 5 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging --- Logging facility for Python (part 5 of 7)

## LogRecord attributes

The LogRecord has a number of attributes, most of which are derived from the
parameters to the constructor. (Note that the names do not always correspond
exactly between the LogRecord constructor parameters and the LogRecord
attributes.) These attributes can be used to merge data from the record into
the format string. The following table lists (in alphabetical order) the
attribute names, their meanings and the corresponding placeholder in a %-style
format string.

If you are using {}-formatting (`str.format()`), you can use
`{attrname}` as the placeholder in the format string. If you are using
$-formatting (`string.Template`), use the form `${attrname}`. In
both cases, of course, replace `attrname` with the actual attribute name
you want to use.

In the case of {}-formatting, you can specify formatting flags by placing them
after the attribute name, separated from it with a colon. For example: a
placeholder of `{msecs:03.0f}` would format a millisecond value of `4` as
`004`. Refer to the `str.format()` documentation for full details on
the options available to you.

```text
+----------------+-------------------------+-----------------------------------------------+
| Attribute name | Format                  | Description                                   |
+================+=========================+===============================================+
| args           | You shouldn't need to   | The tuple of arguments merged into ``msg`` to |
|                | format this yourself.   | produce ``message``, or a dict whose values   |
|                |                         | are used for the merge (when there is only one|
|                |                         | argument, and it is a dictionary).            |
+----------------+-------------------------+-----------------------------------------------+
| asctime        | ``%(asctime)s``         | Human-readable time when the                  |
|                |                         | :class:`LogRecord` was created.  By default   |
|                |                         | this is of the form '2003-07-08 16:49:45,896' |
|                |                         | (the numbers after the comma are millisecond  |
|                |                         | portion of the time).                         |
+----------------+-------------------------+-----------------------------------------------+
| created        | ``%(created)f``         | Time when the :class:`LogRecord` was created  |
|                |                         | (as returned by :func:`time.time_ns` / 1e9).  |
+----------------+-------------------------+-----------------------------------------------+
| exc_info       | You shouldn't need to   | Exception tuple (à la ``sys.exc_info``) or,   |
|                | format this yourself.   | if no exception has occurred, ``None``.       |
+----------------+-------------------------+-----------------------------------------------+
| exc_text       | You shouldn't need to   | Exception information formatted as a string.  |
|                | format this yourself.   | This is set when :meth:`Formatter.format` is  |
|                |                         | invoked, or ``None`` if no exception has      |
|                |                         | occurred.                                     |
+----------------+-------------------------+-----------------------------------------------+
| filename       | ``%(filename)s``        | Filename portion of ``pathname``.             |
+----------------+-------------------------+-----------------------------------------------+
| funcName       | ``%(funcName)s``        | Name of function containing the logging call. |
+----------------+-------------------------+-----------------------------------------------+
| levelname      | ``%(levelname)s``       | Text logging level for the message            |
|                |                         | (``'DEBUG'``, ``'INFO'``, ``'WARNING'``,      |
|                |                         | ``'ERROR'``, ``'CRITICAL'``).                 |
+----------------+-------------------------+-----------------------------------------------+
| levelno        | ``%(levelno)s``         | Numeric logging level for the message         |
|                |                         | (:const:`DEBUG`, :const:`INFO`,               |
|                |                         | :const:`WARNING`, :const:`ERROR`,             |
|                |                         | :const:`CRITICAL`).                           |
+----------------+-------------------------+-----------------------------------------------+
| lineno         | ``%(lineno)d``          | Source line number where the logging call was |
|                |                         | issued (if available).                        |
+----------------+-------------------------+-----------------------------------------------+
| message        | ``%(message)s``         | The logged message, computed as ``msg %       |
|                |                         | args``. This is set when                      |
|                |                         | :meth:`Formatter.format` is invoked.          |
+----------------+-------------------------+-----------------------------------------------+
| module         | ``%(module)s``          | Module (name portion of ``filename``).        |
+----------------+-------------------------+-----------------------------------------------+
| msecs          | ``%(msecs)d``           | Millisecond portion of the time when the      |
|                |                         | :class:`LogRecord` was created.               |
+----------------+-------------------------+-----------------------------------------------+
| msg            | You shouldn't need to   | The format string passed in the original      |
|                | format this yourself.   | logging call. Merged with ``args`` to         |
|                |                         | produce ``message``, or an arbitrary object   |
|                |                         | (see :ref:`arbitrary-object-messages`).       |
+----------------+-------------------------+-----------------------------------------------+
| name           | ``%(name)s``            | Name of the logger used to log the call.      |
+----------------+-------------------------+-----------------------------------------------+
| pathname       | ``%(pathname)s``        | Full pathname of the source file where the    |
|                |                         | logging call was issued (if available).       |
+----------------+-------------------------+-----------------------------------------------+
| process        | ``%(process)d``         | Process ID (if available).                    |
+----------------+-------------------------+-----------------------------------------------+
| processName    | ``%(processName)s``     | Process name (if available).                  |
+----------------+-------------------------+-----------------------------------------------+
| relativeCreated| ``%(relativeCreated)d`` | Time in milliseconds when the LogRecord was   |
|                |                         | created, relative to the time the logging     |
|                |                         | module was loaded.                            |
+----------------+-------------------------+-----------------------------------------------+
| stack_info     | You shouldn't need to   | Stack frame information (where available)     |
|                | format this yourself.   | from the bottom of the stack in the current   |
|                |                         | thread, up to and including the stack frame   |
|                |                         | of the logging call which resulted in the     |
|                |                         | creation of this record.                      |
+----------------+-------------------------+-----------------------------------------------+
| thread         | ``%(thread)d``          | Thread ID (if available).                     |
+----------------+-------------------------+-----------------------------------------------+
| threadName     | ``%(threadName)s``      | Thread name (if available).                   |
+----------------+-------------------------+-----------------------------------------------+
| taskName       | ``%(taskName)s``        | :class:`asyncio.Task` name (if available).    |
+----------------+-------------------------+-----------------------------------------------+
```

> *Changed in version 3.1.*
> *processName* was added.

> *Changed in version 3.12.*
> *taskName* was added.

## LoggerAdapter Objects

`LoggerAdapter` instances are used to conveniently pass <example-value>
information into logging calls. For a usage example, see the section on
adding contextual information to your logging output.

### class `LoggerAdapter(logger, extra=None, merge_extra=False)`

Returns an instance of `LoggerAdapter` initialized with an
underlying `Logger` instance, an optional dict-like object (*extra*),
and an optional boolean (*merge_extra*) indicating whether or not
the *extra* argument of individual log calls should be merged with
the `LoggerAdapter` extra.
The default behavior is to ignore the *extra* argument of individual log
calls and only use the one of the `LoggerAdapter` instance

### `process(msg, kwargs)`

Modifies the message and/or keyword arguments passed to a logging call in
order to insert contextual information. This implementation takes the object
passed as *extra* to the constructor and adds it to *kwargs* using key
'extra'. The return value is a (*msg*, *kwargs*) tuple which has the
(possibly modified) versions of the arguments passed in.

### `manager`

Delegates to the underlying `manager` on *logger*.

### `_log`

Delegates to the underlying `_log()` method on *logger*.

In addition to the above, `LoggerAdapter` supports the following
methods of `Logger`: `debug()`, `info()`,
`warning()`, `error()`, `exception()`,
`critical()`, `log()`, `isEnabledFor()`,
`getEffectiveLevel()`, `setLevel()` and
`hasHandlers()`. These methods have the same signatures as their
counterparts in `Logger`, so you can use the two types of instances
interchangeably.

> *Changed in version 3.2.*
> The `isEnabledFor()`, `getEffectiveLevel()`,
> `setLevel()` and `hasHandlers()` methods were added
> to `LoggerAdapter`.  These methods delegate to the underlying logger.

> *Changed in version 3.6.*
> Attribute `manager and method log()` were added, which
> delegate to the underlying logger and allow adapters to be nested.

> *Changed in version 3.10.*
> The *extra* argument is now optional.

> *Changed in version 3.13.*
> The *merge_extra* parameter was added.

## Thread Safety

The logging module is intended to be thread-safe without any special work
needing to be done by its clients. It achieves this through using threading
locks; there is one lock to serialize access to the module's shared data, and
each handler also creates a lock to serialize access to its underlying I/O.

If you are implementing asynchronous signal handlers using the `signal`
module, you may not be able to use logging from within such handlers. This is
because lock implementations in the `threading` module are not always
re-entrant, and so cannot be invoked from such signal handlers.
