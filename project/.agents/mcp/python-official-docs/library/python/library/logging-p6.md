---
title: "logging --- Logging facility for Python (part 6 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging --- Logging facility for Python (part 6 of 7)

## Module-Level Functions

In addition to the classes described above, there are a number of module-level
functions.

### `getLogger(name=None)`

Return a logger with the specified name or, if name is `None`, return the
root logger of the hierarchy. If specified, the name is typically a
dot-separated hierarchical name like *'a'*, *'a.b'* or *'a.b.c.d'*. Choice
of these names is entirely up to the developer who is using logging, though
it is recommended that `__name__` be used unless you have a specific
reason for not doing that, as mentioned in logger.

All calls to this function with a given name return the same logger instance.
This means that logger instances never need to be passed between different parts
of an application.

### `getLoggerClass()`

Return either the standard `Logger` class, or the last class passed to
`setLoggerClass()`. This function may be called from within a new class
definition, to ensure that installing a customized `Logger` class will
not undo customizations already applied by other code. For example:

```
class MyLogger(logging.getLoggerClass()):
    # ... override behaviour here
```

### `getLogRecordFactory()`

Return a callable which is used to create a `LogRecord`.

> *Added in version 3.2.*
> This function has been provided, along with `setLogRecordFactory()`,
> to allow developers more control over how the `LogRecord`
> representing a logging event is constructed.

See `setLogRecordFactory()` for more information about the how the
factory is called.

### `debug(msg, *args, **kwargs)`

This is a convenience function that calls `Logger.debug()`, on the root
logger. The handling of the arguments is in every way identical
to what is described in that method.

The only difference is that if the root logger has no handlers, then
`basicConfig()` is called, prior to calling `debug` on the root logger.

For very short scripts or quick demonstrations of `logging` facilities,
`debug` and the other module-level functions may be convenient. However,
most programs will want to carefully and explicitly control the logging
configuration, and should therefore prefer creating a module-level logger and
calling `Logger.debug()` (or other level-specific methods) on it, as
described at the beginning of this documentation.

### `info(msg, *args, **kwargs)`

Logs a message with level `INFO` on the root logger. The arguments and behavior
are otherwise the same as for `debug()`.

### `warning(msg, *args, **kwargs)`

Logs a message with level `WARNING` on the root logger. The arguments and behavior
are otherwise the same as for `debug()`.

> **Note:** There is an obsolete function `warn` which is functionally
> identical to `warning`. As `warn` is deprecated, please do not use
> it - use `warning` instead.

### `error(msg, *args, **kwargs)`

Logs a message with level `ERROR` on the root logger. The arguments and behavior
are otherwise the same as for `debug()`.

### `critical(msg, *args, **kwargs)`

Logs a message with level `CRITICAL` on the root logger. The arguments and behavior
are otherwise the same as for `debug()`.

### `exception(msg, *args, **kwargs)`

Logs a message with level `ERROR` on the root logger. The arguments and behavior
are otherwise the same as for `debug()`. Exception info is added to the logging
message. This function should only be called from an exception handler.

### `log(level, msg, *args, **kwargs)`

Logs a message with level *level* on the root logger. The arguments and behavior
are otherwise the same as for `debug()`.

### `disable(level=CRITICAL)`

Provides an overriding level *level* for all loggers which takes precedence over
the logger's own level. When the need arises to temporarily throttle logging
output down across the whole application, this function can be useful. Its
effect is to disable all logging calls of severity *level* and below, so that
if you call it with a value of INFO, then all INFO and DEBUG events would be
discarded, whereas those of severity WARNING and above would be processed
according to the logger's effective level. If
`logging.disable(logging.NOTSET)` is called, it effectively removes this
overriding level, so that logging output again depends on the effective
levels of individual loggers.

Note that if you have defined any custom logging level higher than
`CRITICAL` (this is not recommended), you won't be able to rely on the
default value for the *level* parameter, but will have to explicitly supply a
suitable value.

> *Changed in version 3.7.*
> The *level* parameter was defaulted to level `CRITICAL`. See
> 28524 for more information about this change.

