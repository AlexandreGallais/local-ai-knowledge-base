---
title: "os --- Miscellaneous operating system interfaces (part 15 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 15 of 16)

### `wait()`

Wait for completion of a child process, and return a tuple containing its pid
and exit status indication: a 16-bit number, whose low byte is the signal number
that killed the process, and whose high byte is the exit status (if the signal
number is zero); the high bit of the low byte is set if a core file was
produced.

If there are no children that could be waited for, `ChildProcessError`
is raised.

`waitstatus_to_exitcode()` can be used to convert the exit status into an
exit code.

> **Availability:** Unix, not WASI, not Android, not iOS.

> **See also:** The other `wait*()` functions documented below can be used to wait for the
> completion of a specific child process and have more options.
> `waitpid()` is the only one also available on Windows.

### `waitid(idtype, id, options, /)`

Wait for the completion of a child process.

*idtype* can be `P_PID`, `P_PGID`, `P_ALL`, or (on Linux) `P_PIDFD`.
The interpretation of *id* depends on it; see their individual descriptions.

*options* is an OR combination of flags.  At least one of `WEXITED`,
`WSTOPPED` or `WCONTINUED` is required;
`WNOHANG` and `WNOWAIT` are additional optional flags.

The return value is an object representing the data contained in the
`siginfo_t` structure with the following attributes:

- `si_pid` (process ID)
- `si_uid` (real user ID of the child)
- `si_signo` (always `SIGCHLD`)
- `si_status` (the exit status or signal number, depending on `si_code`)
- `si_code` (see `CLD_EXITED` for possible values)

If `WNOHANG` is specified and there are no matching children in the
requested state, `None` is returned.
Otherwise, if there are no matching children
that could be waited for, `ChildProcessError` is raised.

> **Availability:** Unix, not WASI, not Android, not iOS.

> *Added in version 3.3.*

> *Changed in version 3.13.*
> This function is now available on macOS as well.

### `waitpid(pid, options, /)`

The details of this function differ on Unix and Windows.

On Unix: Wait for completion of a child process given by process id *pid*, and
return a tuple containing its process id and exit status indication (encoded as
for `wait()`).  The semantics of the call are affected by the value of the
integer *options*, which should be `0` for normal operation.

If *pid* is greater than `0`, `waitpid()` requests status information for
that specific process.  If *pid* is `0`, the request is for the status of any
child in the process group of the current process.  If *pid* is `-1`, the
request pertains to any child of the current process.  If *pid* is less than
`-1`, status is requested for any process in the process group `-pid` (the
absolute value of *pid*).

*options* is an OR combination of flags.  If it contains `WNOHANG` and
there are no matching children in the requested state, `(0, 0)` is
returned.  Otherwise, if there are no matching children that could be waited
for, `ChildProcessError` is raised.  Other options that can be used are
`WUNTRACED` and `WCONTINUED`.

On Windows: Wait for completion of a process given by process handle *pid*, and
return a tuple containing *pid*, and its exit status shifted left by 8 bits
(shifting makes cross-platform use of the function easier). A *pid* less than or
equal to `0` has no special meaning on Windows, and raises an exception. The
value of integer *options* has no effect. *pid* can refer to any process whose
id is known, not necessarily a child process. The `spawn*()`
functions called with `P_NOWAIT` return suitable process handles.

`waitstatus_to_exitcode()` can be used to convert the exit status into an
exit code.

> **Availability:** Unix, Windows, not WASI, not Android, not iOS.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise an
> exception, the function now retries the system call instead of raising an
> `InterruptedError` exception (see PEP 475 for the rationale).

### `wait3(options)`

Similar to `waitpid()`, except no process id argument is given and a
3-element tuple containing the child's process id, exit status indication,
and resource usage information is returned.  Refer to
`resource.getrusage()` for details on resource usage information.  The
*options* argument is the same as that provided to `waitpid()` and
`wait4()`.

`waitstatus_to_exitcode()` can be used to convert the exit status into an
exitcode.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `wait4(pid, options)`

Similar to `waitpid()`, except a 3-element tuple, containing the child's
process id, exit status indication, and resource usage information is
returned.  Refer to `resource.getrusage()` for details on resource usage
information.  The arguments to `wait4()` are the same as those provided
to `waitpid()`.

