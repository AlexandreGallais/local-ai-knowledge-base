---
title: "ProcessHandle interface (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ProcessHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ProcessHandle interface (java.lang)

```java
public interface ProcessHandle extends Comparable<ProcessHandle>
```

ProcessHandle identifies and provides control of native processes. Each
individual process can be monitored for liveness, list its children,
get information about the process or destroy it.
By comparison, Process instances were started
by the current process and additionally provide access to the process
input, output, and error streams.

The native process ID is an identification number that the
operating system assigns to the process.
The range for process id values is dependent on the operating system.
For example, an embedded system might use a 16-bit value.
Status information about a process is retrieved from the native system
and may change asynchronously; processes may be created or terminate
spontaneously.
The time between when a process terminates and the process id
is reused for a new process is unpredictable.
Race conditions can exist between checking the status of a process and
acting upon it. When using ProcessHandles avoid assumptions
about the liveness or identity of the underlying process.

Each ProcessHandle identifies and allows control of a process in the native
system. ProcessHandles are returned from the factory methods `current()`,
`of(long)`,
`children`, `descendants`, `parent()` and
`allProcesses()`.

The `Process` instances created by `ProcessBuilder` can be queried
for a ProcessHandle that provides information about the Process.
ProcessHandle references should not be freely distributed.

A `java.util.concurrent.CompletableFuture` available from `onExit`
can be used to wait for process termination, and possibly trigger dependent
actions.

The ability to control processes may be restricted by the native system,
ProcessHandle provides no more access to, or control over, the native process
than would be allowed by a native application.

**Implementation requirements:** In the case where ProcessHandles cannot be supported then the factory
methods must consistently throw `java.lang.UnsupportedOperationException`.
The methods of this class throw `java.lang.UnsupportedOperationException`
if the operating system does not allow access to query or kill a process.

The `ProcessHandle` static factory methods return instances that are
value-based,
immutable and thread-safe. Programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may occur.
For example, in a future release, synchronization may fail.
Use the `equals` or compareTo methods
to compare ProcessHandles.

**See also:** Process

**Since:** 9

## ProcessHandle.pid()

```java
long pid()
```

Returns the native process ID of the process. The native process ID is an
identification number that the operating system assigns to the process.
The operating system may reuse the process ID after a process terminates.
Use equals or
compareTo to compare ProcessHandles.

**Returns:** the native process ID of the process

Throws:

- `UnsupportedOperationException`: if the implementation does not support this operation

## ProcessHandle.of(long)

```java
static Optional<ProcessHandle> of(long pid)
```

Returns an `Optional<ProcessHandle>` for an existing native process.

Parameters:

- `pid`: a native process ID

**Returns:** an `Optional<ProcessHandle>` of the PID for the process;
        the `Optional` is empty if the process does not exist

Throws:

- `UnsupportedOperationException`: if the implementation does not support this operation

## ProcessHandle.current()

```java
static ProcessHandle current()
```

Returns a ProcessHandle for the current process. The ProcessHandle cannot be
used to destroy the current process, use System.exit instead.

**Returns:** a ProcessHandle for the current process

Throws:

- `UnsupportedOperationException`: if the implementation does not support this operation

## ProcessHandle.parent()

```java
Optional<ProcessHandle> parent()
```

Returns an `Optional<ProcessHandle>` for the parent process.
Note that Processes in a zombie state usually don't have a parent.

**Returns:** an `Optional<ProcessHandle>` of the parent process;
        the `Optional` is empty if the child process does not have a parent
        or if the parent is not available, possibly due to operating system limitations

## ProcessHandle.children()

```java
Stream<ProcessHandle> children()
```

Returns a snapshot of the current direct children of the process.
The `parent` of a direct child process is the process.
Typically, a process that is not alive has no children.

*Note that processes are created and terminate asynchronously.
There is no guarantee that a process is alive.
*

**Returns:** a sequential Stream of ProcessHandles for processes that are
        direct children of the process

