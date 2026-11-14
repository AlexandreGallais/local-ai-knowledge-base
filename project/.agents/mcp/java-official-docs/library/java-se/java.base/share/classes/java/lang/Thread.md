---
title: "Thread class (java.lang) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Thread.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Thread class (java.lang)

```java
public class Thread implements Runnable
```

A *thread* is a thread of execution in a program. The Java
virtual machine allows an application to have multiple threads of
execution running concurrently.

 `Thread` defines constructors and a `Builder` to create threads.
Starting a thread schedules it to execute its run
method. The newly started thread executes concurrently with the thread that caused
it to start.

 A thread *terminates* if either its `run` method completes normally,
or if its `run` method completes abruptly and the appropriate uncaught exception handler completes normally or
abruptly. With no code left to run, the thread has completed execution. The
join method can be used to wait for a thread to terminate.

 Threads have a unique identifier and a name. The identifier is generated when a `Thread` is created
and cannot be changed. The thread name can be specified when creating a thread
or can be changed at a later time.

 Threads support `ThreadLocal` variables. These are variables that are
local to a thread, meaning a thread can have a copy of a variable that is set to
a value that is independent of the value set by other threads. `Thread` also
supports `InheritableThreadLocal` variables that are thread local variables
that are inherited at thread creation time from the parent `Thread`.
`Thread` supports a special inheritable thread local for the thread
context-class-loader.

#### Platform threads

 `Thread` supports the creation of *platform threads* that are
typically mapped 1:1 to kernel threads scheduled by the operating system.
Platform threads will usually have a large stack and other resources that are
maintained by the operating system. Platforms threads are suitable for executing
all types of tasks but may be a limited resource.

 Platform threads get an automatically generated thread name by default.

 Platform threads are designated *daemon* or *non-daemon* threads.
When the Java virtual machine starts up, there is usually one non-daemon
thread (the thread that typically calls the application's `main` method).
The shutdown sequence begins when all started
non-daemon threads have terminated. Unstarted non-daemon threads do not prevent
the shutdown sequence from beginning.

 In addition to the daemon status, platform threads have a thread priority and are members of a thread group.

#### Virtual threads

 `Thread` also supports the creation of *virtual threads*.
Virtual threads are typically *user-mode threads* scheduled by the Java
runtime rather than the operating system. Virtual threads will typically require
few resources and a single Java virtual machine may support millions of virtual
threads. Virtual threads are suitable for executing tasks that spend most of
the time blocked, often waiting for I/O operations to complete. Virtual threads
are not intended for long running CPU intensive operations.

 Virtual threads typically employ a small set of platform threads used as
*carrier threads*. Locking and I/O operations are examples of operations
where a carrier thread may be re-scheduled from one virtual thread to another.
Code executing in a virtual thread is not aware of the underlying carrier thread.
The `Thread.currentThread()` method, used to obtain a reference
to the *current thread*, will always return the `Thread` object
for the virtual thread.

 Virtual threads do not have a thread name by default. The getName method returns the empty string if a thread name is not set.

 Virtual threads are daemon threads and so do not prevent the
shutdown sequence from beginning.
Virtual threads have a fixed thread priority
that cannot be changed.

#### Creating and starting threads

 `Thread` defines public constructors for creating platform threads and
the start method to schedule threads to execute. `Thread`
may be extended for customization and other advanced reasons although most
applications should have little need to do this.

 `Thread` defines a `Builder` API for creating and starting both
platform and virtual threads. The following are examples that use the builder:

#### Inheritance when creating threads

A `Thread` created with one of the public constructors inherits the daemon
status and thread priority from the parent thread at the time that the child `Thread` is created. The thread group is also inherited when
not provided to the constructor. When using a `Thread.Builder` to create a
platform thread, the daemon status, thread priority, and thread group are inherited
when not set on the builder. As with the constructors, inheriting from the parent
thread is done when the child `Thread` is created.

 A `Thread` inherits its initial values of inheritable-thread-local variables (including the context class loader) from
the parent thread values at the time that the child `Thread` is created.
The 5-param Runnable, String, long, boolean) constructor can be used to create a thread that does not inherit its initial
values from the constructing thread. When using a `Thread.Builder`, the
inheritInheritableThreadLocals
method can be used to select if the initial values are inherited.

 Unless otherwise specified, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be thrown.

