---
title: "signal --- Set handlers for asynchronous events (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/signal.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# signal --- Set handlers for asynchronous events (part 2 of 3)

## Module contents

> *Changed in version 3.5.*
> signal (SIG*), handler (`SIG_DFL`, `SIG_IGN`) and sigmask
> (`SIG_BLOCK`, `SIG_UNBLOCK`, `SIG_SETMASK`)
> related constants listed below were turned into
> `enums` (`Signals`, `Handlers` and `Sigmasks` respectively).
> `getsignal()`, `pthread_sigmask()`, `sigpending()` and
> `sigwait()` functions return human-readable
> `enums` as `Signals` objects.

The signal module defines three enums:

### class `Signals`

`enum.IntEnum` collection of SIG* constants and the CTRL_* constants.

> *Added in version 3.5.*

### class `Handlers`

`enum.IntEnum` collection of the constants `SIG_DFL` and `SIG_IGN`.

> *Added in version 3.5.*

### class `Sigmasks`

`enum.IntEnum` collection of the constants `SIG_BLOCK`, `SIG_UNBLOCK` and `SIG_SETMASK`.

> **Availability:** Unix.
>
> See the man page sigprocmask(2) and
> pthread_sigmask(3) for further information.

> *Added in version 3.5.*

The variables defined in the `signal` module are:

### `SIG_DFL`

This is one of two standard signal handling options; it will simply perform
the default function for the signal.  For example, on most systems the
default action for `SIGQUIT` is to dump core and exit, while the
default action for `SIGCHLD` is to simply ignore it.

### `SIG_IGN`

This is another standard signal handler, which will simply ignore the given
signal.

### `SIGABRT`

Abort signal from abort(3).

### `SIGALRM`

Timer signal from alarm(2).

> **Availability:** Unix.

### `SIGBREAK`

Interrupt from keyboard (CTRL + BREAK).

> **Availability:** Windows.

### `SIGBUS`

Bus error (bad memory access).

> **Availability:** Unix.

### `SIGCHLD`

Child process stopped or terminated.

> **Availability:** Unix.

### `SIGCLD`

Alias to `SIGCHLD`.

> **Availability:** not macOS.

### `SIGCONT`

Continue the process if it is currently stopped

> **Availability:** Unix.

### `SIGFPE`

Floating-point exception. For example, division by zero.

> **See also:** `ZeroDivisionError` is raised when the second argument of a division
> or modulo operation is zero.

### `SIGHUP`

Hangup detected on controlling terminal or death of controlling process.

> **Availability:** Unix.

### `SIGILL`

Illegal instruction.

### `SIGINT`

Interrupt from keyboard (CTRL + C).

Default action is to raise `KeyboardInterrupt`.

### `SIGKILL`

Kill signal.

It cannot be caught, blocked, or ignored.

> **Availability:** Unix.

### `SIGPIPE`

Broken pipe: write to pipe with no readers.

Default action is to ignore the signal.

> **Availability:** Unix.

### `SIGPROF`

Profiling timer expired.

> **Availability:** Unix.

### `SIGQUIT`

Terminal quit signal.

> **Availability:** Unix.

### `SIGSEGV`

Segmentation fault: invalid memory reference.

### `SIGSTOP`

Stop executing (cannot be caught or ignored).

> **Availability:** Unix.

### `SIGSTKFLT`

Stack fault on coprocessor. The Linux kernel does not raise this signal: it
can only be raised in user space.

> **Availability:** Linux.
>
> On architectures where the signal is available. See
> the man page signal(7) for further information.

> *Added in version 3.11.*

### `SIGTERM`

Termination signal.

### `SIGUSR1`

User-defined signal 1.

> **Availability:** Unix.

### `SIGUSR2`

User-defined signal 2.

> **Availability:** Unix.

### `SIGVTALRM`

Virtual timer expired.

> **Availability:** Unix.

### `SIGWINCH`

Window resize signal.

> **Availability:** Unix.

### `SIGXCPU`

CPU time limit exceeded.

> **Availability:** Unix.

### `SIG*`

All the signal numbers are defined symbolically.  For example, the hangup signal
is defined as `signal.SIGHUP`; the variable names are identical to the
names used in C programs, as found in `<signal.h>`.  The Unix man page for
'`signal`' lists the existing signals (on some systems this is
signal(2), on others the list is in signal(7)). Note that
not all systems define the same set of signal names; only those names defined by
the system are defined by this module.

### `CTRL_C_EVENT`

The signal corresponding to the `Ctrl+C` keystroke event. This signal can
only be used with `os.kill()`.

> **Availability:** Windows.

> *Added in version 3.2.*

### `CTRL_BREAK_EVENT`