## ProcessHandle.descendants()

```java
Stream<ProcessHandle> descendants()
```

Returns a snapshot of the descendants of the process.
The descendants of a process are the children of the process
plus the descendants of those children, recursively.
Typically, a process that is not alive has no children.

*Note that processes are created and terminate asynchronously.
There is no guarantee that a process is alive.
*

**Returns:** a sequential Stream of ProcessHandles for processes that
        are descendants of the process

## ProcessHandle.allProcesses()

```java
static Stream<ProcessHandle> allProcesses()
```

Returns a snapshot of all processes visible to the current process.

*Note that processes are created and terminate asynchronously. There
is no guarantee that a process in the stream is alive or that no other
processes may have been created since the inception of the snapshot.
*

**Returns:** a Stream of ProcessHandles for all processes

Throws:

- `UnsupportedOperationException`: if the implementation does not support this operation

## ProcessHandle.info()

```java
Info info()
```

Returns a snapshot of information about the process.

 A `ProcessHandle.Info` instance has accessor methods that return
information about the process if it is available.

**Returns:** a snapshot of information about the process, always non-null

## ProcessHandle.command()

```java
Optional<String> command()
```

Returns the executable pathname of the process.

**Returns:** an `Optional<String>` of the executable pathname
        of the process

## ProcessHandle.commandLine()

```java
Optional<String> commandLine()
```

Returns the command line of the process.

If command() and  arguments() return
non-empty optionals, this is simply a convenience method which concatenates
the values of the two functions separated by spaces. Otherwise, it will return a
best-effort, platform dependent representation of the command line.

**API note:** Note that the returned executable pathname and the
         arguments may be truncated on some platforms due to system
         limitations.

         The executable pathname may contain only the
         name of the executable without the full path information.
         It is undecidable whether white space separates different
         arguments or is part of a single argument.

**Returns:** an `Optional<String>` of the command line
        of the process

## ProcessHandle.arguments()

```java
Optional<String[]> arguments()
```

Returns an array of Strings of the arguments of the process.

**API note:** On some platforms, native applications are free to change
         the arguments array after startup and this method may only
         show the changed values.

**Returns:** an `Optional<String[]>` of the arguments of the process

## ProcessHandle.startInstant()

```java
Optional<Instant> startInstant()
```

Returns the start time of the process.

**Returns:** an `Optional<Instant>` of the start time of the process

## ProcessHandle.totalCpuDuration()

```java
Optional<Duration> totalCpuDuration()
```

Returns the total cputime accumulated of the process.

**Returns:** an `Optional<Duration>` for the accumulated total cputime

## ProcessHandle.user()

```java
Optional<String> user()
```

Return the user of the process.

**Returns:** an `Optional<String>` for the user of the process

## ProcessHandle.onExit()

```java
CompletableFuture<ProcessHandle> onExit()
```

Returns a `CompletableFuture<ProcessHandle>` for the termination
of the process.
The `java.util.concurrent.CompletableFuture` provides the ability
to trigger dependent functions or actions that may be run synchronously
or asynchronously upon process termination.
When the process has terminated the CompletableFuture is
completed regardless
of the exit status of the process.
The `onExit` method can be called multiple times to invoke
independent actions when the process exits.

Calling `onExit().get()` waits for the process to terminate and returns
the ProcessHandle. The future can be used to check if the process is
done or to
wait for it to terminate.
Cancelling
the CompletableFuture does not affect the Process.

**API note:** The process may be observed to have terminated with `isAlive`
before the `CompletableFuture` is completed and dependent actions are invoked.

**Returns:** a new `CompletableFuture<ProcessHandle>` for the ProcessHandle

Throws:

- `IllegalStateException`: if the process is the current process

## ProcessHandle.supportsNormalTermination()

```java
boolean supportsNormalTermination()
```