### `addLevelName(level, levelName)`

Associates level *level* with text *levelName* in an internal dictionary, which is
used to map numeric levels to a textual representation, for example when a
`Formatter` formats a message. This function can also be used to define
your own levels. The only constraints are that all levels used must be
registered using this function, levels should be positive integers and they
should increase in increasing order of severity.

> **Note:** If you are thinking of defining your own levels, please see the
> section on custom-levels.

### `getLevelNamesMapping()`

Returns a mapping from level names to their corresponding logging levels. For example, the
string "CRITICAL" maps to `CRITICAL`. The returned mapping is copied from an internal
mapping on each call to this function.

> *Added in version 3.11.*

### `getLevelName(level)`

Returns the textual or numeric representation of logging level *level*.

If *level* is one of the predefined levels `CRITICAL`, `ERROR`,
`WARNING`, `INFO` or `DEBUG` then you get the
corresponding string. If you have associated levels with names using
`addLevelName()` then the name you have associated with *level* is
returned. If a numeric value corresponding to one of the defined levels is
passed in, the corresponding string representation is returned.

The *level* parameter also accepts a string representation of the level such
as 'INFO'. In such cases, this functions returns the corresponding numeric
value of the level.

If no matching numeric or string value is passed in, the string
'Level %s' % level is returned.

> **Note:** Levels are internally integers (as they need to be compared in the
> logging logic). This function is used to convert between an integer level
> and the level name displayed in the formatted log output by means of the
> `%(levelname)s` format specifier (see logrecord-attributes), and
> vice versa.

> *Changed in version 3.4.*
> In Python versions earlier than 3.4, this function could also be passed a
> text level, and would return the corresponding numeric value of the level.
> This undocumented behaviour was considered a mistake, and was removed in
> Python 3.4, but reinstated in 3.4.2 in order to retain backward compatibility.

### `getHandlerByName(name)`

Returns a handler with the specified *name*, or `None` if there is no handler
with that name.

> *Added in version 3.12.*

### `getHandlerNames()`

Returns an immutable set of all known handler names.

> *Added in version 3.12.*

### `makeLogRecord(attrdict)`

Creates and returns a new `LogRecord` instance whose attributes are
defined by *attrdict*. This function is useful for taking a pickled
`LogRecord` attribute dictionary, sent over a socket, and reconstituting
it as a `LogRecord` instance at the receiving end.

### `basicConfig(**kwargs)`

Does basic <example-value> for the logging system by either creating a
`StreamHandler` with a default `Formatter`
or using the  given *formatter* instance, and adding it to the
root logger. The functions `debug()`, `info()`, `warning()`,
`error()` and `critical()` will call `basicConfig()` automatically
if no handlers are defined for the root logger.

This function does nothing if the root logger already has handlers
configured, unless the keyword argument *force* is set to `True`.

> **Note:** This function should be called from the main thread
> before other threads are started. In versions of Python prior to
> 2.7.1 and 3.2, if this function is called from multiple threads,
> it is possible (in rare circumstances) that a handler will be added
> to the root logger more than once, leading to unexpected results
> such as messages being duplicated in the log.

The following keyword arguments are supported.