The signal corresponding to the `Ctrl+Break` keystroke event. This signal can
only be used with `os.kill()`.

> **Availability:** Windows.

> *Added in version 3.2.*

### `NSIG`

One more than the number of the highest signal number.
Use `valid_signals()` to get valid signal numbers.

### `ITIMER_REAL`

Decrements interval timer in real time, and delivers `SIGALRM` upon
expiration.

### `ITIMER_VIRTUAL`

Decrements interval timer only when the process is executing, and delivers
SIGVTALRM upon expiration.

### `ITIMER_PROF`

Decrements interval timer both when the process executes and when the
system is executing on behalf of the process. Coupled with ITIMER_VIRTUAL,
this timer is usually used to profile the time spent by the application
in user and kernel space. SIGPROF is delivered upon expiration.

### `SIG_BLOCK`

A possible value for the *how* parameter to `pthread_sigmask()`
indicating that signals are to be blocked.

> *Added in version 3.3.*

### `SIG_UNBLOCK`

A possible value for the *how* parameter to `pthread_sigmask()`
indicating that signals are to be unblocked.

> *Added in version 3.3.*

### `SIG_SETMASK`

A possible value for the *how* parameter to `pthread_sigmask()`
indicating that the signal mask is to be replaced.

> *Added in version 3.3.*

The `signal` module defines one exception:

### exception `ItimerError`

Raised to signal an error from the underlying `setitimer()` or
`getitimer()` implementation. Expect this error if an invalid
interval timer or a negative time is passed to `setitimer()`.
This error is a subtype of `OSError`.

> *Added in version 3.3.*
> This error used to be a subtype of `IOError`, which is now an
> alias of `OSError`.

The `signal` module defines the following functions:

### `alarm(time)`

If *time* is non-zero, this function requests that a `SIGALRM` signal be
sent to the process in *time* seconds. Any previously scheduled alarm is
canceled (only one alarm can be scheduled at any time).  The returned value is
then the number of seconds before any previously set alarm was to have been
delivered. If *time* is zero, no alarm is scheduled, and any scheduled alarm is
canceled.  If the return value is zero, no alarm is currently scheduled.

> **Availability:** Unix.
>
> See the man page alarm(2) for further information.

### `getsignal(signalnum)`

Return the current signal handler for the signal *signalnum*. The returned value
may be a callable Python object, or one of the special values
`signal.SIG_IGN`, `signal.SIG_DFL` or `None`.  Here,
`signal.SIG_IGN` means that the signal was previously ignored,
`signal.SIG_DFL` means that the default way of handling the signal was
previously in use, and `None` means that the previous signal handler was not
installed from Python.

### `strsignal(signalnum)`

Returns the description of signal *signalnum*, such as "Interrupt"
for `SIGINT`. Returns `None` if *signalnum* has no
description. Raises `ValueError` if *signalnum* is invalid.

> *Added in version 3.8.*

### `valid_signals()`

Return the set of valid signal numbers on this platform.  This can be
less than `range(1, NSIG)` if some signals are reserved by the system
for internal use.

> *Added in version 3.8.*

### `pause()`

Cause the process to sleep until a signal is received; the appropriate handler
will then be called.  Returns nothing.

> **Availability:** Unix.
>
> See the man page signal(2) for further information.

See also `sigwait()`, `sigwaitinfo()`, `sigtimedwait()` and
`sigpending()`.

### `raise_signal(signum)`

Sends a signal to the calling process. Returns nothing.

> *Added in version 3.8.*

### `pidfd_send_signal(pidfd, sig, siginfo=None, flags=0)`

Send signal *sig* to the process referred to by file descriptor *pidfd*.
Python does not currently support the *siginfo* parameter; it must be
`None`.  The *flags* argument is provided for future extensions; no flag
values are currently defined.

See the pidfd_send_signal(2) man page for more information.

> **Availability:** Linux >= 5.1, Android >= `build-time()` API level 31

> *Added in version 3.9.*

### `pthread_kill(thread_id, signalnum)`

Send the signal *signalnum* to the thread *thread_id*, another thread in the
same process as the caller.  The target thread can be executing any code
(Python or not).  However, if the target thread is executing the Python
interpreter, the Python signal handlers will be :ref:`executed by the main
thread of the main interpreter <signals-and-threads>`.  Therefore, the only point of sending a
signal to a particular Python thread would be to force a running system call
to fail with `InterruptedError`.

Use `threading.get_ident()` or the `ident`
attribute of `threading.Thread` objects to get a suitable value
for *thread_id*.

If *signalnum* is 0, then no signal is sent, but error checking is still
performed; this can be used to check if the target thread is still running.

> **Availability:** Unix.
>
> See the man page pthread_kill(3) for further  information.

