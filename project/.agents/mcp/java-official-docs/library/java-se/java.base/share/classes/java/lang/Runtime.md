---
title: "Runtime class (java.lang) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Runtime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Runtime class (java.lang)

```java
public final class Runtime
```

Every Java application has a single instance of class
`Runtime` that allows the application to interface with
the environment in which the application is running. The current
runtime can be obtained from the `getRuntime` method.

An application cannot create its own instance of this class.

#### Shutdown Sequence

The Java Virtual Machine initiates the *shutdown sequence* in response
to one of several events:

- when the number of live non-daemon threads drops to zero
for the first time (see note below on the JNI Invocation API);

- when the Runtime.exit or System.exit method is called
for the first time; or

- when some external event occurs, such as an interrupt or a signal is received from
the operating system.

At the beginning of the shutdown sequence, the registered shutdown hooks are
started in some unspecified order. They run concurrently
with any daemon or non-daemon threads that were alive
at the beginning of the shutdown sequence.

After the shutdown sequence has begun, registration and de-registration of shutdown hooks
with addShutdownHook and removeShutdownHook
is prohibited. However, creating and starting new threads is permitted. New threads run
concurrently with the registered shutdown hooks and with any daemon or non-daemon threads
that are already running.

The shutdown sequence finishes when all shutdown hooks have terminated. At this point,
the Java Virtual Machine terminates as described below.

It is possible that one or more shutdown hooks do not terminate, for example, because
of an infinite loop. In this case, the shutdown sequence will never finish. Other threads
and shutdown hooks continue to run and can terminate the JVM via the halt method.

Prior to the beginning of the shutdown sequence, it is possible for a program to start
a shutdown hook by calling its start method explicitly. If this occurs, the
behavior of the shutdown sequence is unspecified.

#### Java Virtual Machine Termination

The JVM terminates when the shutdown sequence finishes or when halt is called.
In contrast to exit, the halt method does not initiate the
shutdown sequence.

When the JVM terminates, all threads are immediately prevented from executing any further
Java code. This includes shutdown hooks as well as daemon and non-daemon threads.
This means, for example, that:

- threads' current methods do not complete normally or abruptly;

- `finally` clauses are not executed;

- uncaught exception handlers are not run; and

- resources opened with try-with-resources are not closed;

**Implementation note:** Native code typically uses the
JNI Invocation API
to control launching and termination of the JVM. Such native code invokes the
`JNI_CreateJavaVM`
function to launch the JVM. Subsequently, the native code invokes the
`DestroyJavaVM`
function to await termination of that JVM. The `DestroyJavaVM` function is responsible
for initiating the shutdown sequence when the number of live
non-daemon threads first drops to zero. When the shutdown sequence completes and the JVM
terminates, control is returned to the native code that invoked `DestroyJavaVM`. This
behavior differs from the exit or halt methods. These methods
typically terminate the OS process hosting the JVM and do not interact with the JNI Invocation
API.

**See also:** java.lang.Runtime#getRuntime()

**JLS:** 12.8 Program Exit

**Since:** 1.0

## Runtime.getRuntime()

```java
public static Runtime getRuntime()
```

Returns the runtime object associated with the current Java application.
Most of the methods of class `Runtime` are instance
methods and must be invoked with respect to the current runtime object.

**Returns:** the `Runtime` object associated with the current
         Java application.

## Runtime.exit(int)

```java
public void exit(int status)
```

Initiates the shutdown sequence of the Java Virtual Machine.
This method initiates the shutdown sequence (if it is not already initiated) and
then blocks indefinitely. This method neither returns nor throws an exception; that
is, it does not complete either normally or abruptly.

 The argument serves as a status code. By convention, a nonzero status code
indicates abnormal termination.

 Successful invocations of this method are serialized such that only one invocation
initiates the shutdown sequence and terminates the VM with the given status code.
All other invocations will perform no action and block indefinitely.

 Because a successful invocation of this method blocks indefinitely, if it is invoked
from a shutdown hook, it will prevent that shutdown hook from terminating. Consequently,
this will prevent the shutdown sequence from finishing.

 The System.exit method is the
conventional and convenient means of invoking this method.

Parameters:

- `status`: Termination status. By convention, a nonzero status code indicates abnormal termination.

**Implementation note:** If the system logger for `java.lang.Runtime`
is enabled with logging level Level.DEBUG the stack trace
of the call to `Runtime.exit()` is logged.

**See also:** #addShutdownHook

**See also:** #removeShutdownHook

**See also:** #halt(int)

## Runtime.addShutdownHook(Thread)

```java
public void addShutdownHook(Thread hook)
```

Registers a new virtual-machine shutdown hook.

 A *shutdown hook* is simply an initialized but unstarted thread. Shutdown hooks
are started at the beginning of the shutdown sequence.
Registration and de-registration of shutdown hooks is disallowed once the shutdown
sequence has begun.

Uncaught exceptions are handled in shutdown hooks just as in any other thread, as
specified in `Thread.UncaughtExceptionHandler`. After the uncaught exception
handler has completed, the shutdown hook is considered to have terminated and is not
treated differently from a hook that has terminated without having thrown an
uncaught exception.

Parameters:

- `hook`: An initialized but unstarted `Thread` object

**API note:** Shutdown hooks run at a delicate time in the life cycle of a virtual
machine and should therefore be coded defensively. They should, in
particular, be written to be thread-safe and to avoid deadlocks insofar
as possible. They should also not rely blindly upon services that may
have registered their own shutdown hooks and therefore may themselves be
in the process of shutting down. Attempts to use other thread-based
services such as the AWT event-dispatch thread, for example, may lead to
deadlocks.

Shutdown hooks should also finish their work quickly.  When a
program invokes exit, the expectation is
that the virtual machine will promptly shut down and exit.  When the
virtual machine is terminated due to user logoff or system shutdown the
underlying operating system may only allow a limited amount of time in
which to shut down and exit. It is therefore inadvisable to attempt any
user interaction or to perform a long-running computation in a shutdown
hook.

**See also:** #removeShutdownHook

**See also:** #halt(int)

**See also:** #exit(int)

**Since:** 1.3

Throws:

- `IllegalArgumentException`: If the same hook (compared using `==`) as the specified hook has already been registered, or if it can be determined that the hook is already running or has already been run
- `IllegalStateException`: If the shutdown sequence has already begun

## Runtime.removeShutdownHook(Thread)

```java
public boolean removeShutdownHook(Thread hook)
```

De-registers a previously-registered virtual-machine shutdown hook.
Hooks are compared using `==`.
Registration and de-registration of shutdown hooks is disallowed
once the shutdown sequence has begun.

Parameters:

- `hook`: the hook to remove

**Returns:** `true` if the specified hook had previously been
registered and was successfully de-registered, `false`
otherwise.

**See also:** #addShutdownHook

**See also:** #exit(int)

**Since:** 1.3

Throws:

- `IllegalStateException`: If the shutdown sequence has already begun

## Runtime.halt(int)

```java
public void halt(int status)
```

Immediately terminates the Java Virtual Machine.
Termination of the Java Virtual Machine is unconditional and immediate.
This method does not initiate the shutdown sequence, nor does
it wait for the shutdown sequence to finish if it is already in progress. An
invocation of this method never returns normally.

Parameters:

- `status`: Termination status. By convention, a nonzero status code indicates abnormal termination. If the exit (equivalently, System.exit) method has already been invoked then this status code will override the status code passed to that method.

**API note:** This method should be used with extreme caution. Using it may circumvent or disrupt
any cleanup actions intended to be performed by shutdown hooks, possibly leading to
data corruption. See the termination section above
for other possible consequences of halting the Java Virtual Machine.

**See also:** #exit

**See also:** #addShutdownHook

**See also:** #removeShutdownHook

**Since:** 1.3

## Runtime.exec(String)

```java
public Process exec(String command) throws IOException
```

Executes the specified string command in a separate process.

This is a convenience method.  An invocation of the form
`exec(command)`
behaves in exactly the same way as the invocation
String[], File) exec`(command, null, null)`.

Parameters:

- `command`: a specified system command.

**Deprecated:** This method is error-prone and should not be used, the corresponding method
`exec(String[])` or `ProcessBuilder` should be used instead.
The command string is broken into tokens using only whitespace characters.
For an argument with an embedded space, such as a filename, this can cause problems
as the token does not include the full filename.

