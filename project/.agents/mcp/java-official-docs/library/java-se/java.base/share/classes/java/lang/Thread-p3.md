---
title: "Thread class (java.lang) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Thread.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Thread class (java.lang) (part 3 of 3)

## Thread.enumerate(Thread[])

```java
public static int enumerate(Thread[] tarray)
```

Copies into the specified array every live
platform thread in the current thread's thread group and its subgroups.
This method simply invokes the `java.lang.ThreadGroup.enumerate(Thread[])`
method of the current thread's thread group. Virtual threads are
not enumerated by this method.

 An application might use the activeCount
method to get an estimate of how big the array should be, however
*if the array is too short to hold all the threads, the extra threads
are silently ignored.*  If it is critical to obtain every live
thread in the current thread's thread group and its subgroups, the
invoker should verify that the returned int value is strictly less
than the length of `tarray`.

 Due to the inherent race condition in this method, it is recommended
that the method only be used for debugging and monitoring purposes.

Parameters:

- `tarray`: an array into which to put the list of threads

**Returns:** the number of threads put into the array

## Thread.join(long)

```java
public final void join(long millis) throws InterruptedException
```

Waits at most `millis` milliseconds for this thread to terminate.
A timeout of `0` means to wait forever.
This method returns immediately, without waiting, if the thread has not
been started.

Parameters:

- `millis`: the time to wait in milliseconds

**Implementation note:** For platform threads, the implementation uses a loop of `this.wait`
calls conditioned on `this.isAlive`. As a thread terminates the
`this.notifyAll` method is invoked. It is recommended that
applications not use `wait`, `notify`, or
`notifyAll` on `Thread` instances.

Throws:

- `IllegalArgumentException`: if the value of `millis` is negative
- `InterruptedException`: if any thread has interrupted the current thread. The *interrupted status* of the current thread is cleared when this exception is thrown.

## Thread.join(long, int)

```java
public final void join(long millis, int nanos) throws InterruptedException
```

Waits at most `millis` milliseconds plus
`nanos` nanoseconds for this thread to terminate.
If both arguments are `0`, it means to wait forever.
This method returns immediately, without waiting, if the thread has not
been started.

Parameters:

- `millis`: the time to wait in milliseconds
- `nanos`: `0-999999` additional nanoseconds to wait

**Implementation note:** For platform threads, the implementation uses a loop of `this.wait`
calls conditioned on `this.isAlive`. As a thread terminates the
`this.notifyAll` method is invoked. It is recommended that
applications not use `wait`, `notify`, or
`notifyAll` on `Thread` instances.

Throws:

- `IllegalArgumentException`: if the value of `millis` is negative, or the value of `nanos` is not in the range `0-999999`
- `InterruptedException`: if any thread has interrupted the current thread. The *interrupted status* of the current thread is cleared when this exception is thrown.

## Thread.join()

```java
public final void join() throws InterruptedException
```

Waits for this thread to terminate.

 An invocation of this method behaves in exactly the same
way as the invocation

join`(0)`

Throws:

- `InterruptedException`: if any thread has interrupted the current thread. The *interrupted status* of the current thread is cleared when this exception is thrown.

## Thread.join(Duration)

```java
public final boolean join(Duration duration) throws InterruptedException
```

Waits for this thread to terminate for up to the given waiting duration.

 This method does not wait if the duration to wait is less than or
equal to zero. In this case, the method just tests if the thread has
terminated.

Parameters:

- `duration`: the maximum duration to wait

**Returns:** `true` if the thread has terminated, `false` if the
         thread has not terminated

**Since:** 19

Throws:

- `InterruptedException`: if the current thread is interrupted while waiting. The *interrupted status* of the current thread is cleared when this exception is thrown.
- `IllegalThreadStateException`: if this thread has not been started.

## Thread.dumpStack()

```java
public static void dumpStack()
```

Prints a stack trace of the current thread to the standard error stream.
This method is useful for debugging.

## Thread.setDaemon(boolean)

```java
public final void setDaemon(boolean on)
```

