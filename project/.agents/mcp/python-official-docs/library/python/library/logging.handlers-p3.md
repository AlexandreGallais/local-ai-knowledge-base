---
title: "logging.handlers --- Logging handlers (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.handlers.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging.handlers --- Logging handlers (part 3 of 4)

## SysLogHandler

The `SysLogHandler` class, located in the `logging.handlers` module,
supports sending logging messages to a remote or local Unix syslog.

### class `SysLogHandler(address=('localhost', SYSLOG_UDP_PORT), facility=LOG_USER, socktype=socket.SOCK_DGRAM, timeout=None)`

Returns a new instance of the `SysLogHandler` class intended to
communicate with a remote Unix machine whose address is given by *address* in
the form of a `(host, port)` tuple.  If *address* is not specified,
`('localhost', 514)` is used.  The address is used to open a socket.  An
alternative to providing a `(host, port)` tuple is providing an address as a
string, for example '/dev/log'. In this case, a Unix domain socket is used to
send the message to the syslog. If *facility* is not specified,
`LOG_USER` is used. The type of socket opened depends on the
*socktype* argument, which defaults to `socket.SOCK_DGRAM` and thus
opens a UDP socket. To open a TCP socket (for use with the newer syslog
daemons such as rsyslog), specify a value of `socket.SOCK_STREAM`.
If *timeout* is specified, it sets a timeout (in seconds) for the socket operations.
This can help prevent the program from hanging indefinitely if the syslog server is
unreachable. By default, *timeout* is `None`, meaning no timeout is applied.

Note that if your server is not listening on UDP port 514,
`SysLogHandler` may appear not to work. In that case, check what
address you should be using for a domain socket - it's system dependent.
For example, on Linux it's usually '/dev/log' but on OS/X it's
'/var/run/syslog'. You'll need to check your platform and use the
appropriate address (you may need to do this check at runtime if your
application needs to run on several platforms). On Windows, you pretty
much have to use the UDP option.

> **Note:** On macOS 12.x (Monterey), Apple has changed the behaviour of their
> syslog daemon - it no longer listens on a domain socket. Therefore, you cannot
> expect `SysLogHandler` to work on this system.
>
> See 91070 for more information.

> *Changed in version 3.2.*
> *socktype* was added.

> *Changed in version 3.14.*
> *timeout* was added.

### `close()`

Closes the socket to the remote host.

### `createSocket()`

Tries to create a socket and, if it's not a datagram socket, connect it
to the other end. This method is called during handler initialization,
but it's not regarded as an error if the other end isn't listening at
this point - the method will be called again when emitting an event, if
there is no socket at that point.

> *Added in version 3.11.*

### `emit(record)`

The record is formatted, and then sent to the syslog server. If exception
information is present, it is *not* sent to the server.

> *Changed in version 3.2.1.*
> (See: 12168.) In earlier versions, the message sent to the
> syslog daemons was always terminated with a NUL byte, because early
> versions of these daemons expected a NUL terminated message - even
> though it's not in the relevant specification (RFC 5424). More recent
> versions of these daemons don't expect the NUL byte but strip it off
> if it's there, and even more recent daemons (which adhere more closely
> to RFC 5424) pass the NUL byte on as part of the message.
> To enable easier handling of syslog messages in the face of all these
> differing daemon behaviours, the appending of the NUL byte has been
> made configurable, through the use of a class-level attribute,
> `append_nul`. This defaults to `True` (preserving the existing
> behaviour) but can be set to `False` on a `SysLogHandler` instance
> in order for that instance to *not* append the NUL terminator.

> *Changed in version 3.3.*
> (See: 12419.) In earlier versions, there was no facility for
> an "ident" or "tag" prefix to identify the source of the message. This
> can now be specified using a class-level attribute, defaulting to
> `""` to preserve existing behaviour, but which can be overridden on
> a `SysLogHandler` instance in order for that instance to prepend
> the ident to every message handled. Note that the provided ident must
> be text, not bytes, and is prepended to the message exactly as is.

### `encodePriority(facility, priority)`

Encodes the facility and priority into an integer. You can pass in strings
or integers - if strings are passed, internal mapping dictionaries are
used to convert them to integers.

The symbolic `LOG_` values are defined in `SysLogHandler` and
mirror the values defined in the `sys/syslog.h` header file.