**Returns:** A new `Process` object for managing the subprocess

**Implementation note:** In the reference implementation, logging of the created process can be enabled,
see `ProcessBuilder.start()` for details.

**See also:** #exec(String[], String[], File)

**See also:** ProcessBuilder

Throws:

- `IOException`: If an I/O error occurs
- `NullPointerException`: If `command` is `null`
- `IllegalArgumentException`: If `command` is empty

## Runtime.exec(String, String[])

```java
public Process exec(String command, String[] envp) throws IOException
```

Executes the specified string command in a separate process with the
specified environment.

This is a convenience method.  An invocation of the form
`exec(command, envp)`
behaves in exactly the same way as the invocation
String[], File) exec`(command, envp, null)`.

Parameters:

- `command`: a specified system command.
- `envp`: array of strings, each element of which has environment variable settings in the format *name*=*value*, or `null` if the subprocess should inherit the environment of the current process.

**Deprecated:** This method is error-prone and should not be used, the corresponding method
String[]) or `ProcessBuilder` should be used instead.
The command string is broken into tokens using only whitespace characters.
For an argument with an embedded space, such as a filename, this can cause problems
as the token does not include the full filename.

**Returns:** A new `Process` object for managing the subprocess

**Implementation note:** In the reference implementation, logging of the created process can be enabled,
see `ProcessBuilder.start()` for details.

**See also:** #exec(String[], String[], File)

**See also:** ProcessBuilder

Throws:

- `IOException`: If an I/O error occurs
- `NullPointerException`: If `command` is `null`, or one of the elements of `envp` is `null`
- `IllegalArgumentException`: If `command` is empty

## Runtime.exec(String, String[], File)

```java
public Process exec(String command, String[] envp, File dir) throws IOException
```

Executes the specified string command in a separate process with the
specified environment and working directory.

This is a convenience method.  An invocation of the form
`exec(command, envp, dir)`
behaves in exactly the same way as the invocation
String[], File) exec`(cmdarray, envp, dir)`,
where `cmdarray` is an array of all the tokens in
`command`.

More precisely, the `command` string is broken
into tokens using a `StringTokenizer` created by the call
`new StringTokenizer(command)` with no
further modification of the character categories.  The tokens
produced by the tokenizer are then placed in the new string
array `cmdarray`, in the same order.

Parameters:

- `command`: a specified system command.
- `envp`: array of strings, each element of which has environment variable settings in the format *name*=*value*, or `null` if the subprocess should inherit the environment of the current process.
- `dir`: the working directory of the subprocess, or `null` if the subprocess should inherit the working directory of the current process.

**Deprecated:** This method is error-prone and should not be used, the corresponding method
String[], File) or `ProcessBuilder` should be used instead.
The command string is broken into tokens using only whitespace characters.
For an argument with an embedded space, such as a filename, this can cause problems
as the token does not include the full filename.

**Returns:** A new `Process` object for managing the subprocess

**Implementation note:** In the reference implementation, logging of the created process can be enabled,
see `ProcessBuilder.start()` for details.

**See also:** ProcessBuilder

**Since:** 1.3

Throws:

- `IOException`: If an I/O error occurs
- `NullPointerException`: If `command` is `null`, or one of the elements of `envp` is `null`
- `IllegalArgumentException`: If `command` is empty

## Runtime.exec(String[])

```java
public Process exec(String[] cmdarray) throws IOException
```

Executes the specified command and arguments in a separate process.

This is a convenience method.  An invocation of the form
`exec(cmdarray)`
behaves in exactly the same way as the invocation
String[], File) exec`(cmdarray, null, null)`.

Parameters:

- `cmdarray`: array containing the command to call and its arguments.

**Returns:** A new `Process` object for managing the subprocess

**Implementation note:** In the reference implementation, logging of the created process can be enabled,
see `ProcessBuilder.start()` for details.

**See also:** ProcessBuilder

Throws:

- `IOException`: If an I/O error occurs
- `NullPointerException`: If `cmdarray` is `null`, or one of the elements of `cmdarray` is `null`
- `IndexOutOfBoundsException`: If `cmdarray` is an empty array (has length `0`)
