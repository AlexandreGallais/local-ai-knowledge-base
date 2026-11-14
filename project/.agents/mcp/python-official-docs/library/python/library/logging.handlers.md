---
title: "logging.handlers --- Logging handlers (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.handlers.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `logging.handlers` --- Logging handlers

Module `logging.handlers`.

**Source code:** Lib/logging/handlers.py

Important

This page contains only reference information. For tutorials,
please see

- Basic <example-value>
- Advanced Tutorial
- Logging Cookbook

The following useful handlers are provided in the package. Note that three of
the handlers (`StreamHandler`, `FileHandler` and
`NullHandler`) are actually defined in the `logging` module itself,
but have been documented here along with the other handlers.

## StreamHandler

The `StreamHandler` class, located in the core `logging` package,
sends logging output to streams such as *sys.stdout*, *sys.stderr* or any
file-like object (or, more precisely, any object which supports `write()`
and `flush()` methods).

### class `StreamHandler(stream=None)`

Returns a new instance of the `StreamHandler` class. If *stream* is
specified, the instance will use it for logging output; otherwise, *sys.stderr*
will be used.

### `emit(record)`

If a formatter is specified, it is used to format the record. The record
is then written to the stream followed by `terminator`. If exception information
is present, it is formatted using `traceback.print_exception()` and
appended to the stream.

### `flush()`

Flushes the stream by calling its `flush()` method. Note that the
`close()` method is inherited from `Handler` and so
does no output, so an explicit `flush()` call may be needed at times.

### `setStream(stream)`

Sets the instance's stream to the specified value, if it is different.
The old stream is flushed before the new stream is set.

- **param `stream`:** The stream that the handler should use.

- **return:** the old stream, if the stream was changed, or `None` if it wasn't.

> *Added in version 3.7.*

### `terminator`

String used as the terminator when writing a formatted record to a stream.
Default value is `'\n'`.

If you don't want a newline termination, you can set the handler instance's
`terminator` attribute to the empty string.

In earlier versions, the terminator was hardcoded as `'\n'`.

> *Added in version 3.2.*

## FileHandler

The `FileHandler` class, located in the core `logging` package,
sends logging output to a disk file.  It inherits the output functionality from
`StreamHandler`.

### class `FileHandler(filename, mode='a', encoding=None, delay=False, errors=None)`

Returns a new instance of the `FileHandler` class. The specified file is
opened and used as the stream for logging. If *mode* is not specified,
`'a'` is used.  If *encoding* is not `None`, it is used to open the file
with that encoding.  If *delay* is true, then file opening is deferred until the
first call to `emit()`. By default, the file grows indefinitely. If
*errors* is specified, it's used to determine how encoding errors are handled.

> *Changed in version 3.6.*
> As well as string values, `Path` objects are also accepted
> for the *filename* argument.

> *Changed in version 3.9.*
> The *errors* parameter was added.

### `close()`

Closes the file.

### `emit(record)`

Outputs the record to the file.

Note that if the file was closed due to logging shutdown at exit and the file
mode is 'w', the record will not be emitted (see 42378).

## NullHandler

> *Added in version 3.1.*

The `NullHandler` class, located in the core `logging` package,
does not do any formatting or output. It is essentially a 'no-op' handler
for use by library developers.

### class `NullHandler()`

Returns a new instance of the `NullHandler` class.

### `emit(record)`

This method does nothing.

### `handle(record)`

This method does nothing.

### `createLock()`

This method returns `None` for the lock, since there is no
underlying I/O to which access needs to be serialized.

See library-config for more information on how to use
`NullHandler`.

## WatchedFileHandler

The `WatchedFileHandler` class, located in the `logging.handlers`
module, is a `FileHandler` which watches the file it is logging to. If
the file changes, it is closed and reopened using the file name.

A file change can happen because of usage of programs such as *newsyslog* and
*logrotate* which perform log file rotation. This handler, intended for use
under Unix/Linux, watches the file to see if it has changed since the last emit.
(A file is deemed to have changed if its device or inode have changed.) If the
file has changed, the old file stream is closed, and the file opened to get a
new stream.

This handler is not appropriate for use under Windows, because under Windows
open log files cannot be moved or renamed - logging opens the files with
exclusive locks - and so there is no need for such a handler. Furthermore,
*ST_INO* is not supported under Windows; `stat()` always returns zero
for this value.

### class `WatchedFileHandler(filename, mode='a', encoding=None, delay=False, errors=None)`

Returns a new instance of the `WatchedFileHandler` class. The specified
file is opened and used as the stream for logging. If *mode* is not specified,
`'a'` is used.  If *encoding* is not `None`, it is used to open the file
with that encoding.  If *delay* is true, then file opening is deferred until the
first call to `emit()`.  By default, the file grows indefinitely. If
*errors* is provided, it determines how encoding errors are handled.

> *Changed in version 3.6.*
> As well as string values, `Path` objects are also accepted
> for the *filename* argument.

> *Changed in version 3.9.*
> The *errors* parameter was added.

### `reopenIfNeeded()`

Checks to see if the file has changed.  If it has, the existing stream is
flushed and closed and the file opened again, typically as a precursor to
outputting the record to the file.