**Implementation note:** In the JDK Reference Implementation, the virtual thread scheduler may be configured
with the following system properties:

System properties

    System property
    Description

      `jdk.virtualThreadScheduler.parallelism`

     The number of platform threads available for scheduling virtual
      threads. It defaults to the number of available processors.

      `jdk.virtualThreadScheduler.maxPoolSize`

     The maximum number of platform threads available to the scheduler.
      It defaults to 256.

**Since:** 1.0

## Thread.MIN_PRIORITY

```java
public static final int MIN_PRIORITY
```

The minimum priority that a thread can have.

## Thread.NORM_PRIORITY

```java
public static final int NORM_PRIORITY
```

The default priority that is assigned to a thread.

## Thread.MAX_PRIORITY

```java
public static final int MAX_PRIORITY
```

The maximum priority that a thread can have.

## Thread.currentThread()

```java
public static native Thread currentThread()
```

Returns the Thread object for the current thread.

**Returns:** the current thread

## Thread.yield()

```java
public static void yield()
```

A hint to the scheduler that the current thread is willing to yield
its current use of a processor. The scheduler is free to ignore this
hint.

 Yield is a heuristic attempt to improve relative progression
between threads that would otherwise over-utilise a CPU. Its use
should be combined with detailed profiling and benchmarking to
ensure that it actually has the desired effect.

 It is rarely appropriate to use this method. It may be useful
for debugging or testing purposes, where it may help to reproduce
bugs due to race conditions. It may also be useful when designing
concurrency control constructs such as the ones in the
`java.util.concurrent.locks` package.

## Thread.sleep(long)

```java
public static void sleep(long millis) throws InterruptedException
```

Causes the currently executing thread to sleep (temporarily cease
execution) for the specified number of milliseconds, subject to
the precision and accuracy of system timers and schedulers. The thread
does not lose ownership of any monitors.

Parameters:

- `millis`: the length of time to sleep in milliseconds

Throws:

- `IllegalArgumentException`: if the value of `millis` is negative
- `InterruptedException`: if any thread has interrupted the current thread. The *interrupted status* of the current thread is cleared when this exception is thrown.

## Thread.sleep(long, int)

```java
public static void sleep(long millis, int nanos) throws InterruptedException
```

Causes the currently executing thread to sleep (temporarily cease
execution) for the specified number of milliseconds plus the specified
number of nanoseconds, subject to the precision and accuracy of system
timers and schedulers. The thread does not lose ownership of any
monitors.

Parameters:

- `millis`: the length of time to sleep in milliseconds
- `nanos`: `0-999999` additional nanoseconds to sleep

Throws:

- `IllegalArgumentException`: if the value of `millis` is negative, or the value of `nanos` is not in the range `0-999999`
- `InterruptedException`: if any thread has interrupted the current thread. The *interrupted status* of the current thread is cleared when this exception is thrown.

## Thread.sleep(Duration)

```java
public static void sleep(Duration duration) throws InterruptedException
```

Causes the currently executing thread to sleep (temporarily cease
execution) for the specified duration, subject to the precision and
accuracy of system timers and schedulers. This method is a no-op if
the duration is negative.

Parameters:

- `duration`: the duration to sleep

**Since:** 19

Throws:

- `InterruptedException`: if the current thread is interrupted while sleeping. The *interrupted status* of the current thread is cleared when this exception is thrown.

## Thread.onSpinWait()

```java
public static void onSpinWait()
```

Indicates that the caller is momentarily unable to progress, until the
occurrence of one or more actions on the part of other activities. By
invoking this method within each iteration of a spin-wait loop construct,
the calling thread indicates to the runtime that it is busy-waiting.
The runtime may take action to improve the performance of invoking
spin-wait loop constructions.

**API note:** As an example consider a method in a class that spins in a loop until
some flag is set outside of that method. A call to the `onSpinWait`
method should be placed inside the spin loop.