**Priorities**

```text
+--------------------------+---------------+
| Name (string)            | Symbolic value|
+==========================+===============+
| ``alert``                | LOG_ALERT     |
+--------------------------+---------------+
| ``crit`` or ``critical`` | LOG_CRIT      |
+--------------------------+---------------+
| ``debug``                | LOG_DEBUG     |
+--------------------------+---------------+
| ``emerg`` or ``panic``   | LOG_EMERG     |
+--------------------------+---------------+
| ``err`` or ``error``     | LOG_ERR       |
+--------------------------+---------------+
| ``info``                 | LOG_INFO      |
+--------------------------+---------------+
| ``notice``               | LOG_NOTICE    |
+--------------------------+---------------+
| ``warn`` or ``warning``  | LOG_WARNING   |
+--------------------------+---------------+
```

**Facilities**

```text
+---------------+---------------+
| Name (string) | Symbolic value|
+===============+===============+
| ``auth``      | LOG_AUTH      |
+---------------+---------------+
| ``authpriv``  | LOG_AUTHPRIV  |
+---------------+---------------+
| ``cron``      | LOG_CRON      |
+---------------+---------------+
| ``daemon``    | LOG_DAEMON    |
+---------------+---------------+
| ``ftp``       | LOG_FTP       |
+---------------+---------------+
| ``kern``      | LOG_KERN      |
+---------------+---------------+
| ``lpr``       | LOG_LPR       |
+---------------+---------------+
| ``mail``      | LOG_MAIL      |
+---------------+---------------+
| ``news``      | LOG_NEWS      |
+---------------+---------------+
| ``syslog``    | LOG_SYSLOG    |
+---------------+---------------+
| ``user``      | LOG_USER      |
+---------------+---------------+
| ``uucp``      | LOG_UUCP      |
+---------------+---------------+
| ``local0``    | LOG_LOCAL0    |
+---------------+---------------+
| ``local1``    | LOG_LOCAL1    |
+---------------+---------------+
| ``local2``    | LOG_LOCAL2    |
+---------------+---------------+
| ``local3``    | LOG_LOCAL3    |
+---------------+---------------+
| ``local4``    | LOG_LOCAL4    |
+---------------+---------------+
| ``local5``    | LOG_LOCAL5    |
+---------------+---------------+
| ``local6``    | LOG_LOCAL6    |
+---------------+---------------+
| ``local7``    | LOG_LOCAL7    |
+---------------+---------------+
```

### `mapPriority(levelname)`

Maps a logging level name to a syslog priority name.
You may need to override this if you are using custom levels, or
if the default algorithm is not suitable for your needs. The
default algorithm maps `DEBUG`, `INFO`, `WARNING`, `ERROR` and
`CRITICAL` to the equivalent syslog names, and all other level
names to 'warning'.

## NTEventLogHandler

The `NTEventLogHandler` class, located in the `logging.handlers`
module, supports sending logging messages to a local Windows NT, Windows 2000 or
Windows XP event log. Before you can use it, you need Mark Hammond's Win32
extensions for Python installed.

### class `NTEventLogHandler(appname, dllname=None, logtype='Application')`

Returns a new instance of the `NTEventLogHandler` class. The *appname* is
used to define the application name as it appears in the event log. An
appropriate registry entry is created using this name. The *dllname* should give
the fully qualified pathname of a .dll or .exe which contains message
definitions to hold in the log (if not specified, `'win32service.pyd'` is used
- this is installed with the Win32 extensions and contains some basic
placeholder message definitions. Note that use of these placeholders will make
your event logs big, as the entire message source is held in the log. If you
want slimmer logs, you have to pass in the name of your own .dll or .exe which
contains the message definitions you want to use in the event log). The
*logtype* is one of `'Application'`, `'System'` or `'Security'`, and
defaults to `'Application'`.

### `close()`

At this point, you can remove the application name from the registry as a
source of event log entries. However, if you do this, you will not be able
to see the events as you intended in the Event Log Viewer - it needs to be
able to access the registry to get the .dll name. The current version does
not do this.

### `emit(record)`

Determines the message ID, event category and event type, and then logs
the message in the NT event log.

### `getEventCategory(record)`

