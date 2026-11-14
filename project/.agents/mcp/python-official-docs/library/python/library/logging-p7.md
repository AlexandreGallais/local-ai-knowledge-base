---
title: "logging --- Logging facility for Python (part 7 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging --- Logging facility for Python (part 7 of 7)

### `setLogRecordFactory(factory)`

Set a callable which is used to create a `LogRecord`.

- **param `factory`:** The factory callable to be used to instantiate a log record.

> *Added in version 3.2.*
> This function has been provided, along with `getLogRecordFactory()`, to
> allow developers more control over how the `LogRecord` representing
> a logging event is constructed.

The factory has the following signature:

`factory(name, level, fn, lno, msg, args, exc_info, func=None, sinfo=None, **kwargs)`

- **name:** The logger name.
- **level:** The logging level (numeric).
- **fn:** The full pathname of the file where the logging call was made.
- **lno:** The line number in the file where the logging call was made.
- **msg:** The logging message.
- **args:** The arguments for the logging message.
- **exc_info:** An exception tuple, or `None`.
- **func:** The name of the function or method which invoked the logging
call.
- **sinfo:** A stack traceback such as is provided by
`traceback.print_stack()`, showing the call hierarchy.
- **kwargs:** Additional keyword arguments.

## Module-Level Attributes

### `lastResort`

A "handler of last resort" is available through this attribute. This
is a `StreamHandler` writing to `sys.stderr` with a level of
`WARNING`, and is used to handle logging events in the absence of any
logging configuration. The end result is to just print the message to
`sys.stderr`. This replaces the earlier error message saying that
"no handlers could be found for logger XYZ". If you need the earlier
behaviour for some reason, `lastResort` can be set to `None`.

> *Added in version 3.2.*

### `raiseExceptions`

Used to see if exceptions during handling should be propagated.

Default: `True`.

If `raiseExceptions` is `False`,
exceptions get silently ignored. This is what is mostly wanted
for a logging system - most users will not care about errors in
the logging system, they are more interested in application errors.

## Integration with the warnings module

The `captureWarnings()` function can be used to integrate `logging`
with the `warnings` module.

### `captureWarnings(capture)`

This function is used to turn the capture of warnings by logging on and
off.

If *capture* is `True`, warnings issued by the `warnings` module will
be redirected to the logging system. Specifically, a warning will be
formatted using `warnings.formatwarning()` and the resulting string
logged to a logger named `'py.warnings'` with a severity of `WARNING`.

If *capture* is `False`, the redirection of warnings to the logging system
will stop, and warnings will be redirected to their original destinations
(i.e. those in effect before `captureWarnings(True)` was called).

> **See also:** Module `logging.config`
> Configuration API for the logging module.
>
> Module `logging.handlers`
> Useful handlers included with the logging module.
>
> PEP 282 - A Logging System
> The proposal which described this feature for inclusion in the Python standard
> library.
>
> Original Python logging package
> This is the original source for the `logging` package.  The version of the
> package available from this site is suitable for use with Python 1.5.2, 2.1.x
> and 2.2.x, which do not include the `logging` package in the standard
> library.