The code above would remain correct even if the `onSpinWait`
method was not called at all. However on some architectures the Java
Virtual Machine may issue the processor instructions to address such
code patterns in a more beneficial way.

**Since:** 9

## Thread.ofPlatform()

```java
public static Builder.OfPlatform ofPlatform()
```

Returns a builder for creating a platform `Thread` or `ThreadFactory`
that creates platform threads.

**API note:** The following are examples using the builder:

**Returns:** A builder for creating `Thread` or `ThreadFactory` objects.

**Since:** 21

## Thread.ofVirtual()

```java
public static Builder.OfVirtual ofVirtual()
```

Returns a builder for creating a virtual `Thread` or `ThreadFactory`
that creates virtual threads.

**API note:** The following are examples using the builder:

**Returns:** A builder for creating `Thread` or `ThreadFactory` objects.

**Since:** 21

## Thread.clone()

```java
protected Object clone() throws CloneNotSupportedException
```

Throws CloneNotSupportedException as a Thread can not be meaningfully
cloned. Construct a new Thread instead.

Throws:

- `CloneNotSupportedException`: always

## Thread.Thread()

```java
public Thread()
```

Initializes a new platform `Thread`. This constructor has the same
effect as Thread
`(null, null, gname)`, where `gname` is a newly generated
name. Automatically generated names are of the form
`"Thread-"+`*n*, where *n* is an integer.

 This constructor is only useful when extending `Thread` to
override the `run()` method.

**See also:** Inheritance when creating threads

## Thread.Thread(Runnable)

```java
public Thread(Runnable task)
```

Initializes a new platform `Thread`. This constructor has the same
effect as Thread
`(null, task, gname)`, where `gname` is a newly generated
name. Automatically generated names are of the form
`"Thread-"+`*n*, where *n* is an integer.

 For a non-null task, invoking this constructor directly is equivalent to:

```java
Thread.ofPlatform().unstarted(task);
```

Parameters:

- `task`: the object whose `run` method is invoked when this thread is started. If `null`, this classes `run` method does nothing.

**See also:** Inheritance when creating threads

## Thread.Thread(ThreadGroup, Runnable)

```java
public Thread(ThreadGroup group, Runnable task)
```

Initializes a new platform `Thread`. This constructor has the same
effect as Thread
`(group, task, gname)`, where `gname` is a newly generated
name. Automatically generated names are of the form
`"Thread-"+`*n*, where *n* is an integer.

 For a non-null group and task, invoking this constructor directly is
equivalent to:

```java
Thread.ofPlatform().group(group).unstarted(task);
```

Parameters:

- `group`: the thread group. If `null` the group is set to the current thread's thread group.
- `task`: the object whose `run` method is invoked when this thread is started. If `null`, this thread's run method is invoked.

**See also:** Inheritance when creating threads

## Thread.Thread(String)

```java
public Thread(String name)
```

Initializes a new platform `Thread`. This constructor has the same
effect as Thread
`(null, null, name)`.

 This constructor is only useful when extending `Thread` to
override the `run()` method.

Parameters:

- `name`: the name of the new thread

**See also:** Inheritance when creating threads

## Thread.Thread(ThreadGroup, String)

```java
public Thread(ThreadGroup group, String name)
```

Initializes a new platform `Thread`. This constructor has the same
effect as Thread
`(group, null, name)`.

 This constructor is only useful when extending `Thread` to
override the `run()` method.

Parameters:

- `group`: the thread group. If `null`, the group is set to the current thread's thread group.
- `name`: the name of the new thread

**See also:** Inheritance when creating threads

## Thread.Thread(Runnable, String)

```java
public Thread(Runnable task, String name)
```

Initializes a new platform `Thread`. This constructor has the same
effect as Thread
`(null, task, name)`.

 For a non-null task and name, invoking this constructor directly is
equivalent to:

```java
Thread.ofPlatform().name(name).unstarted(task);
```

Parameters:

- `task`: the object whose `run` method is invoked when this thread is started. If `null`, this thread's run method is invoked.
- `name`: the name of the new thread

**See also:** Inheritance when creating threads