Returns the event category for the record. Override this if you want to
specify your own categories. This version returns 0.

### `getEventType(record)`

Returns the event type for the record. Override this if you want to
specify your own types. This version does a mapping using the handler's
typemap attribute, which is set up in `__init__()` to a dictionary
which contains mappings for `DEBUG`, `INFO`,
`WARNING`, `ERROR` and `CRITICAL`. If you are using
your own levels, you will either need to override this method or place a
suitable dictionary in the handler's *typemap* attribute.

### `getMessageID(record)`

Returns the message ID for the record. If you are using your own messages,
you could do this by having the *msg* passed to the logger being an ID
rather than a format string. Then, in here, you could use a dictionary
lookup to get the message ID. This version returns 1, which is the base
message ID in `win32service.pyd`.

## SMTPHandler

The `SMTPHandler` class, located in the `logging.handlers` module,
supports sending logging messages to an email address via SMTP.

### class `SMTPHandler(mailhost, fromaddr, toaddrs, subject, credentials=None, secure=None, timeout=1.0)`

Returns a new instance of the `SMTPHandler` class. The instance is
initialized with the from and to addresses and subject line of the email. The
*toaddrs* should be a list of strings. To specify a non-standard SMTP port, use
the (host, port) tuple format for the *mailhost* argument. If you use a string,
the standard SMTP port is used. If your SMTP server requires authentication, you
can specify a (username, password) tuple for the *credentials* argument.

To specify the use of a secure protocol (TLS), pass in a tuple to the
*secure* argument. This will only be used when authentication credentials are
supplied. The tuple should be either an empty tuple, or a single-value tuple
with the name of a keyfile, or a 2-value tuple with the names of the keyfile
and certificate file. (This tuple is passed to the
`smtplib.SMTP.starttls()` method.)

A timeout can be specified for communication with the SMTP server using the
*timeout* argument.

> *Changed in version 3.3.*
> Added the *timeout* parameter.

### `emit(record)`

Formats the record and sends it to the specified addressees.

### `getSubject(record)`

If you want to specify a subject line which is record-dependent, override
this method.

## MemoryHandler

The `MemoryHandler` class, located in the `logging.handlers` module,
supports buffering of logging records in memory, periodically flushing them to a
target handler. Flushing occurs whenever the buffer is full, or when an
event of a certain severity or greater is seen.

`MemoryHandler` is a subclass of the more general
`BufferingHandler`, which is an abstract class. This buffers logging
records in memory. Whenever each record is added to the buffer, a check is made
by calling `shouldFlush()` to see if the buffer should be flushed.  If it
should, then `flush()` is expected to do the flushing.

### class `BufferingHandler(capacity)`

Initializes the handler with a buffer of the specified capacity. Here,
*capacity* means the number of logging records buffered.

### `emit(record)`

Append the record to the buffer. If `shouldFlush()` returns true,
call `flush()` to process the buffer.

### `flush()`

For a `BufferingHandler` instance, flushing means that it sets the
buffer to an empty list. This method can be overwritten to implement more useful
flushing behavior.

### `shouldFlush(record)`

Return `True` if the buffer is up to capacity. This method can be
overridden to implement custom flushing strategies.

### class `MemoryHandler(capacity, flushLevel=ERROR, target=None, flushOnClose=True)`

Returns a new instance of the `MemoryHandler` class. The instance is
initialized with a buffer size of *capacity* (number of records buffered).
If *flushLevel* is not specified, `ERROR` is used. If no *target* is
specified, the target will need to be set using `setTarget()` before this
handler does anything useful. If *flushOnClose* is specified as `False`,
then the buffer is *not* flushed when the handler is closed. If not specified
or specified as `True`, the previous behaviour of flushing the buffer will
occur when the handler is closed.

> *Changed in version 3.6.*
> The *flushOnClose* parameter was added.

### `close()`

Calls `flush()`, sets the target to `None` and clears the
buffer.

### `flush()`

For a `MemoryHandler` instance, flushing means just sending the buffered
records to the target, if there is one. The buffer is also cleared when
buffered records are sent to the target. Override if you want different behavior.

### `setTarget(target)`

Sets the target handler for this handler.

### `shouldFlush(record)`

Checks for buffer full or a record at the *flushLevel* or higher.
