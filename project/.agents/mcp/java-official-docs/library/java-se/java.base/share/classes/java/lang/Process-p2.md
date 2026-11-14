---
title: "Process class (java.lang) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Process.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Process class (java.lang) (part 2 of 2)

## Process.outputWriter(Charset)

```java
public final BufferedWriter outputWriter(Charset charset)
```

Returns a `BufferedWriter` connected to the normal input of the process
using a Charset.
Writes text to a character-output stream, buffering characters to provide
for the efficient writing of single characters, arrays, and strings.

Characters written by the writer are encoded to bytes using `OutputStreamWriter`
and the `Charset` are written to the standard input of the process represented
by this `Process`.
Malformed-input and unmappable-character sequences are replaced with the charset's
default replacement.

The first call to this method creates the BufferedWriter,
if called again with the same `charset` the same `BufferedWriter` is returned.
It is an error to call this method again with a different `charset`.

If the standard input of the process has been redirected using
ProcessBuilder.redirectInput then the `OutputStreamWriter` writes to a
null output stream.

The output writer should be closed
when it is no longer needed.

Parameters:

- `charset`: the `Charset` to encode characters to bytes

**API note:** A `BufferedWriter` writes characters, arrays of characters, and strings.
Wrapping the `BufferedWriter` with a `PrintWriter` provides
efficient buffering and formatting of primitives and objects as well as support
for auto-flush on line endings.
Call the `BufferedWriter.flush()` method to flush buffered output to the process.

When writing to both `getOutputStream()` and either `outputWriter()`
or `outputWriter(Charset)`, BufferedWriter.flush
should be called before writes to the `OutputStream`.

**Returns:** a `BufferedWriter` to the standard input of the process using the `charset`

**Since:** 17

Throws:

- `NullPointerException`: if the `charset` is `null`
- `IllegalStateException`: if called more than once with different charset arguments

## Process.waitFor()

```java
public abstract int waitFor() throws InterruptedException
```

Causes the current thread to wait, if necessary, until the
process represented by this `Process` object has
terminated.  This method returns immediately if the process
has already terminated.  If the process has not yet
terminated, the calling thread will be blocked until the
process exits.

**Returns:** the exit value of the process represented by this
        `Process` object.  By convention, the value
        `0` indicates normal termination.

Throws:

- `InterruptedException`: if the current thread is interrupted by another thread while it is waiting, then the wait is ended and an `InterruptedException` is thrown.

## Process.waitFor(long, TimeUnit)

```java
public boolean waitFor(long timeout, TimeUnit unit) throws InterruptedException
```

Causes the current thread to wait, if necessary, until the
process represented by this `Process` object has
terminated, or the specified waiting time elapses.

If the process has already terminated then this method returns
immediately with the value `true`.  If the process has not
terminated and the timeout value is less than, or equal to, zero, then
this method returns immediately with the value `false`.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the `timeout` argument

**Implementation requirements:** The default implementation of this method polls the `exitValue`
to check if the process has terminated.

**Implementation note:** Concrete implementations of this class are strongly encouraged to
override this method with a more efficient implementation.

**Returns:** `true` if the process has exited and `false` if
        the waiting time elapsed before the process has exited.

**Since:** 1.8

Throws:

- `InterruptedException`: if the current thread is interrupted while waiting.
- `NullPointerException`: if unit is null

## Process.waitFor(Duration)

```java
public boolean waitFor(Duration duration) throws InterruptedException
```

Causes the current thread to wait, if necessary, until the
process represented by this `Process` object has
terminated, or the specified waiting duration elapses.

If the process has already terminated then this method returns
immediately with the value `true`.  If the process has not
terminated and the duration is not positive, then
this method returns immediately with the value `false`.

Parameters:

- `duration`: the maximum duration to wait; if not positive, this method returns immediately.

**Implementation requirements:** The default implementation of this method polls the `exitValue`
to check if the process has terminated.

**Implementation note:** Concrete implementations of this class are strongly encouraged to
override this method with a more efficient implementation.

**Returns:** `true` if the process has exited and `false` if
        the waiting duration elapsed before the process has exited.

**Since:** 24

Throws:

- `InterruptedException`: if the current thread is interrupted while waiting.
- `NullPointerException`: if duration is null

## Process.exitValue()

```java
public abstract int exitValue()
```

Returns the exit value for the process.

**Returns:** the exit value of the process represented by this
        `Process` object.  By convention, the value
        `0` indicates normal termination.

Throws:

- `IllegalThreadStateException`: if the process represented by this `Process` object has not yet terminated

## Process.destroy()

```java
public abstract void destroy()
```

Kills the process.
Whether the process represented by this `Process` object is
normally terminated or not is
implementation dependent.
Forcible process destruction is defined as the immediate termination of a
process, whereas normal termination allows the process to shut down cleanly.
If the process is not alive, no action is taken.

The `java.util.concurrent.CompletableFuture` from `onExit` is
completed
when the process has terminated.

## Process.destroyForcibly()

```java
public Process destroyForcibly()
```

Kills the process forcibly. The process represented by this
`Process` object is forcibly terminated.
Forcible process destruction is defined as the immediate termination of a
process, whereas normal termination allows the process to shut down cleanly.
If the process is not alive, no action is taken.

The `java.util.concurrent.CompletableFuture` from `onExit` is
completed
when the process has terminated.

Invoking this method on `Process` objects returned by
`ProcessBuilder.start()` and `Runtime.exec` forcibly terminate
the process.