Returns `true` if the implementation of `destroy`
normally terminates the process.
Returns `false` if the implementation of `destroy`
forcibly and immediately terminates the process.

**Returns:** `true` if the implementation of `destroy`
        normally terminates the process;
        otherwise, `destroy` forcibly terminates the process

## ProcessHandle.destroy()

```java
boolean destroy()
```

Requests the process to be killed.
Whether the process represented by this `ProcessHandle` object is
normally terminated or not is
implementation dependent.
Forcible process destruction is defined as the immediate termination of the
process, whereas normal termination allows the process to shut down cleanly.
If the process is not alive, no action is taken.
The operating system access controls may prevent the process
from being killed.

The `java.util.concurrent.CompletableFuture` from `onExit` is
completed
when the process has terminated.

Note: The process may not terminate immediately.
For example, `isAlive()` may return true for a brief period
after `destroy()` is called.

**Returns:** `true` if termination was successfully requested,
        otherwise `false`

Throws:

- `IllegalStateException`: if the process is the current process

## ProcessHandle.destroyForcibly()

```java
boolean destroyForcibly()
```

Requests the process to be killed forcibly.
The process represented by this `ProcessHandle` object is
forcibly terminated.
Forcible process destruction is defined as the immediate termination of the
process, whereas normal termination allows the process to shut down cleanly.
If the process is not alive, no action is taken.
The operating system access controls may prevent the process
from being killed.

The `java.util.concurrent.CompletableFuture` from `onExit` is
completed
when the process has terminated.

Note: The process may not terminate immediately.
For example, `isAlive()` may return true for a brief period
after `destroyForcibly()` is called.

**Returns:** `true` if termination was successfully requested,
        otherwise `false`

Throws:

- `IllegalStateException`: if the process is the current process

## ProcessHandle.isAlive()

```java
boolean isAlive()
```

Tests whether the process represented by this `ProcessHandle` is alive.
Process termination is implementation and operating system specific.
The process is considered alive as long as the PID is valid.

**Returns:** `true` if the process represented by this
        `ProcessHandle` object has not yet terminated

## ProcessHandle.hashCode()

```java
int hashCode()
```

Returns a hash code value for this ProcessHandle.
The hashcode value follows the general contract for `Object.hashCode()`.
The value is a function of the pid() value and
may be a function of additional information to uniquely identify the process.
If two ProcessHandles are equal according to the equals
method, then calling the hashCode method on each of the two objects
must produce the same integer result.

**Returns:** a hash code value for this object

## ProcessHandle.equals(Object)

```java
boolean equals(Object other)
```

Returns `true` if `other` object is non-null, is of the
same implementation, and represents the same system process;
otherwise it returns `false`.

Parameters:

- `other`: another object

**Implementation note:** It is implementation specific whether ProcessHandles with the same PID
represent the same system process. ProcessHandle implementations
should contain additional information to uniquely identify the process.
For example, the start time of the process could be used
to determine if the PID has been re-used.
The implementation of `equals` should return `true` for two
ProcessHandles with the same PID unless there is information to
distinguish them.

**Returns:** `true` if the `other` object is non-null,
        is of the same implementation class and represents
        the same system process; otherwise returns `false`

## ProcessHandle.compareTo(ProcessHandle)

```java
int compareTo(ProcessHandle other)
```

Compares this ProcessHandle with the specified ProcessHandle for order.
The order is not specified, but is consistent with `Object.equals`,
which returns `true` if and only if two instances of ProcessHandle
are of the same implementation and represent the same system process.
Comparison is only supported among objects of same implementation.
If attempt is made to mutually compare two different implementations
of `ProcessHandle`s, `ClassCastException` is thrown.

Parameters:

- `other`: the ProcessHandle to be compared

**Returns:** a negative integer, zero, or a positive integer as this object
is less than, equal to, or greater than the specified object.

Throws:

- `NullPointerException`: if the specified object is null
- `ClassCastException`: if the specified object is not of same class as this object
