---
title: "logging.handlers --- Logging handlers (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.handlers.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging.handlers --- Logging handlers (part 2 of 4)

## TimedRotatingFileHandler

The `TimedRotatingFileHandler` class, located in the
`logging.handlers` module, supports rotation of disk log files at certain
timed intervals.

### class `TimedRotatingFileHandler(filename, when='h', interval=1, backupCount=0, encoding=None, delay=False, utc=False, atTime=None, errors=None)`

Returns a new instance of the `TimedRotatingFileHandler` class. The
specified file is opened and used as the stream for logging. On rotating it also
sets the filename suffix. Rotating happens based on the product of *when* and
*interval*.

You can use the *when* to specify the type of *interval*. The list of possible
values is below.  Note that they are not case sensitive.

```text
+----------------+----------------------------+-------------------------+
| Value          | Type of interval           | If/how *atTime* is used |
+================+============================+=========================+
| ``'S'``        | Seconds                    | Ignored                 |
+----------------+----------------------------+-------------------------+
| ``'M'``        | Minutes                    | Ignored                 |
+----------------+----------------------------+-------------------------+
| ``'H'``        | Hours                      | Ignored                 |
+----------------+----------------------------+-------------------------+
| ``'D'``        | Days                       | Ignored                 |
+----------------+----------------------------+-------------------------+
| ``'W0'-'W6'``  | Weekday (0=Monday)         | Used to compute initial |
|                |                            | rollover time           |
+----------------+----------------------------+-------------------------+
| ``'midnight'`` | Roll over at midnight, if  | Used to compute initial |
|                | *atTime* not specified,    | rollover time           |
|                | else at time *atTime*      |                         |
+----------------+----------------------------+-------------------------+
```

When using weekday-based rotation, specify 'W0' for Monday, 'W1' for
Tuesday, and so on up to 'W6' for Sunday. In this case, the value passed for
*interval* isn't used.

The system will save old log files by appending extensions to the filename.
The extensions are date-and-time based, using the strftime format
`%Y-%m-%d_%H-%M-%S` or a leading portion thereof, depending on the
rollover interval.

When computing the next rollover time for the first time (when the handler
is created), the last modification time of an existing log file, or else
the current time, is used to compute when the next rotation will occur.

If the *utc* argument is true, times in UTC will be used; otherwise
local time is used.

If *backupCount* is nonzero, at most *backupCount* files
will be kept, and if more would be created when rollover occurs, the oldest
one is deleted. The deletion logic uses the interval to determine which
files to delete, so changing the interval may leave old files lying around.

If *delay* is true, then file opening is deferred until the first call to
`emit()`.

If *atTime* is not `None`, it must be a `datetime.time` instance which
specifies the time of day when rollover occurs, for the cases where rollover
is set to happen "at midnight" or "on a particular weekday". Note that in
these cases, the *atTime* value is effectively used to compute the *initial*
rollover, and subsequent rollovers would be calculated via the normal
interval calculation.

If *errors* is specified, it's used to determine how encoding errors are
handled.

> **Note:** Calculation of the initial rollover time is done when the handler
> is initialised. Calculation of subsequent rollover times is done only
> when rollover occurs, and rollover occurs only when emitting output. If
> this is not kept in mind, it might lead to some confusion. For example,
> if an interval of "every minute" is set, that does not mean you will
> always see log files with times (in the filename) separated by a minute;
> if, during application execution, logging output is generated more
> frequently than once a minute, *then* you can expect to see log files
> with times separated by a minute. If, on the other hand, logging messages
> are only output once every five minutes (say), then there will be gaps in
> the file times corresponding to the minutes where no output (and hence no
> rollover) occurred.

> *Changed in version 3.4.*
> *atTime* parameter was added.

> *Changed in version 3.6.*
> As well as string values, `Path` objects are also accepted
> for the *filename* argument.

> *Changed in version 3.9.*
> The *errors* parameter was added.

### `doRollover()`

Does a rollover, as described above.

### `emit(record)`

Outputs the record to the file, catering for rollover as described above.

### `getFilesToDelete()`

Returns a list of filenames which should be deleted as part of rollover. These
are the absolute paths of the oldest backup log files written by the handler.