> *Added in version 3.6.*

### `emit(record)`

Outputs the record to the file, but first calls `reopenIfNeeded()` to
reopen the file if it has changed.

## BaseRotatingHandler

The `BaseRotatingHandler` class, located in the `logging.handlers`
module, is the base class for the rotating file handlers,
`RotatingFileHandler` and `TimedRotatingFileHandler`. You should
not need to instantiate this class, but it has attributes and methods you may
need to override.

### class `BaseRotatingHandler(filename, mode, encoding=None, delay=False, errors=None)`

The parameters are as for `FileHandler`. The attributes are:

### `namer`

If this attribute is set to a callable, the `rotation_filename()`
method delegates to this callable. The parameters passed to the callable
are those passed to `rotation_filename()`.

> **Note:** The namer function is called quite a few times during rollover,
> so it should be as simple and as fast as possible. It should also
> return the same output every time for a given input, otherwise the
> rollover behaviour may not work as expected.
>
> It's also worth noting that care should be taken when using a namer to
> preserve certain attributes in the filename which are used during rotation.
> For example, `RotatingFileHandler` expects to have a set of log files
> whose names contain successive integers, so that rotation works as expected,
> and `TimedRotatingFileHandler` deletes old log files (based on the
> `backupCount` parameter passed to the handler's initializer) by determining
> the oldest files to delete. For this to happen, the filenames should be
> sortable using the date/time portion of the filename, and a namer needs to
> respect this. (If a namer is wanted that doesn't respect this scheme, it will
> need to be used in a subclass of `TimedRotatingFileHandler` which
> overrides the `getFilesToDelete()` method to
> fit in with the custom naming scheme.)

> *Added in version 3.3.*

### `BaseRotatingHandler.rotator`

If this attribute is set to a callable, the `rotate()` method
delegates to this callable.  The parameters passed to the callable are
those passed to `rotate()`.

> *Added in version 3.3.*

### `BaseRotatingHandler.rotation_filename(default_name)`

Modify the filename of a log file when rotating.

This is provided so that a custom filename can be provided.

The default implementation calls the 'namer' attribute of the handler,
if it's callable, passing the default name to it. If the attribute isn't
callable (the default is `None`), the name is returned unchanged.

- **param `default_name`:** The default name for the log file.

> *Added in version 3.3.*

### `BaseRotatingHandler.rotate(source, dest)`

When rotating, rotate the current log.

The default implementation calls the 'rotator' attribute of the handler,
if it's callable, passing the source and dest arguments to it. If the
attribute isn't callable (the default is `None`), the source is simply
renamed to the destination.

- **param `source`:** The source filename. This is normally the base
filename, e.g. 'test.log'.
- **param `dest`:** The destination filename. This is normally
what the source is rotated to, e.g. 'test.log.1'.

> *Added in version 3.3.*

The reason the attributes exist is to save you having to subclass - you can use
the same callables for instances of `RotatingFileHandler` and
`TimedRotatingFileHandler`. If either the namer or rotator callable
raises an exception, this will be handled in the same way as any other
exception during an `emit()` call, i.e. via the `handleError()` method
of the handler.

If you need to make more significant changes to rotation processing, you can
override the methods.

For an example, see cookbook-rotator-namer.

## RotatingFileHandler

The `RotatingFileHandler` class, located in the `logging.handlers`
module, supports rotation of disk log files.

### class `RotatingFileHandler(filename, mode='a', maxBytes=0, backupCount=0, encoding=None, delay=False, errors=None)`

Returns a new instance of the `RotatingFileHandler` class. The specified
file is opened and used as the stream for logging. If *mode* is not specified,
`'a'` is used.  If *encoding* is not `None`, it is used to open the file
with that encoding.  If *delay* is true, then file opening is deferred until the
first call to `emit()`.  By default, the file grows indefinitely. If
*errors* is provided, it determines how encoding errors are handled.

You can use the *maxBytes* and *backupCount* values to allow the file to
rollover at a predetermined size. When the size is about to be exceeded,
the file is closed and a new file is silently opened for output. Rollover occurs
whenever the current log file is nearly *maxBytes* in length; but if either of
*maxBytes* or *backupCount* is zero, rollover never occurs, so you generally want
to set *backupCount* to at least 1, and have a non-zero *maxBytes*.
When *backupCount* is non-zero, the system will save old log files by appending
the extensions '.1', '.2' etc., to the filename. For example, with a *backupCount*
of 5 and a base file name of `app.log`, you would get `app.log`,
`app.log.1`, `app.log.2`, up to `app.log.5`. The file being
written to is always `app.log`.  When this file is filled, it is closed
and renamed to `app.log.1`, and if files `app.log.1`,
`app.log.2`, etc. exist, then they are renamed to `app.log.2`,
`app.log.3` etc. respectively.

> *Changed in version 3.6.*
> As well as string values, `Path` objects are also accepted
> for the *filename* argument.

> *Changed in version 3.9.*
> The *errors* parameter was added.

### `doRollover()`

Does a rollover, as described above.

### `emit(record)`

Outputs the record to the file, catering for rollover as described
previously.

### `shouldRollover(record)`

See if the supplied record would cause the file to exceed the configured size limit.