`waitstatus_to_exitcode()` can be used to convert the exit status into an
exitcode.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `P_PID`

```python
P_PGID
P_ALL
P_PIDFD
```

These are the possible values for *idtype* in `waitid()`. They affect
how *id* is interpreted:

- `P_PID` - wait for the child whose PID is *id*.
- `P_PGID` - wait for any child whose progress group ID is *id*.
- `P_ALL` - wait for any child; *id* is ignored.
- `P_PIDFD` - wait for the child identified by the file descriptor
*id* (a process file descriptor created with `pidfd_open()`).

> **Availability:** Unix, not WASI, not Android, not iOS.

> **Note:** `P_PIDFD` is only available on Linux >= 5.4.

> *Added in version 3.3.*

> *Added in version 3.9.*
> The `P_PIDFD` constant.

### `WCONTINUED`

This *options* flag for `waitpid()`, `wait3()`, `wait4()`, and
`waitid()` causes child processes to be reported if they have been
continued from a job control stop since they were last reported.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WEXITED`

This *options* flag for `waitid()` causes child processes that have terminated to
be reported.

The other `wait*` functions always report children that have terminated,
so this option is not available for them.

> **Availability:** Unix, not WASI, not Android, not iOS.

> *Added in version 3.3.*

### `WSTOPPED`

This *options* flag for `waitid()` causes child processes that have been stopped
by the delivery of a signal to be reported.

This option is not available for the other `wait*` functions.

> **Availability:** Unix, not WASI, not Android, not iOS.

> *Added in version 3.3.*

### `WUNTRACED`

This *options* flag for `waitpid()`, `wait3()`, and `wait4()` causes
child processes to also be reported if they have been stopped but their
current state has not been reported since they were stopped.

This option is not available for `waitid()`.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WNOHANG`

This *options* flag causes `waitpid()`, `wait3()`, `wait4()`, and
`waitid()` to return right away if no child process status is available
immediately.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WNOWAIT`

This *options* flag causes `waitid()` to leave the child in a waitable state, so that
a later `wait*()` call can be used to retrieve the child status information again.

This option is not available for the other `wait*` functions.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `CLD_EXITED`

```python
CLD_KILLED
CLD_DUMPED
CLD_TRAPPED
CLD_STOPPED
CLD_CONTINUED
```

These are the possible values for `si_code` in the result returned by
`waitid()`.

> **Availability:** Unix, not WASI, not Android, not iOS.

> *Added in version 3.3.*

> *Changed in version 3.9.*
> Added `CLD_KILLED` and `CLD_STOPPED` values.

### `waitstatus_to_exitcode(status)`

Convert a wait status to an exit code.

On Unix:

- If the process exited normally (if `WIFEXITED(status)` is true),
return the process exit status (return `WEXITSTATUS(status)`):
result greater than or equal to 0.
- If the process was terminated by a signal (if `WIFSIGNALED(status)` is
true), return `-signum` where *signum* is the number of the signal that
caused the process to terminate (return `-WTERMSIG(status)`):
result less than 0.
- Otherwise, raise a `ValueError`.

On Windows, return *status* shifted right by 8 bits.

On Unix, if the process is being traced or if `waitpid()` was called
with `WUNTRACED` option, the caller must first check if
`WIFSTOPPED(status)` is true. This function must not be called if
`WIFSTOPPED(status)` is true.

> **See also:** `WIFEXITED()`, `WEXITSTATUS()`, `WIFSIGNALED()`,
> `WTERMSIG()`, `WIFSTOPPED()`, `WSTOPSIG()` functions.

> **Availability:** Unix, Windows, not WASI, not Android, not iOS.

> *Added in version 3.9.*

The following functions take a process status code as returned by
`system()`, `wait()`, or `waitpid()` as a parameter.  They may be
used to determine the disposition of a process.

### `WCOREDUMP(status, /)`

Return `True` if a core dump was generated for the process, otherwise
return `False`.

This function should be employed only if `WIFSIGNALED()` is true.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WIFCONTINUED(status)`

Return `True` if a stopped child has been resumed by delivery of
`SIGCONT` (if the process has been continued from a job
control stop), otherwise return `False`.