### `shouldRollover(record)`

See if enough time has passed for a rollover to occur and if it has, compute
the next rollover time.

## SocketHandler

The `SocketHandler` class, located in the `logging.handlers` module,
sends logging output to a network socket. The base class uses a TCP socket.

### class `SocketHandler(host, port)`

Returns a new instance of the `SocketHandler` class intended to
communicate with a remote machine whose address is given by *host* and *port*.

> *Changed in version 3.4.*
> If `port` is specified as `None`, a Unix domain socket is created
> using the value in `host` - otherwise, a TCP socket is created.

### `close()`

Closes the socket.

### `emit()`

Pickles the record's attribute dictionary and writes it to the socket in
binary format. If there is an error with the socket, silently drops the
packet. If the connection was previously lost, re-establishes the
connection. To unpickle the record at the receiving end into a
`LogRecord`, use the `makeLogRecord()`
function.

### `handleError()`

Handles an error which has occurred during `emit()`. The most likely
cause is a lost connection. Closes the socket so that we can retry on the
next event.

### `makeSocket()`

This is a factory method which allows subclasses to define the precise
type of socket they want. The default implementation creates a TCP socket
(`socket.SOCK_STREAM`).

### `makePickle(record)`

Pickles the record's attribute dictionary in binary format with a length
prefix, and returns it ready for transmission across the socket. The
details of this operation are equivalent to:

```
data = pickle.dumps(record_attr_dict, 1)
datalen = struct.pack('>L', len(data))
return datalen + data
```

Note that pickles aren't completely secure. If you are concerned about
security, you may want to override this method to implement a more secure
mechanism. For example, you can sign pickles using HMAC and then verify
them on the receiving end, or alternatively you can disable unpickling of
global objects on the receiving end.

### `send(packet)`

Send a pickled byte-string *packet* to the socket. The format of the sent
byte-string is as described in the documentation for
`makePickle()`.

This function allows for partial sends, which can happen when the network
is busy.

### `createSocket()`

Tries to create a socket; on failure, uses an exponential back-off
algorithm.  On initial failure, the handler will drop the message it was
trying to send.  When subsequent messages are handled by the same
instance, it will not try connecting until some time has passed.  The
default parameters are such that the initial delay is one second, and if
after that delay the connection still can't be made, the handler will
double the delay each time up to a maximum of 30 seconds.

This behaviour is controlled by the following handler attributes:

- `retryStart` (initial delay, defaulting to 1.0 seconds).
- `retryFactor` (multiplier, defaulting to 2.0).
- `retryMax` (maximum delay, defaulting to 30.0 seconds).

This means that if the remote listener starts up *after* the handler has
been used, you could lose messages (since the handler won't even attempt
a connection until the delay has elapsed, but just silently drop messages
during the delay period).

## DatagramHandler

The `DatagramHandler` class, located in the `logging.handlers`
module, inherits from `SocketHandler` to support sending logging messages
over UDP sockets.

### class `DatagramHandler(host, port)`

Returns a new instance of the `DatagramHandler` class intended to
communicate with a remote machine whose address is given by *host* and *port*.

> **Note:** As UDP is not a streaming protocol, there is no persistent connection
> between an instance of this handler and *host*. For this reason, when using a
> network socket, a DNS lookup might have to be made each time an event is
> logged, which can introduce some latency into the system. If this affects you,
> you can do a lookup yourself and initialize this handler using the looked-up IP
> address rather than the hostname.

> *Changed in version 3.4.*
> If `port` is specified as `None`, a Unix domain socket is created
> using the value in `host` - otherwise, a UDP socket is created.

### `emit()`

Pickles the record's attribute dictionary and writes it to the socket in
binary format. If there is an error with the socket, silently drops the
packet. To unpickle the record at the receiving end into a
`LogRecord`, use the `makeLogRecord()`
function.

### `makeSocket()`

The factory method of `SocketHandler` is here overridden to create
a UDP socket (`socket.SOCK_DGRAM`).

### `send(s)`

Send a pickled byte-string to a socket. The format of the sent byte-string
is as described in the documentation for `SocketHandler.makePickle()`.