**Implementation requirements:** The default implementation of this method invokes `destroy`
and so may not forcibly terminate the process.

**Implementation note:** Concrete implementations of this class are strongly encouraged to override
this method with a compliant implementation.

**API note:** The process may not terminate immediately.
i.e. `isAlive()` may return true for a brief period
after `destroyForcibly()` is called. This method
may be chained to `waitFor()` if needed.

**Returns:** the `Process` object representing the
        process forcibly destroyed

**Since:** 1.8

## Process.supportsNormalTermination()

```java
public boolean supportsNormalTermination()
```

Returns `true` if the implementation of `destroy` is to
normally terminate the process,
Returns `false` if the implementation of `destroy`
forcibly and immediately terminates the process.

Invoking this method on `Process` objects returned by
`ProcessBuilder.start()` and `Runtime.exec` return
`true` or `false` depending on the platform implementation.

**Implementation requirements:** This implementation throws an instance of
`java.lang.UnsupportedOperationException` and performs no other action.

**Returns:** `true` if the implementation of `destroy` is to
        normally terminate the process;
        otherwise, `destroy` forcibly terminates the process

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the Process implementation does not support this operation

## Process.isAlive()

```java
public boolean isAlive()
```

Tests whether the process represented by this `Process` is
alive.

**Returns:** `true` if the process represented by this
        `Process` object has not yet terminated.

**Since:** 1.8

## Process.pid()

```java
public long pid()
```

Returns the native process ID of the process.
The native process ID is an identification number that the operating
system assigns to the process.

**Implementation requirements:** The implementation of this method returns the process id as:
toHandle().pid().

**Returns:** the native process id of the process

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the Process implementation does not support this operation

## Process.onExit()

```java
public CompletableFuture<Process> onExit()
```

Returns a `CompletableFuture<Process>` for the termination of the Process.
The `java.util.concurrent.CompletableFuture` provides the ability
to trigger dependent functions or actions that may be run synchronously
or asynchronously upon process termination.
When the process has terminated the CompletableFuture is
completed regardless
of the exit status of the process.

Calling `onExit().get()` waits for the process to terminate and returns
the Process. The future can be used to check if the process is
done or to
wait for it to terminate.
Cancelling
the CompletableFuture does not affect the Process.

Processes returned from `ProcessBuilder.start()` override the
default implementation to provide an efficient mechanism to wait
for process exit.

**API note:** Using onExit is an alternative to
waitFor that enables both additional concurrency
and convenient access to the result of the Process.
Lambda expressions can be used to evaluate the result of the Process
execution.
If there is other processing to be done before the value is used
then onExit is a convenient mechanism to
free the current thread and block only if and when the value is needed.

For example, launching a process to compare two files and get a boolean if they are identical:

**Implementation requirements:** This implementation executes `waitFor()` in a separate thread
repeatedly until it returns successfully. If the execution of
`waitFor` is interrupted, the thread's interrupt status is preserved.

When `waitFor()` returns successfully the CompletableFuture is
completed regardless
of the exit status of the process.

This implementation may consume a lot of memory for thread stacks if a
large number of processes are waited for concurrently.

External implementations should override this method and provide
a more efficient implementation. For example, to delegate to the underlying
process, it can do the following:

**API note:** The process may be observed to have terminated with `isAlive`
before the ComputableFuture is completed and dependent actions are invoked.

**Returns:** a new `CompletableFuture<Process>` for the Process

**Since:** 9

## Process.toHandle()

```java
public ProcessHandle toHandle()
```

Returns a ProcessHandle for the Process.

`Process` objects returned by `ProcessBuilder.start()` and
`Runtime.exec` implement `toHandle` as the equivalent of
ProcessHandle.of(pid).

**Implementation requirements:** This implementation throws an instance of
`java.lang.UnsupportedOperationException` and performs no other action.
Subclasses should override this method to provide a ProcessHandle for the
process.  The methods `pid`, `info`, `children`,
and `descendants`, unless overridden, operate on the ProcessHandle.

**Returns:** Returns a ProcessHandle for the Process

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the Process implementation does not support this operation

## Process.info()

```java
public ProcessHandle.Info info()
```

Returns a snapshot of information about the process.

 A `ProcessHandle.Info` instance has accessor methods
that return information about the process if it is available.

**Implementation requirements:** This implementation returns information about the process as:
toHandle().info().

**Returns:** a snapshot of information about the process, always non-null

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the Process implementation does not support this operation

## Process.children()

```java
public Stream<ProcessHandle> children()
```

Returns a snapshot of the direct children of the process.
The parent of a direct child process is the process.
Typically, a process that is not alive has no children.

*Note that processes are created and terminate asynchronously.
There is no guarantee that a process is alive.
*

**Implementation requirements:** This implementation returns the direct children as:
toHandle().children().

**Returns:** a sequential Stream of ProcessHandles for processes that are
        direct children of the process

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the Process implementation does not support this operation

## Process.descendants()

```java
public Stream<ProcessHandle> descendants()
```

Returns a snapshot of the descendants of the process.
The descendants of a process are the children of the process
plus the descendants of those children, recursively.
Typically, a process that is not alive has no children.

*Note that processes are created and terminate asynchronously.
There is no guarantee that a process is alive.
*

**Implementation requirements:** This implementation returns all children as:
toHandle().descendants().

**Returns:** a sequential Stream of ProcessHandles for processes that
        are descendants of the process

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the Process implementation does not support this operation