See also `os.kill()`.

> *Added in version 3.3.*

### `pthread_sigmask(how, mask)`

Fetch and/or change the signal mask of the calling thread.  The signal mask
is the set of signals whose delivery is currently blocked for the caller.
Return the old signal mask as a set of signals.

The behavior of the call is dependent on the value of *how*, as follows.

- `SIG_BLOCK`: The set of blocked signals is the union of the current
set and the *mask* argument.
- `SIG_UNBLOCK`: The signals in *mask* are removed from the current
set of blocked signals.  It is permissible to attempt to unblock a
signal which is not blocked.
- `SIG_SETMASK`: The set of blocked signals is set to the *mask*
argument.

*mask* is a set of signal numbers (e.g. {`signal.SIGINT`,
`signal.SIGTERM`}). Use `valid_signals()` for a full
mask including all signals.

For example, `signal.pthread_sigmask(signal.SIG_BLOCK, [])` reads the
signal mask of the calling thread.

`SIGKILL` and `SIGSTOP` cannot be blocked.

> **Availability:** Unix.
>
> See the man page sigprocmask(2) and
> pthread_sigmask(3) for further information.

See also `pause()`, `sigpending()` and `sigwait()`.

> *Added in version 3.3.*

### `setitimer(which, seconds, interval=0)`

Sets given interval timer (one of `signal.ITIMER_REAL`,
`signal.ITIMER_VIRTUAL` or `signal.ITIMER_PROF`) specified
by *which* to fire after *seconds* (rounded up to microseconds, different from
`alarm()`) and after that every *interval* seconds (if *interval*
is non-zero). The interval timer specified by *which* can be cleared by
setting *seconds* to zero.

When an interval timer fires, a signal is sent to the process.
The signal sent is dependent on the timer being used;
`signal.ITIMER_REAL` will deliver `SIGALRM`,
`signal.ITIMER_VIRTUAL` sends `SIGVTALRM`,
and `signal.ITIMER_PROF` will deliver `SIGPROF`.

The old values are returned as a two-tuple of floats:
(`delay`, `interval`).

Attempting to pass an invalid interval timer will cause an
`ItimerError`.

> **Availability:** Unix.

> *Changed in version 3.15.*
> Accepts any real numbers as *seconds* and *interval*, not only integers
> or floats.

### `getitimer(which)`

Returns current value of a given interval timer specified by *which*.

> **Availability:** Unix.

### `set_wakeup_fd(fd, *, warn_on_full_buffer=True)`

Set the wakeup file descriptor to *fd*.  When a signal your program has
registered a signal handler for is received, the signal number is written as
a single byte into the fd.  If you haven't registered a signal handler for
the signals you care about, then nothing will be written to the wakeup fd.
This can be used by a library to wakeup a poll or select call, allowing the
signal to be fully processed.

The old wakeup fd is returned (or -1 if file descriptor wakeup was not
enabled).  If *fd* is -1, file descriptor wakeup is disabled.
If not -1, *fd* must be non-blocking.  It is up to the library to remove
any bytes from *fd* before calling poll or select again.

When threads are enabled, this function can only be called
from the main thread of the main interpreter;
attempting to call it from other threads will cause a `ValueError`
exception to be raised.

There are two common ways to use this function. In both approaches,
you use the fd to wake up when a signal arrives, but then they
differ in how they determine *which* signal or signals have
arrived.

In the first approach, we read the data out of the fd's buffer, and
the byte values give you the signal numbers. This is simple, but in
rare cases it can run into a problem: generally the fd will have a
limited amount of buffer space, and if too many signals arrive too
quickly, then the buffer may become full, and some signals may be
lost. If you use this approach, then you should set
`warn_on_full_buffer=True`, which will at least cause a warning
to be printed to stderr when signals are lost.

In the second approach, we use the wakeup fd *only* for wakeups,
and ignore the actual byte values. In this case, all we care about
is whether the fd's buffer is empty or non-empty; a full buffer
doesn't indicate a problem at all. If you use this approach, then
you should set `warn_on_full_buffer=False`, so that your users
are not confused by spurious warning messages.

> *Changed in version 3.5.*
> On Windows, the function now also supports socket handles.

> *Changed in version 3.7.*
> Added `warn_on_full_buffer` parameter.

### `siginterrupt(signalnum, flag)`

Change system call restart behaviour: if *flag* is `False`, system
calls will be restarted when interrupted by signal *signalnum*, otherwise
system calls will be interrupted.  Returns nothing.

> **Availability:** Unix.
>
> See the man page siginterrupt(3) for further information.

Note that installing a signal handler with `signal()` will reset the
restart behaviour to interruptible by implicitly calling
`siginterrupt` with a true *flag* value for the given signal.