Marks this thread as either a *daemon* or *non-daemon* thread.
The shutdown sequence begins when all
started non-daemon threads have terminated.

 The daemon status of a virtual thread is always `true` and cannot be
changed by this method to `false`.

 This method must be invoked before the thread is started. The behavior
of this method when the thread has terminated is not specified.

Parameters:

- `on`: if `true`, marks this thread as a daemon thread

Throws:

- `IllegalArgumentException`: if this is a virtual thread and `on` is false
- `IllegalThreadStateException`: if this thread is alive

## Thread.isDaemon()

```java
public final boolean isDaemon()
```

Tests if this thread is a daemon thread.
The daemon status of a virtual thread is always `true`.

**Returns:** `true` if this thread is a daemon thread;
         `false` otherwise.

**See also:** #setDaemon(boolean)

## Thread.checkAccess()

```java
public final void checkAccess()
```

Does nothing.

**Deprecated:** This method originally determined if the currently running
thread had permission to modify this thread. This method was only useful
in conjunction with the Security Manager,
which is no longer supported. There is no replacement for the Security
Manager or this method.

## Thread.toString()

```java
public String toString()
```

Returns a string representation of this thread. The string representation
will usually include the thread's identifier and
name. The default implementation for platform threads includes the thread's
identifier, name, priority, and the name of the thread group.

**Returns:** a string representation of this thread.

## Thread.getContextClassLoader()

```java
public ClassLoader getContextClassLoader()
```

Returns the context `ClassLoader` for this thread.
The context `ClassLoader` may be set by the creator of the thread
for use by code running in this thread when loading classes and resources.
If not set, the default is to inherit
the context class loader from the parent thread.

 The context `ClassLoader` of the primordial thread is typically
set to the class loader used to load the application.

**Returns:** the context `ClassLoader` for this thread, or `null`
         indicating the system class loader (or, failing that, the
         bootstrap class loader)

**Since:** 1.2

## Thread.setContextClassLoader(ClassLoader)

```java
public void setContextClassLoader(ClassLoader cl)
```

Sets the context `ClassLoader` for this thread.

 The context `ClassLoader` may be set by the creator of the thread
for use by code running in this thread when loading classes and resources.

Parameters:

- `cl`: the context ClassLoader for this Thread, or null indicating the system class loader (or, failing that, the bootstrap class loader)

**Since:** 1.2

## Thread.holdsLock(Object)

```java
public static native boolean holdsLock(Object obj)
```

Returns `true` if and only if the current thread holds the
monitor lock on the specified object.

This method is designed to allow a program to assert that
the current thread already holds a specified lock:

```java
    assert Thread.holdsLock(obj);
```

Parameters:

- `obj`: the object on which to test lock ownership

**Returns:** `true` if the current thread holds the monitor lock on
        the specified object.

**Since:** 1.4

## Thread.getStackTrace()

```java
public StackTraceElement[] getStackTrace()
```

Returns an array of stack trace elements representing the stack dump
of this thread.  This method will return a zero-length array if
this thread has not started, has started but has not yet been
scheduled to run by the system, or has terminated.
If the returned array is of non-zero length then the first element of
the array represents the top of the stack, which is the most recent
method invocation in the sequence.  The last element of the array
represents the bottom of the stack, which is the least recent method
invocation in the sequence.

Some virtual machines may, under some circumstances, omit one
or more stack frames from the stack trace.  In the extreme case,
a virtual machine that has no stack trace information concerning
this thread is permitted to return a zero-length array from this
method.

**Returns:** an array of `StackTraceElement`,
each represents one stack frame.

**See also:** Throwable#getStackTrace

**Since:** 1.5

## Thread.getAllStackTraces()

```java
public static Map<Thread, StackTraceElement[]> getAllStackTraces()
```

Returns a map of stack traces for all live platform threads. The map
does not include virtual threads.
The map keys are threads and each map value is an array of
`StackTraceElement` that represents the stack dump
of the corresponding `Thread`.
The returned stack traces are in the format specified for
the getStackTrace method.

