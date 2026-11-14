---
title: "signal --- Set handlers for asynchronous events (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/signal.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# signal --- Set handlers for asynchronous events (part 3 of 3)

### `signal(signalnum, handler)`

Set the handler for signal *signalnum* to the function *handler*.  *handler* can
be a callable Python object taking two arguments (see below), or one of the
special values `signal.SIG_IGN` or `signal.SIG_DFL`.  The previous
signal handler will be returned (see the description of `getsignal()`
above).  (See the Unix man page signal(2) for further information.)

When threads are enabled, this function can only be called
from the main thread of the main interpreter;
attempting to call it from other threads will cause a `ValueError`
exception to be raised.

The *handler* is called with two arguments: the signal number and the current
stack frame (`None` or a frame object; for a description of frame objects,
see the description in the type hierarchy or see the
attribute descriptions in the `inspect` module).

On Windows, `signal()` can only be called with `SIGABRT`,
`SIGFPE`, `SIGILL`, `SIGINT`, `SIGSEGV`,
`SIGTERM`, or `SIGBREAK`.
A `ValueError` will be raised in any other case.
Note that not all systems define the same set of signal names; an
`AttributeError` will be raised if a signal name is not defined as
`SIG*` module level constant.

### `sigpending()`

Examine the set of signals that are pending for delivery to the calling
thread (i.e., the signals which have been raised while blocked).  Return the
set of the pending signals.

> **Availability:** Unix.
>
> See the man page sigpending(2) for further information.

See also `pause()`, `pthread_sigmask()` and `sigwait()`.

> *Added in version 3.3.*

### `sigwait(sigset)`

Suspend execution of the calling thread until the delivery of one of the
signals specified in the signal set *sigset*.  The function accepts the signal
(removes it from the pending list of signals), and returns the signal number.

> **Availability:** Unix.
>
> See the man page sigwait(3) for further information.

See also `pause()`, `pthread_sigmask()`, `sigpending()`,
`sigwaitinfo()` and `sigtimedwait()`.

> *Added in version 3.3.*

### `sigwaitinfo(sigset)`

Suspend execution of the calling thread until the delivery of one of the
signals specified in the signal set *sigset*.  The function accepts the
signal and removes it from the pending list of signals. If one of the
signals in *sigset* is already pending for the calling thread, the function
will return immediately with information about that signal. The signal
handler is not called for the delivered signal. The function raises an
`InterruptedError` if it is interrupted by a signal that is not in
*sigset*.

The return value is an object representing the data contained in the
`siginfo_t` structure, namely: `si_signo`, `si_code`,
`si_errno`, `si_pid`, `si_uid`, `si_status`, `si_band`.

> **Availability:** Unix.
>
> See the man page sigwaitinfo(2) for further information.

See also `pause()`, `sigwait()` and `sigtimedwait()`.

> *Added in version 3.3.*

> *Changed in version 3.5.*
> The function is now retried if interrupted by a signal not in *sigset*
> and the signal handler does not raise an exception (see PEP 475 for
> the rationale).

### `sigtimedwait(sigset, timeout)`

Like `sigwaitinfo()`, but takes an additional *timeout* argument
specifying a timeout. If *timeout* is specified as `0`, a poll is
performed. Returns `None` if a timeout occurs.

> **Availability:** Unix.
>
> See the man page sigtimedwait(2) for further information.

See also `pause()`, `sigwait()` and `sigwaitinfo()`.

> *Added in version 3.3.*

> *Changed in version 3.5.*
> The function is now retried with the recomputed *timeout* if interrupted
> by a signal not in *sigset* and the signal handler does not raise an
> exception (see PEP 475 for the rationale).

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

## Examples

Here is a minimal example program. It uses the `alarm()` function to limit
the time spent waiting to open a file; this is useful if the file is for a
serial device that may not be turned on, which would normally cause the
`os.open()` to hang indefinitely.  The solution is to set a 5-second alarm
before opening the file; if the operation takes too long, the alarm signal will
be sent, and the handler raises an exception.:

```
import signal, os

def handler(signum, frame):
    signame = signal.Signals(signum).name
    print(f'Signal handler called with signal {signame} ({signum})')
    raise OSError("Couldn't open device!")

# Set the signal handler and a 5-second alarm
signal.signal(signal.SIGALRM, handler)
signal.alarm(5)

# This open() may hang indefinitely
fd = os.open('/dev/ttyS0', os.O_RDWR)

signal.alarm(0)          # Disable the alarm
```

## Note on SIGPIPE

Piping output of your program to tools like head(1) will
cause a `SIGPIPE` signal to be sent to your process when the receiver
of its standard output closes early.  This results in an exception
like `BrokenPipeError: [Errno 32] Broken pipe`.  To handle this
case, wrap your entry point to catch this exception as follows:

```
import os
import sys

def main():
    try:
        # simulate large output (your code replaces this loop)
        for x in range(10000):
            print("y")
        # flush output here to force SIGPIPE to be triggered
        # while inside this try block.
        sys.stdout.flush()
    except BrokenPipeError:
        # Python flushes standard streams on exit; redirect remaining output
        # to devnull to avoid another BrokenPipeError at shutdown
        devnull = os.open(os.devnull, os.O_WRONLY)
        os.dup2(devnull, sys.stdout.fileno())
        sys.exit(1)  # Python exits with error code 1 on EPIPE

if __name__ == '__main__':
    main()
```

Do not set `SIGPIPE`'s disposition to `SIG_DFL` in
order to avoid `BrokenPipeError`.  Doing that would cause
your program to exit unexpectedly whenever any socket
connection is interrupted while your program is still writing to
it.

## Note on Signal Handlers and Exceptions

If a signal handler raises an exception, the exception will be propagated to
the main thread and may be raised after any bytecode instruction. Most
notably, a `KeyboardInterrupt` may appear at any point during execution.
Most Python code, including the standard library, cannot be made robust against
this, and so a `KeyboardInterrupt` (or any other exception resulting from
a signal handler) may on rare occasions put the program in an unexpected state.

To illustrate this issue, consider the following code:

```
class SpamContext:
    def __init__(self):
        self.lock = threading.Lock()

    def __enter__(self):
        # If KeyboardInterrupt occurs here, everything is fine
        self.lock.acquire()
        # If KeyboardInterrupt occurs here, __exit__ will not be called
        ...
        # KeyboardInterrupt could occur just before the function returns

    def __exit__(self, exc_type, exc_val, exc_tb):
        ...
        self.lock.release()
```

For many programs, especially those that merely want to exit on
`KeyboardInterrupt`, this is not a problem, but applications that are
complex or require high reliability should avoid raising exceptions from signal
handlers. They should also avoid catching `KeyboardInterrupt` as a means
of gracefully shutting down.  Instead, they should install their own
`SIGINT` handler. Below is an example of an HTTP server that avoids
`KeyboardInterrupt`:

```
import signal
import socket
from selectors import DefaultSelector, EVENT_READ
from http.server import HTTPServer, SimpleHTTPRequestHandler

interrupt_read, interrupt_write = socket.socketpair()

def handler(signum, frame):
    print('Signal handler called with signal', signum)
    interrupt_write.send(b'\0')
signal.signal(signal.SIGINT, handler)

def serve_forever(httpd):
    sel = DefaultSelector()
    sel.register(interrupt_read, EVENT_READ)
    sel.register(httpd, EVENT_READ)

    while True:
        for key, _ in sel.select():
            if key.fileobj == interrupt_read:
                interrupt_read.recv(1)
                return
            if key.fileobj == httpd:
                httpd.handle_request()

print("Serving on port 8000")
httpd = HTTPServer(('', 8000), SimpleHTTPRequestHandler)
serve_forever(httpd)
print("Shutdown...")
```