See `WCONTINUED` option.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WIFSTOPPED(status)`

Return `True` if the process was stopped by delivery of a signal,
otherwise return `False`.

`WIFSTOPPED()` only returns `True` if the `waitpid()` call was
done using `WUNTRACED` option or when the process is being traced (see
ptrace(2)).

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WIFSIGNALED(status)`

Return `True` if the process was terminated by a signal, otherwise return
`False`.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WIFEXITED(status)`

Return `True` if the process exited terminated normally, that is,
by calling `exit()` or `_exit()`, or by returning from `main()`;
otherwise return `False`.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WEXITSTATUS(status)`

Return the process exit status.

This function should be employed only if `WIFEXITED()` is true.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WSTOPSIG(status)`

Return the signal which caused the process to stop.

This function should be employed only if `WIFSTOPPED()` is true.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `WTERMSIG(status)`

Return the number of the signal that caused the process to terminate.

This function should be employed only if `WIFSIGNALED()` is true.

> **Availability:** Unix, not WASI, not Android, not iOS.

## Interface to the scheduler

These functions control how a process is allocated CPU time by the operating
system. They are only available on some Unix platforms. For more detailed
information, consult your Unix manpages.

> *Added in version 3.3.*

The following scheduling policies are exposed if they are supported by the
operating system.

### `SCHED_OTHER`

The default scheduling policy.

### `SCHED_BATCH`

Scheduling policy for CPU-intensive processes that tries to preserve
interactivity on the rest of the computer.

### `SCHED_DEADLINE`

Scheduling policy for tasks with deadline constraints.

> *Added in version 3.14.*

### `SCHED_IDLE`

Scheduling policy for extremely low priority background tasks.

### `SCHED_NORMAL`

Alias for `SCHED_OTHER`.

> *Added in version 3.14.*

### `SCHED_SPORADIC`

Scheduling policy for sporadic server programs.

### `SCHED_FIFO`

A First In First Out scheduling policy.

### `SCHED_RR`

A round-robin scheduling policy.

### `SCHED_RESET_ON_FORK`

This flag can be OR'ed with any other scheduling policy. When a process with
this flag set forks, its child's scheduling policy and priority are reset to
the default.

### class `sched_param(sched_priority)`

This class represents tunable scheduling parameters used in
`sched_setparam()`, `sched_setscheduler()`, and
`sched_getparam()`. It is immutable.

At the moment, there is only one possible parameter:

### `sched_priority`

The scheduling priority for a scheduling policy.

### `sched_get_priority_min(policy)`

Get the minimum priority value for *policy*. *policy* is one of the
scheduling policy constants above.

### `sched_get_priority_max(policy)`

Get the maximum priority value for *policy*. *policy* is one of the
scheduling policy constants above.

### `sched_setscheduler(pid, policy, param, /)`

Set the scheduling policy for the process with PID *pid*. A *pid* of 0 means
the calling process. *policy* is one of the scheduling policy constants
above. *param* is a `sched_param` instance.

### `sched_getscheduler(pid, /)`

Return the scheduling policy for the process with PID *pid*. A *pid* of 0
means the calling process. The result is one of the scheduling policy
constants above.

### `sched_setparam(pid, param, /)`

Set the scheduling parameters for the process with PID *pid*. A *pid* of 0 means
the calling process. *param* is a `sched_param` instance.

### `sched_getparam(pid, /)`

Return the scheduling parameters as a `sched_param` instance for the
process with PID *pid*. A *pid* of 0 means the calling process.

### `sched_rr_get_interval(pid, /)`

Return the round-robin quantum in seconds for the process with PID *pid*. A
*pid* of 0 means the calling process.

### `sched_yield()`

Voluntarily relinquish the CPU. See sched_yield(2) for details.

### `sched_setaffinity(pid, mask, /)`

Restrict the process with PID *pid* (or the current process if zero) to a
set of CPUs.  *mask* is an iterable of integers representing the set of
CPUs to which the process should be restricted.

### `sched_getaffinity(pid, /)`

Return the set of CPUs the process with PID *pid* is restricted to.

If *pid* is zero, return the set of CPUs the calling thread of the current
process is restricted to.

See also the `process_cpu_count()` function.