```text
+--------------+---------------------------------------------+
| Format       | Description                                 |
+==============+=============================================+
| *filename*   | Specifies that a :class:`FileHandler` be    |
|              | created, using the specified filename,      |
|              | rather than a :class:`StreamHandler`.       |
+--------------+---------------------------------------------+
| *filemode*   | If *filename* is specified, open the file   |
|              | in this :ref:`mode <filemodes>`. Defaults   |
|              | to ``'a'``.                                 |
+--------------+---------------------------------------------+
| *format*     | Use the specified format string for the     |
|              | handler. Defaults to attributes             |
|              | ``levelname``, ``name`` and ``message``     |
|              | separated by colons.                        |
+--------------+---------------------------------------------+
| *datefmt*    | Use the specified date/time format, as      |
|              | accepted by :func:`time.strftime`.          |
+--------------+---------------------------------------------+
| *style*      | If *format* is specified, use this style    |
|              | for the format string. One of ``'%'``,      |
|              | ``'{'`` or ``'$'`` for :ref:`printf-style   |
|              | <old-string-formatting>`,                   |
|              | :meth:`str.format` or                       |
|              | :class:`string.Template` respectively.      |
|              | Defaults to ``'%'``.                        |
+--------------+---------------------------------------------+
| *level*      | Set the root logger level to the specified  |
|              | :ref:`level <levels>`.                      |
+--------------+---------------------------------------------+
| *stream*     | Use the specified stream to initialize the  |
|              | :class:`StreamHandler`. Note that this      |
|              | argument is incompatible with *filename* -  |
|              | if both are present, a ``ValueError`` is    |
|              | raised.                                     |
+--------------+---------------------------------------------+
| *handlers*   | If specified, this should be an iterable of |
|              | already created handlers to add to the root |
|              | logger. Any handlers which don't already    |
|              | have a formatter set will be assigned the   |
|              | default formatter created in this function. |
|              | Note that this argument is incompatible     |
|              | with *filename* or *stream* - if both       |
|              | are present, a ``ValueError`` is raised.    |
+--------------+---------------------------------------------+
| *force*      | If this keyword argument is specified as    |
|              | true, any existing handlers attached to the |
|              | root logger are removed and closed, before  |
|              | carrying out the configuration as specified |
|              | by the other arguments.                     |
+--------------+---------------------------------------------+
| *encoding*   | If this keyword argument is specified along |
|              | with *filename*, its value is used when the |
|              | :class:`FileHandler` is created, and thus   |
|              | used when opening the output file.          |
+--------------+---------------------------------------------+
| *errors*     | If this keyword argument is specified along |
|              | with *filename*, its value is used when the |
|              | :class:`FileHandler` is created, and thus   |
|              | used when opening the output file. If not   |
|              | specified, the value 'backslashreplace' is  |
|              | used. Note that if ``None`` is specified,   |
|              | it will be passed as such to :func:`open`,  |
|              | which means that it will be treated the     |
|              | same as passing 'errors'.                   |
+--------------+---------------------------------------------+
| *formatter*  | If specified, set this formatter instance   |
|              | (see :ref:`formatter-objects`)              |
|              | for all involved handlers.                  |
|              | If not specified, the default is to create  |
|              | and use an instance of                      |
|              | :class:`logging.Formatter` based on         |
|              | arguments *format*, *datefmt* and *style*.  |
|              | When *formatter* is specified together with |
|              | any of the three arguments *format*,        |
|              | *datefmt* and *style*, a ``ValueError`` is  |
|              | raised to signal that these arguments would |
|              | lose meaning otherwise.                     |
+--------------+---------------------------------------------+
```

> *Changed in version 3.2.*
> The *style* argument was added.

> *Changed in version 3.3.*
> The *handlers* argument was added. Additional checks were added to
> catch situations where incompatible arguments are specified (e.g.
> *handlers* together with *stream* or *filename*, or *stream*
> together with *filename*).

> *Changed in version 3.8.*
> The *force* argument was added.

> *Changed in version 3.9.*
> The *encoding* and *errors* arguments were added.

> *Changed in version 3.15.*
> The *formatter* argument was added.

### `shutdown()`

Informs the logging system to perform an orderly shutdown by flushing and
closing all handlers. This should be called at application exit and no
further use of the logging system should be made after this call.

When the logging module is imported, it registers this function as an exit
handler (see `atexit`), so normally there's no need to do that
manually.

### `setLoggerClass(klass)`

Tells the logging system to use the class *klass* when instantiating a logger.
The class should define `__init__()` such that only a name argument is
required, and the `__init__()` should call `Logger.__init__()`. This
function is typically called before any loggers are instantiated by applications
which need to use custom logger behavior. After this call, as at any other
time, do not instantiate loggers directly using the subclass: continue to use
the `logging.getLogger()` API to get your loggers.