The threads may be executing while this method is called.
The stack trace of each thread only represents a snapshot and
each stack trace may be obtained at different time.  A zero-length
array will be returned in the map value if the virtual machine has
no stack trace information about a thread.

**Returns:** a `Map` from `Thread` to an array of
`StackTraceElement` that represents the stack trace of
the corresponding thread.

**See also:** #getStackTrace

**See also:** Throwable#getStackTrace

**Since:** 1.5

## Thread.getId()

```java
public long getId()
```

Returns the identifier of this Thread.  The thread ID is a positive
`long` number generated when this thread was created.
The thread ID is unique and remains unchanged during its lifetime.

**Returns:** this thread's ID

**Deprecated:** This method is not final and may be overridden to return a
value that is not the thread ID. Use `threadId()` instead.

**Since:** 1.5

## Thread.threadId()

```java
public final long threadId()
```

Returns the identifier of this Thread.  The thread ID is a positive
`long` number generated when this thread was created.
The thread ID is unique and remains unchanged during its lifetime.

**Returns:** this thread's ID

**Since:** 19

## Thread.getState()

```java
public State getState()
```

Returns the state of this thread.
This method is designed for use in monitoring of the system state,
not for synchronization control.

**Returns:** this thread's state.

**Since:** 1.5

## Thread.setDefaultUncaughtExceptionHandler(UncaughtExceptionHandler)

```java
public static void setDefaultUncaughtExceptionHandler(UncaughtExceptionHandler ueh)
```

Set the default handler invoked when a thread abruptly terminates
due to an uncaught exception, and no other handler has been defined
for that thread.

Uncaught exception handling is controlled first by the thread, then
by the thread's `ThreadGroup` object and finally by the default
uncaught exception handler. If the thread does not have an explicit
uncaught exception handler set, and the thread's thread group
(including parent thread groups)  does not specialize its
`uncaughtException` method, then the default handler's
`uncaughtException` method will be invoked.

By setting the default uncaught exception handler, an application
can change the way in which uncaught exceptions are handled (such as
logging to a specific device, or file) for those threads that would
already accept whatever "default" behavior the system
provided.

Note that the default uncaught exception handler should not usually
defer to the thread's `ThreadGroup` object, as that could cause
infinite recursion.

Parameters:

- `ueh`: the object to use as the default uncaught exception handler. If `null` then there is no default handler.

**See also:** #setUncaughtExceptionHandler

**See also:** #getUncaughtExceptionHandler

**See also:** ThreadGroup#uncaughtException

**Since:** 1.5

## Thread.getDefaultUncaughtExceptionHandler()

```java
public static UncaughtExceptionHandler getDefaultUncaughtExceptionHandler()
```

Returns the default handler invoked when a thread abruptly terminates
due to an uncaught exception. If the returned value is `null`,
there is no default.

**Since:** 1.5

**See also:** #setDefaultUncaughtExceptionHandler

**Returns:** the default uncaught exception handler for all threads

## Thread.getUncaughtExceptionHandler()

```java
public UncaughtExceptionHandler getUncaughtExceptionHandler()
```

Returns the handler invoked when this thread abruptly terminates
due to an uncaught exception. If this thread has not had an
uncaught exception handler explicitly set then this thread's
`ThreadGroup` object is returned, unless this thread
has terminated, in which case `null` is returned.

**Since:** 1.5

**Returns:** the uncaught exception handler for this thread

## Thread.setUncaughtExceptionHandler(UncaughtExceptionHandler)

```java
public void setUncaughtExceptionHandler(UncaughtExceptionHandler ueh)
```

Set the handler invoked when this thread abruptly terminates
due to an uncaught exception.

A thread can take full control of how it responds to uncaught
exceptions by having its uncaught exception handler explicitly set.
If no such handler is set then the thread's `ThreadGroup`
object acts as its handler.

Parameters:

- `ueh`: the object to use as this thread's uncaught exception handler. If `null` then this thread has no explicit handler.

**See also:** #setDefaultUncaughtExceptionHandler

**See also:** ThreadGroup#uncaughtException

**Since:** 1.5
